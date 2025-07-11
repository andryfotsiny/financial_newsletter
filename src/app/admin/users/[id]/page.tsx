//src/app/admin/analytics/page.tsx
'use client'

import { useState } from 'react'
import { AnalyticsChart } from '@/features/admin/components/AnalyticsChart'

// Note: En mode client component pour gérer l'état des filtres
// Si on voulait du SSR, on passerait les filtres via searchParams

export default function AnalyticsAdminPage() {
    const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-muted-foreground mt-2">
                    Analysez les performances de votre newsletter et l&#39;engagement de vos abonnés
                </p>
            </div>

            <AnalyticsChart
                period={period}
                onPeriodChange={setPeriod}
            />
        </div>
    )
}