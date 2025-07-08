import { auth } from "@/shared/lib/auth-instance"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PUBLIC_ROUTES, ADMIN_ROUTES } from "@/shared/constants/routes"

// Routes qui ne nécessitent pas d'authentification
const publicRoutes = [
    PUBLIC_ROUTES.HOME,
    PUBLIC_ROUTES.LOGIN,
    PUBLIC_ROUTES.REGISTER,
    PUBLIC_ROUTES.FORGOT_PASSWORD,
    PUBLIC_ROUTES.ABOUT,
    PUBLIC_ROUTES.ARCHIVES,
    PUBLIC_ROUTES.PREMIUM,
    PUBLIC_ROUTES.REVIEWS,
    PUBLIC_ROUTES.DONATIONS,
]

// Routes qui nécessitent le rôle admin
const adminRoutes = Object.values(ADMIN_ROUTES)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const userRole = req.auth?.user?.role

    // Vérifier si c'est une route publique
    const isPublicRoute = publicRoutes.some(route => {
        if (typeof route === 'string') {
            return nextUrl.pathname === route || nextUrl.pathname.startsWith(route + '/')
        }
        return false
    })

    // Vérifier si c'est une route admin
    const isAdminRoute = adminRoutes.some(route => {
        if (typeof route === 'string') {
            return nextUrl.pathname === route || nextUrl.pathname.startsWith(route + '/')
        }
        return false
    })

    // Routes API - pas de redirection
    if (nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    // Si route publique, laisser passer
    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Si non connecté, rediriger vers login
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, nextUrl))
    }

    // Si route admin et pas admin, rediriger vers home
    if (isAdminRoute && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL(PUBLIC_ROUTES.HOME, nextUrl))
    }

    // Tout est ok, laisser passer
    return NextResponse.next()
})

// Configuration du matcher
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}