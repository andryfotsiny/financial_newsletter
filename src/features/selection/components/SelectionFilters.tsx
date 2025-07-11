//src/features/selection/components/SelectionFilters.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Filter } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SelectionFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentType = searchParams.get('type') || 'all'
    const currentStatus = searchParams.get('status') || 'all'
    const currentSearch = searchParams.get('search') || ''
    const currentTheme = searchParams.get('theme') || 'all'
    const currentRisk = searchParams.get('risk') || 'all'

    const updateFilters = (newFilters: Record<string, string>) => {
        const params = new URLSearchParams(searchParams)

        Object.entries(newFilters).forEach(([key, value]) => {
            if (value && value !== 'all') {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.push(`?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push(window.location.pathname)
    }

    const hasActiveFilters = searchParams.toString() !== ''

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtres
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Recherche */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher une sélection..."
                                value={currentSearch}
                                onChange={(e) => updateFilters({ search: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Type de sélection */}
                    <Select
                        value={currentType}
                        onValueChange={(value) => updateFilters({ type: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="STOCK_SELECTION">Sélection d&#39;actions</SelectItem>
                            <SelectItem value="ETF_SELECTION">Sélection d&#39;ETF</SelectItem>
                            <SelectItem value="THEMATIC_SELECTION">Sélection thématique</SelectItem>
                            <SelectItem value="MOMENTUM_SELECTION">Sélection momentum</SelectItem>
                            <SelectItem value="VALUE_SELECTION">Sélection value</SelectItem>
                            <SelectItem value="DIVIDEND_SELECTION">Sélection dividendes</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Statut */}
                    <Select
                        value={currentStatus}
                        onValueChange={(value) => updateFilters({ status: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="DRAFT">Brouillon</SelectItem>
                            <SelectItem value="PUBLISHED">Publié</SelectItem>
                            <SelectItem value="ARCHIVED">Archivé</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Niveau de risque */}
                    <Select
                        value={currentRisk}
                        onValueChange={(value) => updateFilters({ risk: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Risque" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les niveaux</SelectItem>
                            <SelectItem value="LOW">Faible risque</SelectItem>
                            <SelectItem value="MEDIUM">Risque modéré</SelectItem>
                            <SelectItem value="HIGH">Risque élevé</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Thèmes populaires (badges cliquables) */}
                <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Thèmes populaires :</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'Intelligence Artificielle',
                            'Énergie Verte',
                            'Biotechnologie',
                            'Cybersécurité',
                            'Immobilier',
                            'Dividendes',
                            'Small Caps',
                            'Tech Européenne'
                        ].map((theme) => (
                            <Button
                                key={theme}
                                variant={currentTheme === theme ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateFilters({ theme: currentTheme === theme ? 'all' : theme })}
                                className="h-7 text-xs"
                            >
                                {theme}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                        {hasActiveFilters ? 'Filtres actifs' : 'Aucun filtre appliqué'}
                    </p>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                        >
                            <X className="h-4 w-4 mr-1" />
                            Effacer les filtres
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}