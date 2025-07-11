//src/features/email/types/email.types.ts
export interface EmailTemplate {
    id: string
    name: string
    subject: string
    html: string
    text?: string
    variables: string[]
    type: EmailType
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface EmailLog {
    id: string
    userId?: string
    email: string
    subject: string
    type: EmailType
    status: EmailStatus
    sentAt?: Date
    openedAt?: Date
    clickedAt?: Date
    errorMessage?: string
    templateId?: string
    variables?: Record<string, unknown>
    createdAt: Date
}

export interface EmailCampaign {
    id: string
    name: string
    subject: string
    templateId: string
    status: CampaignStatus
    scheduledFor?: Date
    sentAt?: Date
    targetAudience: {
        type: 'all' | 'premium' | 'free' | 'custom'
        userIds?: string[]
        filters?: {
            plan?: string[]
            isActive?: boolean
            createdAfter?: Date
            createdBefore?: Date
        }
    }
    stats: {
        totalSent: number
        totalOpened: number
        totalClicked: number
        totalBounced: number
        totalUnsubscribed: number
    }
    createdAt: Date
    updatedAt: Date
}

export enum EmailType {
    WELCOME = 'welcome',
    NEWSLETTER_DAILY = 'newsletter_daily',
    NEWSLETTER_WEEKLY = 'newsletter_weekly',
    PASSWORD_RESET = 'password_reset',
    SUBSCRIPTION_CONFIRMATION = 'subscription_confirmation',
    SUBSCRIPTION_CANCELLED = 'subscription_cancelled',
    ADMIN_NOTIFICATION = 'admin_notification',
    MARKETING = 'marketing',
    TRANSACTIONAL = 'transactional'
}

export enum EmailStatus {
    PENDING = 'pending',
    SENT = 'sent',
    DELIVERED = 'delivered',
    OPENED = 'opened',
    CLICKED = 'clicked',
    BOUNCED = 'bounced',
    FAILED = 'failed',
    UNSUBSCRIBED = 'unsubscribed'
}

export enum CampaignStatus {
    DRAFT = 'draft',
    SCHEDULED = 'scheduled',
    SENDING = 'sending',
    SENT = 'sent',
    PAUSED = 'paused',
    CANCELLED = 'cancelled'
}

export interface EmailVariables {
    // Variables utilisateur
    userName?: string
    userEmail?: string
    userFirstName?: string

    // Variables d'abonnement
    planName?: string
    subscriptionDate?: string
    nextBillingDate?: string

    // Variables de contenu
    newsletterTitle?: string
    newsletterContent?: string
    analysisTitle?: string
    selectionTitle?: string

    // Variables système
    siteName?: string
    siteUrl?: string
    unsubscribeUrl?: string
    loginUrl?: string
    supportEmail?: string

    // Variables dynamiques
    [key: string]: unknown
}

export interface NewsletterEmailData {
    newsletter: {
        id: string
        title: string
        subtitle?: string
        content: string
        excerpt?: string
        type: string
        publishedAt: Date
        authorName?: string
        slug: string
    }
    user: {
        id: string
        email: string
        name?: string
        preferences: {
            receiveDaily: boolean
            receiveWeekly: boolean
            receiveAnalyses: boolean
        }
    }
    unsubscribeToken: string
}

export interface WelcomeEmailData {
    user: {
        id: string
        email: string
        name?: string
    }
    verificationToken?: string
    loginUrl: string
    supportEmail: string
}

export interface PasswordResetEmailData {
    user: {
        email: string
        name?: string
    }
    resetToken: string
    resetUrl: string
    expiresAt: Date
}

export interface SubscriptionEmailData {
    user: {
        email: string
        name?: string
    }
    subscription: {
        plan: string
        amount: number
        currency: string
        nextBillingDate?: Date
        cancelledAt?: Date
    }
    invoiceUrl?: string
}

// Fonction utilitaire pour valider une adresse email
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Fonction pour extraire les variables d'un template
export function extractTemplateVariables(template: string): string[] {
    const variableRegex = /\{\{([^}]+)\}\}/g
    const variables: string[] = []
    let match

    while ((match = variableRegex.exec(template)) !== null) {
        const variable = match[1].trim()
        if (!variables.includes(variable)) {
            variables.push(variable)
        }
    }

    return variables
}

// Fonction pour remplacer les variables dans un template
export function replaceTemplateVariables(
    template: string,
    variables: EmailVariables
): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
        const key = variable.trim()
        return variables[key] !== undefined ? String(variables[key]) : match
    })
}