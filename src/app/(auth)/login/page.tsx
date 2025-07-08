import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { getSession } from '@/shared/lib/auth'
import { USER_ROUTES } from '@/shared/constants/routes'
import { APP_CONFIG } from '@/shared/lib/constants'

export const metadata: Metadata = {
    title: 'Connexion',
    description: `Connectez-vous à votre compte ${APP_CONFIG.name}`,
}

export default async function LoginPage() {
    // Vérifier si l'utilisateur est déjà connecté
    const session = await getSession()

    if (session) {
        redirect(USER_ROUTES.DASHBOARD)
    }

    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}