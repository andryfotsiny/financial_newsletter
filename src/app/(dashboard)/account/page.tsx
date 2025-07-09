import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSession } from '@/shared/lib/auth-instance'
import { prisma } from '@/shared/lib/prisma'
import { UserProfile } from '@/features/user/components/UserProfile'
import { UserStats } from '@/features/user/components/UserStats'
import { RecentActivity } from '@/features/user/components/RecentActivity'

export const metadata: Metadata = {
    title: 'Mon compte',
    description: 'Gérez votre compte et vos informations personnelles',
}

export default async function AccountPage() {
    const session = await getSession()

    if (!session?.user) {
        notFound()
    }

    // Récupérer les données utilisateur complètes
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            subscription: true,
            preferences: true,
            _count: {
                select: {
                    readHistory: true,
                    favorites: true,
                }
            }
        }
    })

    if (!user) {
        notFound()
    }

    // Récupérer les statistiques
    const stats = {
        articlesLus: user._count.readHistory,
        favoris: user._count.favorites,
        abonnementActif: user.subscription?.status === 'ACTIVE',
        plan: user.subscription?.plan || 'FREE',
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Mon compte</h1>
                <p className="text-muted-foreground mt-2">
                    Gérez vos informations personnelles et vos préférences
                </p>
            </div>

            {/* Statistiques */}
            <UserStats stats={stats} />

            {/* Profil utilisateur */}
            <UserProfile user={user} />

            {/* Activité récente */}
            <RecentActivity userId={user.id} />
        </div>
    )
}