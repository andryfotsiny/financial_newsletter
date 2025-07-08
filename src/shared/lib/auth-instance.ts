import NextAuth from "next-auth"
import { authConfig } from "./auth"

// Créer l'instance NextAuth avec la configuration
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Exporter getSession comme alias de auth pour la compatibilité
export const getSession = auth