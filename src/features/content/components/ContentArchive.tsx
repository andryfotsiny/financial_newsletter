'use client'

import Link from 'next/link'
import {
    Calendar,
    Crown,
    TrendingUp,
    FileText,
    Eye,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { formatDate } from '@/shared/lib/utils'

const archiveContent = [
    {
        id: '1',
        type: 'actualites',
        title: 'Le point hebdo de l\'investisseur - Le 4 juillet en ligne de mire',
        excerpt: 'Récapitulatif hebdomadaire des marchés avec focus sur les événements clés de la semaine et perspectives.',
        publishedAt: new Date('2024-12-15T08:00:00'),
        authorName: 'Jean Dupont',
        isPremium: false,
        slug: 'point-hebdo-investisseur-4-juillet',
        image: '/images/actu1.jpg',
        tags: ['Hebdomadaire', 'Marchés', 'Perspectives']
    },
    {
        id: '2',
        type: 'recherche',
        title: 'STAG Industrial - A Bird in Hand Dividend Opportunity',
        excerpt: 'Analyse approfondie de STAG Industrial, REIT industriel offrant un rendement attractif avec une croissance stable.',
        publishedAt: new Date('2024-12-14T16:30:00'),
        authorName: 'Marie Martin',
        isPremium: true,
        slug: 'stag-industrial-dividend-opportunity',
        image: '/images/actu1.jpg',
        tags: ['REIT', 'Dividende', 'Analyse']
    },
    {
        id: '3',
        type: 'selection-titres',
        title: 'Sélection momentum - Actions technologiques Q4',
        excerpt: 'Notre sélection de 8 valeurs technologiques présentant un momentum positif pour la fin d\'année.',
        publishedAt: new Date('2024-12-13T14:20:00'),
        authorName: 'Pierre Dubois',
        isPremium: true,
        slug: 'selection-momentum-tech-q4',
        image: '/images/actu1.jpg',
        tags: ['Technologie', 'Momentum', 'Sélection']
    },
    {
        id: '4',
        type: 'actualites',
        title: 'Point marché quotidien - Tensions géopolitiques en focus',
        excerpt: 'Récapitulatif quotidien envoyé ce matin avec analyse des tensions géopolitiques et impact sur les marchés.',
        publishedAt: new Date('2024-12-12T09:00:00'),
        authorName: 'Thomas Bernard',
        isPremium: false,
        slug: 'point-marche-quotidien-geopolitique',
        image: '/images/actu1.jpg',
        tags: ['Quotidien', 'Géopolitique', 'Marchés']
    },
    {
        id: '5',
        type: 'recherche-thematique',
        title: 'Transition énergétique - Opportunités sectorielles 2025',
        excerpt: 'Recherche thématique complète sur les opportunités d\'investissement dans la transition énergétique.',
        publishedAt: new Date('2024-12-11T11:15:00'),
        authorName: 'Sophie Chen',
        isPremium: true,
        slug: 'transition-energetique-opportunites-2025',
        image: '/images/actu1.jpg',
        tags: ['Énergie', 'Transition', 'Thématique']
    },
    {
        id: '6',
        type: 'selection-fonds',
        title: 'Fonds européens - Sélection value pour 2025',
        excerpt: 'Sélection de fonds européens orientés value avec potentiel de surperformance pour l\'année à venir.',
        publishedAt: new Date('2024-12-10T15:45:00'),
        authorName: 'Alain Moreau',
        isPremium: true,
        slug: 'fonds-europeens-selection-value-2025',
        image: '/images/actu1.jpg',
        tags: ['Fonds', 'Europe', 'Value']
    },
    {
        id: '7',
        type: 'analyse-macro',
        title: 'Fed et BCE - Divergence des politiques monétaires',
        excerpt: 'Analyse macroéconomique sur la divergence croissante entre les politiques de la Fed et de la BCE.',
        publishedAt: new Date('2024-12-09T13:30:00'),
        authorName: 'David Laurent',
        isPremium: false,
        slug: 'fed-bce-divergence-politiques-monetaires',
        image: '/images/actu1.jpg',
        tags: ['Macro', 'Banques centrales', 'Politique monétaire']
    },
    {
        id: '8',
        type: 'actualites',
        title: 'Récapitulatif hebdomadaire - Semaine du 2 décembre',
        excerpt: 'Récapitulatif hebdomadaire envoyé samedi avec les mouvements sectoriels marquants de la semaine.',
        publishedAt: new Date('2024-12-08T09:00:00'),
        authorName: 'Jean Dupont',
        isPremium: false,
        slug: 'recapitulatif-hebdomadaire-2-decembre',
        image: '/images/actu1.jpg',
        tags: ['Hebdomadaire', 'Secteurs', 'Récapitulatif']
    },
    {
        id: '9',
        type: 'recherche',
        title: 'Apple (AAPL) - Analyse technique et fondamentale Q4',
        excerpt: 'Analyse complète d\'Apple incluant perspectives techniques et fondamentales pour le quatrième trimestre.',
        publishedAt: new Date('2024-12-07T16:20:00'),
        authorName: 'Marie Martin',
        isPremium: true,
        slug: 'apple-aapl-analyse-complete-q4',
        image: '/images/actu1.jpg',
        tags: ['Apple', 'Analyse', 'Technologie']
    },
    {
        id: '10',
        type: 'selection-titres',
        title: 'Valeurs défensives - Sélection pour fin d\'année',
        excerpt: 'Sélection de titres défensifs pour naviguer dans l\'incertitude de fin d\'année et début 2025.',
        publishedAt: new Date('2024-12-06T14:10:00'),
        authorName: 'Pierre Dubois',
        isPremium: true,
        slug: 'valeurs-defensives-selection-fin-annee',
        image: '/images/actu1.jpg',
        tags: ['Défensif', 'Sélection', 'Fin d\'année']
    },
    {
        id: '11',
        type: 'recherche-thematique',
        title: 'Intelligence artificielle - Révolution ou bulle ?',
        excerpt: 'Recherche thématique sur l\'intelligence artificielle : analyse des opportunités et des risques sectoriels.',
        publishedAt: new Date('2024-12-05T10:30:00'),
        authorName: 'Sophie Chen',
        isPremium: true,
        slug: 'intelligence-artificielle-revolution-ou-bulle',
        image: '/images/actu1.jpg',
        tags: ['IA', 'Technologie', 'Thématique']
    },
    {
        id: '12',
        type: 'analyse-macro',
        title: 'Inflation américaine - Signaux de ralentissement',
        excerpt: 'Analyse macroéconomique des derniers indicateurs d\'inflation américaine et implications pour les marchés.',
        publishedAt: new Date('2024-12-04T11:45:00'),
        authorName: 'David Laurent',
        isPremium: false,
        slug: 'inflation-americaine-signaux-ralentissement',
        image: '/images/actu1.jpg',
        tags: ['Inflation', 'États-Unis', 'Macro']
    }
]

const contentTypes = [
    { value: 'all', label: 'Tous les contenus' },
    { value: 'actualites', label: 'Actualités marchés' },
    { value: 'recherche', label: 'Recherche' },
    { value: 'selection-titres', label: 'Sélection de titres' },
    { value: 'selection-fonds', label: 'Sélection de fonds' },
    { value: 'recherche-thematique', label: 'Recherches thématiques' },
    { value: 'analyse-macro', label: 'Analyses macroéconomiques' }
]

const getContentIcon = (type: string) => {
    switch (type) {
        case 'actualites':
            return <FileText className="h-4 w-4" />
        case 'recherche':
        case 'recherche-thematique':
            return <TrendingUp className="h-4 w-4" />
        case 'selection-titres':
        case 'selection-fonds':
            return <Eye className="h-4 w-4" />
        case 'analyse-macro':
            return <TrendingUp className="h-4 w-4" />
        default:
            return <FileText className="h-4 w-4" />
    }
}

const getContentTypeLabel = (type: string) => {
    const typeObj = contentTypes.find(t => t.value === type)
    return typeObj ? typeObj.label : 'Article'
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

export function ContentArchive() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}




            {/* Liste des publications */}
            <section className="py-12 px-4">
                <div className="container mx-auto ">
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {archiveContent.map((item) => (
                            <motion.div key={item.id} variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                                    {/* Image en haut - pleine largeur */}
                                    <div className="relative">
                                        <div className="aspect-video w-full overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Overlay sombre */}
                                            <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300"></div>
                                        </div>
                                        {/* Badges superposés sur l'image */}
                                        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                                            <Badge variant="outline" className="backdrop-blur-sm">
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
                                    </div>

                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg line-clamp-2 hover:text-secondary transition-colors">
                                            <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            {item.excerpt}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pt-0">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {item.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Métadonnées */}
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <span>{item.authorName}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(item.publishedAt, { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    {/* Bouton en bas de la carte */}
                                    <div className="px-6 pb-6 mt-auto">
                                        <Button variant="outline" size="sm" className="w-full" asChild>
                                            <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${item.slug}`}>
                                                Lire la suite
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <motion.div
                        className="flex justify-center gap-2 mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button variant="outline" disabled>
                            Précédent
                        </Button>
                        <Button variant="default">1</Button>
                        <Button variant="outline">2</Button>
                        <Button variant="outline">3</Button>
                        <Button variant="outline">
                            Suivant
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}