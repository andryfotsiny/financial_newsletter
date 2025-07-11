//src/features/user/components/ReadingHistory.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Clock,
    Mail,
    TrendingUp,
    FileText,
    Calendar,
    Filter,
    Search,
    X,
    Eye,
    ChevronRight,
    BarChart3,
    BookOpen
} from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { formatDate } from '@/shared/lib/utils'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

interface ReadingHistoryProps {
    history: Array<{
        id: string
        contentType: 'NEWSLETTER' | 'ANALYSIS' | 'SELECTION'
        contentId: string
        readAt: Date
        readDuration?: number
        readProgress?: number
        content: {
            id: string
            title: string
            excerpt?: string
            slug: string
            type: string
            isPremium: boolean
            publishedAt?: Date
            authorName?: string
        }
    }>
    stats: {
        totalReads: number
        totalDuration: number
        averageProgress: number
        weeklyReads: number
    }
}

const contentTypeConfig = {
    NEWSLETTER: {
        icon: Mail,
        label: 'Newsletter',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    ANALYSIS: {
        icon: TrendingUp,
        label: 'Analyse',
        color: 'bg-green-100 text-green-800 border-green-200'
    },
    SELECTION: {
        icon: FileText,
        label: 'Sélection',
        color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
}

export function ReadingHistory({ history, stats }: ReadingHistoryProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState<string>('all')
    const [sortBy, setSortBy] = useState<'date' | 'title' | 'progress'>('date')
    const [period, setPeriod] = useState<'week' | 'month' | 'all'>('all')

    // Filtrage par période
    const getDateFilter = () => {
        const now = new Date()
        switch (period) {
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                return (date: Date) => date >= weekAgo
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                return (date: Date) => date >= monthAgo
            default:
                return () => true
        }
    }

    // Filtrage et tri
    const filteredHistory = history
        .filter(item => {
            const matchesSearch = item.content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.content.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType = selectedType === 'all' || item.contentType === selectedType
            const matchesPeriod = getDateFilter()(item.readAt)
            return matchesSearch && matchesType && matchesPeriod
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.content.title.localeCompare(b.content.title)
                case 'progress':
                    return (b.readProgress || 0) - (a.readProgress || 0)
                case 'date':
                default:
                    return new Date(b.readAt).getTime() - new Date(a.readAt).getTime()
            }
        })

    const formatDuration = (minutes?: number) => {
        if (!minutes) return 'Non disponible'
        if (minutes < 60) return `${minutes} min`
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`
    }

    return (
        <div className="space-y-6">
            {/* Statistiques de lecture */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Articles lus
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.totalReads}
                                </p>
                            </div>
                            <BookOpen className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Temps total
                                </p>
                                <p className="text-2xl font-bold">
                                    {formatDuration(stats.totalDuration)}
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Progression moyenne
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.averageProgress}%
                                </p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Cette semaine
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.weeklyReads}
                                </p>
                            </div>
                            <Calendar className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filtres et recherche */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filtres
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Recherche */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher dans l'historique..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Période */}
                        <Select value={period} onValueChange={(value: 'week' | 'month' | 'all') => setPeriod(value)}>
                        <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Période" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="week">Cette semaine</SelectItem>
                                <SelectItem value="month">Ce mois</SelectItem>
                                <SelectItem value="all">Tout l&#39;historique</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Type de contenu */}
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Tous les types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les types</SelectItem>
                                <SelectItem value="NEWSLETTER">Newsletters</SelectItem>
                                <SelectItem value="ANALYSIS">Analyses</SelectItem>
                                <SelectItem value="SELECTION">Sélections</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Tri */}
                        <Select value={sortBy} onValueChange={value => setSortBy(value as 'date' | 'title' | 'progress')}>
                        <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Trier par" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">Date de lecture</SelectItem>
                                <SelectItem value="title">Titre</SelectItem>
                                <SelectItem value="progress">Progression</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Résultats */}
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {filteredHistory.length} lecture{filteredHistory.length > 1 ? 's' : ''}
                        </p>
                        {(searchTerm || selectedType !== 'all' || period !== 'all') && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm('')
                                    setSelectedType('all')
                                    setPeriod('all')
                                }}
                            >
                                <X className="h-4 w-4 mr-1" />
                                Effacer
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Liste de l'historique */}
            <div className="space-y-4">
                {filteredHistory.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Clock className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                {history.length === 0
                                    ? 'Aucune lecture pour le moment'
                                    : 'Aucun résultat trouvé'
                                }
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {history.length === 0
                                    ? 'Commencez à lire des articles pour voir votre historique'
                                    : 'Essayez de modifier vos critères de recherche'
                                }
                            </p>
                            {history.length === 0 && (
                                <Button asChild>
                                    <Link href={PUBLIC_ROUTES.ARCHIVES}>
                                        Parcourir les archives
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    filteredHistory.map((item, index) => {
                        const config = contentTypeConfig[item.contentType]
                        const Icon = config.icon

                        return (
                            <motion.div
                                key={item.id}
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 space-y-3">
                                                {/* Header avec type et badges */}
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <Badge variant="outline" className={config.color}>
                                                        <Icon className="h-3 w-3 mr-1" />
                                                        {config.label}
                                                    </Badge>
                                                    {item.content.isPremium && (
                                                        <Badge variant="secondary">
                                                            Premium
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Titre */}
                                                <Link
                                                    href={`${PUBLIC_ROUTES.ARCHIVES}/${item.content.slug}`}
                                                    className="block"
                                                >
                                                    <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2">
                                                        {item.content.title}
                                                    </h3>
                                                </Link>

                                                {/* Extrait */}
                                                {item.content.excerpt && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {item.content.excerpt}
                                                    </p>
                                                )}

                                                {/* Progression de lecture */}
                                                {item.readProgress !== undefined && (
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span className="text-muted-foreground">Progression</span>
                                                            <span className="font-medium">{item.readProgress}%</span>
                                                        </div>
                                                        <Progress value={item.readProgress} className="h-1" />
                                                    </div>
                                                )}

                                                {/* Métadonnées de lecture */}
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        Lu le {formatDate(item.readAt, {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                    </span>
                                                    {item.readDuration && (
                                                        <span>
                                                            Durée: {formatDuration(item.readDuration)}
                                                        </span>
                                                    )}
                                                    {item.content.authorName && (
                                                        <span>Par {item.content.authorName}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action de lecture */}
                                            <div className="ml-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${item.content.slug}`}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Relire
                                                        <ChevronRight className="h-3 w-3 ml-1" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </div>
    )
}