//src/features/user/hooks/useFavorites.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface Favorite {
    id: string
    contentType: 'NEWSLETTER' | 'ANALYSIS' | 'SELECTION'
    contentId: string
    createdAt: Date
    content: {
        id: string
        title: string
        excerpt?: string
        slug: string
        type: string
        isPremium: boolean
        publishedAt?: Date
        authorName?: string
    }
}

export function useFavorites() {
    const { data: session } = useSession()
    const [favorites, setFavorites] = useState<Favorite[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Charger les favoris
    const loadFavorites = useCallback(async () => {
        if (!session?.user) return

        try {
            setLoading(true)
            setError(null)

            const response = await fetch('/api/users/favorites')
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des favoris')
            }

            const data = await response.json()
            setFavorites(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
        } finally {
            setLoading(false)
        }
    }, [session?.user])


    // Ajouter un favori
    const addFavorite = async (contentType: string, contentId: string) => {
        if (!session?.user) return false

        try {
            const response = await fetch('/api/users/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contentType,
                    contentId,
                }),
            })

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout aux favoris')
            }

            const newFavorite = await response.json()
            setFavorites(prev => [newFavorite, ...prev])
            return true
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
            return false
        }
    }

    // Supprimer un favori
    const removeFavorite = async (favoriteId: string) => {
        if (!session?.user) return false

        try {
            const response = await fetch(`/api/users/favorites/${favoriteId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du favori')
            }

            setFavorites(prev => prev.filter(fav => fav.id !== favoriteId))
            return true
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
            return false
        }
    }

    // Vérifier si un contenu est en favori
    const isFavorite = (contentType: string, contentId: string) => {
        return favorites.some(fav =>
            fav.contentType === contentType && fav.contentId === contentId
        )
    }

    // Basculer le statut favori
    const toggleFavorite = async (contentType: string, contentId: string) => {
        const favorite = favorites.find(fav =>
            fav.contentType === contentType && fav.contentId === contentId
        )

        if (favorite) {
            return await removeFavorite(favorite.id)
        } else {
            return await addFavorite(contentType, contentId)
        }
    }

    // Charger les favoris au montage
    useEffect(() => {
        loadFavorites()
    }, [session?.user, loadFavorites])

    return {
        favorites,
        loading,
        error,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        refetch: loadFavorites
    }
}

// Hook pour gérer un favori spécifique
export function useFavoriteToggle(contentType: string, contentId: string) {
    const { isFavorite, toggleFavorite } = useFavorites()
    const [isToggling, setIsToggling] = useState(false)

    const handleToggle = async () => {
        setIsToggling(true)
        try {
            await toggleFavorite(contentType, contentId)
        } finally {
            setIsToggling(false)
        }
    }

    return {
        isFavorite: isFavorite(contentType, contentId),
        isToggling,
        toggle: handleToggle
    }
}