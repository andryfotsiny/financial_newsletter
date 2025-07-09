import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { getSession } from '@/shared/lib/auth-instance'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { DashboardSidebar } from '@/features/user/components/DashboardSidebar'

interface DashboardLayoutProps {
    children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getSession()

    if (!session) {
        redirect(PUBLIC_ROUTES.LOGIN)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <DashboardSidebar />
                </div>

                {/* Contenu principal */}
                <div className="md:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    )
}