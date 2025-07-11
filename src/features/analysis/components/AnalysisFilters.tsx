//src/features/analysis/components/AnalysisFilters.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Filter } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AnalysisFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentType = searchParams.get('type') || 'all'
    const currentStatus = searchParams.get('status') || 'all'
    const currentSearch = searchParams.get('search') || ''
    const currentSector = searchParams.get('sector') || 'all'
    const currentRecommendation = searchParams.get('recommendation') || 'all'

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {/* Recherche */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher une analyse..."
                                value={currentSearch}
                                onChange={(e) => updateFilters({ search: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Type d'analyse */}
                    <Select
                        value={currentType}
                        onValueChange={(value) => updateFilters({ type: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="STOCK_ANALYSIS">Analyse d&#39;action</SelectItem>
                            <SelectItem value="SECTOR_ANALYSIS">Analyse sectorielle</SelectItem>
                            <SelectItem value="MACRO_ANALYSIS">Analyse macro</SelectItem>
                            <SelectItem value="TECHNICAL_ANALYSIS">Analyse technique</SelectItem>
                            <SelectItem value="FUNDAMENTAL_ANALYSIS">Analyse fondamentale</SelectItem>
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

                    {/* Secteur */}
                    <Select
                        value={currentSector}
                        onValueChange={(value) => updateFilters({ sector: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Secteur" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les secteurs</SelectItem>
                            <SelectItem value="Technology">Technologie</SelectItem>
                            <SelectItem value="Healthcare">Santé</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Energy">Énergie</SelectItem>
                            <SelectItem value="Consumer">Consommation</SelectItem>
                            <SelectItem value="Industrial">Industrie</SelectItem>
                            <SelectItem value="Real Estate">Immobilier</SelectItem>
                            <SelectItem value="Utilities">Services publics</SelectItem>
                            <SelectItem value="Materials">Matériaux</SelectItem>
                            <SelectItem value="Telecommunications">Télécoms</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Recommandation */}
                    <Select
                        value={currentRecommendation}
                        onValueChange={(value) => updateFilters({ recommendation: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Recommandation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes</SelectItem>
                            <SelectItem value="BUY">Achat</SelectItem>
                            <SelectItem value="HOLD">Conserver</SelectItem>
                            <SelectItem value="SELL">Vente</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
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