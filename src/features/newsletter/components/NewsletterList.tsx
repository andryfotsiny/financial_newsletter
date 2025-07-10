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
    Send
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

import {
    NewsletterListItem,
    getNewsletterTypeLabel,
    getStatusLabel,
} from '../types/newsletter.types'
import { newsletterService } from '../services/newsletterService'
import { formatDate } from '@/shared/lib/utils'
import { useToast } from '@/shared/hooks/use-toast'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

interface NewsletterListProps {
    newsletters: NewsletterListItem[]
    onRefresh?: () => void
}

export function NewsletterList({ newsletters: initialNewsletters, onRefresh }: NewsletterListProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [newsletters, setNewsletters] = useState(initialNewsletters)
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette newsletter ?')) {
            return
        }

        try {
            setLoadingId(id)
            await newsletterService.delete(id)

            setNewsletters(newsletters.filter(n => n.id !== id))

            toast({
                title: 'Newsletter supprimée',
                description: 'La newsletter a été supprimée avec succès',
            })

            if (onRefresh) onRefresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer la newsletter',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleDuplicate = async (id: string) => {
        try {
            setLoadingId(id)
            await newsletterService.duplicate(id)

            toast({
                title: 'Newsletter dupliquée',
                description: 'La newsletter a été dupliquée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch {
            toast({
                title: 'Erreur',
                description: 'Impossible de dupliquer la newsletter',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handlePublish = async (id: string) => {
        try {
            setLoadingId(id)
            await newsletterService.publish(id)

            toast({
                title: 'Newsletter publiée',
                description: 'La newsletter a été publiée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de publier la newsletter',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    const handleArchive = async (id: string) => {
        try {
            setLoadingId(id)
            await newsletterService.archive(id)

            toast({
                title: 'Newsletter archivée',
                description: 'La newsletter a été archivée avec succès',
            })

            if (onRefresh) onRefresh()
            router.refresh()
        } catch {
            toast({
                title: 'Erreur',
                description: 'Impossible d\'archiver la newsletter',
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
                        <TableHead>Statut</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {newsletters.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                Aucune newsletter trouvée
                            </TableCell>
                        </TableRow>
                    ) : (
                        newsletters.map((newsletter) => (
                            <TableRow key={newsletter.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{newsletter.title}</p>
                                        {newsletter.authorName && (
                                            <p className="text-sm text-muted-foreground">
                                                Par {newsletter.authorName}
                                            </p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {getNewsletterTypeLabel(newsletter.type)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={newsletter.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                                        {getStatusLabel(newsletter.status)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {newsletter.isPremium ? (
                                        <Badge variant="default">Premium</Badge>
                                    ) : (
                                        <Badge variant="outline">Gratuit</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {newsletter.publishedAt ? (
                                        <span>{formatDate(newsletter.publishedAt)}</span>
                                    ) : newsletter.scheduledFor ? (
                                        <span className="text-muted-foreground">
                      Prévu le {formatDate(newsletter.scheduledFor)}
                    </span>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={loadingId === newsletter.id}
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/archives/${newsletter.id}`} target="_blank">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Aperçu
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={ADMIN_ROUTES.NEWSLETTER_EDIT(newsletter.id)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDuplicate(newsletter.id)}>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Dupliquer
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            {newsletter.status === 'DRAFT' && (
                                                <DropdownMenuItem onClick={() => handlePublish(newsletter.id)}>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Publier
                                                </DropdownMenuItem>
                                            )}

                                            {newsletter.status === 'PUBLISHED' && (
                                                <DropdownMenuItem onClick={() => handleArchive(newsletter.id)}>
                                                    <Archive className="mr-2 h-4 w-4" />
                                                    Archiver
                                                </DropdownMenuItem>
                                            )}

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() => handleDelete(newsletter.id)}
                                                className="text-red-600"
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