//src/app/admin/settings/page.tsx
import { Metadata } from 'next'
import { SettingsPanel } from '@/features/admin/components/SettingsPanel'

export const metadata: Metadata = {
    title: 'Paramètres - Administration',
    description: 'Configurez les paramètres globaux de votre newsletter',
}

// Données statiques pour les paramètres
const staticSettings = {
    general: {
        siteName: 'Newsletter Financière Pro',
        siteDescription: 'Votre newsletter financière de référence avec analyses exclusives et recommandations d\'investissement',
        contactEmail: 'contact@newsletter-finance.com',
        timezone: 'Europe/Paris',
        language: 'fr'
    },
    email: {
        fromName: 'Newsletter Financière',
        fromEmail: 'newsletter@newsletter-finance.com',
        replyTo: 'contact@newsletter-finance.com',
        smtpHost: 'smtp.newsletter-finance.com',
        smtpPort: '587',
        smtpUser: 'newsletter@newsletter-finance.com',
        dailyTime: '08:00',
        weeklyDay: 'saturday',
        weeklyTime: '09:00'
    },
    subscription: {
        premiumPrice: '19.99',
        enterprisePrice: '99.99',
        currency: 'EUR',
        trialDays: '7',
        allowCancellation: true,
        promoEnabled: true,
        promoCode: 'WELCOME20',
        promoDiscount: '20'
    },
    content: {
        autoPublish: false,
        requireApproval: true,
        allowComments: false,
        moderateComments: true,
        archiveAfterDays: '365'
    },
    security: {
        twoFactorRequired: true,
        passwordMinLength: '8',
        sessionTimeout: '60',
        ipWhitelist: '192.168.1.0/24\n10.0.0.0/8',
        rateLimitEnabled: true
    },
    notifications: {
        emailOnNewUser: true,
        emailOnSubscription: true,
        emailOnCancellation: true,
        emailOnError: true,
        slackWebhook: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'
    }
}

export default async function SettingsAdminPage() {
    // Pour la production, on récupérerait les paramètres via Prisma :
    /*
    const settings = await prisma.siteSettings.findMany({
        select: {
            key: true,
            value: true,
            category: true
        }
    })

    // Transformer en objet structuré
    const structuredSettings = settings.reduce((acc, setting) => {
        if (!acc[setting.category]) {
            acc[setting.category] = {}
        }
        acc[setting.category][setting.key] = setting.value
        return acc
    }, {} as any)
    */

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Paramètres</h1>
                <p className="text-muted-foreground mt-2">
                    Configurez les paramètres globaux de votre newsletter et gérez les options avancées
                </p>
            </div>

            <SettingsPanel settings={staticSettings} />
        </div>
    )
}