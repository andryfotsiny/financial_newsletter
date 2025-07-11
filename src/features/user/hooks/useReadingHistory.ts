//src/features/user/hooks/useReadingHistory.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface ReadingHistoryItem {
    id: string
    contentType: 'NEWSLETTER' | 'ANALYSIS' | 'SELECTION'
    contentId: string
    readAt: Date
    readDuration?: number
    readProgress?: number
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

interface ReadingStats {
    totalReads: number
    totalDuration: number
    averageProgress: number
    weeklyReads: number
    monthlyReads: number
}

export function useReadingHistory() {
    const { data: session } = useSession()
    const [history, setHistory] = useState<ReadingHistoryItem[]>([])
    const [stats, setStats] = useState<ReadingStats>({
        totalReads: 0,
        totalDuration: 0,
        averageProgress: 0,
        weeklyReads: 0,
        monthlyReads: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Calculer les statistiques
    const calculateStats = (historyData: ReadingHistoryItem[]): ReadingStats => {
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

        const totalReads = historyData.length
        const totalDuration = historyData.reduce((sum, item) => sum + (item.readDuration || 0), 0)
        const averageProgress = totalReads > 0
            ? Math.round(historyData.reduce((sum, item) => sum + (item.readProgress || 0), 0) / totalReads)
            : 0
        const weeklyReads = historyData.filter(item => new Date(item.readAt) >= weekAgo).length
        const monthlyReads = historyData.filter(item => new Date(item.readAt) >= monthAgo).length

        return {
            totalReads,
            totalDuration,
            averageProgress,
            weeklyReads,
            monthlyReads
        }
    }

    // Charger l'historique
    const loadHistory = useCallback(async () => {
        if (!session?.user) return

        try {
            setLoading(true)
            setError(null)

            const response = await fetch('/api/users/history')
            if (!response.ok) {
                throw new Error('Erreur lors du chargement de l\'historique')
            }

            const data = await response.json()
            setHistory(data)
            setStats(calculateStats(data))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
        } finally {
            setLoading(false)
        }
    }, [session?.user])


    // Enregistrer une lecture
    const recordRead = async (
        contentType: string,
        contentId: string,
        readDuration?: number,
        readProgress?: number
    ) => {
        if (!session?.user) return false

        try {
            const response = await fetch('/api/users/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contentType,
                    contentId,
                    readDuration,
                    readProgress,
                }),
            })

            if (!response.ok) {
                throw new Error('Erreur lors de l\'enregistrement de la lecture')
            }

            // Recharger l'historique
            await loadHistory()
            return true
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
            return false
        }
    }

    // Mettre à jour la progression de lecture
    const updateProgress = async (historyId: string, readProgress: number) => {
        try {
            const response = await fetch(`/api/users/history/${historyId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ readProgress }),
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de la progression')
            }

            // Mettre à jour localement
            setHistory(prev =>
                prev.map(item =>
                    item.id === historyId
                        ? { ...item, readProgress }
                        : item
                )
            )

            return true
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
            return false
        }
    }

    // Supprimer un élément de l'historique
    const removeFromHistory = async (historyId: string) => {
        try {
            const response = await fetch(`/api/users/history/${historyId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'historique')
            }

            // Mettre à jour localement
            const updatedHistory = history.filter(item => item.id !== historyId)
            setHistory(updatedHistory)
            setStats(calculateStats(updatedHistory))
            return true
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue')
            return false
        }
    }

    // Vérifier si un contenu a été lu
    const hasRead = (contentType: string, contentId: string) => {
        return history.some(item =>
            item.contentType === contentType && item.contentId === contentId
        )
    }

    // Obtenir la progression de lecture d'un contenu
    const getReadProgress = (contentType: string, contentId: string) => {
        const item = history.find(item =>
            item.contentType === contentType && item.contentId === contentId
        )
        return item?.readProgress || 0
    }

    // Charger l'historique au montage
    useEffect(() => {
        loadHistory()
    }, [session?.user, loadHistory])

    return {
        history,
        stats,
        loading,
        error,
        recordRead,
        updateProgress,
        removeFromHistory,
        hasRead,
        getReadProgress,
        refetch: loadHistory
    }
}

// Hook pour tracker la lecture en temps réel
export function useReadingTracker(contentType: string, contentId: string) {
    const { recordRead, updateProgress } = useReadingHistory()
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [currentProgress, setCurrentProgress] = useState(0)
    const [isTracking, setIsTracking] = useState(false)

    // Démarrer le tracking
    const startTracking = () => {
        setStartTime(new Date())
        setIsTracking(true)
    }

    // Arrêter le tracking et enregistrer
    const stopTracking = async () => {
        if (!startTime) return

        const duration = Math.round((new Date().getTime() - startTime.getTime()) / 60000) // en minutes
        setIsTracking(false)

        await recordRead(contentType, contentId, duration, currentProgress)
    }

    // Mettre à jour la progression
    const updateCurrentProgress = (progress: number) => {
        setCurrentProgress(progress)
    }

    // Auto-save de la progression toutes les 30 secondes
    useEffect(() => {
        if (!isTracking) return

        const interval = setInterval(() => {
            if (currentProgress > 0) {
                updateProgress(contentId, currentProgress)
            }
        }, 30000) // 30 secondes

        return () => clearInterval(interval)
    }, [isTracking, currentProgress, contentId, updateProgress])

    return {
        startTracking,
        stopTracking,
        updateCurrentProgress,
        isTracking,
        currentProgress
    }
}