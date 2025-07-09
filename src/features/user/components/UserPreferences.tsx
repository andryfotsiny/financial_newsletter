'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, Bell, Globe, Clock } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/shared/hooks/use-toast'
import { useSession } from 'next-auth/react'

const preferencesSchema = z.object({
    receiveDaily: z.boolean(),
    receiveWeekly: z.boolean(),
    receiveAnalyses: z.boolean(),
    receiveSelections: z.boolean(),
    receiveThematic: z.boolean(),
    emailNotifications: z.boolean(),
    marketingEmails: z.boolean(),
    preferredSendTime: z.string(),
    timezone: z.string(),
    language: z.string(),
})

type PreferencesInput = z.infer<typeof preferencesSchema>

interface UserPreferencesProps {
    preferences: PreferencesInput & { id: string; userId: string }
}

export function UserPreferences({ preferences }: UserPreferencesProps) {
    const { toast } = useToast()
    const router = useRouter()
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { isDirty },
    } = useForm<PreferencesInput>({
        resolver: zodResolver(preferencesSchema),
        defaultValues: preferences,
    })

    const onSubmit = async (data: PreferencesInput) => {
        if (!session?.user?.id) return

        try {
            setIsLoading(true)

            const response = await fetch(`/api/users/${session.user.id}/preferences`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour')
            }

            toast({
                title: 'Préférences mises à jour',
                description: 'Vos préférences ont été enregistrées avec succès',
            })

            router.refresh()
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la mise à jour',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const timeOptions = [
        { value: '06:00', label: '6h00' },
        { value: '07:00', label: '7h00' },
        { value: '08:00', label: '8h00' },
        { value: '09:00', label: '9h00' },
        { value: '10:00', label: '10h00' },
        { value: '12:00', label: '12h00' },
        { value: '18:00', label: '18h00' },
        { value: '20:00', label: '20h00' },
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Types de contenu */}
            <Card>
                <CardHeader>
                    <CardTitle>Types de contenu</CardTitle>
                    <CardDescription>
                        Choisissez les types de contenu que vous souhaitez recevoir
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="receiveDaily">Newsletter quotidienne</Label>
                            <p className="text-sm text-muted-foreground">
                                Recevez le récapitulatif du marché chaque matin
                            </p>
                        </div>
                        <Switch
                            id="receiveDaily"
                            checked={watch('receiveDaily')}
                            onCheckedChange={(checked) => setValue('receiveDaily', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="receiveWeekly">Newsletter hebdomadaire</Label>
                            <p className="text-sm text-muted-foreground">
                                Recevez l&#39;analyse approfondie chaque samedi
                            </p>
                        </div>
                        <Switch
                            id="receiveWeekly"
                            checked={watch('receiveWeekly')}
                            onCheckedChange={(checked) => setValue('receiveWeekly', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="receiveAnalyses">Analyses</Label>
                            <p className="text-sm text-muted-foreground">
                                Recevez nos analyses d&#39;actions et de marchés
                            </p>
                        </div>
                        <Switch
                            id="receiveAnalyses"
                            checked={watch('receiveAnalyses')}
                            onCheckedChange={(checked) => setValue('receiveAnalyses', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="receiveSelections">Sélections d&#39;investissement</Label>
                            <p className="text-sm text-muted-foreground">
                                Recevez nos meilleures idées d&#39;investissement
                            </p>
                        </div>
                        <Switch
                            id="receiveSelections"
                            checked={watch('receiveSelections')}
                            onCheckedChange={(checked) => setValue('receiveSelections', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="receiveThematic">Recherches thématiques</Label>
                            <p className="text-sm text-muted-foreground">
                                Recevez nos analyses sectorielles et thématiques
                            </p>
                        </div>
                        <Switch
                            id="receiveThematic"
                            checked={watch('receiveThematic')}
                            onCheckedChange={(checked) => setValue('receiveThematic', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                        Gérez vos préférences de notification
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="emailNotifications" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Notifications par email
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Recevez des notifications importantes par email
                            </p>
                        </div>
                        <Switch
                            id="emailNotifications"
                            checked={watch('emailNotifications')}
                            onCheckedChange={(checked) => setValue('emailNotifications', checked)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="marketingEmails" className="flex items-center gap-2">
                                <Bell className="h-4 w-4" />
                                Emails marketing
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Recevez nos offres spéciales et promotions
                            </p>
                        </div>
                        <Switch
                            id="marketingEmails"
                            checked={watch('marketingEmails')}
                            onCheckedChange={(checked) => setValue('marketingEmails', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Paramètres régionaux */}
            <Card>
                <CardHeader>
                    <CardTitle>Paramètres régionaux</CardTitle>
                    <CardDescription>
                        Configurez votre fuseau horaire et langue
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="preferredSendTime" className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Heure d&#39;envoi préférée
                        </Label>
                        <Select
                            value={watch('preferredSendTime')}
                            onValueChange={(value) => setValue('preferredSendTime', value)}
                        >
                            <SelectTrigger id="preferredSendTime">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {timeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="timezone" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Fuseau horaire
                        </Label>
                        <Select
                            value={watch('timezone')}
                            onValueChange={(value) => setValue('timezone', value)}
                        >
                            <SelectTrigger id="timezone">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
                                <SelectItem value="Europe/London">Londres (UTC+0)</SelectItem>
                                <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                                <SelectItem value="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="language">Langue</Label>
                        <Select
                            value={watch('language')}
                            onValueChange={(value) => setValue('language', value)}
                        >
                            <SelectTrigger id="language">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" disabled={isLoading || !isDirty}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                    </>
                ) : (
                    'Enregistrer les préférences'
                )}
            </Button>
        </form>
    )
}