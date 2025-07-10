import { Metadata } from 'next'
import { NewsletterEditor } from '@/features/newsletter/components/NewsletterEditor'

export const metadata: Metadata = {
    title: 'Nouvelle newsletter - Administration',
    description: 'Créer une nouvelle newsletter',
}

export default function CreateNewsletterPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Nouvelle newsletter</h1>
                <p className="text-muted-foreground mt-2">
                    Créez une nouvelle newsletter pour vos abonnés
                </p>
            </div>

            <NewsletterEditor mode="create" />
        </div>
    )
}