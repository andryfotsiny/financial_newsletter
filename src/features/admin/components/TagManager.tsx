//src/features/admin/components/TagManager.tsx
'use client'

import { useState } from 'react'
import {
    Plus,
    Edit,
    Trash2,
    Tag,
    Search,
    Save,
    Hash,
    Palette
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/shared/hooks/use-toast'
import { formatDate } from '@/shared/lib/utils'

interface TagItem {
    id: string
    name: string
    slug: string
    description?: string
    color: string
    usageCount: number
    createdAt: Date
    updatedAt: Date
}

interface TagManagerProps {
    tags: TagItem[]
    onRefresh?: () => void
}

const defaultColors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6B7280'  // Gray
]

export function TagManager({ tags: initialTags, onRefresh }: TagManagerProps) {
    const { toast } = useToast()
    const [tags, setTags] = useState(initialTags)
    const [searchTerm, setSearchTerm] = useState('')
    const [editingTag, setEditingTag] = useState<TagItem | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // État du formulaire
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: defaultColors[0]
    })

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleCreateTag = async () => {
        if (!formData.name.trim()) {
            toast({
                title: 'Erreur',
                description: 'Le nom du tag est obligatoire',
                variant: 'destructive',
            })
            return
        }

        setIsLoading(true)
        try {
            // Simulation API call
            const newTag: TagItem = {
                id: Date.now().toString(),
                name: formData.name.trim(),
                slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
                description: formData.description.trim() || undefined,
                color: formData.color,
                usageCount: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            setTags([...tags, newTag])
            setFormData({ name: '', description: '', color: defaultColors[0] })
            setIsDialogOpen(false)

            toast({
                title: 'Tag créé',
                description: 'Le tag a été créé avec succès',
            })

            if (onRefresh) onRefresh()
        } catch {
            toast({
                title: 'Erreur',
                description: 'Impossible de créer le tag',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateTag = async () => {
        if (!editingTag || !formData.name.trim()) return

        setIsLoading(true)
        try {
            const updatedTag: TagItem = {
                ...editingTag,
                name: formData.name.trim(),
                description: formData.description.trim() || undefined,
                color: formData.color,
                updatedAt: new Date()
            }

            setTags(tags.map(tag => tag.id === editingTag.id ? updatedTag : tag))
            setEditingTag(null)
            setFormData({ name: '', description: '', color: defaultColors[0] })
            setIsDialogOpen(false)

            toast({
                title: 'Tag modifié',
                description: 'Le tag a été modifié avec succès',
            })

            if (onRefresh) onRefresh()
        } catch {
            toast({
                title: 'Erreur',
                description: 'Impossible de modifier le tag',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteTag = async (tagId: string, tagName: string) => {
        if (!confirm(`Êtes-vous sûr de vouloir supprimer le tag "${tagName}" ?`)) {
            return
        }

        try {
            setTags(tags.filter(tag => tag.id !== tagId))

            toast({
                title: 'Tag supprimé',
                description: 'Le tag a été supprimé avec succès',
            })

            if (onRefresh) onRefresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer le tag',
                variant: 'destructive',
            })
        }
    }

    const openCreateDialog = () => {
        setEditingTag(null)
        setFormData({ name: '', description: '', color: defaultColors[0] })
        setIsDialogOpen(true)
    }

    const openEditDialog = (tag: TagItem) => {
        setEditingTag(tag)
        setFormData({
            name: tag.name,
            description: tag.description || '',
            color: tag.color
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-6">
            {/* Header avec actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gestion des tags</h2>
                    <p className="text-muted-foreground">
                        Organisez votre contenu avec des tags thématiques
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateDialog}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nouveau tag
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingTag ? 'Modifier le tag' : 'Créer un nouveau tag'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nom *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Ex: Intelligence Artificielle"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Description optionnelle du tag"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <Label htmlFor="color">Couleur</Label>
                                <div className="flex items-center gap-2 mt-2">
                                    <Input
                                        id="color"
                                        type="color"
                                        value={formData.color}
                                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                        className="w-12 h-10 p-1 border rounded"
                                    />
                                    <div className="flex gap-1">
                                        {defaultColors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                className="w-6 h-6 rounded border border-gray-300"
                                                style={{ backgroundColor: color }}
                                                onClick={() => setFormData(prev => ({ ...prev, color }))}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Badge style={{ backgroundColor: formData.color, color: 'white' }}>
                                        <Tag className="h-3 w-3 mr-1" />
                                        {formData.name || 'Aperçu'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    onClick={editingTag ? handleUpdateTag : handleCreateTag}
                                    disabled={isLoading}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {editingTag ? 'Modifier' : 'Créer'}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Recherche */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un tag..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total tags</p>
                                <p className="text-2xl font-bold">{tags.length}</p>
                            </div>
                            <Hash className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Tags utilisés</p>
                                <p className="text-2xl font-bold">
                                    {tags.filter(tag => tag.usageCount > 0).length}
                                </p>
                            </div>
                            <Tag className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Plus populaire</p>
                                <p className="text-lg font-bold">
                                    {tags.length > 0
                                        ? tags.reduce((prev, current) => prev.usageCount > current.usageCount ? prev : current).name
                                        : 'Aucun'
                                    }
                                </p>
                            </div>
                            <Palette className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Utilisation totale</p>
                                <p className="text-2xl font-bold">
                                    {tags.reduce((sum, tag) => sum + tag.usageCount, 0)}
                                </p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <span className="text-orange-600 font-bold">∑</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Liste des tags */}
            <Card>
                <CardHeader>
                    <CardTitle>Tags existants</CardTitle>
                    <CardDescription>
                        {filteredTags.length} tag{filteredTags.length > 1 ? 's' : ''} trouvé{filteredTags.length > 1 ? 's' : ''}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredTags.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            {searchTerm ? 'Aucun tag trouvé' : 'Aucun tag créé'}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTags.map((tag) => (
                                <div key={tag.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-3">
                                        <Badge
                                            style={{ backgroundColor: tag.color, color: 'white' }}
                                            className="text-sm"
                                        >
                                            <Tag className="h-3 w-3 mr-1" />
                                            {tag.name}
                                        </Badge>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditDialog(tag)}
                                            >
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteTag(tag.id, tag.name)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    {tag.description && (
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {tag.description}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Utilisé {tag.usageCount} fois</span>
                                        <span>Créé le {formatDate(tag.createdAt, { day: 'numeric', month: 'short' })}</span>
                                    </div>

                                    <div className="mt-2 text-xs text-muted-foreground">
                                        <span className="font-mono">#{tag.slug}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Tags populaires */}
            {tags.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Tags les plus utilisés</CardTitle>
                        <CardDescription>
                            Classement par nombre d&#39;utilisations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {tags
                                .filter(tag => tag.usageCount > 0)
                                .sort((a, b) => b.usageCount - a.usageCount)
                                .slice(0, 10)
                                .map((tag, index) => (
                                    <div key={tag.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="text-lg font-bold text-muted-foreground w-6">
                                                #{index + 1}
                                            </div>
                                            <Badge
                                                style={{ backgroundColor: tag.color, color: 'white' }}
                                            >
                                                <Tag className="h-3 w-3 mr-1" />
                                                {tag.name}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">
                                                {tag.usageCount} utilisation{tag.usageCount > 1 ? 's' : ''}
                                            </span>
                                            <div
                                                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                                                style={{ width: '60px' }}
                                            >
                                                <div
                                                    className="h-full transition-all duration-300"
                                                    style={{
                                                        backgroundColor: tag.color,
                                                        width: `${Math.min((tag.usageCount / Math.max(...tags.map(t => t.usageCount))) * 100, 100)}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {tags.filter(tag => tag.usageCount === 0).length > 0 && (
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    <strong>{tags.filter(tag => tag.usageCount === 0).length} tag{tags.filter(tag => tag.usageCount === 0).length > 1 ? 's' : ''}</strong> n&#39;ont jamais été utilisés.
                                    Considérez les supprimer s&#39;ils ne sont plus nécessaires.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}