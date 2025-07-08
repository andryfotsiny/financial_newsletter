// Types communs utilisés dans toute l'application

// Types de réponse API
export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}

// Types pour les formulaires
export interface FormState {
    isLoading: boolean
    error: string | null
    success: boolean
}

// Types pour les filtres et recherche
export interface SearchParams {
    q?: string
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface ContentFilters {
    type?: string[]
    status?: string[]
    isPremium?: boolean
    dateFrom?: string
    dateTo?: string
    tags?: string[]
}

// Types pour les erreurs
export interface FieldError {
    field: string
    message: string
}

export interface ValidationError {
    errors: FieldError[]
}

// Types utilitaires
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type AsyncFunction<T = void> = () => Promise<T>

// Types pour les dates
export interface DateRange {
    from: Date
    to: Date
}

// Types pour les médias
export interface UploadedFile {
    url: string
    name: string
    size: number
    type: string
}

// Types pour les notifications
export interface Notification {
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    title: string
    message?: string
    duration?: number
}

// Type pour les permissions
export interface Permission {
    resource: string
    action: 'create' | 'read' | 'update' | 'delete'
    granted: boolean
}

// Types pour les préférences utilisateur étendues
export interface ExtendedUserPreferences {
    theme: 'light' | 'dark' | 'system'
    language: 'fr' | 'en'
    timezone: string
    dateFormat: string
    currency: 'EUR' | 'USD'
    notifications: {
        email: boolean
        push: boolean
        sms: boolean
    }
}

// Type pour les statistiques
export interface Statistics {
    label: string
    value: number
    change?: number
    changeType?: 'increase' | 'decrease'
    unit?: string
}