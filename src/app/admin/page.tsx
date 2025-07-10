import { Metadata } from 'next'
import { AdminDashboard } from '@/features/admin/components/AdminDashboard'

export const metadata: Metadata = {
    title: 'Administration',
    description: 'Tableau de bord administrateur',
}

export default function AdminPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Tableau de bord</h1>
                <p className="text-muted-foreground mt-2">
                    Vue d&#39;ensemble de votre newsletter financière
                </p>
            </div>

            <AdminDashboard />
        </div>
    )
}