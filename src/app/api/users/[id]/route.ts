import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getSession } from '@/shared/lib/auth-instance'
import { prisma } from '@/shared/lib/prisma'
import { ERROR_MESSAGES } from '@/shared/lib/constants'

const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    avatar: z.string().url().optional(),
})

// Utilitaire pour extraire l'id depuis l'URL NextRequest (fonctionne pour toutes les routes dynamiques)
function extractIdFromUrl(request: NextRequest) {
    const segments = new URL(request.url).pathname.split('/').filter(Boolean)
    return segments[segments.length - 1] // dernier segment = id
}

export async function GET(request: NextRequest) {
    const id = extractIdFromUrl(request)

    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        if (session.user.id !== id && session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 403 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                role: true,
                createdAt: true,
                subscription: {
                    select: {
                        plan: true,
                        status: true,
                        currentPeriodEnd: true,
                    }
                },
                preferences: true,
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.USER_NOT_FOUND },
                { status: 404 }
            )
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
            { status: 500 }
        )
    }
}

export async function PATCH(request: NextRequest) {
    const id = extractIdFromUrl(request)

    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        if (session.user.id !== id) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 403 }
            )
        }

        const body = await request.json()
        const validatedData = updateUserSchema.parse(body)

        if (validatedData.email && validatedData.email !== session.user.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email: validatedData.email },
            })

            if (existingUser) {
                return NextResponse.json(
                    { error: 'Cet email est déjà utilisé' },
                    { status: 400 }
                )
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: validatedData,
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
            }
        })

        return NextResponse.json({
            success: true,
            user: updatedUser,
        })
    } catch (error) {
        console.error('Update user error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
            { status: 500 }
        )
    }
}
