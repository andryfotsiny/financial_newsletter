import { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { prisma } from '@/shared/lib/prisma'
import { NewsletterList } from '@/features/newsletter/components/NewsletterList'
import { NewsletterFilters } from '@/features/newsletter/components/NewsletterFilters'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

export const metadata: Metadata = {
    title: 'Newsletters - Administration',
    description: 'Gérer les newsletters',
}

interface PageProps {
    searchParams: Promise<{
        type?: string
        status?: string
        search?: string
    }>
}

export default async function NewslettersAdminPage({ searchParams }: PageProps) {
    // Attendre les searchParams
    const params = await searchParams

    // Construire les filtres depuis les query params
    const where: Record<string, any> = {}

    if (params?.type) {
        where.type = params.type
    }

    if (params?.status) {
        where.status = params.status
    }

    if (params?.search) {
        where.OR = [
            { title: { contains: params.search, mode: 'insensitive' } },
            { content: { contains: params.search, mode: 'insensitive' } },
        ]
    }

    // Récupérer les newsletters
    const newsletters = await prisma.newsletter.findMany({
        where,
        select: {
            id: true,
            title: true,
            type: true,
            status: true,
            isPremium: true,
            publishedAt: true,
            scheduledFor: true,
            authorName: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Newsletters</h1>
                    <p className="text-muted-foreground mt-2">
                        Gérez vos newsletters et publications
                    </p>
                </div>
                <Button asChild>
                    <Link href={ADMIN_ROUTES.NEWSLETTER_CREATE}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvelle newsletter
                    </Link>
                </Button>
            </div>

            {/* Filtres */}
            <NewsletterFilters />

            {/* Liste */}
            <NewsletterList newsletters={newsletters as any} />
        </div>
    )
}