//src/features/selection/components/SelectionList.tsx
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
    Target,
    TrendingUp,
    Briefcase,
    Star
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

interface SelectionListItem {
    id: string
    title: string
    type: string
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    isPremium: boolean
    theme?: string
    stocksCount?: number
    expectedReturn?: number
    riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
    publishedAt?: Date
    authorName?: string
}

interface SelectionListProps {
    selections: SelectionListItem[]
    onRefresh?: () => void
}

const getSelectionTypeLabel = (type: string) => {
    const types = {
        'STOCK_SELECTION': 'Sélection d\'actions',
        'ETF_SELECTION': 'Sélection d\'ETF',
        'THEMATIC_SELECTION': 'Sélection thématique',
        'MOMENTUM_SELECTION': 'Sélection momentum',
        'VALUE_SELECTION': 'Sélection value',
        'DIVIDEND_SELECTION': 'Sélection dividendes'
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

const getRiskLevelColor = (riskLevel?: string) => {
    switch (riskLevel) {
        case 'LOW':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'MEDIUM':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'HIGH':
            return 'bg-red-100 text-red-800 border-red-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

const getRiskLevelLabel = (riskLevel?: string) => {
    const labels = {
        'LOW': 'Faible',
        'MEDIUM': 'Modéré',
        'HIGH': 'Élevé'
    }
    return labels[riskLevel as keyof typeof labels] || 'Non défini'
}

export function SelectionList({ selections: initialSelections, onRefresh }: SelectionListProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [selections, setSelections] = useState(initialSelections)
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette sélection ?')) {
            return
        }

        try {
            setLoadingId(id)
            const response = await fetch(`/api/selections/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression')
            }

            setSelections(selections.filter(s => s.id !== id))

            toast({
                title: 'Sélection supprimée',
                description: 'La sélection a été supprimée avec succès',
            })

            if (onRefresh) onRefresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer la sélection',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleDuplicate = async (id: string) => {
        try {
            setLoadingId(id)
            const response = await fetch(`/api/selections/${id}/duplicate`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la duplication')
            }

            toast({
                title: 'Sélection dupliquée',
                description: 'La sélection a été dupliquée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de dupliquer la sélection',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handlePublish = async (id: string) => {
        try {
            setLoadingId(id)
            const response = await fetch(`/api/selections/${id}/publish`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la publication')
            }

            toast({
                title: 'Sélection publiée',
                description: 'La sélection a été publiée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch {
            toast({
                title: 'Erreur',
                description: 'Impossible de publier la sélection',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleArchive = async (id: string) => {
        try {
            setLoadingId(id)
            const response = await fetch(`/api/selections/${id}/archive`, {
                method: 'POST',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de l\'archivage')
            }

            toast({
                title: 'Sélection archivée',
                description: 'La sélection a été archivée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch {
            toast({
                title: 'Erreur',
                description: 'Impossible d\'archiver la sélection',
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
                        <TableHead>Thème</TableHead>
                        <TableHead>Actions</TableHead>
                        <TableHead>Rendement</TableHead>
                        <TableHead>Risque</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selections.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                                Aucune sélection trouvée
                            </TableCell>
                        </TableRow>
                    ) : (
                        selections.map((selection) => (
                            <TableRow key={selection.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium line-clamp-2">{selection.title}</p>
                                        {selection.authorName && (
                                            <p className="text-sm text-muted-foreground">
                                                Par {selection.authorName}
                                            </p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="whitespace-nowrap">
                                        {getSelectionTypeLabel(selection.type)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {selection.theme ? (
                                        <div className="flex items-center gap-1">
                                            <Target className="h-3 w-3 text-purple-600" />
                                            <span className="text-sm">
                                                {selection.theme}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {selection.stocksCount ? (
                                        <div className="flex items-center gap-1">
                                            <Briefcase className="h-3 w-3 text-blue-600" />
                                            <span className="font-medium">
                                                {selection.stocksCount} titres
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {selection.expectedReturn ? (
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className={`h-3 w-3 ${selection.expectedReturn > 0 ? 'text-green-600' : 'text-red-600'}`} />
                                            <span className={`font-medium ${selection.expectedReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {selection.expectedReturn > 0 ? '+' : ''}{selection.expectedReturn}%
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {selection.riskLevel ? (
                                        <Badge
                                            variant="outline"
                                            className={getRiskLevelColor(selection.riskLevel)}
                                        >
                                            <Star className="h-3 w-3 mr-1" />
                                            {getRiskLevelLabel(selection.riskLevel)}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={selection.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                                        {getStatusLabel(selection.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {selection.isPremium ? (
                                        <Badge variant="default">Premium</Badge>
                                    ) : (
                                        <Badge variant="outline">Gratuit</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {selection.publishedAt ? (
                                        <span>{formatDate(selection.publishedAt)}</span>
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
                                                disabled={loadingId === selection.id}
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${selection.id}`} target="_blank">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Aperçu
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={ADMIN_ROUTES.SELECTION_EDIT(selection.id)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDuplicate(selection.id)}>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Dupliquer
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            {selection.status === 'DRAFT' && (
                                                <DropdownMenuItem onClick={() => handlePublish(selection.id)}>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Publier
                                                </DropdownMenuItem>
                                            )}

                                            {selection.status === 'PUBLISHED' && (
                                                <DropdownMenuItem onClick={() => handleArchive(selection.id)}>
                                                    <Archive className="mr-2 h-4 w-4" />
                                                    Archiver
                                                </DropdownMenuItem>
                                            )}

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() => handleDelete(selection.id)}
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