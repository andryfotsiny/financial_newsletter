import Link from 'next/link'
import { Mail, Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { APP_CONFIG } from '@/shared/lib/constants'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* À propos */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">{APP_CONFIG.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            Newsletter financière premium avec analyses d&apos;investissement
                            et actualités des marchés.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href={PUBLIC_ROUTES.HOME}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={PUBLIC_ROUTES.ARCHIVES}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Archives
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={PUBLIC_ROUTES.PREMIUM}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Premium
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={PUBLIC_ROUTES.ABOUT}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    À propos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Légal */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Légal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Conditions d&apos;utilisation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Politique de confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Contact</h4>
                        <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                <a href={`mailto:${APP_CONFIG.email.contact}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contact
                                </a>
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                <Link href={PUBLIC_ROUTES.DONATIONS}>
                                    <Heart className="mr-2 h-4 w-4" />
                                    Faire un don
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>
                        © {currentYear} {APP_CONFIG.name}. Tous droits réservés.
                    </p>
                    <p className="text-xs">
                        Les informations fournies ne constituent pas des conseils en investissement.
                    </p>
                </div>
            </div>
        </footer>
    )
}