//src/features/admin/components/SettingsPanel.tsx
'use client'

import { useState } from 'react'
import {
    Save,
    Mail,
    Globe,
    Shield,
    CreditCard,
    Bell,
    FileText,
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/shared/hooks/use-toast'

type SettingValue = string | number | boolean;


interface SettingsPanelProps {
    settings: {
        general: {
            siteName: string
            siteDescription: string
            contactEmail: string
            timezone: string
            language: string
        }
        email: {
            fromName: string
            fromEmail: string
            replyTo: string
            smtpHost: string
            smtpPort: string
            smtpUser: string
            dailyTime: string
            weeklyDay: string
            weeklyTime: string
        }
        subscription: {
            premiumPrice: string
            enterprisePrice: string
            currency: string
            trialDays: string
            allowCancellation: boolean
            promoEnabled: boolean
            promoCode: string
            promoDiscount: string
        }
        content: {
            autoPublish: boolean
            requireApproval: boolean
            allowComments: boolean
            moderateComments: boolean
            archiveAfterDays: string
        }
        security: {
            twoFactorRequired: boolean
            passwordMinLength: string
            sessionTimeout: string
            ipWhitelist: string
            rateLimitEnabled: boolean
        }
        notifications: {
            emailOnNewUser: boolean
            emailOnSubscription: boolean
            emailOnCancellation: boolean
            emailOnError: boolean
            slackWebhook: string
        }
    }
}

export function SettingsPanel({ settings: initialSettings }: SettingsPanelProps) {
    const { toast } = useToast()
    const [settings, setSettings] = useState(initialSettings)
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('general')

    const handleSave = async (section: string) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section,
                    data: settings[section as keyof typeof settings]
                })
            })

            if (!response.ok) throw new Error('Erreur lors de la sauvegarde')

            toast({
                title: 'Paramètres sauvegardés',
                description: 'Les modifications ont été enregistrées avec succès',
            })
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible de sauvegarder les paramètres',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const updateSetting = (
        section: keyof SettingsPanelProps['settings'],
        key: string,
        value: SettingValue
    ) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }))
    }


    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Paramètres</h2>
                <p className="text-muted-foreground">
                    Configurez votre newsletter et gérez les paramètres globaux
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Général
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                    </TabsTrigger>
                    <TabsTrigger value="subscription" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Abonnements
                    </TabsTrigger>
                    <TabsTrigger value="content" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Contenu
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Sécurité
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* Paramètres généraux */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres généraux</CardTitle>
                            <CardDescription>
                                Configuration de base de votre newsletter
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="siteName">Nom du site</Label>
                                    <Input
                                        id="siteName"
                                        value={settings.general.siteName}
                                        onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                                        placeholder="Newsletter Financière"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contactEmail">Email de contact</Label>
                                    <Input
                                        id="contactEmail"
                                        type="email"
                                        value={settings.general.contactEmail}
                                        onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                                        placeholder="contact@newsletter.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="siteDescription">Description du site</Label>
                                <Textarea
                                    id="siteDescription"
                                    value={settings.general.siteDescription}
                                    onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                                    placeholder="Votre newsletter financière de référence"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="timezone">Fuseau horaire</Label>
                                    <Select
                                        value={settings.general.timezone}
                                        onValueChange={(value) => updateSetting('general', 'timezone', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                                            <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                                            <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                                            <SelectItem value="Asia/Tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="language">Langue</Label>
                                    <Select
                                        value={settings.general.language}
                                        onValueChange={(value) => updateSetting('general', 'language', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button onClick={() => handleSave('general')} disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Paramètres email */}
                <TabsContent value="email">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration email</CardTitle>
                            <CardDescription>
                                Paramètres SMTP et programmation des envois
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="fromName">Nom expéditeur</Label>
                                    <Input
                                        id="fromName"
                                        value={settings.email.fromName}
                                        onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                                        placeholder="Newsletter Financière"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="fromEmail">Email expéditeur</Label>
                                    <Input
                                        id="fromEmail"
                                        type="email"
                                        value={settings.email.fromEmail}
                                        onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                                        placeholder="newsletter@votre-domaine.com"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="smtpHost">Serveur SMTP</Label>
                                    <Input
                                        id="smtpHost"
                                        value={settings.email.smtpHost}
                                        onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                                        placeholder="smtp.gmail.com"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="smtpPort">Port SMTP</Label>
                                    <Input
                                        id="smtpPort"
                                        value={settings.email.smtpPort}
                                        onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                                        placeholder="587"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Programmation des envois</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="dailyTime">Newsletter quotidienne</Label>
                                        <Select
                                            value={settings.email.dailyTime}
                                            onValueChange={(value) => updateSetting('email', 'dailyTime', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="07:00">07:00</SelectItem>
                                                <SelectItem value="08:00">08:00</SelectItem>
                                                <SelectItem value="09:00">09:00</SelectItem>
                                                <SelectItem value="10:00">10:00</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="weeklyDay">Newsletter hebdomadaire</Label>
                                        <Select
                                            value={settings.email.weeklyDay}
                                            onValueChange={(value) => updateSetting('email', 'weeklyDay', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="saturday">Samedi</SelectItem>
                                                <SelectItem value="sunday">Dimanche</SelectItem>
                                                <SelectItem value="monday">Lundi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={() => handleSave('email')} disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Paramètres abonnements */}
                <TabsContent value="subscription">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des abonnements</CardTitle>
                            <CardDescription>
                                Prix, promotions et paramètres de facturation
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="premiumPrice">Prix Premium (€/mois)</Label>
                                    <Input
                                        id="premiumPrice"
                                        type="number"
                                        step="0.01"
                                        value={settings.subscription.premiumPrice}
                                        onChange={(e) => updateSetting('subscription', 'premiumPrice', e.target.value)}
                                        placeholder="19.99"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="enterprisePrice">Prix Entreprise (€/mois)</Label>
                                    <Input
                                        id="enterprisePrice"
                                        type="number"
                                        step="0.01"
                                        value={settings.subscription.enterprisePrice}
                                        onChange={(e) => updateSetting('subscription', 'enterprisePrice', e.target.value)}
                                        placeholder="99.99"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="trialDays">Période d&#39;essai (jours)</Label>
                                    <Input
                                        id="trialDays"
                                        type="number"
                                        value={settings.subscription.trialDays}
                                        onChange={(e) => updateSetting('subscription', 'trialDays', e.target.value)}
                                        placeholder="7"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h4 className="font-medium">Promotions</h4>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="promoEnabled">Activer les codes promo</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Permet aux utilisateurs d&#39;utiliser des codes de réduction
                                        </p>
                                    </div>
                                    <Switch
                                        id="promoEnabled"
                                        checked={settings.subscription.promoEnabled}
                                        onCheckedChange={(checked) => updateSetting('subscription', 'promoEnabled', checked)}
                                    />
                                </div>

                                {settings.subscription.promoEnabled && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="promoCode">Code promo actuel</Label>
                                            <Input
                                                id="promoCode"
                                                value={settings.subscription.promoCode}
                                                onChange={(e) => updateSetting('subscription', 'promoCode', e.target.value)}
                                                placeholder="WELCOME20"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="promoDiscount">Réduction (%)</Label>
                                            <Input
                                                id="promoDiscount"
                                                type="number"
                                                value={settings.subscription.promoDiscount}
                                                onChange={(e) => updateSetting('subscription', 'promoDiscount', e.target.value)}
                                                placeholder="20"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="allowCancellation">Autoriser l&#39;annulation</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Les utilisateurs peuvent annuler leur abonnement eux-mêmes
                                    </p>
                                </div>
                                <Switch
                                    id="allowCancellation"
                                    checked={settings.subscription.allowCancellation}
                                    onCheckedChange={(checked) => updateSetting('subscription', 'allowCancellation', checked)}
                                />
                            </div>

                            <Button onClick={() => handleSave('subscription')} disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Paramètres contenu */}
                <TabsContent value="content">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion du contenu</CardTitle>
                            <CardDescription>
                                Paramètres de publication et de modération
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="autoPublish">Publication automatique</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Publier automatiquement le contenu approuvé
                                        </p>
                                    </div>
                                    <Switch
                                        id="autoPublish"
                                        checked={settings.content.autoPublish}
                                        onCheckedChange={(checked) => updateSetting('content', 'autoPublish', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="requireApproval">Approbation requise</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Tout contenu doit être approuvé avant publication
                                        </p>
                                    </div>
                                    <Switch
                                        id="requireApproval"
                                        checked={settings.content.requireApproval}
                                        onCheckedChange={(checked) => updateSetting('content', 'requireApproval', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="allowComments">Autoriser les commentaires</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Les utilisateurs peuvent commenter les articles
                                        </p>
                                    </div>
                                    <Switch
                                        id="allowComments"
                                        checked={settings.content.allowComments}
                                        onCheckedChange={(checked) => updateSetting('content', 'allowComments', checked)}
                                    />
                                </div>

                                {settings.content.allowComments && (
                                    <div className="flex items-center justify-between ml-6">
                                        <div>
                                            <Label htmlFor="moderateComments">Modérer les commentaires</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Les commentaires doivent être approuvés
                                            </p>
                                        </div>
                                        <Switch
                                            id="moderateComments"
                                            checked={settings.content.moderateComments}
                                            onCheckedChange={(checked) => updateSetting('content', 'moderateComments', checked)}
                                        />
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="archiveAfterDays">Archivage automatique (jours)</Label>
                                    <Input
                                        id="archiveAfterDays"
                                        type="number"
                                        value={settings.content.archiveAfterDays}
                                        onChange={(e) => updateSetting('content', 'archiveAfterDays', e.target.value)}
                                        placeholder="365"
                                        className="w-32"
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Archiver automatiquement le contenu après X jours (0 = jamais)
                                    </p>
                                </div>
                            </div>

                            <Button onClick={() => handleSave('content')} disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Paramètres sécurité */}
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sécurité</CardTitle>
                            <CardDescription>
                                Paramètres de sécurité et de protection
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="twoFactorRequired">Authentification à deux facteurs</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Obligatoire pour tous les administrateurs
                                        </p>
                                    </div>
                                    <Switch
                                        id="twoFactorRequired"
                                        checked={settings.security.twoFactorRequired}
                                        onCheckedChange={(checked) => updateSetting('security', 'twoFactorRequired', checked)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="passwordMinLength">Longueur minimum mot de passe</Label>
                                        <Input
                                            id="passwordMinLength"
                                            type="number"
                                            value={settings.security.passwordMinLength}
                                            onChange={(e) => updateSetting('security', 'passwordMinLength', e.target.value)}
                                            placeholder="8"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="sessionTimeout">Timeout session (minutes)</Label>
                                        <Input
                                            id="sessionTimeout"
                                            type="number"
                                            value={settings.security.sessionTimeout}
                                            onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                                            placeholder="60"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="ipWhitelist">Liste blanche IP (une par ligne)</Label>
                                    <Textarea
                                        id="ipWhitelist"
                                        value={settings.security.ipWhitelist}
                                        onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.value)}
                                        placeholder="192.168.1.1&#10;10.0.0.1"
                                        rows={4}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="rateLimitEnabled">Limitation de débit</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Protège contre les attaques par déni de service
                                        </p>
                                    </div>
                                    <Switch
                                        id="rateLimitEnabled"
                                        checked={settings.security.rateLimitEnabled}
                                        onCheckedChange={(checked) => updateSetting('security', 'rateLimitEnabled', checked)}
                                    />
                                </div>
                            </div>

                            <Button onClick={() => handleSave('security')} disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Paramètres notifications */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Configurez les alertes et notifications automatiques
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-6">
                                <h4 className="font-medium">Notifications par email</h4>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="emailOnNewUser">Nouveau utilisateur</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Recevoir un email lors d&#39;une nouvelle inscription
                                            </p>
                                        </div>
                                        <Switch
                                            id="emailOnNewUser"
                                            checked={settings.notifications.emailOnNewUser}
                                            onCheckedChange={(checked) => updateSetting('notifications', 'emailOnNewUser', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="emailOnSubscription">Nouvel abonnement</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Recevoir un email lors d&#39;un nouvel abonnement premium
                                            </p>
                                        </div>
                                        <Switch
                                            id="emailOnSubscription"
                                            checked={settings.notifications.emailOnSubscription}
                                            onCheckedChange={(checked) => updateSetting('notifications', 'emailOnSubscription', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="emailOnCancellation">Annulation abonnement</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Recevoir un email lors d&#39;une annulation
                                            </p>
                                        </div>
                                        <Switch
                                            id="emailOnCancellation"
                                            checked={settings.notifications.emailOnCancellation}
                                            onCheckedChange={(checked) => updateSetting('notifications', 'emailOnCancellation', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="emailOnError">Erreurs système</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Recevoir un email en cas d&#39;erreur critique
                                            </p>
                                        </div>
                                        <Switch
                                            id="emailOnError"
                                            checked={settings.notifications.emailOnError}
                                            onCheckedChange={(checked) => updateSetting('notifications', 'emailOnError', checked)}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <Label htmlFor="slackWebhook">Webhook Slack (optionnel)</Label>
                                    <Input
                                        id="slackWebhook"
                                        value={settings.notifications.slackWebhook}
                                        onChange={(e) => updateSetting('notifications', 'slackWebhook', e.target.value)}
                                        placeholder="https://hooks.slack.com/services/..."
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Recevoir les notifications importantes sur Slack
                                    </p>
                                </div>
                            </div>

                            <Button onClick={() => handleSave('notifications')} disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                Sauvegarder
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}