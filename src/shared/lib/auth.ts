import { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { AUTH_CONFIG, ERROR_MESSAGES } from "./constants"
import { PUBLIC_ROUTES } from "@/shared/constants/routes"
import type { UserWithSubscription } from "@/shared/types/database"
import type { Session } from "next-auth"

// Routes qui ne nécessitent pas d'authentification
const AUTH_FREE_ROUTES = [
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

// Configuration NextAuth v5
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
                // Validation des inputs
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    // Recherche de l'utilisateur avec sa subscription
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email.toLowerCase()
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

                    // Vérification de l'existence de l'utilisateur
                    if (!user) {
                        return null
                    }

                    // Vérification du compte actif
                    if (!user.isActive) {
                        return null
                    }

                    // Vérification du mot de passe
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if (!isPasswordValid) {
                        return null
                    }

                    // Retour des données utilisateur pour la session
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
            const isPublicRoute = AUTH_FREE_ROUTES.includes(nextUrl.pathname)

            if (isPublicRoute) {
                return true
            }

            if (isLoggedIn) {
                return true
            }

            return false
        },

        jwt({ token, user }) {
            // Premier login - on ajoute les infos user au token
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
            // Ajouter les infos du token à la session
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name as string | null
                session.user.role = token.role as "USER" | "EDITOR" | "ADMIN"
                session.user.subscriptionPlan = token.subscriptionPlan as any
                session.user.subscriptionStatus = token.subscriptionStatus as any
            }

            return session
        },
    },

    events: {
        async signIn(message) {
            console.log(`User ${message.user.email} signed in`)
        },
        async signOut(message) {
            console.log(`Session ended`)
        }
    },

    debug: process.env.NODE_ENV === "development",
}

// Helpers pour l'authentification

/**
 * Vérifier si un utilisateur a un rôle spécifique
 */
export const hasRole = (user: Session["user"] | null, role: string): boolean => {
    if (!user) return false
    return user.role === role
}

/**
 * Vérifier si un utilisateur est admin
 */
export const isAdmin = (user: Session["user"] | null): boolean => {
    return hasRole(user, "ADMIN")
}

/**
 * Vérifier si un utilisateur est éditeur
 */
export const isEditor = (user: Session["user"] | null): boolean => {
    return hasRole(user, "EDITOR")
}

/**
 * Vérifier si un utilisateur a un abonnement actif
 */
export const hasActiveSubscription = (user: Session["user"] | null): boolean => {
    if (!user) return false
    return user.subscriptionStatus === "ACTIVE"
}

/**
 * Vérifier si un utilisateur a accès au contenu premium
 */
export const hasPremiumAccess = (user: Session["user"] | null): boolean => {
    if (!user) return false

    // Les admins et éditeurs ont toujours accès
    if (isAdmin(user) || isEditor(user)) return true

    // Vérifier l'abonnement actif et le plan
    return hasActiveSubscription(user) &&
        (user.subscriptionPlan === "PREMIUM" || user.subscriptionPlan === "ENTERPRISE")
}