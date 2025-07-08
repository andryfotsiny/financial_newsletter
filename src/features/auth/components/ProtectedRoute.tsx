'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

import { PUBLIC_ROUTES } from '@/shared/constants/routes'

interface ProtectedRouteProps {
    children: React.ReactNode
    requiredRole?: 'USER' | 'EDITOR' | 'ADMIN'
    redirectTo?: string
}

export function ProtectedRoute({
                                   children,
                                   requiredRole,
                                   redirectTo = PUBLIC_ROUTES.LOGIN
                               }: ProtectedRouteProps) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return

        if (!session) {
            router.push(redirectTo)
            return
        }

        if (requiredRole && session.user.role !== requiredRole && session.user.role !== 'ADMIN') {
            router.push(PUBLIC_ROUTES.HOME)
        }
    }, [session, status, router, requiredRole, redirectTo])

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!session) {
        return null
    }

    if (requiredRole && session.user.role !== requiredRole && session.user.role !== 'ADMIN') {
        return null
    }

    return <>{children}</>
}