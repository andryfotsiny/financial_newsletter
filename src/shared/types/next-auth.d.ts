import { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string | null
            role: "USER" | "EDITOR" | "ADMIN"
            subscriptionPlan: "FREE" | "PREMIUM" | "ENTERPRISE" | null
            subscriptionStatus: "ACTIVE" | "INACTIVE" | "CANCELLED" | "PAST_DUE" | "TRIALING" | null
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: string
        email: string
        name: string | null
        role: "USER" | "EDITOR" | "ADMIN"
        subscriptionPlan?: "FREE" | "PREMIUM" | "ENTERPRISE" | null
        subscriptionStatus?: "ACTIVE" | "INACTIVE" | "CANCELLED" | "PAST_DUE" | "TRIALING" | null
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        email: string
        name: string | null
        role: "USER" | "EDITOR" | "ADMIN"
        subscriptionPlan?: "FREE" | "PREMIUM" | "ENTERPRISE" | null
        subscriptionStatus?: "ACTIVE" | "INACTIVE" | "CANCELLED" | "PAST_DUE" | "TRIALING" | null
    }
}