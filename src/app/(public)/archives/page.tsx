import { Metadata } from 'next'
import { ContentArchive } from '@/features/content/components/ContentArchive'
import { ContentFilters } from '@/features/content/components/ContentFilters'

export const metadata: Metadata = {
    title: 'Archives',
    description: 'Consultez toutes nos newsletters et analyses',
}



export default async function ArchivesPage() {
    // Pour la démonstration client, on utilise des données statiques
    // Plus tard, vous pourrez remettre la logique Prisma

    // const params = await searchParams
    // const page = Number(params?.page) || 1
    // const limit = 12
    // const skip = (page - 1) * limit

    // // Construire les filtres
    // const where: Record<string, unknown> = {
    //     status: 'PUBLISHED', // Seulement les newsletters publiées
    // }

    // if (params?.type && params.type !== 'all') {
    //     where.type = params.type
    // }

    // if (params?.search) {
    //     where.OR = [
    //         { title: { contains: params.search, mode: 'insensitive' } },
    //         { excerpt: { contains: params.search, mode: 'insensitive' } },
    //     ]
    // }

    // // Récupérer les newsletters
    // const [newsletters, totalCount] = await Promise.all([
    //     prisma.newsletter.findMany({
    //         where,
    //         select: {
    //             id: true,
    //             title: true,
    //             subtitle: true,
    //             excerpt: true,
    //             type: true,
    //             isPremium: true,
    //             slug: true,
    //             publishedAt: true,
    //             authorName: true,
    //         },
    //         orderBy: {
    //             publishedAt: 'desc',
    //         },
    //         skip,
    //         take: limit,
    //     }),
    //     prisma.newsletter.count({ where }),
    // ])

    // const totalPages = Math.ceil(totalCount / limit)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold">Retrouvez toutes nos newsletters</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Retrouvez toutes nos publications : actualités marchés, recherches, sélections de titres
                        et analyses macroéconomiques
                    </p>
                </div>

                {/* Filtres */}
                <ContentFilters />

                {/* Composant ContentArchive avec données statiques */}
                <ContentArchive />
            </div>
        </div>
    )
}