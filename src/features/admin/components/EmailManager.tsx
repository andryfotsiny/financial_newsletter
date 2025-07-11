'use client'

import { useState } from 'react'
import {
    Mail,
    Send,
    Eye,
    Edit,
    Trash2,
    Plus,
    Calendar,
    CheckCircle,
    XCircle,
    BarChart3,
    Settings,
    Search,
    MoreVertical,
    PlayCircle,
    PauseCircle,
    Copy,
    Save
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { formatDate } from '@/shared/lib/utils'
import { useToast } from '@/shared/hooks/use-toast'

interface EmailLog {
    id: string
    recipient: string
    subject: string
    type: 'welcome' | 'newsletter_daily' | 'newsletter_weekly' | 'password_reset' | 'subscription'
    status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed'
    sentAt: Date
    openedAt?: Date
    clickedAt?: Date
    errorMessage?: string
}

interface EmailTemplate {
    id: string
    name: string
    subject: string
    type: string
    isActive: boolean
    usageCount: number
    lastUsed?: Date
    createdAt: Date
}

interface EmailCampaign {
    id: string
    name: string
    subject: string
    templateId: string
    status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused'
    scheduledFor?: Date
    sentAt?: Date
    targetCount: number
    sentCount: number
    openRate: number
    clickRate: number
    createdAt: Date
}

interface EmailManagerProps {
    logs?: EmailLog[]
    templates?: EmailTemplate[]
    campaigns?: EmailCampaign[]
}

const statusColors = {
    sent: 'bg-blue-100 text-blue-800 border-blue-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    opened: 'bg-purple-100 text-purple-800 border-purple-200',
    clicked: 'bg-orange-100 text-orange-800 border-orange-200',
    bounced: 'bg-red-100 text-red-800 border-red-200',
    failed: 'bg-gray-100 text-gray-800 border-gray-200'
}

const statusIcons = {
    sent: Send,
    delivered: CheckCircle,
    opened: Eye,
    clicked: PlayCircle,
    bounced: XCircle,
    failed: XCircle
}

const campaignStatusColors = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    sending: 'bg-yellow-100 text-yellow-800',
    sent: 'bg-green-100 text-green-800',
    paused: 'bg-orange-100 text-orange-800'
}

