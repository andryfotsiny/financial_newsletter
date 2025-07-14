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
        <nav className={cn('flex items-center text-sm font-medium', className)}>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    onClick={onLinkClick}
                    className={cn(
                        'relative transition-colors hover:text-foreground group',
                        pathname === item.href ? 'text-foreground' : 'text-foreground/80',
                        // Espacement adaptatif
                        className?.includes('flex-col')
                            ? 'py-3 px-4 rounded-lg hover:bg-muted/50 w-full text-left text-base'
                            : 'pb-3 px-3 xl:px-4'
                    )}
                >
                    {item.title}
                    {/* Ligne active/hover seulement pour la navigation horizontale */}
                    {!className?.includes('flex-col') && (
                        <>
                            {/* Ligne active pour la page courante */}
                            {pathname === item.href && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                            )}
                            {/* Ligne au hover - seulement visible au hover */}
                            {pathname !== item.href && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                            )}
                        </>
                    )}
                </Link>
            ))}
        </nav>
    )
}