'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
    Check,
    X,
    Zap,
    Shield,
    TrendingUp,
    BarChart3,
    FileText,
    Users,
    Mail,
    Sparkles,
    Crown,
    Building,
    Quote,
    Clock,
    ChevronRight,
    Star,
    Award,
    Globe
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { PUBLIC_ROUTES, USER_ROUTES } from '@/shared/constants/routes'

// Données statiques pour les fonctionnalités
const featuresData = [
    {
        icon: Mail,
        title: "Newsletter quotidienne",
        description: "Recevez chaque matin l'essentiel de l'actualité financière",
        free: true,
        premium: true,
        enterprise: true
    },
    {
        icon: FileText,
        title: "Newsletter hebdomadaire",
        description: "Analyse approfondie des marchés chaque samedi",
        free: true,
        premium: true,
        enterprise: true
    },
    {
        icon: TrendingUp,
        title: "Analyses exclusives",
        description: "Accès à nos analyses d'actions et recommandations",
        free: false,
        premium: true,
        enterprise: true
    },
    {
        icon: BarChart3,
        title: "Sélections d'investissement",
        description: "Nos meilleures idées d'investissement deux fois par semaine",
        free: false,
        premium: true,
        enterprise: true
    },
    {
        icon: Clock,
        title: "Accès aux archives",
        description: "Consultez l'historique complet de nos publications",
        free: "3 mois",
        premium: "Illimité",
        enterprise: "Illimité"
    },
    {
        icon: Zap,
        title: "Alertes en temps réel",
        description: "Notifications instantanées sur les mouvements de marché",
        free: false,
        premium: true,
        enterprise: true
    },
    {
        icon: Users,
        title: "Accès multi-utilisateurs",
        description: "Partagez l'abonnement avec votre équipe",
        free: false,
        premium: false,
        enterprise: "5 utilisateurs"
    },
    {
        icon: Shield,
        title: "Support prioritaire",
        description: "Assistance dédiée et réponse sous 24h",
        free: false,
        premium: true,
        enterprise: "Account manager"
    }
]

// Données pour les témoignages
const testimonialsData = [
    {
        name: "Marie Lambert",
        role: "Directrice Financière",
        company: "Tech Solutions SA",
        content: "Les analyses sont d'une qualité exceptionnelle. Nous avons amélioré notre performance de 35% grâce aux recommandations.",
        plan: "ENTERPRISE",
        rating: 5
    },
    {
        name: "Jean-Paul Martin",
        role: "Investisseur indépendant",
        company: null,
        content: "Un excellent rapport qualité-prix. Les sélections d'investissement sont particulièrement pertinentes.",
        plan: "PREMIUM",
        rating: 5
    },
    {
        name: "Sophie Chen",
        role: "Analyste",
        company: "Banque Privée",
        content: "La réactivité et la précision des analyses nous permettent de prendre des décisions éclairées rapidement.",
        plan: "ENTERPRISE",
        rating: 5
    },
    {
        name: "Marc Dubois",
        role: "Trader indépendant",
        company: null,
        content: "Interface claire et analyses pointues. Mes performances se sont nettement améliorées depuis que je suis abonné.",
        plan: "PREMIUM",
        rating: 5
    }
]

