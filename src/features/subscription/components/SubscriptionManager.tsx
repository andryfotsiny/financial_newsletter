//src/features/subscription/components/SubscriptionManager.tsx
'use client'

import { useState } from 'react'
import { CreditCard,  CheckCircle, AlertCircle, Crown, Zap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate, formatCurrency } from '@/shared/lib/utils'

interface SubscriptionManagerProps {
    subscription: {
        id: string
        plan: 'FREE' | 'PREMIUM' | 'ENTERPRISE'
        status: 'ACTIVE' | 'INACTIVE' | 'CANCELED' | 'PAST_DUE'
        startDate: Date
        endDate: Date | null
        price: number
        billingCycle: 'MONTHLY' | 'YEARLY'
        autoRenew: boolean
    } | null
    user: {
        id: string
        email: string
        name: string | null
    }
}

const planFeatures = {
    FREE: [
        "Accès aux archives publiques",
        "Newsletter hebdomadaire",
        "Contenu limité"
    ],
    PREMIUM: [
        "Accès complet aux archives",
        "Newsletter quotidienne et hebdomadaire",
        "Analyses exclusives",
        "Sélections de titres",
        "Support prioritaire"
    ],
    ENTERPRISE: [
        "Toutes les fonctionnalités Premium",
        "Analyses macroéconomiques avancées",
        "Recherches thématiques exclusives",
        "Support dédié",
        "Accès API"
    ]
}

const planPricing = {
    PREMIUM: {
        monthly: 29.99,
        yearly: 299.99
    },
    ENTERPRISE: {
        monthly: 99.99,
        yearly: 999.99
    }
}

