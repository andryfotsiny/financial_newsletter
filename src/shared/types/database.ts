// Types générés depuis Prisma - utilisés dans toute l'application
// Ces types correspondent exactement au schema Prisma

export type Role = "USER" | "EDITOR" | "ADMIN"

export type SubscriptionPlan = "FREE" | "PREMIUM" | "ENTERPRISE"

export type SubscriptionStatus =
    | "ACTIVE"
    | "INACTIVE"
    | "CANCELLED"
    | "PAST_DUE"
    | "TRIALING"

export type NewsletterType = "DAILY" | "WEEKLY" | "SPECIAL"

export type AnalysisType =
    | "STOCK_ANALYSIS"
    | "FUND_ANALYSIS"
    | "THEMATIC_RESEARCH"
    | "MACRO_ANALYSIS"
    | "MARKET_RECAP"

export type SelectionType =
    | "STOCK_SELECTION"
    | "FUND_SELECTION"
    | "SECTOR_SELECTION"

export type ContentStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED"

export type ContentType = "NEWSLETTER" | "ANALYSIS" | "SELECTION"

export type RecommendationType =
    | "BUY"
    | "HOLD"
    | "SELL"
    | "STRONG_BUY"
    | "STRONG_SELL"

export type EmailType =
    | "NEWSLETTER"
    | "WELCOME"
    | "SUBSCRIPTION_CONFIRMATION"
    | "PASSWORD_RESET"
    | "MARKETING"

export type EmailStatus =
    | "PENDING"
    | "SENT"
    | "DELIVERED"
    | "OPENED"
    | "CLICKED"
    | "BOUNCED"
    | "FAILED"

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED"

export type MetricType =
    | "DAILY_USERS"
    | "NEWSLETTER_OPENS"
    | "NEWSLETTER_CLICKS"
    | "NEW_SUBSCRIPTIONS"
    | "CANCELLATIONS"
    | "REVENUE"
    | "CONTENT_VIEWS"

// Types pour les includes Prisma courants
export interface UserWithSubscription {
    id: string
    email: string
    name: string | null
    password: string
    role: Role
    avatar: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    subscription: {
        plan: SubscriptionPlan
        status: SubscriptionStatus
    } | null
}

export interface UserWithPreferences {
    id: string
    email: string
    name: string | null
    role: Role
    preferences: {
        receiveDaily: boolean
        receiveWeekly: boolean
        receiveAnalyses: boolean
        receiveSelections: boolean
        receiveThematic: boolean
        emailNotifications: boolean
        marketingEmails: boolean
        preferredSendTime: string
        timezone: string
        language: string
    } | null
}