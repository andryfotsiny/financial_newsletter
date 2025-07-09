import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getSession } from '@/shared/lib/auth-instance'
import { prisma } from '@/shared/lib/prisma'
import { ERROR_MESSAGES } from '@/shared/lib/constants'

const updatePreferencesSchema = z.object({
    receiveDaily: z.boolean(),
    receiveWeekly: z.boolean(),
    receiveAnalyses: z.boolean(),
    receiveSelections: z.boolean(),
    receiveThematic: z.boolean(),
    emailNotifications: z.boolean(),
    marketingEmails: z.boolean(),
    preferredSendTime: z.string(),
    timezone: z.string(),
    language: z.string(),
})

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        // Vérifier que l'utilisateur demande ses propres préférences
        if (session.user.id !== params.id) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 403 }
            )
        }

        const preferences = await prisma.userPreferences.findUnique({
            where: { userId: params.id },
        })

        if (!preferences) {
            return NextResponse.json(
                { error: 'Préférences non trouvées' },
                { status: 404 }
            )
        }

        return NextResponse.json({ preferences })
    } catch (error) {
        console.error('Get preferences error:', error)
        return NextResponse.json(
            { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        // Vérifier que l'utilisateur modifie ses propres préférences
        if (session.user.id !== params.id) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 403 }
            )
        }

        const body = await request.json()
        const validatedData = updatePreferencesSchema.parse(body)

        const updatedPreferences = await prisma.userPreferences.update({
            where: { userId: params.id },
            data: validatedData,
        })

        return NextResponse.json({
            success: true,
            preferences: updatedPreferences,
        })
    } catch (error) {
        console.error('Update preferences error:', error)

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