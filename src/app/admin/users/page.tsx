//src/app/admin/users/page.tsx
import { Metadata } from 'next'
import { UserManager } from '@/features/admin/components/UserManager'

export const metadata: Metadata = {
    title: 'Gestion des utilisateurs - Administration',
    description: 'Gérer les utilisateurs et leurs permissions',
}

// Données statiques pour les utilisateurs
const staticUsers = [
    {
        id: '1',
        email: 'admin@newsletter.com',
        name: 'Jean Dupont',
        avatar: undefined,
        role: 'ADMIN' as const,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        lastLoginAt: new Date('2024-12-15T09:30:00'),
        subscription: {
            plan: 'ENTERPRISE' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 245,
            favoriteCount: 32,
            subscriptionDays: 334
        }
    },
    {
        id: '2',
        email: 'marie.martin@finance.com',
        name: 'Marie Martin',
        avatar: undefined,
        role: 'EDITOR' as const,
        isActive: true,
        createdAt: new Date('2024-02-20'),
        lastLoginAt: new Date('2024-12-14T16:45:00'),
        subscription: {
            plan: 'PREMIUM' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 189,
            favoriteCount: 28,
            subscriptionDays: 298
        }
    },
    {
        id: '3',
        email: 'pierre.dubois@investment.fr',
        name: 'Pierre Dubois',
        avatar: undefined,
        role: 'USER' as const,
        isActive: true,
        createdAt: new Date('2024-03-10'),
        lastLoginAt: new Date('2024-12-15T08:15:00'),
        subscription: {
            plan: 'PREMIUM' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 156,
            favoriteCount: 45,
            subscriptionDays: 280
        }
    },
    {
        id: '4',
        email: 'sophie.chen@trading.com',
        name: 'Sophie Chen',
        avatar: undefined,
        role: 'USER' as const,
        isActive: true,
        createdAt: new Date('2024-05-18'),
        lastLoginAt: new Date('2024-12-13T19:20:00'),
        subscription: {
            plan: 'FREE' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 89,
            favoriteCount: 12,
            subscriptionDays: 0
        }
    },
    {
        id: '5',
        email: 'thomas.bernard@energy.eu',
        name: 'Thomas Bernard',
        avatar: undefined,
        role: 'EDITOR' as const,
        isActive: true,
        createdAt: new Date('2024-04-12'),
        lastLoginAt: new Date('2024-12-14T11:30:00'),
        subscription: {
            plan: 'PREMIUM' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 203,
            favoriteCount: 38,
            subscriptionDays: 247
        }
    },
    {
        id: '6',
        email: 'antoine.moreau@gmail.com',
        name: 'Antoine Moreau',
        avatar: undefined,
        role: 'USER' as const,
        isActive: false,
        createdAt: new Date('2024-06-25'),
        lastLoginAt: new Date('2024-11-15T14:45:00'),
        subscription: {
            plan: 'FREE' as const,
            status: 'INACTIVE' as const
        },
        stats: {
            articlesRead: 23,
            favoriteCount: 3,
            subscriptionDays: 0
        }
    },
    {
        id: '7',
        email: 'isabelle.durand@tech.com',
        name: 'Isabelle Durand',
        avatar: undefined,
        role: 'USER' as const,
        isActive: true,
        createdAt: new Date('2024-07-08'),
        lastLoginAt: new Date('2024-12-15T07:20:00'),
        subscription: {
            plan: 'ENTERPRISE' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 134,
            favoriteCount: 22,
            subscriptionDays: 160
        }
    },
    {
        id: '8',
        email: 'claire.vidal@biotech.fr',
        name: 'Dr. Claire Vidal',
        avatar: undefined,
        role: 'USER' as const,
        isActive: true,
        createdAt: new Date('2024-08-14'),
        lastLoginAt: new Date('2024-12-12T13:10:00'),
        subscription: {
            plan: 'PREMIUM' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 98,
            favoriteCount: 19,
            subscriptionDays: 123
        }
    },
    {
        id: '9',
        email: 'lucas.petit@startup.io',
        name: undefined,
        avatar: undefined,
        role: 'USER' as const,
        isActive: true,
        createdAt: new Date('2024-09-22'),
        lastLoginAt: new Date('2024-12-14T21:35:00'),
        subscription: {
            plan: 'FREE' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 45,
            favoriteCount: 8,
            subscriptionDays: 0
        }
    },
    {
        id: '10',
        email: 'sarah.lemoine@consulting.com',
        name: 'Sarah Lemoine',
        avatar: undefined,
        role: 'USER' as const,
        isActive: true,
        createdAt: new Date('2024-10-05'),
        lastLoginAt: new Date('2024-12-15T10:15:00'),
        subscription: {
            plan: 'PREMIUM' as const,
            status: 'ACTIVE' as const
        },
        stats: {
            articlesRead: 67,
            favoriteCount: 14,
            subscriptionDays: 71
        }
    }
]

export default async function UsersAdminPage() {
    // Pour la production, on récupérerait les données via Prisma :
    /*
    const users = await prisma.user.findMany({
        include: {
            subscription: true,
            _count: {
                select: {
                    readHistory: true,
                    favorites: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    const usersWithStats = users.map(user => ({
        ...user,
        stats: {
            articlesRead: user._count.readHistory,
            favoriteCount: user._count.favorites,
            subscriptionDays: user.subscription
                ? Math.floor((Date.now() - user.subscription.createdAt.getTime()) / (1000 * 60 * 60 * 24))
                : 0
        }
    }))
    */

    // Calculer les statistiques globales
    const stats = {
        total: staticUsers.length,
        active: staticUsers.filter(u => u.isActive).length,
        premium: staticUsers.filter(u => u.subscription?.plan !== 'FREE').length,
        newThisMonth: staticUsers.filter(u => {
            const monthAgo = new Date()
            monthAgo.setMonth(monthAgo.getMonth() - 1)
            return u.createdAt >= monthAgo
        }).length
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
                <p className="text-muted-foreground mt-2">
                    Gérez les utilisateurs, leurs rôles et leurs abonnements
                </p>
            </div>

            {/* Statistiques globales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className=" p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total utilisateurs
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                                {stats.total}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-100">
                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className=" p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Utilisateurs actifs
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                                {stats.active}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className=" p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Abonnés Premium
                            </p>
                            <p className="text-2xl font-bold text-purple-600">
                                {stats.premium}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-purple-100">
                            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className=" p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Nouveaux ce mois
                            </p>
                            <p className="text-2xl font-bold text-orange-600">
                                {stats.newThisMonth}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-orange-100">
                            <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gestionnaire d'utilisateurs */}
            <UserManager users={staticUsers} />
        </div>
    )
}