//src/features/user/components/FavoritesList.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Heart,
    Mail,
    TrendingUp,
    FileText,
    Calendar,
    Filter,
    Search,
    X,
    Eye,
    Share2,
    MoreHorizontal,

} from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { formatDate } from '@/shared/lib/utils'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

interface FavoritesListProps {
    favorites: Array<{
        id: string
        contentType: 'NEWSLETTER' | 'ANALYSIS' | 'SELECTION'
        contentId: string
        createdAt: Date
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
    onRemoveFavorite: (favoriteId: string) => void
}

type FavoriteContent = {
    id: string
    title: string
    excerpt?: string
    slug: string
    type: string
    isPremium: boolean
    publishedAt?: Date
    authorName?: string
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

export function FavoritesList({ favorites, onRemoveFavorite }: FavoritesListProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState<string>('all')
    const [sortBy, setSortBy] = useState<'date' | 'title' | 'type'>('date')

    // Filtrage et tri
    const filteredFavorites = favorites
        .filter(favorite => {
            const matchesSearch = favorite.content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                favorite.content.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesType = selectedType === 'all' || favorite.contentType === selectedType
            return matchesSearch && matchesType
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.content.title.localeCompare(b.content.title)
                case 'type':
                    return a.contentType.localeCompare(b.contentType)
                case 'date':
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
        })

    const handleShare = async (content: FavoriteContent) => {
        const url = `${window.location.origin}${PUBLIC_ROUTES.ARCHIVES}/${content.slug}`
        if (navigator.share) {
            await navigator.share({
                title: content.title,
                text: content.excerpt || content.title,
                url: url
            })
        } else {
            navigator.clipboard.writeText(url)
        }
    }

    if (favorites.length === 0) {
        return (
            <div className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun favori pour le moment</h3>
                <p className="text-muted-foreground mb-6">
                    Ajoutez des articles à vos favoris pour les retrouver facilement
                </p>
                <Button asChild>
                    <Link href={PUBLIC_ROUTES.ARCHIVES}>
                        Parcourir les archives
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
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
                                    placeholder="Rechercher dans vos favoris..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

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
                        <Select value={sortBy} onValueChange={(value: 'date' | 'title' | 'type') => setSortBy(value)}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Trier par" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">Date d&#39;ajout</SelectItem>
                                <SelectItem value="title">Titre</SelectItem>
                                <SelectItem value="type">Type</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Résultats */}
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {filteredFavorites.length} résultat{filteredFavorites.length > 1 ? 's' : ''}
                        </p>
                        {(searchTerm || selectedType !== 'all') && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm('')
                                    setSelectedType('all')
                                }}
                            >
                                <X className="h-4 w-4 mr-1" />
                                Effacer
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Liste des favoris */}
            <div className="space-y-4">
                {filteredFavorites.map((favorite, index) => {
                    const config = contentTypeConfig[favorite.contentType]
                    const Icon = config.icon

                    return (
                        <motion.div
                            key={favorite.id}
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-3">
                                            {/* Header avec type et premium */}
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Badge variant="outline" className={config.color}>
                                                    <Icon className="h-3 w-3 mr-1" />
                                                    {config.label}
                                                </Badge>
                                                {favorite.content.isPremium && (
                                                    <Badge variant="secondary">
                                                        Premium
                                                    </Badge>
                                                )}
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    Ajouté le {formatDate(favorite.createdAt, {
                                                    day: 'numeric',
                                                    month: 'short'
                                                })}
                                                </div>
                                            </div>

                                            {/* Titre */}
                                            <Link
                                                href={`${PUBLIC_ROUTES.ARCHIVES}/${favorite.content.slug}`}
                                                className="block"
                                            >
                                                <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2">
                                                    {favorite.content.title}
                                                </h3>
                                            </Link>

                                            {/* Extrait */}
                                            {favorite.content.excerpt && (
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {favorite.content.excerpt}
                                                </p>
                                            )}

                                            {/* Métadonnées */}
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                {favorite.content.publishedAt && (
                                                    <span>
                                                        Publié le {formatDate(favorite.content.publishedAt, {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                    </span>
                                                )}
                                                {favorite.content.authorName && (
                                                    <span>Par {favorite.content.authorName}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 ml-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${favorite.content.slug}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleShare(favorite.content)}>
                                                        <Share2 className="h-4 w-4 mr-2" />
                                                        Partager
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onRemoveFavorite(favorite.id)}
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        <Heart className="h-4 w-4 mr-2" />
                                                        Retirer des favoris
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            {/* Aucun résultat */}
            {filteredFavorites.length === 0 && favorites.length > 0 && (
                <div className="text-center py-12">
                    <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun résultat trouvé</h3>
                    <p className="text-muted-foreground mb-6">
                        Essayez de modifier vos critères de recherche
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearchTerm('')
                            setSelectedType('all')
                        }}
                    >
                        Effacer les filtres
                    </Button>
                </div>
            )}
        </div>
    )
}