'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    User,
    Settings,
    CreditCard,
    Heart,
    FileText,
    LogOut
} from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { USER_ROUTES } from '@/shared/constants/routes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const menuItems = [
    {
        title: 'Mon compte',
        href: USER_ROUTES.DASHBOARD,
        icon: User,
    },
    {
        title: 'Préférences',
        href: USER_ROUTES.PREFERENCES,
        icon: Settings,
    },
    {
        title: 'Abonnement',
        href: USER_ROUTES.SUBSCRIPTION,
        icon: CreditCard,
    },
    {
        title: 'Mes favoris',
        href: USER_ROUTES.FAVORITES,
        icon: Heart,
    },
    {
        title: 'Historique',
        href: USER_ROUTES.READING_HISTORY,
        icon: FileText,
    },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }

    return (
        <Card>
            <CardContent className="p-4">
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}

                    <hr className="my-4" />

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={handleSignOut}
                    >
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </Button>
                </nav>
            </CardContent>
        </Card>
    )
}