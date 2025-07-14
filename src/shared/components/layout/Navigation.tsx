'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
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
        title: 'Bibliothèque',
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
        <nav className={cn('flex items-center space-x-6 lg:space-x-8 text-sm font-medium', className)}>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    onClick={onLinkClick}
                    className={cn(
                        'relative transition-colors hover:text-foreground pb-3 group whitespace-nowrap',
                        pathname === item.href ? 'text-foreground' : 'text-foreground/80'
                    )}
                >
                    {item.title}
                    {/* Ligne active pour la page courante */}
                    {pathname === item.href && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"></div>
                    )}
                    {/* Ligne au hover - seulement visible au hover */}
                    {pathname !== item.href && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                    )}
                </Link>
            ))}
        </nav>
    )
}