export function EmailManager({ logs: initialLogs = [], templates: initialTemplates = [], campaigns: initialCampaigns = [] }: EmailManagerProps) {
    const { toast } = useToast()
    const [logs] = useState(initialLogs)
    const [templates, setTemplates] = useState(initialTemplates)
    const [campaigns, setCampaigns] = useState(initialCampaigns)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [typeFilter, setTypeFilter] = useState('all')

    // Filtrage des logs
    const filteredLogs = logs?.filter(log => {
        const matchesSearch = log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.subject.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || log.status === statusFilter
        const matchesType = typeFilter === 'all' || log.type === typeFilter
        return matchesSearch && matchesStatus && matchesType
    }) || []

    // Statistiques globales
    const stats = {
        totalSent: logs?.length || 0,
        delivered: logs?.filter(log => ['delivered', 'opened', 'clicked'].includes(log.status)).length || 0,
        opened: logs?.filter(log => ['opened', 'clicked'].includes(log.status)).length || 0,
        clicked: logs?.filter(log => log.status === 'clicked').length || 0,
        bounced: logs?.filter(log => log.status === 'bounced').length || 0,
        failed: logs?.filter(log => log.status === 'failed').length || 0
    }

    const openRate = stats.totalSent > 0 ? Math.round((stats.opened / stats.totalSent) * 100) : 0
    const clickRate = stats.opened > 0 ? Math.round((stats.clicked / stats.opened) * 100) : 0
    const deliveryRate = stats.totalSent > 0 ? Math.round((stats.delivered / stats.totalSent) * 100) : 0

    const handleSendTestEmail = async () => {
        try {
            const response = await fetch('/api/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'welcome',
                    recipientEmail: 'test@example.com',
                    data: { userName: 'Test User' }
                })
            })

            if (response.ok) {
                toast({
                    title: 'Email de test envoyé',
                    description: 'L\'email de test a été envoyé avec succès',
                })
            } else {
                throw new Error('Erreur lors de l\'envoi')
            }
        } catch  {
            toast({
                title: 'Erreur',
                description: 'Impossible d\'envoyer l\'email de test',
                variant: 'destructive',
            })
        }
    }

    const handleDeleteTemplate = async (templateId: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce template ?')) return

        setTemplates(templates.filter(t => t.id !== templateId))
        toast({
            title: 'Template supprimé',
            description: 'Le template a été supprimé avec succès',
        })
    }

    const handlePauseCampaign = async (campaignId: string) => {
        setCampaigns(campaigns.map(c =>
            c.id === campaignId
                ? { ...c, status: c.status === 'paused' ? 'scheduled' : 'paused' as 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' }
                : c
        ))

        toast({
            title: 'Campagne mise à jour',
            description: 'Le statut de la campagne a été modifié',
        })
    }

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="dashboard" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Historique
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Templates
                    </TabsTrigger>
                    <TabsTrigger value="campaigns" className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Campagnes
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Configuration
                    </TabsTrigger>
                </TabsList>

                {/* Dashboard */}
                <TabsContent value="dashboard">
                    <div className="space-y-6">
                        {/* Statistiques principales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Emails envoyés</p>
                                            <p className="text-2xl font-bold">{stats.totalSent}</p>
                                        </div>
                                        <Mail className="h-8 w-8 text-blue-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Taux d&#39;ouverture</p>
                                            <p className="text-2xl font-bold">{openRate}%</p>
                                        </div>
                                        <Eye className="h-8 w-8 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Taux de clic</p>
                                            <p className="text-2xl font-bold">{clickRate}%</p>
                                        </div>
                                        <PlayCircle className="h-8 w-8 text-purple-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Livraison</p>
                                            <p className="text-2xl font-bold">{deliveryRate}%</p>
                                        </div>
                                        <CheckCircle className="h-8 w-8 text-orange-600" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Répartition par statut */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Répartition par statut</CardTitle>
                                <CardDescription>
                                    Distribution des statuts d&#39;emails des 30 derniers jours
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {Object.entries(stats).map(([status, count]) => {
                                        const Icon = statusIcons[status as keyof typeof statusIcons] || Mail
                                        return (
                                            <div key={status} className="text-center p-4 border rounded-lg">
                                                <Icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                                                <p className="text-2xl font-bold">{count}</p>
                                                <p className="text-sm text-muted-foreground capitalize">
                                                    {status === 'totalSent' ? 'Envoyés' :
                                                        status === 'delivered' ? 'Livrés' :
                                                            status === 'opened' ? 'Ouverts' :
                                                                status === 'clicked' ? 'Cliqués' :
                                                                    status === 'bounced' ? 'Rejetés' :
                                                                        status === 'failed' ? 'Échecs' : status}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Templates populaires */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Templates les plus utilisés</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {templates
                                        ?.sort((a, b) => b.usageCount - a.usageCount)
                                        ?.slice(0, 5)
                                        ?.map((template) => (
                                            <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div>
                                                    <p className="font-medium">{template.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Utilisé {template.usageCount} fois
                                                    </p>
                                                </div>
                                                <Badge variant={template.isActive ? 'default' : 'secondary'}>
                                                    {template.isActive ? 'Actif' : 'Inactif'}
                                                </Badge>
                                            </div>
                                        )) || <p className="text-center text-muted-foreground">Aucun template disponible</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Historique des emails */}
                <TabsContent value="logs">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Historique des emails</CardTitle>
                                    <CardDescription>
                                        Tous les emails envoyés avec leur statut
                                    </CardDescription>
                                </div>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nouvel email
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Filtres */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Rechercher par destinataire ou sujet..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full sm:w-48">
                                        <SelectValue placeholder="Statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="sent">Envoyé</SelectItem>
                                        <SelectItem value="delivered">Livré</SelectItem>
                                        <SelectItem value="opened">Ouvert</SelectItem>
                                        <SelectItem value="clicked">Cliqué</SelectItem>
                                        <SelectItem value="bounced">Rejeté</SelectItem>
                                        <SelectItem value="failed">Échec</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger className="w-full sm:w-48">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les types</SelectItem>
                                        <SelectItem value="welcome">Bienvenue</SelectItem>
                                        <SelectItem value="newsletter_daily">Newsletter quotidienne</SelectItem>
                                        <SelectItem value="newsletter_weekly">Newsletter hebdomadaire</SelectItem>
                                        <SelectItem value="password_reset">Mot de passe</SelectItem>
                                        <SelectItem value="subscription">Abonnement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Table des emails */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Destinataire</TableHead>
                                            <TableHead>Sujet</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Statut</TableHead>
                                            <TableHead>Envoyé le</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredLogs?.length > 0 ? filteredLogs.map((log) => {
                                            const StatusIcon = statusIcons[log.status]
                                            return (
                                                <TableRow key={log.id}>
                                                    <TableCell className="font-medium">{log.recipient}</TableCell>
                                                    <TableCell className="max-w-xs truncate">{log.subject}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {log.type.replace('_', ' ')}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={statusColors[log.status]}>
                                                            <StatusIcon className="h-3 w-3 mr-1" />
                                                            {log.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{formatDate(log.sentAt)}</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    Voir les détails
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Send className="mr-2 h-4 w-4" />
                                                                    Renvoyer
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                    Aucun email trouvé
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Templates */}
                <TabsContent value="templates">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Templates d&#39;emails</CardTitle>
                                    <CardDescription>
                                        Gérez vos modèles d&#39;emails
                                    </CardDescription>
                                </div>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nouveau template
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {templates?.length > 0 ? templates.map((template) => (
                                    <div key={template.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-medium">{template.name}</h3>
                                                <p className="text-sm text-muted-foreground">{template.subject}</p>
                                            </div>
                                            <Badge variant={template.isActive ? 'default' : 'secondary'}>
                                                {template.isActive ? 'Actif' : 'Inactif'}
                                            </Badge>
                                        </div>

                                        <div className="text-sm text-muted-foreground mb-4">
                                            <p>Utilisé {template.usageCount} fois</p>
                                            {template.lastUsed && (
                                                <p>Dernière utilisation : {formatDate(template.lastUsed)}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1">
                                                <Edit className="h-3 w-3 mr-1" />
                                                Modifier
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleSendTestEmail}
                                            >
                                                <Send className="h-3 w-3 mr-1" />
                                                Test
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="sm">
                                                        <MoreVertical className="h-3 w-3" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Aperçu
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Copy className="mr-2 h-4 w-4" />
                                                        Dupliquer
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteTemplate(template.id)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full text-center text-muted-foreground py-8">
                                        Aucun template disponible
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Campagnes */}
                <TabsContent value="campaigns">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Campagnes email</CardTitle>
                                    <CardDescription>
                                        Gérez vos campagnes d&#39;envoi en masse
                                    </CardDescription>
                                </div>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nouvelle campagne
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {campaigns?.length > 0 ? campaigns.map((campaign) => (
                                    <div key={campaign.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-medium">{campaign.name}</h3>
                                                <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={campaignStatusColors[campaign.status]}>
                                                    {campaign.status}
                                                </Badge>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handlePauseCampaign(campaign.id)}
                                                        >
                                                            {campaign.status === 'paused' ? (
                                                                <>
                                                                    <PlayCircle className="mr-2 h-4 w-4" />
                                                                    Reprendre
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <PauseCircle className="mr-2 h-4 w-4" />
                                                                    Mettre en pause
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">Destinataires</p>
                                                <p className="font-medium">{campaign.targetCount}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Envoyés</p>
                                                <p className="font-medium">{campaign.sentCount}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Taux d&#39;ouverture</p>
                                                <p className="font-medium">{campaign.openRate}%</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Taux de clic</p>
                                                <p className="font-medium">{campaign.clickRate}%</p>
                                            </div>
                                        </div>

                                        {campaign.scheduledFor && (
                                            <div className="mt-3 text-sm text-muted-foreground">
                                                <Calendar className="h-3 w-3 inline mr-1" />
                                                Programmé pour le {formatDate(campaign.scheduledFor)}
                                            </div>
                                        )}
                                    </div>
                                )) : (
                                    <div className="text-center text-muted-foreground py-8">
                                        Aucune campagne disponible
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Configuration */}
                <TabsContent value="settings">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration SMTP</CardTitle>
                                <CardDescription>
                                    Paramètres du serveur d&#39;envoi d&#39;emails
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Serveur SMTP</label>
                                    <Input value="smtp.gmail.com" readOnly />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Port</label>
                                    <Input value="587" readOnly />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Utilisateur</label>
                                    <Input value="newsletter@exemple.com" readOnly />
                                </div>
                                <Button className="w-full">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Tester la connexion
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Paramètres d&#39;envoi</CardTitle>
                                <CardDescription>
                                    Configuration des envois automatiques
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Limite d&#39;envoi par heure</label>
                                    <Input value="100" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Délai entre les envois (ms)</label>
                                    <Input value="1000" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Email expéditeur par défaut</label>
                                    <Input value="Newsletter Financière <newsletter@exemple.com>" />
                                </div>
                                <Button className="w-full">
                                    <Save className="h-4 w-4 mr-2" />
                                    Sauvegarder
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}