import { BookOpen, Heart, CreditCard, TrendingUp } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface UserStatsProps {
    stats: {
        articlesLus: number
        favoris: number
        abonnementActif: boolean
        plan: string
    }
}

export function UserStats({ stats }: UserStatsProps) {
    const statCards = [
        {
            title: 'Articles lus',
            value: stats.articlesLus,
            icon: BookOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Favoris',
            value: stats.favoris,
            icon: Heart,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
        {
            title: 'Abonnement',
            value: stats.plan === 'PREMIUM' ? 'Premium' :
                stats.plan === 'ENTERPRISE' ? 'Entreprise' : 'Gratuit',
            icon: CreditCard,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Statut',
            value: stats.abonnementActif ? 'Actif' : 'Inactif',
            icon: TrendingUp,
            color: stats.abonnementActif ? 'text-green-600' : 'text-gray-600',
            bgColor: stats.abonnementActif ? 'bg-green-50' : 'bg-gray-50',
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => {
                const Icon = stat.icon

                return (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold mt-1">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}