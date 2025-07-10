import Link from 'next/link'
import { Calendar, Lock } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/shared/lib/utils'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { getNewsletterTypeLabel } from '@/features/newsletter/types/newsletter.types'
import {NewsletterType} from "@/shared/types/database";

interface ContentItem {
    id: string
    title: string
    subtitle: string | null
    excerpt: string | null
    type: string
    isPremium: boolean
    slug: string
    publishedAt: Date | null
    authorName: string | null
}

interface ContentArchiveProps {
    items: ContentItem[]
    currentPage: number
    totalPages: number
}

export function ContentArchive({ items, currentPage, totalPages }: ContentArchiveProps) {
    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun contenu trouvé</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Grille de contenus */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <Card key={item.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1 flex-1">
                                    <h3 className="font-semibold line-clamp-2">
                                        {item.title}
                                    </h3>
                                    {item.subtitle && (
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                                {item.isPremium && (
                                    <Badge variant="default" className="shrink-0">
                                        <Lock className="h-3 w-3 mr-1" />
                                        Premium
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1">
                            {item.excerpt && (
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {item.excerpt}
                                </p>
                            )}

                            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                                <Badge variant="outline">
                                    {getNewsletterTypeLabel(item.type as NewsletterType )}
                                </Badge>

                                {item.publishedAt && (
                                    <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                                        {formatDate(item.publishedAt)}
                  </span>
                                )}

                                {item.authorName && (
                                    <span className="text-xs">
                    Par {item.authorName}
                  </span>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${item.slug}`}>
                                    Lire la suite
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        asChild={currentPage > 1}
                    >
                        {currentPage > 1 ? (
                            <Link href={`?page=${currentPage - 1}`}>Précédent</Link>
                        ) : (
                            <span>Précédent</span>
                        )}
                    </Button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? 'default' : 'outline'}
                                size="sm"
                                asChild={page !== currentPage}
                            >
                                {page === currentPage ? (
                                    <span>{page}</span>
                                ) : (
                                    <Link href={`?page=${page}`}>{page}</Link>
                                )}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        asChild={currentPage < totalPages}
                    >
                        {currentPage < totalPages ? (
                            <Link href={`?page=${currentPage + 1}`}>Suivant</Link>
                        ) : (
                            <span>Suivant</span>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}