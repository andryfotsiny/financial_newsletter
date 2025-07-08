import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { getSession } from '@/shared/lib/auth-instance'
import { USER_ROUTES } from '@/shared/constants/routes'
import { APP_CONFIG } from '@/shared/lib/constants'

export const metadata: Metadata = {
    title: 'Inscription',
    description: `Créez votre compte ${APP_CONFIG.name} pour accéder à notre newsletter financière`,
}

export default async function RegisterPage() {
    // Vérifier si l'utilisateur est déjà connecté
    const session = await getSession()

    if (session) {
        redirect(USER_ROUTES.DASHBOARD)
    }

    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}