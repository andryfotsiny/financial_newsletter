import { z } from "zod"
import { LIMITS, ERROR_MESSAGES } from "@/shared/lib/constants"

// Schémas de validation Zod
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
        .email(ERROR_MESSAGES.INVALID_EMAIL),
    password: z
        .string()
        .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
})

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
        .email(ERROR_MESSAGES.INVALID_EMAIL),
    password: z
        .string()
        .min(LIMITS.minPasswordLength, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            ERROR_MESSAGES.PASSWORD_TOO_WEAK
        ),
    confirmPassword: z.string().min(1, "Veuillez confirmer votre mot de passe"),
    name: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
        .email(ERROR_MESSAGES.INVALID_EMAIL),
})

export const resetPasswordSchema = z.object({
    token: z.string().min(1, ERROR_MESSAGES.REQUIRED_FIELD),
    password: z
        .string()
        .min(LIMITS.minPasswordLength, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            ERROR_MESSAGES.PASSWORD_TOO_WEAK
        ),
    confirmPassword: z.string().min(1, "Veuillez confirmer votre mot de passe"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

// Schéma pour l'API d'inscription (sans confirmPassword)
export const registerApiSchema = z.object({
    email: z
        .string()
        .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
        .email(ERROR_MESSAGES.INVALID_EMAIL),
    password: z
        .string()
        .min(LIMITS.minPasswordLength, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            ERROR_MESSAGES.PASSWORD_TOO_WEAK
        ),
    name: z.string().optional(),
})

// Types inférés depuis les schémas
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type RegisterApiInput = z.infer<typeof registerApiSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

// Types pour les réponses
export interface AuthResponse {
    success: boolean
    message?: string
    error?: string
    redirectUrl?: string
}

// Types pour les erreurs d'authentification
export interface AuthError {
    type: "email" | "password" | "general"
    message: string
}

// Types pour l'état du formulaire
export interface AuthFormState {
    isLoading: boolean
    error: string | null
    fieldErrors?: Record<string, string>
}