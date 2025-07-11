//src/app/(dashboard)/favorites/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSession } from '@/shared/lib/auth-instance'
//import { prisma } from '@/shared/lib/prisma'
import { FavoritesList } from '@/features/user/components/FavoritesList'

export const metadata: Metadata = {
    title: 'Mes favoris',
    description: 'Retrouvez tous vos articles et analyses favoris',
}

// Données statiques pour les favoris
const staticFavorites = [
    {
        id: '1',
        contentType: 'NEWSLETTER' as const,
        contentId: 'newsletter-1',
        createdAt: new Date('2024-12-15'),
        content: {
            id: 'newsletter-1',
            title: 'Récapitulatif des marchés - Semaine du 9 décembre',
            excerpt: 'Une semaine marquée par la volatilité des marchés européens avec des mouvements significatifs sur les indices...',
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
        createdAt: new Date('2024-12-14'),
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
        createdAt: new Date('2024-12-13'),
        content: {
            id: 'selection-1',
            title: 'Sélection momentum - Actions européennes',
            excerpt: 'Notre sélection de valeurs européennes présentant un momentum positif pour les prochains mois...',
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
        createdAt: new Date('2024-12-12'),
        content: {
            id: 'newsletter-2',
            title: 'Actualités financières du 12 décembre',
            excerpt: 'Les dernières nouvelles du monde de la finance : résultats trimestriels, fusions-acquisitions...',
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
        createdAt: new Date('2024-12-11'),
        content: {
            id: 'analysis-2',
            title: 'Secteur énergétique - Opportunités 2025',
            excerpt: 'Analyse sectorielle complète sur les opportunités d\'investissement dans l\'énergie pour 2025...',
            slug: 'secteur-energetique-opportunites-2025',
            type: 'SECTOR_ANALYSIS',
            isPremium: true,
            publishedAt: new Date('2024-12-11'),
            authorName: 'Thomas Bernard'
        }
    }
]

async function removeFavoriteAction(favoriteId: string) {
    'use server'

    try {
        // Ici on supprimerait réellement le favori
        // await prisma.favorite.delete({
        //     where: { id: favoriteId }
        // })
        console.log(`Removing favorite ${favoriteId}`)
    } catch (error) {
        console.error('Error removing favorite:', error)
        throw error
    }
}

export default async function FavoritesPage() {
    const session = await getSession()

    if (!session?.user) {
        notFound()
    }

    // Pour l'instant, on utilise les données statiques
    // Plus tard, on récupérera les vraies données :
    /*
    const favorites = await prisma.favorite.findMany({
        where: { userId: session.user.id },
        include: {
            // On devra faire des jointures conditionnelles selon contentType
        },
        orderBy: { createdAt: 'desc' }
    })
    */

    const handleRemoveFavorite = async (favoriteId: string) => {
        'use server'
        await removeFavoriteAction(favoriteId)
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Mes favoris</h1>
                <p className="text-muted-foreground mt-2">
                    Retrouvez tous vos articles et analyses favoris en un seul endroit
                </p>
            </div>

            <FavoritesList
                favorites={staticFavorites}
                onRemoveFavorite={handleRemoveFavorite}
            />
        </div>
    )
}