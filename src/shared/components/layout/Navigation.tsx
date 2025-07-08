'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

interface NavigationProps {
    className?: string
    onLinkClick?: () => void
}

const navItems = [
    {
        title: 'Accueil',
        href: PUBLIC_ROUTES.HOME,
    },
    {
        title: 'Archives',
        href: PUBLIC_ROUTES.ARCHIVES,
    },
    {
        title: 'Premium',
        href: PUBLIC_ROUTES.PREMIUM,
    },
    {
        title: 'À propos',
        href: PUBLIC_ROUTES.ABOUT,
    },
    {
        title: 'Avis',
        href: PUBLIC_ROUTES.REVIEWS,
    },
]

export function Navigation({ className, onLinkClick }: NavigationProps) {
    const pathname = usePathname()

    return (
        <nav className={cn('flex items-center space-x-6 text-sm font-medium', className)}>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    onClick={onLinkClick}
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}