// Avantages additionnels pour la sidebar
const additionalBenefits = [
    {
        icon: Award,
        title: "87% de taux de réussite",
        description: "Sur nos recommandations 2024"
    },
    {
        icon: Users,
        title: "15,000+ investisseurs",
        description: "Nous font déjà confiance"
    },
    {
        icon: Shield,
        title: "Données sécurisées",
        description: "Certification GDPR complète"
    },
    {
        icon: Globe,
        title: "Sources mondiales",
        description: "Bloomberg, FactSet, Reuters"
    }
]

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export default function PremiumPage() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
    const isYearly = billingPeriod === 'yearly'

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        className="text-center space-y-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Badge variant="outline" className="mb-4">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Offres Premium
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Investissez avec
                            <span className="text-primary"> confiance</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Accédez à des analyses professionnelles et des recommandations
                            d&#39;investissement qui ont fait leurs preuves.
                            Rejoignez plus de 15 000 investisseurs satisfaits.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Toggle facturation */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Label htmlFor="billing-toggle" className={!isYearly ? 'font-semibold' : ''}>
                            Mensuel
                        </Label>
                        <Switch
                            id="billing-toggle"
                            checked={isYearly}
                            onCheckedChange={(checked) => setBillingPeriod(checked ? 'yearly' : 'monthly')}
                        />
                        <Label htmlFor="billing-toggle" className={isYearly ? 'font-semibold' : ''}>
                            Annuel
                            <Badge variant="secondary" className="ml-2">-20%</Badge>
                        </Label>
                    </motion.div>
                </div>
            </section>

            {/* Section principale avec layout Les Échos */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Ligne de séparation verticale */}
                        <div className="hidden lg:block absolute left-3/4 top-0 w-px bg-border/40 h-full ml-4"></div>

                        {/* Colonne principale - Plans de tarification */}
                        <div className="lg:col-span-3 space-y-8">
                            <motion.div
                                className="grid md:grid-cols-3 gap-8"
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                            >
                                {/* Plan Gratuit */}
                                <motion.div variants={fadeInUp}>
                                    <Card className="relative h-full hover:shadow-xl transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge variant="secondary">Gratuit</Badge>
                                            </div>
                                            <CardTitle className="text-2xl">Essentiel</CardTitle>
                                            <CardDescription>
                                                Parfait pour découvrir nos services
                                            </CardDescription>
                                            <div className="mt-4">
                                                <span className="text-4xl font-bold">0€</span>
                                                <span className="text-muted-foreground">/mois</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <Button className="w-full mb-6" variant="outline" asChild>
                                                <Link href={PUBLIC_ROUTES.REGISTER}>
                                                    Commencer gratuitement
                                                </Link>
                                            </Button>
                                            <div className="space-y-3">
                                                {featuresData.slice(0, 6).map((feature, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        {feature.free ? (
                                                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                        ) : (
                                                            <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                                        )}
                                                        <div className="flex-1">
                                                            <p className={`text-sm ${!feature.free ? 'text-muted-foreground' : ''}`}>
                                                                {feature.title}
                                                            </p>
                                                            {typeof feature.free === 'string' && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {feature.free}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Plan Premium - Mis en avant */}
                                <motion.div variants={fadeInUp}>
                                    <Card className="relative h-full border-primary shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <Badge className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500">
                                                <Crown className="w-3 h-3 mr-1" />
                                                Plus populaire
                                            </Badge>
                                        </div>
                                        <CardHeader className="pt-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge>Premium</Badge>
                                            </div>
                                            <CardTitle className="text-2xl">Professionnel</CardTitle>
                                            <CardDescription>
                                                Pour les investisseurs sérieux
                                            </CardDescription>
                                            <div className="mt-4">
                                                <span className="text-4xl font-bold">
                                                    {isYearly ? '23,99€' : '29,99€'}
                                                </span>
                                                <span className="text-muted-foreground">/mois</span>
                                                {isYearly && (
                                                    <p className="text-sm text-green-600 mt-1">
                                                        Économisez 72€/an
                                                    </p>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <Button className="w-full mb-6" asChild>
                                                <Link href={USER_ROUTES.SUBSCRIPTION}>
                                                    Commencer l&#39;essai gratuit
                                                </Link>
                                            </Button>
                                            <div className="space-y-3">
                                                {featuresData.slice(0, 6).map((feature, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        {feature.premium ? (
                                                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                        ) : (
                                                            <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                                        )}
                                                        <div className="flex-1">
                                                            <p className={`text-sm ${!feature.premium ? 'text-muted-foreground' : ''}`}>
                                                                {feature.title}
                                                            </p>
                                                            {typeof feature.premium === 'string' && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {feature.premium}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Plan Enterprise */}
                                <motion.div variants={fadeInUp}>
                                    <Card className="relative h-full hover:shadow-xl transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge variant="outline">
                                                    <Building className="w-3 h-3 mr-1" />
                                                    Entreprise
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-2xl">Enterprise</CardTitle>
                                            <CardDescription>
                                                Solutions sur mesure pour les équipes
                                            </CardDescription>
                                            <div className="mt-4">
                                                <span className="text-4xl font-bold">Sur devis</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <Button className="w-full mb-6" variant="outline" asChild>
                                                <Link href="/contact">
                                                    Nous contacter
                                                </Link>
                                            </Button>
                                            <div className="space-y-3">
                                                {featuresData.slice(0, 6).map((feature, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <p className="text-sm">
                                                                {feature.title}
                                                            </p>
                                                            {typeof feature.enterprise === 'string' && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {feature.enterprise}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </motion.div>

                            {/* Fonctionnalités détaillées */}
                            <div className="space-y-6 mt-12">
                                <h2 className="text-2xl font-bold text-foreground">Fonctionnalités complètes</h2>

                                <div className="space-y-4">
                                    {featuresData.map((feature, index) => (
                                        <div key={index} className="border-b border-border/50 pb-4 last:border-b-0">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <feature.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>

                                                    <div className="grid grid-cols-3 gap-4 text-xs">
                                                        <div className="text-center">
                                                            <div className="font-medium mb-1">Gratuit</div>
                                                            {feature.free ? (
                                                                typeof feature.free === 'string' ? (
                                                                    <span className="text-muted-foreground">{feature.free}</span>
                                                                ) : (
                                                                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                                                                )
                                                            ) : (
                                                                <X className="h-4 w-4 text-muted-foreground mx-auto" />
                                                            )}
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="font-medium mb-1">Premium</div>
                                                            {feature.premium ? (
                                                                typeof feature.premium === 'string' ? (
                                                                    <span className="text-muted-foreground">{feature.premium}</span>
                                                                ) : (
                                                                    <Check className="h-4 w-4 text-green-500 mx-auto" />
                                                                )
                                                            ) : (
                                                                <X className="h-4 w-4 text-muted-foreground mx-auto" />
                                                            )}
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="font-medium mb-1">Enterprise</div>
                                                            {typeof feature.enterprise === 'string' ? (
                                                                <span className="text-muted-foreground">{feature.enterprise}</span>
                                                            ) : (
                                                                <Check className="h-4 w-4 text-green-500 mx-auto" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="sticky top-24">
                                {/* Avantages */}
                                <div className="space-y-4 mb-6">
                                    <h3 className="text-lg font-semibold text-foreground">Pourquoi nous choisir ?</h3>

                                    {additionalBenefits.map((benefit, index) => (
                                        <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <benefit.icon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm mb-1">{benefit.title}</h4>
                                                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Témoignages condensés */}
                                <div className="border-t border-border/40 pt-6">
                                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                        <Quote className="h-4 w-4" />
                                        Ils nous recommandent
                                    </h3>

                                    <div className="space-y-4">
                                        {testimonialsData.slice(0, 2).map((testimonial, index) => (
                                            <div key={index} className="border-l-2 border-primary/20 pl-3 py-2">
                                                <p className="text-xs text-muted-foreground italic mb-2">
                                                    &#34;{testimonial.content.slice(0, 80)}...&#34;
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs font-medium">{testimonial.name}</p>
                                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="border-t border-border/40 pt-6">
                                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
                                        <h3 className="text-sm font-semibold text-foreground mb-2">
                                            Commencez aujourd&#39;hui
                                        </h3>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            7 jours d&#39;essai gratuit, puis 29,99€/mois. Résiliable à tout moment.
                                        </p>
                                        <Button size="sm" className="w-full" asChild>
                                            <Link href={USER_ROUTES.SUBSCRIPTION}>
                                                Essayer gratuitement
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Témoignages complets */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Ils nous font confiance
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Découvrez pourquoi nos abonnés renouvellent leur confiance année après année
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <Quote className="h-6 w-6 text-primary/20 mb-3" />
                                        <p className="text-sm mb-4 italic">
                                            &#34;{testimonial.content}&#34;
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-sm">{testimonial.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {testimonial.role}
                                                    {testimonial.company && `, ${testimonial.company}`}
                                                </p>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {testimonial.plan === 'ENTERPRISE' ? 'Enterprise' : 'Premium'}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-4">
                <motion.div
                    className="container mx-auto max-w-4xl text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Prêt à améliorer vos performances ?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Essayez gratuitement pendant 7 jours, sans engagement
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href={PUBLIC_ROUTES.REGISTER}>
                                Démarrer l&#39;essai gratuit
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/contact">
                                Parler à un conseiller
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}