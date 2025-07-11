//src/app/(dashboard)/account/subscription/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSession } from '@/shared/lib/auth-instance'
import { prisma } from '@/shared/lib/prisma'
import { SubscriptionManager } from '@/features/subscription/components/SubscriptionManager'

export const metadata: Metadata = {
    title: 'Gestion de l\'abonnement',
    description: 'Gérez votre abonnement et vos préférences de facturation',
}

function getPlanPrice(plan: string, billingCycle: "MONTHLY" | "YEARLY"): number {
    if (plan === 'PREMIUM') {
        return billingCycle === 'YEARLY' ? 299.99 : 29.99;
    }
    if (plan === 'ENTERPRISE') {
        return billingCycle === 'YEARLY' ? 999.99 : 99.99;
    }
    return 0;
}


export default async function SubscriptionPage() {
    const session = await getSession()

    if (!session?.user) {
        notFound()
    }

    // Récupérer les données utilisateur avec abonnement
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            subscription: true,
        }
    })

    if (!user) {
        notFound()
    }
    const subscription = user.subscription
        ? {
            id: user.subscription.id,
            plan: user.subscription.plan as "FREE" | "PREMIUM" | "ENTERPRISE",
            status: user.subscription.status as "ACTIVE" | "INACTIVE" | "CANCELED" | "PAST_DUE",
            startDate: user.subscription.currentPeriodStart ?? user.subscription.createdAt,
            endDate: user.subscription.currentPeriodEnd ?? null,  // <-- ici, null si pas de date
            price: getPlanPrice(user.subscription.plan, "MONTHLY"),
            billingCycle: "MONTHLY" as "MONTHLY" | "YEARLY", // <-- cast explicite ici
            autoRenew: !user.subscription.cancelAtPeriodEnd
        }
        : null;


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Gestion de l&#39;abonnement</h1>
                <p className="text-muted-foreground mt-2">
                    Gérez votre plan d&#39;abonnement et vos préférences de facturation
                </p>
            </div>

            <SubscriptionManager
                subscription={subscription}
                user={{
                    id: user.id,
                    email: user.email,
                    name: user.name
                }}
            />

        </div>
    )
}