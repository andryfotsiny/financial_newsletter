import { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { prisma } from '@/shared/lib/prisma'
import { NewsletterList } from '@/features/newsletter/components/NewsletterList'
import { NewsletterFilters } from '@/features/newsletter/components/NewsletterFilters'
import { ADMIN_ROUTES } from '@/shared/constants/routes'
import type { NewsletterListItem } from '@/features/newsletter/types/newsletter.types'
import type { Prisma } from '@prisma/client'

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

    // Correction ici :
    const where: Prisma.NewsletterWhereInput = {}

    if (params?.type) {
        where.type = params.type as NewsletterListItem["type"]
    }

    if (params?.status) {
        where.status = params.status as NewsletterListItem["status"]
    }

    if (params?.search) {
        where.OR = [
            { title: { contains: params.search } },
            { content: { contains: params.search } },
        ]
    }

    // Le retour est déjà au bon type
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
        orderBy: { createdAt: 'desc' },
    }) as NewsletterListItem[];

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
            <NewsletterList newsletters={newsletters} />
        </div>
    )
}