export function SubscriptionManager({ subscription }: SubscriptionManagerProps) {
    const [isLoading, setIsLoading] = useState(false)

    const currentPlan = subscription?.plan || 'FREE'
    const isActive = subscription?.status === 'ACTIVE'
    const isPastDue = subscription?.status === 'PAST_DUE'

    const handleUpgrade = async (plan: 'PREMIUM' | 'ENTERPRISE', cycle: 'MONTHLY' | 'YEARLY') => {
        setIsLoading(true)
        try {
            // Ici on appellerait l'API de souscription
            console.log(`Upgrading to ${plan} (${cycle})`)
            // await subscriptionService.upgrade(plan, cycle)
        } catch (error) {
            console.error('Error upgrading:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = async () => {
        setIsLoading(true)
        try {
            // Ici on appellerait l'API d'annulation
            console.log('Canceling subscription')
            // await subscriptionService.cancel(subscription.id)
        } catch (error) {
            console.error('Error canceling:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleReactivate = async () => {
        setIsLoading(true)
        try {
            // Ici on appellerait l'API de réactivation
            console.log('Reactivating subscription')
            // await subscriptionService.reactivate(subscription.id)
        } catch (error) {
            console.error('Error reactivating:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return <Badge className="bg-green-100 text-green-800 border-green-200">Actif</Badge>
            case 'PAST_DUE':
                return <Badge variant="destructive">Impayé</Badge>
            case 'CANCELED':
                return <Badge variant="secondary">Annulé</Badge>
            default:
                return <Badge variant="outline">Inactif</Badge>
        }
    }

    const getPlanIcon = (plan: string) => {
        switch (plan) {
            case 'PREMIUM':
                return <Crown className="h-5 w-5 text-yellow-600" />
            case 'ENTERPRISE':
                return <Zap className="h-5 w-5 text-purple-600" />
            default:
                return <CreditCard className="h-5 w-5 text-gray-600" />
        }
    }

    return (
        <div className="space-y-6">
            {/* Abonnement actuel */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {getPlanIcon(currentPlan)}
                            <CardTitle>
                                Plan {currentPlan === 'FREE' ? 'Gratuit' :
                                currentPlan === 'PREMIUM' ? 'Premium' : 'Entreprise'}
                            </CardTitle>
                        </div>
                        {subscription && getStatusBadge(subscription.status)}
                    </div>
                    <CardDescription>
                        {currentPlan === 'FREE'
                            ? "Votre plan gratuit avec accès limité"
                            : "Détails de votre abonnement premium"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {subscription && currentPlan !== 'FREE' ? (
                        <>
                            {/* Informations de facturation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Prix</p>
                                    <p className="text-2xl font-bold">
                                        {formatCurrency(subscription.price)}
                                        <span className="text-base font-normal text-muted-foreground">
                                            /{subscription.billingCycle === 'MONTHLY' ? 'mois' : 'an'}
                                        </span>
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Prochaine facturation</p>
                                    <p className="text-lg">
                                        {subscription.endDate ? formatDate(subscription.endDate) : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* État de l'abonnement */}
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                                {isActive ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                                )}
                                <span className="text-sm">
                                    {isActive
                                        ? `Renouvellement automatique ${subscription.autoRenew ? 'activé' : 'désactivé'}`
                                        : isPastDue
                                            ? "Paiement en attente"
                                            : "Abonnement inactif"
                                    }
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2">
                                {isActive && (
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                    >
                                        Annuler l&#39;abonnement
                                    </Button>
                                )}
                                {!isActive && subscription.status === 'CANCELED' && (
                                    <Button onClick={handleReactivate} disabled={isLoading}>
                                        Réactiver l&#39;abonnement
                                    </Button>
                                )}
                                {isPastDue && (
                                    <Button onClick={() => console.log('Update payment')}>
                                        Mettre à jour le paiement
                                    </Button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">Passez au Premium</h3>
                            <p className="text-muted-foreground mb-4">
                                Débloquez l&#39;accès complet à nos analyses financières exclusives
                            </p>
                        </div>
                    )}

                    {/* Fonctionnalités du plan actuel */}
                    <div>
                        <h4 className="font-medium mb-3">Fonctionnalités incluses</h4>
                        <ul className="space-y-2">
                            {planFeatures[currentPlan].map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Plans disponibles */}
            {currentPlan !== 'ENTERPRISE' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Plan Premium */}
                    {currentPlan !== 'PREMIUM' && (
                        <Card className="relative">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Crown className="h-5 w-5 text-yellow-600" />
                                    <CardTitle>Plan Premium</CardTitle>
                                </div>
                                <CardDescription>
                                    Accès complet aux analyses et recherches
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold">
                                            {formatCurrency(planPricing.PREMIUM.monthly)}
                                        </span>
                                        <span className="text-muted-foreground">/mois</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        ou {formatCurrency(planPricing.PREMIUM.yearly)}/an
                                        <span className="text-green-600 font-medium ml-1">
                                            (2 mois gratuits)
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-2 text-sm">
                                    {planFeatures.PREMIUM.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Separator />

                                <div className="space-y-2">
                                    <Button
                                        className="w-full"
                                        onClick={() => handleUpgrade('PREMIUM', 'MONTHLY')}
                                        disabled={isLoading}
                                    >
                                        Souscrire Mensuel
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => handleUpgrade('PREMIUM', 'YEARLY')}
                                        disabled={isLoading}
                                    >
                                        Souscrire Annuel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Plan Enterprise */}
                    <Card className="relative border-purple-200">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-purple-600 text-white">Populaire</Badge>
                        </div>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-purple-600" />
                                <CardTitle>Plan Entreprise</CardTitle>
                            </div>
                            <CardDescription>
                                Solution complète pour les professionnels
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">
                                        {formatCurrency(planPricing.ENTERPRISE.monthly)}
                                    </span>
                                    <span className="text-muted-foreground">/mois</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    ou {formatCurrency(planPricing.ENTERPRISE.yearly)}/an
                                    <span className="text-green-600 font-medium ml-1">
                                        (2 mois gratuits)
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-2 text-sm">
                                {planFeatures.ENTERPRISE.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Separator />

                            <div className="space-y-2">
                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                    onClick={() => handleUpgrade('ENTERPRISE', 'MONTHLY')}
                                    disabled={isLoading}
                                >
                                    Souscrire Mensuel
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                                    onClick={() => handleUpgrade('ENTERPRISE', 'YEARLY')}
                                    disabled={isLoading}
                                >
                                    Souscrire Annuel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Historique de facturation */}
            {subscription && currentPlan !== 'FREE' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Historique de facturation</CardTitle>
                        <CardDescription>
                            Vos dernières factures et paiements
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Données statiques pour l'instant */}
                            {[
                                {
                                    date: new Date('2024-12-01'),
                                    amount: subscription.price,
                                    status: 'Payé',
                                    invoice: 'INV-2024-001'
                                },
                                {
                                    date: new Date('2024-11-01'),
                                    amount: subscription.price,
                                    status: 'Payé',
                                    invoice: 'INV-2024-002'
                                }
                            ].map((invoice, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                                    <div className="space-y-1">
                                        <p className="font-medium">{invoice.invoice}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDate(invoice.date)}
                                        </p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                                        <Badge variant="outline" className="text-xs">
                                            {invoice.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}