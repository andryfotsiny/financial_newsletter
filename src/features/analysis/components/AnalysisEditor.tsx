//src/features/analysis/components/AnalysisEditor.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Send, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/shared/hooks/use-toast'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

interface AnalysisEditorProps {
    mode: 'create' | 'edit'
    analysis?: {
        id: string
        title: string
        subtitle?: string
        content: string
        excerpt?: string
        type: string
        status: string
        isPremium: boolean
        ticker?: string
        sector?: string
        recommendation?: string
        targetPrice?: number
    }
}

export function AnalysisEditor({ mode, analysis }: AnalysisEditorProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    // États du formulaire
    const [formData, setFormData] = useState({
        title: analysis?.title || '',
        subtitle: analysis?.subtitle || '',
        content: analysis?.content || '',
        excerpt: analysis?.excerpt || '',
        type: analysis?.type || 'STOCK_ANALYSIS',
        isPremium: analysis?.isPremium ?? true,
        ticker: analysis?.ticker || '',
        sector: analysis?.sector || '',
        recommendation: analysis?.recommendation || '',
        targetPrice: analysis?.targetPrice?.toString() || '',
    })

    const handleSubmit = async (status: 'DRAFT' | 'PUBLISHED') => {
        if (!formData.title.trim()) {
            toast({
                title: 'Erreur',
                description: 'Le titre est obligatoire',
                variant: 'destructive',
            })
            return
        }

        setIsLoading(true)
        try {
            const endpoint = mode === 'create' ? '/api/analyses' : `/api/analyses/${analysis?.id}`
            const method = mode === 'create' ? 'POST' : 'PUT'

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    status,
                    targetPrice: formData.targetPrice ? parseFloat(formData.targetPrice) : null,
                }),
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la sauvegarde')
            }

            toast({
                title: mode === 'create' ? 'Analyse créée' : 'Analyse mise à jour',
                description: `L'analyse a été ${status === 'PUBLISHED' ? 'publiée' : 'sauvegardée'} avec succès`,
            })

            router.push(ADMIN_ROUTES.ANALYSES)
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la sauvegarde',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header avec actions */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href={ADMIN_ROUTES.ANALYSES}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux analyses
                    </Link>
                </Button>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        disabled={isLoading}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        Aperçu
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleSubmit('DRAFT')}
                        disabled={isLoading}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Sauvegarder
                    </Button>
                    <Button
                        onClick={() => handleSubmit('PUBLISHED')}
                        disabled={isLoading}
                    >
                        <Send className="mr-2 h-4 w-4" />
                        Publier
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contenu principal */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contenu de l&#39;analyse</CardTitle>
                            <CardDescription>
                                Rédigez le contenu principal de votre analyse
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Titre *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Ex: Apple (AAPL) - Analyse technique Q4 2024"
                                />
                            </div>

                            <div>
                                <Label htmlFor="subtitle">Sous-titre</Label>
                                <Input
                                    id="subtitle"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                                    placeholder="Sous-titre optionnel"
                                />
                            </div>

                            <div>
                                <Label htmlFor="excerpt">Résumé</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                    placeholder="Résumé de l'analyse (affiché dans les listes)"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="content">Contenu *</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Rédigez votre analyse complète ici..."
                                    rows={15}
                                    className="font-mono"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar avec métadonnées */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Type et configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="type">Type d&#39;analyse</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="STOCK_ANALYSIS">Analyse d&#39;action</SelectItem>
                                        <SelectItem value="SECTOR_ANALYSIS">Analyse sectorielle</SelectItem>
                                        <SelectItem value="MACRO_ANALYSIS">Analyse macro</SelectItem>
                                        <SelectItem value="TECHNICAL_ANALYSIS">Analyse technique</SelectItem>
                                        <SelectItem value="FUNDAMENTAL_ANALYSIS">Analyse fondamentale</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="isPremium">Contenu premium</Label>
                                <Switch
                                    id="isPremium"
                                    checked={formData.isPremium}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPremium: checked }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informations financières</CardTitle>
                            <CardDescription>
                                Métadonnées spécifiques aux analyses d&#39;actions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="ticker">Ticker</Label>
                                <Input
                                    id="ticker"
                                    value={formData.ticker}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ticker: e.target.value.toUpperCase() }))}
                                    placeholder="Ex: AAPL, MSFT"
                                />
                            </div>

                            <div>
                                <Label htmlFor="sector">Secteur</Label>
                                <Select
                                    value={formData.sector}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un secteur" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                            </div>

                            <Separator />

                            <div>
                                <Label htmlFor="recommendation">Recommandation</Label>
                                <Select
                                    value={formData.recommendation}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, recommendation: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez une recommandation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BUY">Achat</SelectItem>
                                        <SelectItem value="HOLD">Conserver</SelectItem>
                                        <SelectItem value="SELL">Vente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="targetPrice">Prix cible (€)</Label>
                                <Input
                                    id="targetPrice"
                                    type="number"
                                    step="0.01"
                                    value={formData.targetPrice}
                                    onChange={(e) => setFormData(prev => ({ ...prev, targetPrice: e.target.value }))}
                                    placeholder="Ex: 250.00"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}