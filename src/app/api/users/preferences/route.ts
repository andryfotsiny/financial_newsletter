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

export async function GET() {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        // Utilisateur peut accéder seulement à ses propres préférences
        const preferences = await prisma.userPreferences.findUnique({
            where: { userId: session.user.id },
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

export async function PATCH(request: NextRequest) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        const body = await request.json()
        const validatedData = updatePreferencesSchema.parse(body)

        const updatedPreferences = await prisma.userPreferences.update({
            where: { userId: session.user.id },
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
