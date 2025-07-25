import {
    Users,
    FileText,
    TrendingUp,
    Mail,
    DollarSign,
    Activity
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/shared/lib/prisma'
import { cn } from '@/shared/lib/utils'

// import { ADMIN_ROUTES } from '@/shared/constants/routes'



export async function AdminDashboard() {
    // Récupérer les statistiques
    const [
        totalUsers,
        activeSubscriptions,
        totalNewsletters,
        totalAnalyses,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.subscription.count({ where: { status: 'ACTIVE' } }),
        prisma.newsletter.count({ where: { status: 'PUBLISHED' } }),
        prisma.analysis.count({ where: { status: 'PUBLISHED' } }),
    ])

    const stats = {
        totalUsers,
        activeSubscriptions,
        totalNewsletters,
        totalAnalyses,
        monthlyRevenue: activeSubscriptions * 19.99, // Calcul simplifié
        dailyActiveUsers: Math.floor(totalUsers * 0.3), // Estimation
    }

    const statCards = [
        {
            title: 'Utilisateurs totaux',
            value: stats.totalUsers.toLocaleString('fr-FR'),
            icon: Users,
            change: '+12%',
            changeType: 'positive' as const,
        },
        {
            title: 'Abonnements actifs',
            value: stats.activeSubscriptions.toLocaleString('fr-FR'),
            icon: Activity,
            change: '+8%',
            changeType: 'positive' as const,
        },
        {
            title: 'Newsletters publiées',
            value: stats.totalNewsletters.toLocaleString('fr-FR'),
            icon: Mail,
            change: '+23%',
            changeType: 'positive' as const,
        },
        {
            title: 'Analyses publiées',
            value: stats.totalAnalyses.toLocaleString('fr-FR'),
            icon: TrendingUp,
            change: '+15%',
            changeType: 'positive' as const,
        },
        {
            title: 'Revenus mensuels',
            value: new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
            }).format(stats.monthlyRevenue),
            icon: DollarSign,
            change: '+18%',
            changeType: 'positive' as const,
        },
        {
            title: 'Utilisateurs actifs/jour',
            value: stats.dailyActiveUsers.toLocaleString('fr-FR'),
            icon: FileText,
            change: '-5%',
            changeType: 'negative' as const,
        },
    ]

    return (
        <div className="space-y-8">
            {/* Statistiques */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((stat) => {
                    const Icon = stat.icon

                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className={cn(
                                    "text-xs mt-1",
                                    stat.changeType === 'positive'
                                        ? "text-white"
                                        : "text-red-600"
                                )}>
                                    {stat.change} par rapport au mois dernier
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Activité récente */}
            <Card>
                <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Les dernières actions apparaîtront ici
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

