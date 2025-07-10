'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Save, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
    createNewsletterSchema,
    CreateNewsletterInput,
    NewsletterType,
    ContentStatus,
    Newsletter
} from '../types/newsletter.types'
import { newsletterService } from '../services/newsletterService'
import { useToast } from '@/shared/hooks/use-toast'
import { ADMIN_ROUTES } from '@/shared/constants/routes'

interface NewsletterEditorProps {
    newsletter?: Newsletter
    mode: 'create' | 'edit'
}

export function NewsletterEditor({ newsletter, mode }: NewsletterEditorProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<ContentStatus>(newsletter?.status || 'DRAFT')

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isDirty },
    } = useForm<CreateNewsletterInput>({
        resolver: zodResolver(createNewsletterSchema),
        defaultValues: {
            title: newsletter?.title || '',
            subtitle: newsletter?.subtitle || '',
            content: newsletter?.content || '',
            excerpt: newsletter?.excerpt || '',
            type: newsletter?.type || 'DAILY',
            isPremium: newsletter?.isPremium || false,
            status: newsletter?.status || 'DRAFT',
        },
    })

    const onSubmit = async (data: CreateNewsletterInput) => {
        try {
            setIsLoading(true)

            // Ajouter le statut au formulaire
            const submitData = { ...data, status }

            if (mode === 'create') {
                const newNewsletter = await newsletterService.create(submitData)

                toast({
                    title: 'Newsletter créée',
                    description: 'La newsletter a été créée avec succès',
                })

                router.push(ADMIN_ROUTES.NEWSLETTER_EDIT(newNewsletter.id))
            } else if (newsletter) {
                await newsletterService.update(newsletter.id, submitData)

                toast({
                    title: 'Newsletter mise à jour',
                    description: 'Les modifications ont été enregistrées',
                })

                router.refresh()
            }
        } catch (error) {
            toast({
                title: 'Erreur',
                description: error instanceof Error ? error.message : 'Une erreur est survenue',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handlePublish = async () => {
        if (!newsletter) return

        try {
            setIsLoading(true)
            await newsletterService.publish(newsletter.id)

            toast({
                title: 'Newsletter publiée',
                description: 'La newsletter est maintenant visible',
            })

            router.push(ADMIN_ROUTES.NEWSLETTERS)
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de publier la newsletter',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const generateExcerpt = () => {
        const content = watch('content')
        if (content) {
            const excerpt = content
                .replace(/<[^>]*>/g, '') // Supprimer les balises HTML
                .slice(0, 200)
                .trim() + '...'
            setValue('excerpt', excerpt)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Contenu principal */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contenu</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input
                                    id="title"
                                    {...register('title')}
                                    placeholder="Titre de la newsletter"
                                    disabled={isLoading}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="subtitle">Sous-titre (optionnel)</Label>
                                <Input
                                    id="subtitle"
                                    {...register('subtitle')}
                                    placeholder="Sous-titre accrocheur"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Contenu</Label>
                                <Textarea
                                    id="content"
                                    {...register('content')}
                                    placeholder="Écrivez votre newsletter..."
                                    className="min-h-[400px] font-mono"
                                    disabled={isLoading}
                                />
                                {errors.content && (
                                    <p className="text-sm text-red-500">{errors.content.message}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="excerpt">Extrait</Label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={generateExcerpt}
                                    >
                                        Générer automatiquement
                                    </Button>
                                </div>
                                <Textarea
                                    id="excerpt"
                                    {...register('excerpt')}
                                    placeholder="Court résumé pour les aperçus..."
                                    className="min-h-[100px]"
                                    disabled={isLoading}
                                />
                                {errors.excerpt && (
                                    <p className="text-sm text-red-500">{errors.excerpt.message}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Paramètres */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Type de newsletter</Label>
                                <Select
                                    value={watch('type')}
                                    onValueChange={(value) => setValue('type', value as NewsletterType)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger id="type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DAILY">Quotidienne</SelectItem>
                                        <SelectItem value="WEEKLY">Hebdomadaire</SelectItem>
                                        <SelectItem value="SPECIAL">Spéciale</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="isPremium">Contenu Premium</Label>
                                <Switch
                                    id="isPremium"
                                    checked={watch('isPremium')}
                                    onCheckedChange={(checked) => setValue('isPremium', checked)}
                                    disabled={isLoading}
                                />
                            </div>

                            {mode === 'edit' && newsletter && (
                                <div className="grid gap-2">
                                    <Label>Statut</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(value) => setStatus(value as ContentStatus)}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DRAFT">Brouillon</SelectItem>
                                            <SelectItem value="SCHEDULED">Programmée</SelectItem>
                                            <SelectItem value="PUBLISHED">Publiée</SelectItem>
                                            <SelectItem value="ARCHIVED">Archivée</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading || !isDirty}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Enregistrer
                                    </>
                                )}
                            </Button>

                            {mode === 'edit' && newsletter?.status === 'DRAFT' && (
                                <Button
                                    type="button"
                                    variant="default"
                                    className="w-full"
                                    onClick={handlePublish}
                                    disabled={isLoading}
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    Publier maintenant
                                </Button>
                            )}

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push(ADMIN_ROUTES.NEWSLETTERS)}
                                disabled={isLoading}
                            >
                                Annuler
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}