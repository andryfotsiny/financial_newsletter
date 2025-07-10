import {
    CreateNewsletterInput,
    UpdateNewsletterInput,
    Newsletter,
    NewsletterListItem,
    NewsletterFilters
} from '../types/newsletter.types'

const API_BASE = '/api/newsletters'

export const newsletterService = {
    // Récupérer la liste des newsletters
    async getAll(filters?: NewsletterFilters): Promise<NewsletterListItem[]> {
        const params = new URLSearchParams()

        if (filters) {
            if (filters.type) params.append('type', filters.type)
            if (filters.status) params.append('status', filters.status)
            if (filters.isPremium !== undefined) params.append('isPremium', String(filters.isPremium))
            if (filters.search) params.append('search', filters.search)
            if (filters.dateFrom) params.append('dateFrom', filters.dateFrom.toISOString())
            if (filters.dateTo) params.append('dateTo', filters.dateTo.toISOString())
        }

        const response = await fetch(`${API_BASE}?${params}`)
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des newsletters')
        }

        const data = await response.json()
        return data.newsletters
    },

    // Récupérer une newsletter par ID
    async getById(id: string): Promise<Newsletter> {
        const response = await fetch(`${API_BASE}/${id}`)
        if (!response.ok) {
            throw new Error('Newsletter non trouvée')
        }

        const data = await response.json()
        return data.newsletter
    },

    // Créer une nouvelle newsletter
    async create(input: CreateNewsletterInput): Promise<Newsletter> {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Erreur lors de la création')
        }

        const data = await response.json()
        return data.newsletter
    },

    // Mettre à jour une newsletter
    async update(id: string, input: UpdateNewsletterInput): Promise<Newsletter> {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Erreur lors de la mise à jour')
        }

        const data = await response.json()
        return data.newsletter
    },

    // Supprimer une newsletter
    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression')
        }
    },

    // Publier une newsletter
    async publish(id: string): Promise<Newsletter> {
        const response = await fetch(`${API_BASE}/${id}/publish`, {
            method: 'POST',
        })

        if (!response.ok) {
            throw new Error('Erreur lors de la publication')
        }

        const data = await response.json()
        return data.newsletter
    },

    // Archiver une newsletter
    async archive(id: string): Promise<Newsletter> {
        const response = await fetch(`${API_BASE}/${id}/archive`, {
            method: 'POST',
        })

        if (!response.ok) {
            throw new Error('Erreur lors de l\'archivage')
        }

        const data = await response.json()
        return data.newsletter
    },

    // Dupliquer une newsletter
    async duplicate(id: string): Promise<Newsletter> {
        const response = await fetch(`${API_BASE}/${id}/duplicate`, {
            method: 'POST',
        })

        if (!response.ok) {
            throw new Error('Erreur lors de la duplication')
        }

        const data = await response.json()
        return data.newsletter
    },

    // Générer un slug unique
    generateSlug(title: string): string {
        return title
            .toLowerCase()
            .trim()
            .replace(/[àáäâ]/g, 'a')
            .replace(/[èéëê]/g, 'e')
            .replace(/[ìíïî]/g, 'i')
            .replace(/[òóöô]/g, 'o')
            .replace(/[ùúüû]/g, 'u')
            .replace(/[ñ]/g, 'n')
            .replace(/[ç]/g, 'c')
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
    }
}