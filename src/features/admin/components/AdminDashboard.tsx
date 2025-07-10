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
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

interface AdminDashboardProps {
    stats: {
        totalUsers: number
        activeSubscriptions: number
        totalNewsletters: number
        totalAnalyses: number
        monthlyRevenue: number
        dailyActiveUsers: number
    }
}

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
                                        ? "text-green-600"
                                        : "text-red-600"
                                )}>
                                    {stat.change} par rapport au mois dernier
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Actions rapides */}
            <Card>
                <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button asChild>
                            <Link href={ADMIN_ROUTES.NEWSLETTER_CREATE}>
                                <Mail className="mr-2 h-4 w-4" />
                                Nouvelle newsletter
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={ADMIN_ROUTES.ANALYSIS_CREATE}>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Nouvelle analyse
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={ADMIN_ROUTES.USERS}>
                                <Users className="mr-2 h-4 w-4" />
                                Gérer utilisateurs
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={ADMIN_ROUTES.ANALYTICS}>
                                <Activity className="mr-2 h-4 w-4" />
                                Voir analytics
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

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

