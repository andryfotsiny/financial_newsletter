'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { NewsletterType, ContentStatus } from '../types/newsletter.types'

export function NewsletterFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value && value !== 'all') {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        router.push(`?${params.toString()}`)
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const search = formData.get('search') as string

        const params = new URLSearchParams(searchParams.toString())
        if (search) {
            params.set('search', search)
        } else {
            params.delete('search')
        }

        router.push(`?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push('?')
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Recherche */}
            <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        name="search"
                        placeholder="Rechercher..."
                        defaultValue={searchParams.get('search') || ''}
                        className="pl-10"
                    />
                </div>
            </form>

            {/* Filtre par type */}
            <Select
                value={searchParams.get('type') || 'all'}
                onValueChange={(value) => handleFilter('type', value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value={NewsletterType.DAILY}>Quotidienne</SelectItem>
                    <SelectItem value={NewsletterType.WEEKLY}>Hebdomadaire</SelectItem>
                    <SelectItem value={NewsletterType.SPECIAL}>Spéciale</SelectItem>
                </SelectContent>
            </Select>

            {/* Filtre par statut */}
            <Select
                value={searchParams.get('status') || 'all'}
                onValueChange={(value) => handleFilter('status', value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value={ContentStatus.DRAFT}>Brouillon</SelectItem>
                    <SelectItem value={ContentStatus.SCHEDULED}>Programmée</SelectItem>
                    <SelectItem value={ContentStatus.PUBLISHED}>Publiée</SelectItem>
                    <SelectItem value={ContentStatus.ARCHIVED}>Archivée</SelectItem>
                </SelectContent>
            </Select>

            {/* Bouton reset */}
            {(searchParams.get('search') || searchParams.get('type') || searchParams.get('status')) && (
                <Button variant="outline" onClick={clearFilters}>
                    Réinitialiser
                </Button>
            )}
        </div>
    )
}