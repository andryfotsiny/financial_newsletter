// app/admin/layout.tsx

import { ReactNode } from 'react'
import { getSession } from '@/shared/lib/auth-instance'
import { isAdmin } from '@/shared/lib/auth'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar'
import { redirect } from 'next/navigation'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

interface AdminLayoutProps {
    children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
    const session = await getSession()
    if (!session) redirect(PUBLIC_ROUTES.LOGIN)
    if (!isAdmin(session.user)) redirect(PUBLIC_ROUTES.HOME)

    return (
        <div className="flex h-screen bg-background">
            <aside className="w-64 border-r bg-card">
                <AdminSidebar />
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6">{children}</div>
            </main>
        </div>
    )
}
