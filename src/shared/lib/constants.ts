// Configuration de l'application
export const APP_CONFIG = {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Financial Newsletter',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Newsletter financière premium avec analyses d\'investissement',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    email: {
        from: process.env.EMAIL_FROM || 'noreply@financial-newsletter.com',
        contact: 'contact@financial-newsletter.com'
    }
} as const

// Configuration de l'authentification
export const AUTH_CONFIG = {
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 jours en secondes
    bcryptRounds: 12,
    jwtSecret: process.env.NEXTAUTH_SECRET!,
    providers: {
        credentials: true,
        google: false, // À activer plus tard si besoin
        github: false  // À activer plus tard si besoin
    }
} as const

// Rôles utilisateurs
export const USER_ROLES = {
    USER: 'USER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
} as const

// Plans d'abonnement
export const SUBSCRIPTION_PLANS = {
    FREE: {
        name: 'Gratuit',
        price: 0,
        features: [
            'Newsletter hebdomadaire',
            'Accès aux archives (3 mois)',
            'Articles gratuits'
        ]
    },
    PREMIUM: {
        name: 'Premium',
        price: 19.99,
        currency: 'EUR',
        features: [
            'Toutes les newsletters (quotidienne + hebdomadaire)',
            'Accès complet aux archives',
            'Analyses exclusives',
            'Sélections d\'investissement',
            'Support prioritaire'
        ]
    },
    ENTERPRISE: {
        name: 'Entreprise',
        price: 99.99,
        currency: 'EUR',
        features: [
            'Tout Premium +',
            'Accès multi-utilisateurs',
            'API access',
            'Rapports personnalisés',
            'Account manager dédié'
        ]
    }
} as const

// Types de contenu
export const CONTENT_TYPES = {
    NEWSLETTER: 'NEWSLETTER',
    ANALYSIS: 'ANALYSIS',
    SELECTION: 'SELECTION'
} as const

// Statuts de contenu
export const CONTENT_STATUS = {
    DRAFT: 'DRAFT',
    SCHEDULED: 'SCHEDULED',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED'
} as const

// Configuration des cookies
export const COOKIE_CONFIG = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/'
}

// Limites et contraintes
export const LIMITS = {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxEmailLength: 255,
    maxPasswordLength: 128,
    minPasswordLength: 8,
    maxNameLength: 100,
    maxTitleLength: 200,
    maxExcerptLength: 500,
    maxContentLength: 50000,
    paginationDefault: 20,
    paginationMax: 100
} as const

// Messages d'erreur
export const ERROR_MESSAGES = {
    // Auth
    INVALID_CREDENTIALS: 'Email ou mot de passe incorrect',
    USER_NOT_FOUND: 'Utilisateur non trouvé',
    USER_ALREADY_EXISTS: 'Un compte existe déjà avec cet email',
    INVALID_TOKEN: 'Token invalide ou expiré',
    UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette ressource',

    // Validation
    REQUIRED_FIELD: 'Ce champ est requis',
    INVALID_EMAIL: 'Email invalide',
    PASSWORD_TOO_SHORT: `Le mot de passe doit contenir au moins ${LIMITS.minPasswordLength} caractères`,
    PASSWORD_TOO_WEAK: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',

    // General
    SOMETHING_WENT_WRONG: 'Une erreur est survenue, veuillez réessayer',
    NOT_FOUND: 'Ressource non trouvée',
    SERVER_ERROR: 'Erreur serveur, veuillez réessayer plus tard'
} as const

// Messages de succès
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Connexion réussie',
    REGISTER_SUCCESS: 'Inscription réussie',
    LOGOUT_SUCCESS: 'Déconnexion réussie',
    PROFILE_UPDATED: 'Profil mis à jour',
    PASSWORD_UPDATED: 'Mot de passe mis à jour',
    PREFERENCES_UPDATED: 'Préférences mises à jour',
    SUBSCRIPTION_UPDATED: 'Abonnement mis à jour'
} as const