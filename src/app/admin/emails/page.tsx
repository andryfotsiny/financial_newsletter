//src/app/admin/emails/page.tsx
import { Metadata } from 'next'
import { EmailManager } from '@/features/admin/components/EmailManager'

export const metadata: Metadata = {
    title: 'Gestion des emails - Administration',
    description: 'Gérer les emails, campagnes et templates',
}

export default async function EmailsAdminPage() {
    // Pour la production, on récupérerait les données via Prisma :
    /*
    const [logs, campaigns, templates] = await Promise.all([
        prisma.emailLog.findMany({
            orderBy: { sentAt: 'desc' },
            take: 100
        }),
        prisma.emailCampaign.findMany({
            orderBy: { createdAt: 'desc' }
        }),
        prisma.emailTemplate.findMany({
            orderBy: { name: 'asc' }
        })
    ])
    */

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Gestion des emails</h1>
                <p className="text-muted-foreground mt-2">
                    Gérez vos envois d&#39;emails, campagnes et templates
                </p>
            </div>

            <EmailManager />
        </div>
    )
}