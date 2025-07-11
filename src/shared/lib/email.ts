//src/shared/lib/email.ts
import nodemailer from 'nodemailer'

interface EmailConfig {
    host: string
    port: number
    secure: boolean
    auth: {
        user: string
        pass: string
    }
}

// Configuration email depuis les variables d'environnement
const emailConfig: EmailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
    }
}

// Créer le transporteur Nodemailer
export const emailTransporter = nodemailer.createTransport(emailConfig)

// Vérifier la configuration email
export async function verifyEmailConnection(): Promise<boolean> {
    try {
        await emailTransporter.verify()
        console.log('✅ Email server connection verified')
        return true
    } catch (error) {
        console.error('❌ Email server connection failed:', error)
        return false
    }
}

// Configuration par défaut pour les emails
export const EMAIL_DEFAULTS = {
    from: {
        name: process.env.EMAIL_FROM_NAME || 'Newsletter Financière',
        address: process.env.EMAIL_FROM_ADDRESS || 'newsletter@votre-domaine.com'
    },
    replyTo: process.env.EMAIL_REPLY_TO || 'contact@votre-domaine.com',
    charset: 'utf-8',
    encoding: 'base64'
}

// Types d'emails
export enum EmailType {
    WELCOME = 'welcome',
    NEWSLETTER_DAILY = 'newsletter_daily',
    NEWSLETTER_WEEKLY = 'newsletter_weekly',
    PASSWORD_RESET = 'password_reset',
    SUBSCRIPTION_CONFIRMATION = 'subscription_confirmation',
    SUBSCRIPTION_CANCELLED = 'subscription_cancelled',
    ADMIN_NOTIFICATION = 'admin_notification'
}

// Interface pour l'envoi d'email
export interface SendEmailOptions {
    to: string | string[]
    subject: string
    html: string
    text?: string
    attachments?: Array<{
        filename: string
        content: Buffer | string
        contentType?: string
    }>
    headers?: Record<string, string>
}

// Fonction principale d'envoi d'email
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
    try {
        const mailOptions = {
            from: `${EMAIL_DEFAULTS.from.name} <${EMAIL_DEFAULTS.from.address}>`,
            to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
            replyTo: EMAIL_DEFAULTS.replyTo,
            subject: options.subject,
            html: options.html,
            text: options.text || stripHtml(options.html),
            attachments: options.attachments,
            headers: {
                'X-Mailer': 'Newsletter Financière',
                'X-Priority': '3',
                ...options.headers
            }
        }

        const info = await emailTransporter.sendMail(mailOptions)
        console.log('✅ Email sent successfully:', info.messageId)
        return true
    } catch (error) {
        console.error('❌ Failed to send email:', error)
        return false
    }
}

// Fonction utilitaire pour enlever le HTML
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

// Fonction pour envoyer des emails en masse (avec rate limiting)
export async function sendBulkEmails(
    emails: Array<Omit<SendEmailOptions, 'to'> & { to: string }>,
    options: {
        batchSize?: number
        delayBetweenBatches?: number
    } = {}
): Promise<{ success: number; failed: number }> {
    const { batchSize = 50, delayBetweenBatches = 1000 } = options
    let success = 0
    let failed = 0

    // Traiter par lots pour éviter de surcharger le serveur SMTP
    for (let i = 0; i < emails.length; i += batchSize) {
        const batch = emails.slice(i, i + batchSize)

        const promises = batch.map(async (email) => {
            try {
                await sendEmail(email)
                return true
            } catch (error) {
                console.error(`Failed to send email to ${email.to}:`, error)
                return false
            }
        })

        const results = await Promise.allSettled(promises)
        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
                success++
            } else {
                failed++
            }
        })

        // Délai entre les lots
        if (i + batchSize < emails.length) {
            await new Promise(resolve => setTimeout(resolve, delayBetweenBatches))
        }
    }

    console.log(`📊 Bulk email results: ${success} success, ${failed} failed`)
    return { success, failed }
}