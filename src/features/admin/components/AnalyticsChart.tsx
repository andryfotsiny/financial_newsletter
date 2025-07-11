//src/features/admin/components/AnalyticsChart.tsx
'use client'

import { useState } from 'react'
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts'
import {
    TrendingUp,
    Users,
    Mail,
    Eye,
    DollarSign,
    Download,
    RefreshCw
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

// Données statiques pour les analytics
const subscribersData = [
    { month: 'Jan', free: 245, premium: 89, enterprise: 12 },
    { month: 'Fév', free: 278, premium: 102, enterprise: 15 },
    { month: 'Mar', free: 312, premium: 128, enterprise: 18 },
    { month: 'Avr', free: 289, premium: 145, enterprise: 22 },
    { month: 'Mai', free: 334, premium: 167, enterprise: 28 },
    { month: 'Jun', free: 356, premium: 189, enterprise: 31 },
    { month: 'Jul', free: 378, premium: 212, enterprise: 35 },
    { month: 'Aoû', free: 401, premium: 234, enterprise: 38 },
    { month: 'Sep', free: 423, premium: 256, enterprise: 42 },
    { month: 'Oct', free: 445, premium: 278, enterprise: 47 },
    { month: 'Nov', free: 467, premium: 301, enterprise: 52 },
    { month: 'Déc', free: 489, premium: 325, enterprise: 58 }
]

const revenueData = [
    { month: 'Jan', revenue: 3250, target: 3000 },
    { month: 'Fév', revenue: 3680, target: 3500 },
    { month: 'Mar', revenue: 4120, target: 4000 },
    { month: 'Avr', revenue: 4590, target: 4500 },
    { month: 'Mai', revenue: 5240, target: 5000 },
    { month: 'Jun', revenue: 5780, target: 5500 },
    { month: 'Jul', revenue: 6320, target: 6000 },
    { month: 'Aoû', revenue: 6890, target: 6500 },
    { month: 'Sep', revenue: 7450, target: 7000 },
    { month: 'Oct', revenue: 8120, target: 7500 },
    { month: 'Nov', revenue: 8790, target: 8000 },
    { month: 'Déc', revenue: 9450, target: 8500 }
]

const engagementData = [
    { day: 'Lun', opens: 78, clicks: 23, reads: 45 },
    { day: 'Mar', opens: 82, clicks: 28, reads: 52 },
    { day: 'Mer', opens: 85, clicks: 31, reads: 58 },
    { day: 'Jeu', opens: 79, clicks: 25, reads: 48 },
    { day: 'Ven', opens: 73, clicks: 22, reads: 41 },
    { day: 'Sam', opens: 65, clicks: 18, reads: 35 },
    { day: 'Dim', opens: 68, clicks: 20, reads: 38 }
]

const contentPerformance = [
    { name: 'Newsletters', value: 45, color: '#3B82F6' },
    { name: 'Analyses', value: 35, color: '#10B981' },
    { name: 'Sélections', value: 20, color: '#F59E0B' }
]

const topContent = [
    { title: 'Apple (AAPL) - Analyse Q4', type: 'Analyse', views: 1245, engagement: 89 },
    { title: 'Sélection momentum Europe', type: 'Sélection', views: 987, engagement: 76 },
    { title: 'Newsletter hebdomadaire #47', type: 'Newsletter', views: 2341, engagement: 68 },
    { title: 'Secteur énergétique - Opportunités', type: 'Analyse', views: 765, engagement: 82 },
    { title: 'IA - Top 10 valeurs tech', type: 'Sélection', views: 654, engagement: 91 }
]

interface AnalyticsChartProps {
    period: '7d' | '30d' | '90d' | '1y'
    onPeriodChange: (period: '7d' | '30d' | '90d' | '1y') => void
}

export function AnalyticsChart({ period, onPeriodChange }: AnalyticsChartProps) {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = async () => {
        setRefreshing(true)
        // Simuler le rechargement des données
        await new Promise(resolve => setTimeout(resolve, 1000))
        setRefreshing(false)
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
        }).format(value)
    }

    return (
        <div className="space-y-6">
            {/* Header avec contrôles */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Tableaux de bord</h2>
                    <p className="text-muted-foreground">
                        Vue d&#39;ensemble des performances et métriques clés
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={period} onValueChange={onPeriodChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">7 derniers jours</SelectItem>
                            <SelectItem value="30d">30 derniers jours</SelectItem>
                            <SelectItem value="90d">90 derniers jours</SelectItem>
                            <SelectItem value="1y">1 année</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        Actualiser
                    </Button>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Exporter
                    </Button>
                </div>
            </div>

            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Abonnés totaux</p>
                                <p className="text-2xl font-bold">872</p>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +12% ce mois
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Revenus mensuels</p>
                                <p className="text-2xl font-bold">{formatCurrency(9450)}</p>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +18% ce mois
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Taux d&#39;ouverture</p>
                                <p className="text-2xl font-bold">78.5%</p>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +3.2% ce mois
                                </p>
                            </div>
                            <Mail className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Articles vus</p>
                                <p className="text-2xl font-bold">12.4k</p>
                                <p className="text-xs text-green-600 flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +8.7% ce mois
                                </p>
                            </div>
                            <Eye className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Graphiques principaux */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Évolution des abonnés */}
                <Card>
                    <CardHeader>
                        <CardTitle>Évolution des abonnés</CardTitle>
                        <CardDescription>Répartition par plan d&#39;abonnement</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={subscribersData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="enterprise" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
                                <Area type="monotone" dataKey="premium" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                                <Area type="monotone" dataKey="free" stackId="1" stroke="#6B7280" fill="#6B7280" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Revenus */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenus mensuels</CardTitle>
                        <CardDescription>Revenus réalisés vs objectifs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                                <Line type="monotone" dataKey="target" stroke="#6B7280" strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Engagement et performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Engagement hebdomadaire */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Engagement hebdomadaire</CardTitle>
                        <CardDescription>Ouvertures, clics et lectures par jour</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={engagementData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="opens" fill="#3B82F6" />
                                <Bar dataKey="clicks" fill="#10B981" />
                                <Bar dataKey="reads" fill="#F59E0B" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Répartition du contenu */}
                <Card>
                    <CardHeader>
                        <CardTitle>Répartition du contenu</CardTitle>
                        <CardDescription>Types de contenu les plus consultés</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={contentPerformance}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {contentPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                            {contentPerformance.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top contenu */}
            <Card>
                <CardHeader>
                    <CardTitle>Contenu le plus performant</CardTitle>
                    <CardDescription>Articles avec le meilleur engagement</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topContent.map((content, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">{content.title}</span>
                                        <Badge variant="outline">{content.type}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            {content.views} vues
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3" />
                                            {content.engagement}% engagement
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold">#{index + 1}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}