// src/app/(public)/premium/page.tsx
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
    ChevronRight
} from 'lucide-react'

import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { PUBLIC_ROUTES, USER_ROUTES } from '@/shared/constants/routes'
//import { SUBSCRIPTION_PLANS } from '@/shared/lib/constants'

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
        plan: "ENTERPRISE"
    },
    {
        name: "Jean-Paul Martin",
        role: "Investisseur indépendant",
        company: null,
        content: "Un excellent rapport qualité-prix. Les sélections d'investissement sont particulièrement pertinentes.",
        plan: "PREMIUM"
    },
    {
        name: "Sophie Chen",
        role: "Analyste",
        company: "Banque Privée",
        content: "La réactivité et la précision des analyses nous permettent de prendre des décisions éclairées rapidement.",
        plan: "ENTERPRISE"
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
        <div className="flex flex-col">
            {/* Hero Section avec gradient moderne */}
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

            {/* Plans de tarification */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
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
                                        {featuresData.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                {feature.free ? (
                                                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground mt-0.5" />
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
                                    <Badge className="px-3 py-1">
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
                                            {isYearly ? '15,99€' : '19,99€'}
                                        </span>
                                        <span className="text-muted-foreground">/mois</span>
                                        {isYearly && (
                                            <p className="text-sm text-green-600 mt-1">
                                                Économisez 48€/an
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
                                        {featuresData.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                {feature.premium ? (
                                                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground mt-0.5" />
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
                                        {featuresData.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-green-500 mt-0.5" />
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
                </div>
            </section>

            {/* Témoignages */}
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
                        className="grid md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {testimonialsData.map((testimonial, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card>
                                    <CardContent className="pt-6">
                                        <Quote className="h-8 w-8 text-primary/20 mb-4" />
                                        <p className="text-sm mb-4 italic">
                                            &#34;{testimonial.content}&#34;
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {testimonial.role}
                                                    {testimonial.company && `, ${testimonial.company}`}
                                                </p>
                                            </div>
                                            <Badge variant="outline">
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