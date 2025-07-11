//src/features/analysis/components/AnalysisList.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    MoreVertical,
    Edit,
    Trash2,
    Copy,
    Archive,
    Eye,
    Send,
    TrendingUp,
    Star,
    DollarSign
} from 'lucide-react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/shared/lib/utils'
import { useToast } from '@/shared/hooks/use-toast'
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/shared/constants/routes'

interface AnalysisListItem {
    id: string
    title: string
    type: string
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    isPremium: boolean
    ticker?: string
    sector?: string
    recommendation?: string
    targetPrice?: number
    publishedAt?: Date
    authorName?: string
}

interface AnalysisListProps {
    analyses: AnalysisListItem[]
    onRefresh?: () => void
}

const getAnalysisTypeLabel = (type: string) => {
    const types = {
        'STOCK_ANALYSIS': 'Analyse d\'action',
        'SECTOR_ANALYSIS': 'Analyse sectorielle',
        'MACRO_ANALYSIS': 'Analyse macro',
        'TECHNICAL_ANALYSIS': 'Analyse technique',
        'FUNDAMENTAL_ANALYSIS': 'Analyse fondamentale'
    }
    return types[type as keyof typeof types] || type
}

const getStatusLabel = (status: string) => {
    const statuses = {
        'DRAFT': 'Brouillon',
        'PUBLISHED': 'Publié',
        'ARCHIVED': 'Archivé'
    }
    return statuses[status as keyof typeof statuses] || status
}

const getRecommendationColor = (recommendation?: string) => {
    switch (recommendation?.toLowerCase()) {
        case 'buy':
        case 'achat':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'sell':
        case 'vente':
            return 'bg-red-100 text-red-800 border-red-200'
        case 'hold':
        case 'conserver':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

export function AnalysisList({ analyses: initialAnalyses, onRefresh }: AnalysisListProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [analyses, setAnalyses] = useState(initialAnalyses)
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette analyse ?')) {
            return
        }

        try {
            setLoadingId(id)
            const response = await fetch(`/api/analyses/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression')
            }

            setAnalyses(analyses.filter(a => a.id !== id))

            toast({
                title: 'Analyse supprimée',
                description: 'L\'analyse a été supprimée avec succès',
            })

            if (onRefresh) onRefresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer l\'analyse',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleDuplicate = async (id: string) => {
        try {
            setLoadingId(id)
            const response = await fetch(`/api/analyses/${id}/duplicate`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la duplication')
            }

            toast({
                title: 'Analyse dupliquée',
                description: 'L\'analyse a été dupliquée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de dupliquer l\'analyse',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handlePublish = async (id: string) => {
        try {
            setLoadingId(id)
            const response = await fetch(`/api/analyses/${id}/publish`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la publication')
            }

            toast({
                title: 'Analyse publiée',
                description: 'L\'analyse a été publiée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de publier l\'analyse',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleArchive = async (id: string) => {
        try {
            setLoadingId(id)
            const response = await fetch(`/api/analyses/${id}/archive`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de l\'archivage')
            }

            toast({
                title: 'Analyse archivée',
                description: 'L\'analyse a été archivée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible d\'archiver l\'analyse',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Ticker</TableHead>
                        <TableHead>Recommandation</TableHead>
                        <TableHead>Prix cible</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {analyses.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                Aucune analyse trouvée
                            </TableCell>
                        </TableRow>
                    ) : (
                        analyses.map((analysis) => (
                            <TableRow key={analysis.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium line-clamp-2">{analysis.title}</p>
                                        {analysis.authorName && (
                                            <p className="text-sm text-muted-foreground">
                                                Par {analysis.authorName}
                                            </p>
                                        )}
                                        {analysis.sector && (
                                            <p className="text-xs text-muted-foreground">
                                                Secteur: {analysis.sector}
                                            </p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="whitespace-nowrap">
                                        {getAnalysisTypeLabel(analysis.type)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {analysis.ticker ? (
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3 text-blue-600" />
                                            <span className="font-mono text-sm font-medium">
                                                {analysis.ticker}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {analysis.recommendation ? (
                                        <Badge
                                            variant="outline"
                                            className={getRecommendationColor(analysis.recommendation)}
                                        >
                                            <Star className="h-3 w-3 mr-1" />
                                            {analysis.recommendation}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {analysis.targetPrice ? (
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-3 w-3 text-green-600" />
                                            <span className="font-medium">
                                                {analysis.targetPrice.toFixed(2)}€
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={analysis.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                                        {getStatusLabel(analysis.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {analysis.isPremium ? (
                                        <Badge variant="default">Premium</Badge>
                                    ) : (
                                        <Badge variant="outline">Gratuit</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {analysis.publishedAt ? (
                                        <span>{formatDate(analysis.publishedAt)}</span>
                                    ) : (
                                        <span className="text-muted-foreground">Non publié</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={loadingId === analysis.id}
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${analysis.id}`} target="_blank">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Aperçu
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={ADMIN_ROUTES.ANALYSIS_EDIT(analysis.id)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDuplicate(analysis.id)}>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Dupliquer
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            {analysis.status === 'DRAFT' && (
                                                <DropdownMenuItem onClick={() => handlePublish(analysis.id)}>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Publier
                                                </DropdownMenuItem>
                                            )}

                                            {analysis.status === 'PUBLISHED' && (
                                                <DropdownMenuItem onClick={() => handleArchive(analysis.id)}>
                                                    <Archive className="mr-2 h-4 w-4" />
                                                    Archiver
                                                </DropdownMenuItem>
                                            )}

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() => handleDelete(analysis.id)}
                                                className="text-red-600 focus:text-red-600"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Supprimer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}