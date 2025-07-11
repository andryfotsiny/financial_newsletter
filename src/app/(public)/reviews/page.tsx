// src/app/(public)/reviews/page.tsx
'use client'

import { motion } from 'framer-motion'
import {
    Star,
    Quote,
    TrendingUp,
    Shield,
    Clock,
    CheckCircle,
    MessageCircle
} from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

// Données statiques pour les avis
const reviewsData = [
    {
        id: 1,
        name: "Marie Dubois",
        role: "Investisseur particulier",
        avatar: null,
        rating: 5,
        date: "2024-06-15",
        title: "Analyses de qualité exceptionnelle",
        content: "Abonnée depuis 2 ans, je suis impressionnée par la qualité des analyses. Les recommandations sont précises et m'ont permis de diversifier mon portefeuille avec succès. L'équipe est très professionnelle.",
        verified: true,
        helpful: 24
    },
    {
        id: 2,
        name: "Jean-Pierre Martin",
        role: "Gérant de patrimoine",
        avatar: null,
        rating: 5,
        date: "2024-06-10",
        title: "Outil indispensable pour mes clients",
        content: "En tant que professionnel, j'utilise cette newsletter pour enrichir mes analyses. Les décryptages macro-économiques sont particulièrement pertinents. Je recommande vivement !",
        verified: true,
        helpful: 18
    },
    {
        id: 3,
        name: "Sophie Laurent",
        role: "Entrepreneuse",
        avatar: null,
        rating: 5,
        date: "2024-05-28",
        title: "Parfait pour débuter en investissement",
        content: "Débutante en investissement, cette newsletter m'a énormément aidée. Les explications sont claires, les conseils pratiques. J'ai gagné en confiance grâce à leurs analyses.",
        verified: true,
        helpful: 32
    },
    {
        id: 4,
        name: "Alexandre Roux",
        role: "Cadre dirigeant",
        avatar: null,
        rating: 4,
        date: "2024-05-20",
        title: "Très bon rapport qualité-prix",
        content: "Le contenu premium vaut largement son prix. Les sélections de titres sont bien documentées et les performances sont au rendez-vous. Quelques améliorations possibles sur l'interface.",
        verified: true,
        helpful: 15
    },
    {
        id: 5,
        name: "Catherine Moreau",
        role: "Retraitée",
        avatar: null,
        rating: 5,
        date: "2024-05-15",
        title: "Idéal pour préparer ma retraite",
        content: "À 55 ans, je prépare ma retraite et cette newsletter m'aide à faire les bons choix. Les analyses sont accessibles même pour les non-initiés. Service client excellent.",
        verified: true,
        helpful: 28
    },
    {
        id: 6,
        name: "Thomas Girard",
        role: "Ingénieur",
        avatar: null,
        rating: 5,
        date: "2024-05-08",
        title: "Méthodologie rigoureuse",
        content: "Ce qui m'a séduit, c'est la rigueur de l'analyse. Les sources sont citées, la méthodologie est transparente. En tant qu'ingénieur, j'apprécie cette approche scientifique.",
        verified: true,
        helpful: 21
    }
]

// Données statiques pour les statistiques
const statsData = [
    {
        icon: Star,
        value: "4.9/5",
        label: "Note moyenne",
        description: "Basée sur 1,247 avis"
    },
    {
        icon: TrendingUp,
        value: "94%",
        label: "Recommandent",
        description: "Nos services à leurs proches"
    },
    {
        icon: Shield,
        value: "98%",
        label: "Satisfaction",
        description: "Taux de satisfaction client"
    },
    {
        icon: Clock,
        value: "< 24h",
        label: "Réponse support",
        description: "Temps de réponse moyen"
    }
]

// Données statiques pour les catégories d'avis
const reviewCategories = [
    {
        category: "Qualité des analyses",
        rating: 4.9,
        count: 1247
    },
    {
        category: "Facilité d'utilisation",
        rating: 4.8,
        count: 1156
    },
    {
        category: "Service client",
        rating: 4.9,
        count: 892
    },
    {
        category: "Rapport qualité-prix",
        rating: 4.7,
        count: 1089
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

// Fonction pour générer les initiales
const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Composant pour les étoiles
const StarRating = ({ rating, className = "" }: { rating: number; className?: string }) => {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${
                        i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    )
}

export default function ReviewsPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
                </div>
                <div className="container mx-auto max-w-4xl relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Badge variant="outline" className="mb-4">
                            Avis clients
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Ce que disent nos
                            <span className="text-primary"> abonnés</span>
                        </h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
                            Découvrez les témoignages de nos clients satisfaits qui nous font confiance
                            pour leurs décisions d&#39;investissement.
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <StarRating rating={5} />
                            <span className="text-lg font-semibold">4.9/5</span>
                            <span className="text-muted-foreground">• 1,247 avis</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Statistiques */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {statsData.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="text-center"
                                >
                                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                                        <CardContent className="pt-6">
                                            <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                            <div className="text-sm font-medium mb-1">{stat.label}</div>
                                            <div className="text-xs text-muted-foreground">{stat.description}</div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Répartition des notes */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Répartition des évaluations</h2>
                        <p className="text-lg text-muted-foreground">
                            Notes détaillées par catégorie de service
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {reviewCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                            >
                                <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold">{category.category}</h3>
                                            <Badge variant="outline">{category.rating}</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <StarRating rating={Math.floor(category.rating)} />
                                            <span className="text-sm text-muted-foreground">
                                                {category.count} avis
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <motion.div
                                                className="bg-primary h-2 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(category.rating / 5) * 100}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Avis clients */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Témoignages clients</h2>
                        <p className="text-lg text-muted-foreground">
                            Découvrez les expériences de nos abonnés
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {reviewsData.map((review) => (
                            <motion.div
                                key={review.id}
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="h-full border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={review.avatar || undefined} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {getInitials(review.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-sm">{review.name}</h4>
                                                    {review.verified && (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-2">{review.role}</p>
                                                <div className="flex items-center gap-2">
                                                    <StarRating rating={review.rating} />
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDate(review.date)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-3">
                                            <Quote className="h-4 w-4 text-primary mb-2" />
                                            <h5 className="font-semibold text-sm mb-2">{review.title}</h5>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {review.content}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t">
                                            <MessageCircle className="h-3 w-3" />
                                            <span>{review.helpful} personnes ont trouvé cet avis utile</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Rejoignez nos abonnés satisfaits</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Découvrez pourquoi plus de 15,000 investisseurs nous font confiance.
                        </p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" asChild>
                                    <Link href={PUBLIC_ROUTES.REGISTER}>
                                        Commencer gratuitement
                                    </Link>
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href={PUBLIC_ROUTES.PREMIUM}>
                                        Voir les offres Premium
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}