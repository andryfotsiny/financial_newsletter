import { z } from 'zod'

// Enums
export const NewsletterType = {
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    SPECIAL: 'SPECIAL',
} as const

export const ContentStatus = {
    DRAFT: 'DRAFT',
    SCHEDULED: 'SCHEDULED',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
} as const

// Types
export type NewsletterType = typeof NewsletterType[keyof typeof NewsletterType]
export type ContentStatus = typeof ContentStatus[keyof typeof ContentStatus]

export const createNewsletterSchema = z.object({
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
    subtitle: z.string().optional(),
    content: z.string().min(10, 'Le contenu doit contenir au moins 10 caractères'),
    excerpt: z.string().max(500, 'L\'extrait ne doit pas dépasser 500 caractères').optional(),
    type: z.enum(['DAILY', 'WEEKLY', 'SPECIAL']),
    isPremium: z.boolean(),
    status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']),
    scheduledFor: z.string().datetime().optional(),
})


export const updateNewsletterSchema = createNewsletterSchema.partial()

// Types inférés
export type CreateNewsletterInput = z.infer<typeof createNewsletterSchema>
export type UpdateNewsletterInput = z.infer<typeof updateNewsletterSchema>

// Type Newsletter complet
export interface Newsletter {
    id: string
    title: string
    subtitle: string | null
    content: string
    excerpt: string | null
    type: NewsletterType
    status: ContentStatus
    isPremium: boolean
    slug: string
    seoTitle: string | null
    seoDescription: string | null
    scheduledFor: Date | null
    publishedAt: Date | null
    authorId: string
    authorName: string | null
    createdAt: Date
    updatedAt: Date
}

export interface Tag {
    id: string
    name: string
    slug: string
    color: string
}

// Type pour la liste
export interface NewsletterListItem {
    id: string
    title: string
    type: NewsletterType
    status: ContentStatus
    isPremium: boolean
    publishedAt: Date | null
    scheduledFor: Date | null
    authorName: string | null
}

// Filtres
export interface NewsletterFilters {
    type?: NewsletterType
    status?: ContentStatus
    isPremium?: boolean
    search?: string
    dateFrom?: Date
    dateTo?: Date
}

// Helpers
export const getNewsletterTypeLabel = (type: NewsletterType): string => {
    const labels: Record<NewsletterType, string> = {
        DAILY: 'Quotidienne',
        WEEKLY: 'Hebdomadaire',
        SPECIAL: 'Spéciale',
    }
    return labels[type]
}

export const getStatusLabel = (status: ContentStatus): string => {
    const labels: Record<ContentStatus, string> = {
        DRAFT: 'Brouillon',
        SCHEDULED: 'Programmée',
        PUBLISHED: 'Publiée',
        ARCHIVED: 'Archivée',
    }
    return labels[status]
}

export const getStatusColor = (status: ContentStatus): string => {
    const colors: Record<ContentStatus, string> = {
        DRAFT: 'gray',
        SCHEDULED: 'blue',
        PUBLISHED: 'green',
        ARCHIVED: 'orange',
    }
    return colors[status]
}