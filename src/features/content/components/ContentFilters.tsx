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

export function ContentFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value && value !== 'all') {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        // Reset to page 1 when filtering
        params.delete('page')

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

        // Reset to page 1 when searching
        params.delete('page')

        router.push(`?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push('/archives')
    }

    return (
        <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Recherche */}
                <form onSubmit={handleSearch} className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            name="search"
                            placeholder="Rechercher dans les archives..."
                            defaultValue={searchParams.get('search') || ''}
                            className="pl-10 bg-background"
                        />
                    </div>
                </form>

                {/* Filtre par type */}
                <Select
                    value={searchParams.get('type') || 'all'}
                    onValueChange={(value) => handleFilter('type', value)}
                >
                    <SelectTrigger className="w-[200px] bg-background">
                        <SelectValue placeholder="Type de contenu" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="DAILY">Newsletter quotidienne</SelectItem>
                        <SelectItem value="WEEKLY">Newsletter hebdomadaire</SelectItem>
                        <SelectItem value="SPECIAL">Édition spéciale</SelectItem>
                    </SelectContent>
                </Select>

                {/* Bouton reset */}
                {(searchParams.get('search') || searchParams.get('type')) && (
                    <Button variant="outline" onClick={clearFilters}>
                        Réinitialiser
                    </Button>
                )}
            </div>
        </div>
    )
}