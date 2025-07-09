import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSession } from '@/shared/lib/auth-instance'
import { prisma } from '@/shared/lib/prisma'
import { UserPreferences } from '@/features/user/components/UserPreferences'

export const metadata: Metadata = {
    title: 'Préférences',
    description: 'Gérez vos préférences de newsletter et notifications',
}

export default async function PreferencesPage() {
    const session = await getSession()

    if (!session?.user) {
        notFound()
    }

    // Récupérer les préférences utilisateur
    const preferences = await prisma.userPreferences.findUnique({
        where: { userId: session.user.id },
    })

    // Si pas de préférences, créer les préférences par défaut
    if (!preferences) {
        const newPreferences = await prisma.userPreferences.create({
            data: {
                userId: session.user.id,
                receiveDaily: true,
                receiveWeekly: true,
                receiveAnalyses: true,
                receiveSelections: true,
                receiveThematic: true,
                emailNotifications: true,
                marketingEmails: false,
                preferredSendTime: '08:00',
                timezone: 'Europe/Paris',
                language: 'fr',
            },
        })

        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Préférences</h1>
                    <p className="text-muted-foreground mt-2">
                        Personnalisez votre expérience et vos notifications
                    </p>
                </div>

                <UserPreferences preferences={newPreferences} />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Préférences</h1>
                <p className="text-muted-foreground mt-2">
                    Personnalisez votre expérience et vos notifications
                </p>
            </div>

            <UserPreferences preferences={preferences} />
        </div>
    )
}