'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

export function useAdmin() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const isAdmin = session?.user?.role === 'ADMIN'
    const isEditor = session?.user?.role === 'EDITOR'
    const hasAdminAccess = isAdmin || isEditor

    useEffect(() => {
        // Si la session est chargée et l'utilisateur n'est pas admin
        if (status === 'authenticated' && !isAdmin) {
            router.push(PUBLIC_ROUTES.HOME)
        }

        // Si pas de session
        if (status === 'unauthenticated') {
            router.push(PUBLIC_ROUTES.LOGIN)
        }
    }, [status, isAdmin, router])

    return {
        session,
        isAdmin,
        isEditor,
        hasAdminAccess,
        isLoading: status === 'loading',
    }
}

// Hook pour vérifier les permissions sur des ressources spécifiques
export function useAdminPermissions() {
    const { isAdmin, isEditor } = useAdmin()

    return {
        canCreateContent: isAdmin || isEditor,
        canEditContent: isAdmin || isEditor,
        canDeleteContent: isAdmin,
        canManageUsers: isAdmin,
        canViewAnalytics: isAdmin,
        canManageSettings: isAdmin,
    }
}