import { Metadata } from 'next'
import { prisma } from '@/shared/lib/prisma'
import { ContentArchive } from '@/features/content/components/ContentArchive'
import { ContentFilters } from '@/features/content/components/ContentFilters'

export const metadata: Metadata = {
    title: 'Archives',
    description: 'Consultez toutes nos newsletters et analyses',
}

interface PageProps {
    searchParams: Promise<{
        type?: string
        search?: string
        page?: string
    }>
}

export default async function ArchivesPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Number(params?.page) || 1
    const limit = 12
    const skip = (page - 1) * limit

    // Construire les filtres
    const where: Record<string, unknown> = {
        status: 'PUBLISHED', // Seulement les newsletters publiées
    }

    if (params?.type && params.type !== 'all') {
        where.type = params.type
    }

    if (params?.search) {
        where.OR = [
            { title: { contains: params.search, mode: 'insensitive' } },
            { excerpt: { contains: params.search, mode: 'insensitive' } },
        ]
    }

    // Récupérer les newsletters
    const [newsletters, totalCount] = await Promise.all([
        prisma.newsletter.findMany({
            where,
            select: {
                id: true,
                title: true,
                subtitle: true,
                excerpt: true,
                type: true,
                isPremium: true,
                slug: true,
                publishedAt: true,
                authorName: true,
            },
            orderBy: {
                publishedAt: 'desc',
            },
            skip,
            take: limit,
        }),
        prisma.newsletter.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold">Archives</h1>
                    <p className="text-lg text-muted-foreground">
                        Retrouvez toutes nos newsletters et analyses financières
                    </p>
                </div>

                {/* Filtres */}
                <ContentFilters />

                {/* Liste des contenus */}
                <ContentArchive
                    items={newsletters}
                    currentPage={page}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}