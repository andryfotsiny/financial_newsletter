//src/app/admin/analyses/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
//import { prisma } from '@/shared/lib/prisma'
import { AnalysisList } from '@/features/analysis/components/AnalysisList'
import { AnalysisFilters } from '@/features/analysis/components/AnalysisFilters'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

export const metadata: Metadata = {
    title: 'Analyses - Administration',
    description: 'Gérer les analyses financières',
}

interface PageProps {
    searchParams: Promise<{
        type?: string
        status?: string
        search?: string
        sector?: string
        recommendation?: string
    }>
}

// Données statiques pour les analyses
const staticAnalyses = [
    {
        id: '1',
        title: 'Apple (AAPL) - Analyse technique et fondamentale Q4 2024',
        type: 'STOCK_ANALYSIS',
        status: 'PUBLISHED' as const,
        isPremium: true,
        ticker: 'AAPL',
        sector: 'Technology',
        recommendation: 'BUY',
        targetPrice: 250.00,
        publishedAt: new Date('2024-12-15'),
        authorName: 'Marie Martin'
    },
    {
        id: '2',
        title: 'Secteur énergétique européen - Opportunités 2025',
        type: 'SECTOR_ANALYSIS',
        status: 'PUBLISHED' as const,
        isPremium: true,
        sector: 'Energy',
        recommendation: 'HOLD',
        publishedAt: new Date('2024-12-14'),
        authorName: 'Thomas Bernard'
    },
    {
        id: '3',
        title: 'Nvidia (NVDA) - Impact de l\'IA sur la valorisation',
        type: 'FUNDAMENTAL_ANALYSIS',
        status: 'DRAFT' as const,
        isPremium: true,
        ticker: 'NVDA',
        sector: 'Technology',
        recommendation: 'BUY',
        targetPrice: 180.50,
        authorName: 'Isabelle Durand'
    },
    {
        id: '4',
        title: 'Analyse macroéconomique - Zone Euro T4 2024',
        type: 'MACRO_ANALYSIS',
        status: 'PUBLISHED' as const,
        isPremium: true,
        publishedAt: new Date('2024-12-13'),
        authorName: 'Pierre Dubois'
    },
    {
        id: '5',
        title: 'Microsoft (MSFT) - Analyse technique court terme',
        type: 'TECHNICAL_ANALYSIS',
        status: 'PUBLISHED' as const,
        isPremium: false,
        ticker: 'MSFT',
        sector: 'Technology',
        recommendation: 'HOLD',
        targetPrice: 420.00,
        publishedAt: new Date('2024-12-12'),
        authorName: 'Sophie Chen'
    },
    {
        id: '6',
        title: 'Secteur bancaire français - Perspectives 2025',
        type: 'SECTOR_ANALYSIS',
        status: 'DRAFT' as const,
        isPremium: true,
        sector: 'Finance',
        recommendation: 'BUY',
        authorName: 'Jean Dupont'
    },
    {
        id: '7',
        title: 'Tesla (TSLA) - Analyse post-résultats Q3',
        type: 'STOCK_ANALYSIS',
        status: 'ARCHIVED' as const,
        isPremium: true,
        ticker: 'TSLA',
        sector: 'Consumer',
        recommendation: 'SELL',
        targetPrice: 180.00,
        publishedAt: new Date('2024-12-10'),
        authorName: 'Antoine Moreau'
    },
    {
        id: '8',
        title: 'Analyse fondamentale du secteur pharmaceutique',
        type: 'FUNDAMENTAL_ANALYSIS',
        status: 'PUBLISHED' as const,
        isPremium: true,
        sector: 'Healthcare',
        recommendation: 'BUY',
        publishedAt: new Date('2024-12-09'),
        authorName: 'Dr. Claire Vidal'
    }
]

export default async function AnalysesAdminPage({ searchParams }: PageProps) {
    // Attendre les searchParams
    const params = await searchParams

    // Appliquer les filtres sur les données statiques
    let filteredAnalyses = staticAnalyses

    if (params?.type && params.type !== 'all') {
        filteredAnalyses = filteredAnalyses.filter(analysis => analysis.type === params.type)
    }

    if (params?.status && params.status !== 'all') {
        filteredAnalyses = filteredAnalyses.filter(analysis => analysis.status === params.status)
    }

    if (params?.sector && params.sector !== 'all') {
        filteredAnalyses = filteredAnalyses.filter(analysis => analysis.sector === params.sector)
    }

    if (params?.recommendation && params.recommendation !== 'all') {
        filteredAnalyses = filteredAnalyses.filter(analysis => analysis.recommendation === params.recommendation)
    }

    if (params?.search) {
        const searchLower = params.search.toLowerCase()
        filteredAnalyses = filteredAnalyses.filter(analysis =>
            analysis.title.toLowerCase().includes(searchLower) ||
            analysis.ticker?.toLowerCase().includes(searchLower) ||
            analysis.sector?.toLowerCase().includes(searchLower) ||
            analysis.authorName?.toLowerCase().includes(searchLower)
        )
    }

    // Pour la production, on utiliserait Prisma :
    /*
    const where: Prisma.AnalysisWhereInput = {}

    if (params?.type && params.type !== 'all') {
        where.type = params.type
    }

    if (params?.status && params.status !== 'all') {
        where.status = params.status
    }

    if (params?.sector && params.sector !== 'all') {
        where.sector = params.sector
    }

    if (params?.recommendation && params.recommendation !== 'all') {
        where.recommendation = params.recommendation
    }

    if (params?.search) {
        where.OR = [
            { title: { contains: params.search, mode: 'insensitive' } },
            { content: { contains: params.search, mode: 'insensitive' } },
            { ticker: { contains: params.search, mode: 'insensitive' } },
            { sector: { contains: params.search, mode: 'insensitive' } },
        ]
    }

    const analyses = await prisma.analysis.findMany({
        where,
        select: {
            id: true,
            title: true,
            type: true,
            status: true,
            isPremium: true,
            ticker: true,
            sector: true,
            recommendation: true,
            targetPrice: true,
            publishedAt: true,
            authorName: true,
        },
        orderBy: { createdAt: 'desc' },
    })
    */

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Analyses</h1>
                    <p className="text-muted-foreground mt-2">
                        Gérez vos analyses financières et recommandations d&#39;investissement
                    </p>
                </div>
                <Button asChild>
                    <Link href={ADMIN_ROUTES.ANALYSIS_CREATE}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvelle analyse
                    </Link>
                </Button>
            </div>

            {/* Filtres */}
            <AnalysisFilters />

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">
                        {staticAnalyses.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total analyses</div>
                </div>
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">
                        {staticAnalyses.filter(a => a.status === 'PUBLISHED').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Publiées</div>
                </div>
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-orange-600">
                        {staticAnalyses.filter(a => a.status === 'DRAFT').length}
                    </div>
                    <div className="text-sm text-muted-foreground">En brouillon</div>
                </div>
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600">
                        {staticAnalyses.filter(a => a.isPremium).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Premium</div>
                </div>
            </div>

            {/* Résultats */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {filteredAnalyses.length} analyse{filteredAnalyses.length > 1 ? 's' : ''} trouvée{filteredAnalyses.length > 1 ? 's' : ''}
                </p>
            </div>

            {/* Liste */}
            <AnalysisList analyses={filteredAnalyses} />
        </div>
    )
}