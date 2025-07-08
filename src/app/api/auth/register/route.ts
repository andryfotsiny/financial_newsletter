import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { prisma } from '@/shared/lib/prisma'
import { AUTH_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/shared/lib/constants'
import { registerSchema } from '@/features/auth/types/auth.types'

export async function POST(request: NextRequest) {
    try {
        // Parse et valider les données
        const body = await request.json()

        const validatedData = registerSchema.parse(body)

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email.toLowerCase(),
            },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.USER_ALREADY_EXISTS },
                { status: 400 }
            )
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(
            validatedData.password,
            AUTH_CONFIG.bcryptRounds
        )

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                email: validatedData.email.toLowerCase(),
                password: hashedPassword,
                name: validatedData.name || null,
                role: 'USER',
                preferences: {
                    create: {
                        // Préférences par défaut
                        receiveDaily: true,
                        receiveWeekly: true,
                        receiveAnalyses: true,
                        receiveSelections: true,
                        receiveThematic: true,
                        emailNotifications: true,
                        marketingEmails: false,
                        preferredSendTime: '08:00',
                        timezone: 'Europe/Paris',
                        language: 'fr',
                    },
                },
                // Créer un abonnement gratuit par défaut
                subscription: {
                    create: {
                        plan: 'FREE',
                        status: 'ACTIVE',
                    },
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        })

        // TODO: Envoyer un email de bienvenue
        // await sendWelcomeEmail(user.email, user.name)

        return NextResponse.json({
            success: true,
            message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        })
    } catch (error) {
        console.error('Registration error:', error)

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