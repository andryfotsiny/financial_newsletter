// Routes publiques
export const PUBLIC_ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    ABOUT: '/about',
    ARCHIVES: '/archives',
    ARCHIVE_DETAIL: (slug: string) => `/archives/${slug}`,
    PREMIUM: '/premium',
    REVIEWS: '/reviews',
    DONATIONS: '/donations',
} as const

// Routes utilisateur authentifié
export const USER_ROUTES = {
    DASHBOARD: '/account',
    PROFILE: '/account',
    PREFERENCES: '/account/preferences',
    SUBSCRIPTION: '/account/subscription',
    FAVORITES: '/favorites',
    READING_HISTORY: '/account/history',
} as const

// Routes admin
export const ADMIN_ROUTES = {
    DASHBOARD: '/admin',

    // Newsletters
    NEWSLETTERS: '/admin/newsletters',
    NEWSLETTER_CREATE: '/admin/newsletters/create',
    NEWSLETTER_DETAIL: (id: string) => `/admin/newsletters/${id}`,
    NEWSLETTER_EDIT: (id: string) => `/admin/newsletters/${id}/edit`,

    // Analyses
    ANALYSES: '/admin/analyses',
    ANALYSIS_CREATE: '/admin/analyses/create',
    ANALYSIS_DETAIL: (id: string) => `/admin/analyses/${id}`,
    ANALYSIS_EDIT: (id: string) => `/admin/analyses/${id}/edit`,

    // Sélections
    SELECTIONS: '/admin/selections',
    SELECTION_CREATE: '/admin/selections/create',
    SELECTION_DETAIL: (id: string) => `/admin/selections/${id}`,
    SELECTION_EDIT: (id: string) => `/admin/selections/${id}/edit`,

    // Utilisateurs
    USERS: '/admin/users',
    USER_DETAIL: (id: string) => `/admin/users/${id}`,

    // Autres
    SETTINGS: '/admin/settings',
    ANALYTICS: '/admin/analytics',
} as const

// Routes API
export const API_ROUTES = {
    // Auth
    AUTH: '/api/auth',
    LOGIN: '/api/auth/signin',
    LOGOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',

    // Newsletters
    NEWSLETTERS: '/api/newsletters',
    NEWSLETTER_DETAIL: (id: string) => `/api/newsletters/${id}`,

    // Analyses
    ANALYSES: '/api/analyses',
    ANALYSIS_DETAIL: (id: string) => `/api/analyses/${id}`,

    // Sélections
    SELECTIONS: '/api/selections',
    SELECTION_DETAIL: (id: string) => `/api/selections/${id}`,

    // Utilisateurs
    USERS: '/api/users',
    USER_DETAIL: (id: string) => `/api/users/${id}`,
    USER_PREFERENCES: (id: string) => `/api/users/${id}/preferences`,

    // Abonnements
    SUBSCRIPTIONS: '/api/subscriptions',
    SUBSCRIPTION_DETAIL: (id: string) => `/api/subscriptions/${id}`,

    // Email
    EMAIL_SEND: '/api/email/send',
    EMAIL_WEBHOOK: '/api/email/webhook',

    // Upload
    UPLOAD: '/api/upload',
} as const

// Routes qui ne nécessitent pas d'authentification
export const AUTH_FREE_ROUTES = [
    PUBLIC_ROUTES.HOME,
    PUBLIC_ROUTES.LOGIN,
    PUBLIC_ROUTES.REGISTER,
    PUBLIC_ROUTES.FORGOT_PASSWORD,
    PUBLIC_ROUTES.RESET_PASSWORD,
    PUBLIC_ROUTES.ABOUT,
    PUBLIC_ROUTES.ARCHIVES,
    PUBLIC_ROUTES.PREMIUM,
    PUBLIC_ROUTES.REVIEWS,
    PUBLIC_ROUTES.DONATIONS,
] as const

// Routes qui nécessitent une authentification
export const AUTH_REQUIRED_ROUTES = [
    ...Object.values(USER_ROUTES),
    ...Object.values(ADMIN_ROUTES),
] as const

// Routes admin uniquement
export const ADMIN_ONLY_ROUTES = Object.values(ADMIN_ROUTES)

// Routes avec contenu premium
export const PREMIUM_ROUTES = [
    // À définir selon les besoins
] as const

// Fonction helper pour vérifier si une route nécessite une authentification
export const requiresAuth = (pathname: string): boolean => {
    return AUTH_REQUIRED_ROUTES.some(route => {
        if (typeof route === 'function') return false
        return pathname.startsWith(route)
    })
}

// Fonction helper pour vérifier si une route est admin only
export const isAdminRoute = (pathname: string): boolean => {
    return pathname.startsWith('/admin')
}

// Fonction helper pour obtenir le titre de la page selon la route
export const getPageTitle = (pathname: string): string => {
    const titles: Record<string, string> = {
        [PUBLIC_ROUTES.HOME]: 'Accueil',
        [PUBLIC_ROUTES.LOGIN]: 'Connexion',
        [PUBLIC_ROUTES.REGISTER]: 'Inscription',
        [PUBLIC_ROUTES.FORGOT_PASSWORD]: 'Mot de passe oublié',
        [PUBLIC_ROUTES.ABOUT]: 'À propos',
        [PUBLIC_ROUTES.ARCHIVES]: 'Archives',
        [PUBLIC_ROUTES.PREMIUM]: 'Premium',
        [PUBLIC_ROUTES.REVIEWS]: 'Avis',
        [PUBLIC_ROUTES.DONATIONS]: 'Donations',

        [USER_ROUTES.DASHBOARD]: 'Mon compte',
        [USER_ROUTES.PREFERENCES]: 'Préférences',
        [USER_ROUTES.SUBSCRIPTION]: 'Abonnement',
        [USER_ROUTES.FAVORITES]: 'Favoris',

        [ADMIN_ROUTES.DASHBOARD]: 'Administration',
        [ADMIN_ROUTES.NEWSLETTERS]: 'Newsletters',
        [ADMIN_ROUTES.ANALYSES]: 'Analyses',
        [ADMIN_ROUTES.SELECTIONS]: 'Sélections',
        [ADMIN_ROUTES.USERS]: 'Utilisateurs',
        [ADMIN_ROUTES.SETTINGS]: 'Paramètres',
        [ADMIN_ROUTES.ANALYTICS]: 'Analytics',
    }

    return titles[pathname] || 'Financial Newsletter'
}

// Export de toutes les routes
export const ROUTES = {
    ...PUBLIC_ROUTES,
    ...USER_ROUTES,
    ...ADMIN_ROUTES,
    API: API_ROUTES,
} as const