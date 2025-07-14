import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { APP_CONFIG } from '@/shared/lib/constants'

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header simple */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href={PUBLIC_ROUTES.HOME} className="flex items-center space-x-2">
                            <span className="text-xl font-bold">{APP_CONFIG.name}</span>
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <Link href={PUBLIC_ROUTES.HOME}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour à l&apos;accueil
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>

            {/* Footer simple */}
            <footer className="border-t py-6">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {APP_CONFIG.name}. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    )
}