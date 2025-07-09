// Types pour les requêtes et réponses API

import { NextRequest } from 'next/server'
import { Session } from 'next-auth'
import {
    ContentStatus,
    ContentType,
    EmailType,
    NewsletterType,
    AnalysisType,
    SelectionType,
    SubscriptionPlan,
    Role
} from './database'

// Extension de NextRequest avec session
export interface AuthenticatedRequest extends NextRequest {
    auth?: Session | null
}

// Types pour les endpoints d'authentification
export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    name?: string
}

export interface ResetPasswordRequest {
    token: string
    password: string
}

export interface ForgotPasswordRequest {
    email: string
}

// Types pour les endpoints de contenu
export interface CreateNewsletterRequest {
    title: string
    subtitle?: string
    content: string
    excerpt?: string
    type: NewsletterType
    isPremium?: boolean
    tags?: string[]
    scheduledFor?: string
    status?: ContentStatus
}

export interface UpdateNewsletterRequest extends Partial<CreateNewsletterRequest> {
    id: string
}

export interface CreateAnalysisRequest {
    title: string
    subtitle?: string
    content: string
    excerpt?: string
    type: AnalysisType
    isPremium?: boolean
    ticker?: string
    sector?: string
    marketCap?: string
    targetPrice?: number
    recommendation?: string
    tags?: string[]
    status?: ContentStatus
}

export interface UpdateAnalysisRequest extends Partial<CreateAnalysisRequest> {
    id: string
}

export interface CreateSelectionRequest {
    title: string
    subtitle?: string
    content: string
    excerpt?: string
    type: SelectionType
    isPremium?: boolean
    tags?: string[]
    status?: ContentStatus
}

export interface UpdateSelectionRequest extends Partial<CreateSelectionRequest> {
    id: string
}

// Types pour les endpoints utilisateur
export interface UpdateUserRequest {
    name?: string
    email?: string
    avatar?: string
}

export interface UpdateUserPreferencesRequest {
    receiveDaily?: boolean
    receiveWeekly?: boolean
    receiveAnalyses?: boolean
    receiveSelections?: boolean
    receiveThematic?: boolean
    emailNotifications?: boolean
    marketingEmails?: boolean
    preferredSendTime?: string
    timezone?: string
    language?: string
}

export interface ChangePasswordRequest {
    currentPassword: string
    newPassword: string
}

// Types pour les endpoints d'abonnement
export interface CreateSubscriptionRequest {
    plan: SubscriptionPlan
    paymentMethodId?: string
}

export interface UpdateSubscriptionRequest {
    plan?: SubscriptionPlan
    cancelAtPeriodEnd?: boolean
}

// Types pour les endpoints d'email
export interface SendEmailRequest {
    to: string | string[]
    subject: string
    type: EmailType
    templateData?: Record<string, unknown>
    newsletterId?: string
}

// Types pour les endpoints admin
export interface CreateUserRequest {
    email: string
    password: string
    name?: string
    role?: Role
    isActive?: boolean
}

export interface UpdateUserByAdminRequest {
    name?: string
    email?: string
    role?: Role
    isActive?: boolean
    resetPassword?: boolean
}

export interface BulkActionRequest {
    ids: string[]
    action: 'delete' | 'archive' | 'publish' | 'activate' | 'deactivate'
}

// Types pour les uploads
export interface UploadRequest {
    file: File
    type: 'image' | 'document'
    folder?: string
}

export interface UploadResponse {
    url: string
    filename: string
    size: number
    type: string
}

// Types pour les analytics
export interface AnalyticsQuery {
    metric: string
    dateFrom: string
    dateTo: string
    groupBy?: 'day' | 'week' | 'month'
}

export interface AnalyticsData {
    date: string
    value: number
    metadata?: Record<string, unknown>
}

// Types pour les webhooks
export interface WebhookPayload {
    event: string
    data: Record<string, unknown>
    timestamp: string
    signature?: string
}

// Types pour la pagination
export interface PaginationQuery {
    page?: string
    limit?: string
    sort?: string
    order?: 'asc' | 'desc'
}

// Types pour les filtres de contenu
export interface ContentQuery extends PaginationQuery {
    type?: ContentType
    status?: ContentStatus
    isPremium?: string
    authorId?: string
    tags?: string
    search?: string
    dateFrom?: string
    dateTo?: string
}