//src/app/admin/analyses/create/page.tsx
import { Metadata } from 'next'
import { AnalysisEditor } from '@/features/analysis/components/AnalysisEditor'

export const metadata: Metadata = {
    title: 'Nouvelle analyse - Administration',
    description: 'Créer une nouvelle analyse financière',
}

export default function CreateAnalysisPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Nouvelle analyse</h1>
                <p className="text-muted-foreground mt-2">
                    Créez une nouvelle analyse financière pour vos abonnés premium
                </p>
            </div>

            <AnalysisEditor mode="create" />
        </div>
    )
}