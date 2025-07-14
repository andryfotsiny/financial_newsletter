'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
    Calendar,
    Crown,
    TrendingUp,
    FileText,
    Eye,
    Bookmark,
    BarChart3,
    PieChart,
    Globe,
    Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    }
]

// Contenu pour la sidebar - plus riche selon les demandes client
const marketData = [
    { symbol: 'CAC 40', value: '7,842.15', change: '+0.47%', positive: true },
    { symbol: 'S&P 500', value: '4,927.93', change: '+0.24%', positive: true },
    { symbol: 'EUR/USD', value: '1.0856', change: '-0.12%', positive: false },
    { symbol: 'BTC', value: '$42,847', change: '+2.31%', positive: true },
]

const partnerLogos = [
    { name: 'Bloomberg', logo: 'https://via.placeholder.com/120x40/1a1a1a/ffffff?text=Bloomberg' },
    { name: 'FactSet', logo: 'https://via.placeholder.com/120x40/0066cc/ffffff?text=FactSet' },
    { name: 'Refinitiv', logo: 'https://via.placeholder.com/120x40/ff6600/ffffff?text=Refinitiv' },
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
            return <BarChart3 className="h-4 w-4" />
        default:
            return <FileText className="h-4 w-4" />
    }
}

const getContentTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
        'actualites': 'Actualités',
        'recherche': 'Recherche',
        'selection-titres': 'Sélection',
        'selection-fonds': 'Fonds',
        'recherche-thematique': 'Thématique',
        'analyse-macro': 'Analyse'
    }
    return types[type] || 'Article'
}

