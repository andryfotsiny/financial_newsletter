'use client'

import Link from 'next/link'
import {
    ArrowRight,
    Clock,
    Crown,
    TrendingUp,
    FileText,
    Star,
    Eye,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { formatDate, getInitials } from '@/shared/lib/utils'

// Données statiques pour les dernières publications
const latestContent = [
    {
        id: '1',
        type: 'newsletter',
        title: 'Actualités financières du 15 décembre 2024',
        excerpt: 'Points clés des marchés européens et américains, avec focus sur les résultats trimestriels et les perspectives 2025.',
        publishedAt: new Date('2024-12-15T08:00:00'),
        authorName: 'Jean Dupont',
        isPremium: false,
        readTime: '5 min',
        views: 1247,
        slug: 'actualites-financieres-15-decembre-2024'
    },
    {
        id: '2',
        type: 'analysis',
        title: 'Apple (AAPL) - Analyse technique et fondamentale',
        excerpt: 'Analyse approfondie du géant technologique avec objectif de prix à 12 mois et recommandation d\'investissement.',
        publishedAt: new Date('2024-12-14T16:30:00'),
        authorName: 'Marie Martin',
        isPremium: true,
        readTime: '12 min',
        views: 892,
        slug: 'apple-aapl-analyse-technique-fondamentale'
    },
    {
        id: '3',
        type: 'selection',
        title: 'Sélection momentum - Actions européennes Q4',
        excerpt: 'Notre sélection de 12 valeurs européennes présentant un momentum positif pour les prochains mois.',
        publishedAt: new Date('2024-12-13T14:20:00'),
        authorName: 'Pierre Dubois',
        isPremium: true,
        readTime: '8 min',
        views: 654,
        slug: 'selection-momentum-actions-europeennes-q4'
    },
    {
        id: '4',
        type: 'newsletter',
        title: 'Newsletter hebdomadaire - Semaine du 9 décembre',
        excerpt: 'Récapitulatif de la semaine avec les mouvements sectoriels marquants et notre vue sur les prochaines séances.',
        publishedAt: new Date('2024-12-12T09:00:00'),
        authorName: 'Thomas Bernard',
        isPremium: false,
        readTime: '7 min',
        views: 1456,
        slug: 'newsletter-hebdomadaire-semaine-9-decembre'
    },
    {
        id: '5',
        type: 'analysis',
        title: 'Secteur énergétique - Opportunités 2025',
        excerpt: 'Analyse sectorielle complète sur les opportunités d\'investissement dans l\'énergie pour l\'année à venir.',
        publishedAt: new Date('2024-12-11T11:15:00'),
        authorName: 'Sophie Chen',
        isPremium: true,
        readTime: '15 min',
        views: 743,
        slug: 'secteur-energetique-opportunites-2025'
    }
]

// Logos partenaires
const partners = [
    { name: 'Bloomberg', logo: '/partners/bloomberg.svg' },
    { name: 'FactSet', logo: '/partners/factset.svg' },
    { name: 'Refinitiv', logo: '/partners/refinitiv.svg' },
    { name: 'Reuters', logo: '/partners/reuters.svg' },
    { name: 'Morningstar', logo: '/partners/morningstar.svg' },
    { name: 'S&P Global', logo: '/partners/sp-global.svg' }
]

// Avis clients (sélection pour l'accueil)
const featuredReviews = [
    {
        name: 'Marie Dubois',
        role: 'Investisseur particulier',
        rating: 5,
        content: 'Analyses de qualité exceptionnelle qui m\'ont permis de diversifier mon portefeuille avec succès.',
        avatar: null
    },
    {
        name: 'Jean-Pierre Martin',
        role: 'Gérant de patrimoine',
        rating: 5,
        content: 'Outil indispensable pour enrichir mes analyses. Les décryptages macro sont particulièrement pertinents.',
        avatar: null
    },
    {
        name: 'Sophie Laurent',
        role: 'Entrepreneuse',
        rating: 5,
        content: 'Parfait pour débuter en investissement. Les explications sont claires et les conseils pratiques.',
        avatar: null
    }
]

const getContentIcon = (type: string) => {
    switch (type) {
        case 'newsletter':
            return <FileText className="h-4 w-4" />
        case 'analysis':
            return <TrendingUp className="h-4 w-4" />
        case 'selection':
            return <Eye className="h-4 w-4" />
        default:
            return <FileText className="h-4 w-4" />
    }
}

const getContentTypeLabel = (type: string) => {
    switch (type) {
        case 'newsletter':
            return 'Newsletter'
        case 'analysis':
            return 'Analyse'
        case 'selection':
            return 'Sélection'
        default:
            return 'Article'
    }
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export default function HomePage() {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
            {/* Section Hero */}
            <section className="relative min-h-[85vh] flex items-center">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/images/best-financial.jpg)',
                            filter: 'brightness(0.3)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                Expert en <span className="text-primary">Finance</span><br />
                                à votre service
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Accédez à des analyses financières professionnelles et des recommandations
                                d&#39;investissement exclusives pour maximiser vos performances.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" variant="outline" className="text-lg text-white" asChild>
                                    <Link href={PUBLIC_ROUTES.REGISTER}>
                                        Commencer gratuitement
                                        <ArrowRight className="ml-2" />
                                    </Link>
                                </Button>

                                    <Button size="lg" variant="secondaryOutline"  className="text-lg text-secondary" asChild>
                                    <Link href={PUBLIC_ROUTES.PREMIUM}>
                                        Découvrir Premium
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hidden lg:block"
                        >
                            <Card className="bg-black/40 backdrop-blur-sm border-primary/20">
                                <CardHeader className="border-b border-primary/10">
                                    <CardTitle className="text-2xl text-primary">Performance 2024</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {[
                                        { label: "Rendement moyen", value: "+32.5%" },
                                        { label: "Taux de réussite", value: "87%" },
                                        { label: "Signaux gagnants", value: "142/163" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex justify-between items-center text-white">
                                            <span>{stat.label}</span>
                                            <span className="text-primary font-bold">{stat.value}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Liste des dernières publications */}
            <section className=" pb-10 px-4">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        className="flex items-center justify-between mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div >
                            <h2 className="text-2xl font-bold mb-2">Dernières publications</h2>
                            <p className="text-muted-foreground">
                                Nos analyses et newsletters les plus récentes
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={PUBLIC_ROUTES.ARCHIVES}>
                                Voir toutes les archives
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {latestContent.slice(0, 6).map((item) => (
                            <motion.div key={item.id} variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="outline">
                                                {getContentIcon(item.type)}
                                                <span className="ml-1">{getContentTypeLabel(item.type)}</span>
                                            </Badge>
                                            {item.isPremium && (
                                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                                    <Crown className="h-3 w-3 mr-1" />
                                                    Premium
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg line-clamp-2 hover:text-secondary transition-colors">
                                            <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            {item.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-2">
                                                <span>{item.authorName}</span>
                                                <span>•</span>
                                                <span>{formatDate(item.publishedAt, { day: 'numeric', month: 'short' })}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {item.readTime}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {item.views}
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full" asChild>
                                            <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${item.slug}`}>
                                                Lire l&#39;article
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Partenaires */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Nos sources de données</h2>
                        <p className="text-muted-foreground">
                            Nous nous appuyons sur les meilleures sources financières mondiales
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {partners.map((partner) => (
                            <motion.div
                                key={partner.name}
                                variants={fadeInUp}
                                className="flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2 mx-auto">
                                        {/* Placeholder for logo */}
                                        <span className="text-xs font-semibold text-muted-foreground">
                                            {partner.name.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">
                                        {partner.name}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Avis clients */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Ce que disent nos abonnés</h2>
                        <p className="text-muted-foreground">
                            Plus de 15,000 investisseurs nous font confiance
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {featuredReviews.map((review, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={review.avatar || undefined} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {getInitials(review.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold text-sm">{review.name}</p>
                                                <p className="text-xs text-muted-foreground">{review.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            &#34;{review.content}&#34;
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="text-center mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Button variant="outline" asChild>
                            <Link href={PUBLIC_ROUTES.REVIEWS}>
                                Voir tous les avis
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>


        </div>
    )
}