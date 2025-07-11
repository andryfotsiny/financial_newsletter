//src/features/admin/components/AdminSidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    TrendingUp,
    Users,
    Settings,
    BarChart3,
    Mail,
    Tags,
    ArrowLeft,
    FolderOpen,
    Send
} from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/shared/constants/routes'
import { Button } from '@/components/ui/button'
import { APP_CONFIG } from '@/shared/lib/constants'
const menuItems = [
    {
        title: 'Dashboard',
        href: ADMIN_ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: 'Newsletters',
        href: ADMIN_ROUTES.NEWSLETTERS,
        icon: Mail,
    },
    {
        title: 'Analyses',
        href: ADMIN_ROUTES.ANALYSES,
        icon: TrendingUp,
    },
    {
        title: 'Sélections',
        href: ADMIN_ROUTES.SELECTIONS,
        icon: FolderOpen,
    },
    {
        title: 'Utilisateurs',
        href: ADMIN_ROUTES.USERS,
        icon: Users,
    },
    {
        title: 'Emails',
        href: '/admin/emails',
        icon: Send,
    },
    {
        title: 'Tags',
        href: '/admin/tags',
        icon: Tags,
    },
    {
        title: 'Analytics',
        href: ADMIN_ROUTES.ANALYTICS,
        icon: BarChart3,
    },
    {
        title: 'Paramètres',
        href: ADMIN_ROUTES.SETTINGS,
        icon: Settings,
    },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Administration</h2>
                <p className="text-sm text-muted-foreground">{APP_CONFIG.name}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href={PUBLIC_ROUTES.HOME}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour au site
                    </Link>
                </Button>
            </div>
        </div>
    )
}