export function ContentArchive() {
    const mainArticle = archiveContent[0]
    const secondaryArticles = archiveContent.slice(1)

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Ligne de séparation verticale */}


                    {/* Colonne principale */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Article principal */}
                        <article className="group">
                            <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${mainArticle.slug}`}>
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                    <Image
                                        src={mainArticle.image}
                                        alt={mainArticle.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 1024px) 100vw, 75vw"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                                </div>
                            </Link>

                            <div className="mt-4">
                                <div className="flex items-center gap-4 mb-3">
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        {getContentIcon(mainArticle.type)}
                                        {getContentTypeLabel(mainArticle.type)}
                                    </Badge>
                                    {mainArticle.isPremium && (
                                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                            <Crown className="h-3 w-3 mr-1" />
                                            Premium
                                        </Badge>
                                    )}
                                    <Button variant="ghost" size="sm" className="ml-auto">
                                        <Bookmark className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${mainArticle.slug}`}>
                                    <h1 className="text-2xl font-bold text-foreground hover:text-primary transition-colors mb-3 line-clamp-2">
                                        {mainArticle.title}
                                    </h1>
                                </Link>

                                <p className="text-muted-foreground text-lg leading-relaxed mb-4 line-clamp-3">
                                    {mainArticle.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{mainArticle.authorName}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(mainArticle.publishedAt, { day: 'numeric', month: 'long' })}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {mainArticle.tags.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Articles secondaires - Style Les Échos avec images à droite */}
                        <div className="space-y-6">
                            {secondaryArticles.slice(0, 6).map((article) => (
                                <article key={article.id} className="group border-b border-border/50 pb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {/* Contenu à gauche */}
                                        <div className="md:col-span-3 md:order-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                                    {getContentIcon(article.type)}
                                                    {getContentTypeLabel(article.type)}
                                                </Badge>
                                                {article.isPremium && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        <Crown className="h-3 w-3 mr-1" />
                                                        Premium
                                                    </Badge>
                                                )}
                                            </div>

                                            <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${article.slug}`}>
                                                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                            </Link>

                                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                                {article.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span>{article.authorName}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(article.publishedAt, { day: 'numeric', month: 'short' })}</span>
                                                </div>

                                                <Button variant="ghost" size="sm">
                                                    <Bookmark className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Image à droite */}
                                        <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${article.slug}`} className="md:col-span-1 md:order-2">
                                            <div className="relative aspect-square w-2/3 overflow-hidden rounded">
                                                <Image
                                                    src={article.image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 67vw, 25vw"
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Section spéciale - Analyses Exclusives */}
                        <div className="bg-muted/30 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-foreground">Recherches Exclusives Premium</h2>
                                <Button variant="ghost" size="sm">
                                    Voir plus
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {secondaryArticles.slice(6, 10).map((article) => (
                                    <article key={article.id} className="group">
                                        <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${article.slug}`}>
                                            <div className="relative aspect-video w-full overflow-hidden rounded mb-3">
                                                <Image
                                                    src={article.image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 100vw, 37.5vw"
                                                />
                                            </div>
                                        </Link>

                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                                {getContentIcon(article.type)}
                                                {getContentTypeLabel(article.type)}
                                            </Badge>
                                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                                                <Crown className="h-3 w-3 mr-1" />
                                                Premium
                                            </Badge>
                                        </div>

                                        <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${article.slug}`}>
                                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                        </Link>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{article.authorName}</span>
                                                <span>•</span>
                                                <span>{formatDate(article.publishedAt, { day: 'numeric', month: 'short' })}</span>
                                            </div>

                                            <Button variant="ghost" size="sm">
                                                <Bookmark className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ligne de séparation verticale */}
                    <div className="hidden lg:block absolute left-3/4 top-0 w-px bg-border/40 h-full"></div>

                    {/* Sidebar - Position fixe avec logo transparent */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Logo fixe avec transparence */}
                        <div className="sticky top-24 z-10">
                            <div className="relative pb bg-background/90 backdrop-blur-sm rounded-lg p-4 mb-6 border border-border/20">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-primary">Alphavice</h2>

                                </div>
                            </div>
                        </div>

                        {/* Données de marché en temps réel */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Marchés en temps réel
                            </h3>
                            <div className="space-y-3">
                                {marketData.map((market) => (
                                    <div key={market.symbol} className="flex justify-between items-center py-2 border-b border-border/30 last:border-b-0">
                                        <div>
                                            <div className="text-sm font-medium">{market.symbol}</div>
                                            <div className="text-xs text-muted-foreground">{market.value}</div>
                                        </div>
                                        <div className={`text-xs font-medium ${market.positive ? 'text-green-600' : 'text-red-600'}`}>
                                            {market.change}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Séparateur */}
                        <div className="border-t border-border/40 pt-6">
                            {/* Articles populaires */}
                            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Analyses les plus lues
                            </h3>
                            <div className="space-y-3">
                                {archiveContent.slice(0, 5).map((article, articleIndex) => (
                                    <div key={article.id} className="flex gap-3 py-2 border-b border-border/20 last:border-b-0">
                                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                            {articleIndex + 1}
                                        </span>
                                        <div className="flex-1">
                                            <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${article.slug}`}>
                                                <h4 className="text-xs font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                                                    {article.title}
                                                </h4>
                                            </Link>
                                            {article.isPremium && (
                                                <Badge variant="secondary" className="text-xs mt-1">
                                                    <Crown className="h-2 w-2 mr-1" />
                                                    Premium
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Séparateur */}
                        <div className="border-t border-border/40 pt-6">
                            {/* Types de contenu disponibles */}
                            <h3 className="text-sm font-semibold text-foreground mb-3">Types de recherche</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs py-1">
                                    <FileText className="h-3 w-3" />
                                    <span>Actualités marchés quotidiennes</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs py-1">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>Sélection de titres (2x/semaine)</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs py-1">
                                    <PieChart className="h-3 w-3" />
                                    <span>Sélection de fonds</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs py-1">
                                    <Globe className="h-3 w-3" />
                                    <span>Analyses macroéconomiques</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs py-1">
                                    <Eye className="h-3 w-3" />
                                    <span>Recherches thématiques</span>
                                </div>
                            </div>
                        </div>

                        {/* Séparateur */}
                        <div className="border-t border-border/40 pt-6">
                            {/* Partenaires */}
                            <h3 className="text-sm font-semibold text-foreground mb-3">Nos partenaires données</h3>
                            <div className="space-y-3">
                                {partnerLogos.map((partner) => (
                                    <div key={partner.name} className="flex items-center justify-center py-2">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            width={120}
                                            height={32}
                                            className="opacity-70 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Séparateur */}
                        <div className="border-t border-border/40 pt-6">
                            {/* Newsletter premium */}
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <Crown className="h-4 w-4" />
                                    Newsletter Premium
                                </h3>
                                <h4 className="font-medium text-foreground mb-1">Alphavice Pro</h4>
                                <p className="text-xs text-muted-foreground mb-3">
                                    Analyses exclusives, sélections de titres et recherches thématiques. Accès complet à notre bibliothèque.
                                </p>
                                <Button size="sm" className="w-full">
                                    S&#39;abonner - 29€/mois
                                </Button>
                            </div>
                        </div>

                        {/* Séparateur */}
                        <div className="border-t border-border/40 pt-6">
                            {/* Avis clients */}
                            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                Avis clients
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-2 border-primary/20 pl-3 py-2">
                                    <p className="text-xs text-muted-foreground italic">
                                        &#34;Des analyses de qualité qui m&#39;aident vraiment dans mes décisions d&#39;investissement.&#34;
                                    </p>
                                    <p className="text-xs font-medium mt-1">- Marc D.</p>
                                    <div className="flex gap-1 mt-1">
                                        {[1,2,3,4,5].map(starIndex => (
                                            <Star key={starIndex} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                                <div className="border-l-2 border-primary/20 pl-3 py-2">
                                    <p className="text-xs text-muted-foreground italic">
                                        La newsletter quotidienne est devenue indispensable à ma routine matinale
                                    </p>
                                    <p className="text-xs font-medium mt-1">- Sarah L.</p>
                                    <div className="flex gap-1 mt-1">
                                        {[1,2,3,4,5].map(starIndex => (
                                            <Star key={starIndex} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-12">
                    <Button variant="outline" disabled>
                        Précédent
                    </Button>
                    <Button variant="default">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">
                        Suivant
                    </Button>
                </div>
            </div>
        </div>
    )
}