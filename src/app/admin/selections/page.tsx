//src/app/admin/selections/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SelectionList } from '@/features/selection/components/SelectionList'
import { SelectionFilters } from '@/features/selection/components/SelectionFilters'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

export const metadata: Metadata = {
    title: 'Sélections - Administration',
    description: 'Gérer les sélections d\'investissement',
}

interface PageProps {
    searchParams: Promise<{
        type?: string
        status?: string
        search?: string
        theme?: string
        risk?: string
    }>
}

// Données statiques pour les sélections
const staticSelections = [
    {
        id: '1',
        title: 'Sélection momentum - Actions européennes Q4 2024',
        type: 'MOMENTUM_SELECTION',
        status: 'PUBLISHED' as const,
        isPremium: true,
        theme: 'Momentum Europe',
        stocksCount: 12,
        expectedReturn: 18.5,
        riskLevel: 'MEDIUM' as const,
        publishedAt: new Date('2024-12-13'),
        authorName: 'Pierre Dubois'
    },
    {
        id: '2',
        title: 'Intelligence Artificielle - Top 10 des valeurs tech',
        type: 'THEMATIC_SELECTION',
        status: 'PUBLISHED' as const,
        isPremium: true,
        theme: 'Intelligence Artificielle',
        stocksCount: 10,
        expectedReturn: 25.0,
        riskLevel: 'HIGH' as const,
        publishedAt: new Date('2024-12-12'),
        authorName: 'Marie Martin'
    },
    {
        id: '3',
        title: 'Portefeuille dividendes - Actions françaises',
        type: 'DIVIDEND_SELECTION',
        status: 'PUBLISHED' as const,
        isPremium: false,
        theme: 'Dividendes',
        stocksCount: 15,
        expectedReturn: 8.2,
        riskLevel: 'LOW' as const,
        publishedAt: new Date('2024-12-11'),
        authorName: 'Jean Dupont'
    },
    {
        id: '4',
        title: 'ETF thématiques - Transition énergétique',
        type: 'ETF_SELECTION',
        status: 'DRAFT' as const,
        isPremium: true,
        theme: 'Énergie Verte',
        stocksCount: 8,
        expectedReturn: 15.3,
        riskLevel: 'MEDIUM' as const,
        authorName: 'Thomas Bernard'
    },
    {
        id: '5',
        title: 'Value européenne - Opportunités sous-évaluées',
        type: 'VALUE_SELECTION',
        status: 'PUBLISHED' as const,
        isPremium: true,
        theme: 'Value Europe',
        stocksCount: 20,
        expectedReturn: 12.8,
        riskLevel: 'LOW' as const,
        publishedAt: new Date('2024-12-10'),
        authorName: 'Sophie Chen'
    },
    {
        id: '6',
        title: 'Small Caps prometteuses - Croissance française',
        type: 'STOCK_SELECTION',
        status: 'DRAFT' as const,
        isPremium: true,
        theme: 'Small Caps',
        stocksCount: 25,
        expectedReturn: 22.0,
        riskLevel: 'HIGH' as const,
        authorName: 'Antoine Moreau'
    },
    {
        id: '7',
        title: 'Biotechnologie - Leaders pharmaceutiques',
        type: 'THEMATIC_SELECTION',
        status: 'ARCHIVED' as const,
        isPremium: true,
        theme: 'Biotechnologie',
        stocksCount: 8,
        expectedReturn: 16.5,
        riskLevel: 'HIGH' as const,
        publishedAt: new Date('2024-12-05'),
        authorName: 'Dr. Claire Vidal'
    },
    {
        id: '8',
        title: 'Cybersécurité - Protection numérique',
        type: 'THEMATIC_SELECTION',
        status: 'PUBLISHED' as const,
        isPremium: true,
        theme: 'Cybersécurité',
        stocksCount: 7,
        expectedReturn: 19.2,
        riskLevel: 'MEDIUM' as const,
        publishedAt: new Date('2024-12-08'),
        authorName: 'Isabelle Durand'
    }
]

export default async function SelectionsAdminPage({ searchParams }: PageProps) {
    // Attendre les searchParams
    const params = await searchParams

    // Appliquer les filtres sur les données statiques
    let filteredSelections = staticSelections

    if (params?.type && params.type !== 'all') {
        filteredSelections = filteredSelections.filter(selection => selection.type === params.type)
    }

    if (params?.status && params.status !== 'all') {
        filteredSelections = filteredSelections.filter(selection => selection.status === params.status)
    }

    if (params?.risk && params.risk !== 'all') {
        filteredSelections = filteredSelections.filter(selection => selection.riskLevel === params.risk)
    }

    if (params?.theme && params.theme !== 'all') {
        filteredSelections = filteredSelections.filter(selection =>
            selection.theme?.toLowerCase().includes(params.theme!.toLowerCase())
        )
    }

    if (params?.search) {
        const searchLower = params.search.toLowerCase()
        filteredSelections = filteredSelections.filter(selection =>
            selection.title.toLowerCase().includes(searchLower) ||
            selection.theme?.toLowerCase().includes(searchLower) ||
            selection.authorName?.toLowerCase().includes(searchLower)
        )
    }

    // Calculer les statistiques
    const stats = {
        total: staticSelections.length,
        published: staticSelections.filter(s => s.status === 'PUBLISHED').length,
        draft: staticSelections.filter(s => s.status === 'DRAFT').length,
        premium: staticSelections.filter(s => s.isPremium).length,
        avgReturn: Math.round(
            staticSelections
                .filter(s => s.expectedReturn)
                .reduce((sum, s) => sum + (s.expectedReturn || 0), 0) /
            staticSelections.filter(s => s.expectedReturn).length * 10
        ) / 10
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Sélections</h1>
                    <p className="text-muted-foreground mt-2">
                        Gérez vos sélections d&#39;investissement et recommandations thématiques
                    </p>
                </div>
                <Button asChild>
                    <Link href={ADMIN_ROUTES.SELECTION_CREATE}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvelle sélection
                    </Link>
                </Button>
            </div>

            {/* Filtres */}
            <SelectionFilters />

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">
                        {stats.total}
                    </div>
                    <div className="text-sm text-muted-foreground">Total sélections</div>
                </div>
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">
                        {stats.published}
                    </div>
                    <div className="text-sm text-muted-foreground">Publiées</div>
                </div>
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-orange-600">
                        {stats.draft}
                    </div>
                    <div className="text-sm text-muted-foreground">En brouillon</div>
                </div>
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600">
                        {stats.premium}
                    </div>
                    <div className="text-sm text-muted-foreground">Premium</div>
                </div>
                <div className=" p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-emerald-600">
                        +{stats.avgReturn}%
                    </div>
                    <div className="text-sm text-muted-foreground">Rendement moyen</div>
                </div>
            </div>

            {/* Résultats */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {filteredSelections.length} sélection{filteredSelections.length > 1 ? 's' : ''} trouvée{filteredSelections.length > 1 ? 's' : ''}
                </p>
            </div>

            {/* Liste */}
            <SelectionList selections={filteredSelections} />
        </div>
    )
}