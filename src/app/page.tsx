import Link from 'next/link'
import { ArrowRight, TrendingUp, FileText, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Newsletter Financière Premium
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Analyses approfondies, sélections d&apos;investissement et actualités des marchés
                        directement dans votre boîte mail.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href={PUBLIC_ROUTES.REGISTER}>
                                Commencer gratuitement
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href={PUBLIC_ROUTES.PREMIUM}>
                                Découvrir Premium
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Tout ce dont vous avez besoin pour investir
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card>
                            <CardHeader>
                                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                                <CardTitle>Analyses de marché</CardTitle>
                                <CardDescription>
                                    Analyses quotidiennes et hebdomadaires des marchés financiers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Récapitulatif quotidien</li>
                                    <li>• Analyse hebdomadaire approfondie</li>
                                    <li>• Indicateurs techniques</li>
                                    <li>• Perspectives macro-économiques</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <FileText className="h-10 w-10 text-primary mb-4" />
                                <CardTitle>Sélections d&apos;investissement</CardTitle>
                                <CardDescription>
                                    Nos meilleures idées d&apos;investissement, deux fois par semaine
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Sélection de titres</li>
                                    <li>• Analyse fondamentale</li>
                                    <li>• Prix cibles et recommandations</li>
                                    <li>• Suivi des performances</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Users className="h-10 w-10 text-primary mb-4" />
                                <CardTitle>Communauté exclusive</CardTitle>
                                <CardDescription>
                                    Rejoignez une communauté d&apos;investisseurs avertis
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>• Accès aux archives complètes</li>
                                    <li>• Contenu premium exclusif</li>
                                    <li>• Support prioritaire</li>
                                    <li>• Webinaires mensuels</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à prendre de meilleures décisions d&apos;investissement ?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Rejoignez des milliers d&apos;investisseurs qui font confiance à nos analyses.
                        Commencez avec notre offre gratuite dès aujourd&apos;hui.
                    </p>
                    <Button size="lg" asChild>
                        <Link href={PUBLIC_ROUTES.REGISTER}>
                            Créer mon compte gratuit
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}