import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/shared/lib/auth-instance'

export async function checkAdminAccess(request: NextRequest) {
    const session = await getSession()

    // Pas de session
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Pas admin
    if (session.user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Admin OK
    return NextResponse.next()
}

export async function checkEditorAccess(request: NextRequest) {
    const session = await getSession()

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Admin ou éditeur
    if (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export async function checkPremiumAccess(request: NextRequest) {
    const session = await getSession()

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Admins et éditeurs ont toujours accès
    if (session.user.role === 'ADMIN' || session.user.role === 'EDITOR') {
        return NextResponse.next()
    }

    // Vérifier l'abonnement
    if (session.user.subscriptionStatus !== 'ACTIVE' ||
        (session.user.subscriptionPlan !== 'PREMIUM' &&
            session.user.subscriptionPlan !== 'ENTERPRISE')) {
        return NextResponse.redirect(new URL('/premium', request.url))
    }

    return NextResponse.next()
}