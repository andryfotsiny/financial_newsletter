//src/app/(dashboard)/account/history/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSession } from '@/shared/lib/auth-instance'
//import { prisma } from '@/shared/lib/prisma'
import { ReadingHistory } from '@/features/user/components/ReadingHistory'

export const metadata: Metadata = {
    title: 'Historique de lecture',
    description: 'Consultez votre historique de lecture et vos statistiques',
}

// Données statiques pour l'historique de lecture
const staticHistory = [
    {
        id: '1',
        contentType: 'NEWSLETTER' as const,
        contentId: 'newsletter-1',
        readAt: new Date('2024-12-15T08:30:00'),
        readDuration: 12,
        readProgress: 100,
        content: {
            id: 'newsletter-1',
            title: 'Récapitulatif des marchés - Semaine du 9 décembre',
            excerpt: 'Une semaine marquée par la volatilité des marchés européens avec des mouvements significatifs...',
            slug: 'recap-marches-semaine-9-decembre',
            type: 'WEEKLY',
            isPremium: false,
            publishedAt: new Date('2024-12-15'),
            authorName: 'Jean Dupont'
        }
    },
    {
        id: '2',
        contentType: 'ANALYSIS' as const,
        contentId: 'analysis-1',
        readAt: new Date('2024-12-14T14:15:00'),
        readDuration: 25,
        readProgress: 85,
        content: {
            id: 'analysis-1',
            title: 'Apple (AAPL) - Analyse technique et fondamentale',
            excerpt: 'Analyse approfondie du géant technologique américain avec focus sur les perspectives 2025...',
            slug: 'apple-aapl-analyse-technique-fondamentale',
            type: 'STOCK_ANALYSIS',
            isPremium: true,
            publishedAt: new Date('2024-12-14'),
            authorName: 'Marie Martin'
        }
    },
    {
        id: '3',
        contentType: 'SELECTION' as const,
        contentId: 'selection-1',
        readAt: new Date('2024-12-13T16:45:00'),
        readDuration: 18,
        readProgress: 100,
        content: {
            id: 'selection-1',
            title: 'Sélection momentum - Actions européennes',
            excerpt: 'Notre sélection de valeurs européennes présentant un momentum positif...',
            slug: 'selection-momentum-actions-europeennes',
            type: 'STOCK_SELECTION',
            isPremium: true,
            publishedAt: new Date('2024-12-13'),
            authorName: 'Pierre Dubois'
        }
    },
    {
        id: '4',
        contentType: 'NEWSLETTER' as const,
        contentId: 'newsletter-2',
        readAt: new Date('2024-12-12T09:20:00'),
        readDuration: 8,
        readProgress: 100,
        content: {
            id: 'newsletter-2',
            title: 'Actualités financières du 12 décembre',
            excerpt: 'Les dernières nouvelles du monde de la finance : résultats trimestriels...',
            slug: 'actualites-financieres-12-decembre',
            type: 'DAILY',
            isPremium: false,
            publishedAt: new Date('2024-12-12'),
            authorName: 'Sarah Lemoine'
        }
    },
    {
        id: '5',
        contentType: 'ANALYSIS' as const,
        contentId: 'analysis-2',
        readAt: new Date('2024-12-11T11:10:00'),
        readDuration: 22,
        readProgress: 65,
        content: {
            id: 'analysis-2',
            title: 'Secteur énergétique - Opportunités 2025',
            excerpt: 'Analyse sectorielle complète sur les opportunités d\'investissement dans l\'énergie...',
            slug: 'secteur-energetique-opportunites-2025',
            type: 'SECTOR_ANALYSIS',
            isPremium: true,
            publishedAt: new Date('2024-12-11'),
            authorName: 'Thomas Bernard'
        }
    },
    {
        id: '6',
        contentType: 'NEWSLETTER' as const,
        contentId: 'newsletter-3',
        readAt: new Date('2024-12-10T07:45:00'),
        readDuration: 10,
        readProgress: 100,
        content: {
            id: 'newsletter-3',
            title: 'Flash info marchés - Ouverture européenne',
            excerpt: 'Les points clés à retenir avant l\'ouverture des marchés européens...',
            slug: 'flash-info-marches-ouverture-europeenne',
            type: 'DAILY',
            isPremium: false,
            publishedAt: new Date('2024-12-10'),
            authorName: 'Antoine Moreau'
        }
    },
    {
        id: '7',
        contentType: 'ANALYSIS' as const,
        contentId: 'analysis-3',
        readAt: new Date('2024-12-09T15:30:00'),
        readDuration: 30,
        readProgress: 45,
        content: {
            id: 'analysis-3',
            title: 'Nvidia (NVDA) - Impact de l\'IA sur la valorisation',
            excerpt: 'Analyse de l\'impact de l\'intelligence artificielle sur la valorisation de Nvidia...',
            slug: 'nvidia-nvda-impact-ia-valorisation',
            type: 'STOCK_ANALYSIS',
            isPremium: true,
            publishedAt: new Date('2024-12-09'),
            authorName: 'Isabelle Durand'
        }
    }
]

// Calculer les statistiques
const calculateStats = (history: typeof staticHistory) => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const totalReads = history.length
    const totalDuration = history.reduce((sum, item) => sum + (item.readDuration || 0), 0)
    const averageProgress = Math.round(
        history.reduce((sum, item) => sum + (item.readProgress || 0), 0) / history.length
    )
    const weeklyReads = history.filter(item => item.readAt >= weekAgo).length

    return {
        totalReads,
        totalDuration,
        averageProgress,
        weeklyReads
    }
}

export default async function HistoryPage() {
    const session = await getSession()

    if (!session?.user) {
        notFound()
    }

    // Pour l'instant, on utilise les données statiques
    // Plus tard, on récupérera les vraies données :
    /*
    const history = await prisma.readHistory.findMany({
        where: { userId: session.user.id },
        include: {
            // Jointures conditionnelles selon contentType
        },
        orderBy: { readAt: 'desc' }
    })
    */

    const stats = calculateStats(staticHistory)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Historique de lecture</h1>
                <p className="text-muted-foreground mt-2">
                    Consultez votre historique de lecture et suivez vos statistiques de lecture
                </p>
            </div>

            <ReadingHistory
                history={staticHistory}
                stats={stats}
            />
        </div>
    )
}