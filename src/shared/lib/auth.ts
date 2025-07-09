import { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { AUTH_CONFIG } from "./constants"
import { PUBLIC_ROUTES } from "@/shared/constants/routes"
import type { UserWithSubscription } from "@/shared/types/database"
import type { Session } from "next-auth"

// Définition stricte des credentials pour TypeScript
type Credentials = { email: string; password: string }

// Routes publiques
const AUTH_FREE_ROUTES: string[] = [
    PUBLIC_ROUTES.HOME,
    PUBLIC_ROUTES.LOGIN,
    PUBLIC_ROUTES.REGISTER,
    PUBLIC_ROUTES.FORGOT_PASSWORD,
    PUBLIC_ROUTES.ABOUT,
    PUBLIC_ROUTES.ARCHIVES,
    PUBLIC_ROUTES.PREMIUM,
    PUBLIC_ROUTES.REVIEWS,
    PUBLIC_ROUTES.DONATIONS,
]

// NextAuth config
export const authConfig: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "votre@email.com"
                },
                password: {
                    label: "Mot de passe",
                    type: "password"
                }
            },
            async authorize(credentials) {
                // Typage sûr des credentials
                const { email, password } = credentials as Credentials

                if (!email || !password) return null

                try {
                    // Recherche utilisateur avec abonnement
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email.toLowerCase()
                        },
                        include: {
                            subscription: {
                                select: {
                                    plan: true,
                                    status: true
                                }
                            }
                        }
                    }) as UserWithSubscription | null

                    if (!user) return null
                    if (!user.isActive) return null

                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                    )
                    if (!isPasswordValid) return null

                    // On renvoie ce qui sera inclus dans le JWT
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        subscriptionPlan: user.subscription?.plan || null,
                        subscriptionStatus: user.subscription?.status || null
                    }
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: AUTH_CONFIG.sessionMaxAge,
    },

    pages: {
        signIn: PUBLIC_ROUTES.LOGIN,
        error: PUBLIC_ROUTES.LOGIN,
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            // On autorise toutes les routes publiques
            const isPublicRoute = AUTH_FREE_ROUTES.includes(nextUrl.pathname as string)

            if (isPublicRoute) return true
            if (isLoggedIn) return true

            return false
        },

        jwt({ token, user }) {
            // Ajout des infos de l'user au JWT à la connexion
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.role = user.role
                token.subscriptionPlan = user.subscriptionPlan
                token.subscriptionStatus = user.subscriptionStatus
            }
            return token
        },

        session({ session, token }) {
            // On copie tout du JWT dans la session NextAuth
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name as string | null
                session.user.role = token.role as "USER" | "EDITOR" | "ADMIN"
                session.user.subscriptionPlan = token.subscriptionPlan as "FREE" | "PREMIUM" | "ENTERPRISE" | null
                session.user.subscriptionStatus = token.subscriptionStatus as
                    | "ACTIVE"
                    | "INACTIVE"
                    | "CANCELLED"
                    | "PAST_DUE"
                    | "TRIALING"
                    | null
            }
            return session
        },
    },

    events: {
        async signIn() {},
        async signOut() {},
    },

    debug: process.env.NODE_ENV === "development",
}

// Helpers d’authentification

export const hasRole = (user: Session["user"] | null, role: string): boolean => {
    if (!user) return false
    return user.role === role
}
export const isAdmin = (user: Session["user"] | null): boolean => hasRole(user, "ADMIN")
export const isEditor = (user: Session["user"] | null): boolean => hasRole(user, "EDITOR")
export const hasActiveSubscription = (user: Session["user"] | null): boolean =>
    !!user && user.subscriptionStatus === "ACTIVE"
export const hasPremiumAccess = (user: Session["user"] | null): boolean => {
    if (!user) return false
    if (isAdmin(user) || isEditor(user)) return true
    return hasActiveSubscription(user) &&
        (user.subscriptionPlan === "PREMIUM" || user.subscriptionPlan === "ENTERPRISE")
}
