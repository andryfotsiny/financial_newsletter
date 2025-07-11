//src/app/admin/selections/create/page.tsx
import { Metadata } from 'next'
import { SelectionEditor } from '@/features/selection/components/SelectionEditor'

export const metadata: Metadata = {
    title: 'Nouvelle sélection - Administration',
    description: 'Créer une nouvelle sélection d\'investissement',
}

export default function CreateSelectionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Nouvelle sélection</h1>
                <p className="text-muted-foreground mt-2">
                    Créez une nouvelle sélection d&#39;investissement thématique pour vos abonnés
                </p>
            </div>

            <SelectionEditor mode="create" />
        </div>
    )
}