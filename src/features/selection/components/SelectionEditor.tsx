//src/features/selection/components/SelectionEditor.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Send, Eye, ArrowLeft, Plus, X, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/shared/hooks/use-toast'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

interface Stock {
    ticker: string
    name: string
    weight: number
    reason: string
}

interface SelectionEditorProps {
    mode: 'create' | 'edit'
    selection?: {
        id: string
        title: string
        subtitle?: string
        content: string
        excerpt?: string
        type: string
        status: string
        isPremium: boolean
        theme?: string
        expectedReturn?: number
        riskLevel?: string
        stocks?: Stock[]
    }
}

export function SelectionEditor({ mode, selection }: SelectionEditorProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    // États du formulaire
    const [formData, setFormData] = useState({
        title: selection?.title || '',
        subtitle: selection?.subtitle || '',
        content: selection?.content || '',
        excerpt: selection?.excerpt || '',
        type: selection?.type || 'STOCK_SELECTION',
        isPremium: selection?.isPremium ?? true,
        theme: selection?.theme || '',
        expectedReturn: selection?.expectedReturn?.toString() || '',
        riskLevel: selection?.riskLevel || 'MEDIUM',
    })

    const [stocks, setStocks] = useState<Stock[]>(selection?.stocks || [])
    const [newStock, setNewStock] = useState<Partial<Stock>>({
        ticker: '',
        name: '',
        weight: 0,
        reason: ''
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

        if (stocks.length === 0) {
            toast({
                title: 'Erreur',
                description: 'Ajoutez au moins une action à la sélection',
                variant: 'destructive',
            })
            return
        }

        setIsLoading(true)
        try {
            const endpoint = mode === 'create' ? '/api/selections' : `/api/selections/${selection?.id}`
            const method = mode === 'create' ? 'POST' : 'PUT'

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    status,
                    expectedReturn: formData.expectedReturn ? parseFloat(formData.expectedReturn) : null,
                    stocks,
                }),
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la sauvegarde')
            }

            toast({
                title: mode === 'create' ? 'Sélection créée' : 'Sélection mise à jour',
                description: `La sélection a été ${status === 'PUBLISHED' ? 'publiée' : 'sauvegardée'} avec succès`,
            })

            router.push(ADMIN_ROUTES.SELECTIONS)
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

    const addStock = () => {
        if (!newStock.ticker || !newStock.name || !newStock.weight) {
            toast({
                title: 'Erreur',
                description: 'Veuillez remplir tous les champs obligatoires',
                variant: 'destructive',
            })
            return
        }

        if (stocks.some(stock => stock.ticker === newStock.ticker)) {
            toast({
                title: 'Erreur',
                description: 'Cette action est déjà dans la sélection',
                variant: 'destructive',
            })
            return
        }

        setStocks([...stocks, newStock as Stock])
        setNewStock({ ticker: '', name: '', weight: 0, reason: '' })
    }

    const removeStock = (ticker: string) => {
        setStocks(stocks.filter(stock => stock.ticker !== ticker))
    }

    const totalWeight = stocks.reduce((sum, stock) => sum + stock.weight, 0)

    return (
        <div className="space-y-6">
            {/* Header avec actions */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href={ADMIN_ROUTES.SELECTIONS}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux sélections
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
                            <CardTitle>Contenu de la sélection</CardTitle>
                            <CardDescription>
                                Rédigez la présentation de votre sélection d&#39;investissement
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Titre *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Ex: Sélection momentum - Actions européennes Q4 2024"
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
                                    placeholder="Résumé de la sélection (affiché dans les listes)"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="content">Contenu *</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Rédigez votre analyse et justification de la sélection..."
                                    rows={12}
                                    className="font-mono"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gestion des actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Actions de la sélection
                                <Badge variant="secondary">
                                    {stocks.length} action{stocks.length > 1 ? 's' : ''}
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                Ajoutez les actions qui composent votre sélection avec leur pondération
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Ajouter une action */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                <Input
                                    placeholder="Ticker"
                                    value={newStock.ticker}
                                    onChange={(e) => setNewStock(prev => ({ ...prev, ticker: e.target.value.toUpperCase() }))}
                                />
                                <Input
                                    placeholder="Nom de l'entreprise"
                                    value={newStock.name}
                                    onChange={(e) => setNewStock(prev => ({ ...prev, name: e.target.value }))}
                                    className="md:col-span-2"
                                />
                                <Input
                                    type="number"
                                    placeholder="Poids %"
                                    value={newStock.weight}
                                    onChange={(e) => setNewStock(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                                />
                                <Button onClick={addStock} size="sm">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Input
                                placeholder="Raison de l'inclusion (optionnel)"
                                value={newStock.reason}
                                onChange={(e) => setNewStock(prev => ({ ...prev, reason: e.target.value }))}
                            />

                            {/* Liste des actions */}
                            {stocks.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Total pondération:</span>
                                        <Badge variant={totalWeight === 100 ? 'default' : 'destructive'}>
                                            {totalWeight.toFixed(1)}%
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        {stocks.map((stock) => (
                                            <div key={stock.ticker} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-bold">{stock.ticker}</span>
                                                        <span className="text-sm text-muted-foreground">{stock.name}</span>
                                                        <Badge variant="outline">{stock.weight}%</Badge>
                                                    </div>
                                                    {stock.reason && (
                                                        <p className="text-xs text-muted-foreground mt-1">{stock.reason}</p>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeStock(stock.ticker)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                                <Label htmlFor="type">Type de sélection</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="STOCK_SELECTION">Sélection d&#39;actions</SelectItem>
                                        <SelectItem value="ETF_SELECTION">Sélection d&#39;ETF</SelectItem>
                                        <SelectItem value="THEMATIC_SELECTION">Sélection thématique</SelectItem>
                                        <SelectItem value="MOMENTUM_SELECTION">Sélection momentum</SelectItem>
                                        <SelectItem value="VALUE_SELECTION">Sélection value</SelectItem>
                                        <SelectItem value="DIVIDEND_SELECTION">Sélection dividendes</SelectItem>
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
                            <CardTitle>Caractéristiques</CardTitle>
                            <CardDescription>
                                Métadonnées de performance et de risque
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="theme">Thème</Label>
                                <Input
                                    id="theme"
                                    value={formData.theme}
                                    onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                                    placeholder="Ex: Intelligence Artificielle, Énergie Verte"
                                />
                            </div>

                            <div>
                                <Label htmlFor="riskLevel">Niveau de risque</Label>
                                <Select
                                    value={formData.riskLevel}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, riskLevel: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Faible risque</SelectItem>
                                        <SelectItem value="MEDIUM">Risque modéré</SelectItem>
                                        <SelectItem value="HIGH">Risque élevé</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            <div>
                                <Label htmlFor="expectedReturn">Rendement attendu (%)</Label>
                                <div className="relative">
                                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="expectedReturn"
                                        type="number"
                                        step="0.1"
                                        value={formData.expectedReturn}
                                        onChange={(e) => setFormData(prev => ({ ...prev, expectedReturn: e.target.value }))}
                                        placeholder="Ex: 15.5"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}