//src/app/api/email/send/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getSession } from '@/shared/lib/auth-instance'
import { emailService } from '@/features/email/services/emailService'
//import { EmailType } from '@/features/email/types/email.types'
import { isAdmin, isEditor } from '@/shared/lib/auth'

// Schéma de validation pour l'envoi d'email
const sendEmailSchema = z.object({
    type: z.enum(['welcome', 'password_reset', 'newsletter_daily', 'newsletter_weekly', 'subscription_confirmation']),
    recipientId: z.string().optional(),
    recipientEmail: z.string().email().optional(),
    data: z.record(z.any()).optional(),
    newsletterId: z.string().optional()
})

const bulkEmailSchema = z.object({
    type: z.enum(['newsletter_daily', 'newsletter_weekly']),
    newsletterId: z.string(),
    targetAudience: z.object({
        type: z.enum(['all', 'premium', 'free', 'custom']),
        userIds: z.array(z.string()).optional(),
        filters: z.object({
            plan: z.array(z.string()).optional(),
            isActive: z.boolean().optional(),
            createdAfter: z.string().optional(),
            createdBefore: z.string().optional()
        }).optional()
    })
})

// POST /api/email/send - Envoyer un email individuel
export async function POST(request: NextRequest) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: 'Non autorisé' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { type, recipientId, recipientEmail, data, newsletterId } = sendEmailSchema.parse(body)

        // Vérifier les permissions selon le type d'email
        if (['newsletter_daily', 'newsletter_weekly'].includes(type)) {
            if (!isAdmin(session.user) && !isEditor(session.user)) {
                return NextResponse.json(
                    { error: 'Permissions insuffisantes' },
                    { status: 403 }
                )
            }
        }

        let success = false

        switch (type) {
            case 'welcome':
                if (!recipientEmail) {
                    return NextResponse.json(
                        { error: 'Email du destinataire requis pour email de bienvenue' },
                        { status: 400 }
                    )
                }

                success = await emailService.sendWelcomeEmail({
                    user: {
                        id: recipientId || '',
                        email: recipientEmail,
                        name: data?.userName
                    },
                    loginUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
                    supportEmail: process.env.SUPPORT_EMAIL || 'support@newsletter.com'
                })
                break

            case 'password_reset':
                if (!recipientEmail || !data?.resetToken) {
                    return NextResponse.json(
                        { error: 'Email et token requis pour réinitialisation' },
                        { status: 400 }
                    )
                }

                success = await emailService.sendPasswordResetEmail({
                    user: {
                        email: recipientEmail,
                        name: data?.userName
                    },
                    resetToken: data.resetToken,
                    resetUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${data.resetToken}`,
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
                })
                break

            case 'subscription_confirmation':
                if (!recipientEmail || !data?.subscription) {
                    return NextResponse.json(
                        { error: 'Email et données d\'abonnement requis' },
                        { status: 400 }
                    )
                }

                success = await emailService.sendSubscriptionConfirmationEmail({
                    user: {
                        email: recipientEmail,
                        name: data?.userName
                    },
                    subscription: data.subscription,
                    invoiceUrl: data?.invoiceUrl
                })
                break

            case 'newsletter_daily':
            case 'newsletter_weekly':
                // Pour les newsletters individuelles, on aurait besoin des données de la newsletter
                // Ici on simule avec des données statiques
                if (!recipientEmail) {
                    return NextResponse.json(
                        { error: 'Email du destinataire requis' },
                        { status: 400 }
                    )
                }

                const mockNewsletterData = {
                    newsletter: {
                        id: newsletterId || '1',
                        title: type === 'newsletter_daily'
                            ? 'Actualités financières du jour'
                            : 'Résumé hebdomadaire des marchés',
                        subtitle: 'Votre newsletter financière',
                        content: '<p>Contenu de la newsletter...</p>',
                        excerpt: 'Résumé des principales actualités',
                        type: type === 'newsletter_daily' ? 'DAILY' : 'WEEKLY',
                        publishedAt: new Date(),
                        authorName: 'L\'équipe éditoriale',
                        slug: `newsletter-${Date.now()}`
                    },
                    user: {
                        id: recipientId || '',
                        email: recipientEmail,
                        name: data?.userName,
                        preferences: {
                            receiveDaily: true,
                            receiveWeekly: true,
                            receiveAnalyses: true
                        }
                    },
                    unsubscribeToken: 'mock-token'
                }

                success = type === 'newsletter_daily'
                    ? await emailService.sendDailyNewsletter(mockNewsletterData)
                    : await emailService.sendWeeklyNewsletter(mockNewsletterData)
                break

            default:
                return NextResponse.json(
                    { error: 'Type d\'email non supporté' },
                    { status: 400 }
                )
        }

        if (success) {
            // Log de l'envoi (en production, sauvegarder en base)
            console.log(`Email ${type} envoyé avec succès à ${recipientEmail}`)

            return NextResponse.json({
                success: true,
                message: 'Email envoyé avec succès'
            })
        } else {
            return NextResponse.json(
                { error: 'Échec de l\'envoi de l\'email' },
                { status: 500 }
            )
        }

    } catch (error) {
        console.error('Email send error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Erreur serveur lors de l\'envoi' },
            { status: 500 }
        )
    }
}

// PUT /api/email/send - Envoi en masse (newsletters)
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession()

        if (!session || (!isAdmin(session.user) && !isEditor(session.user))) {
            return NextResponse.json(
                { error: 'Permissions insuffisantes' },
                { status: 403 }
            )
        }

        const body = await request.json()
        const { type, newsletterId} = bulkEmailSchema.parse(body)

        console.log(`Démarrage envoi en masse: ${type}, newsletter: ${newsletterId}`)

        // Simulation de l'envoi en masse
        const result = await emailService.sendNewsletterToSubscribers(
            newsletterId,
            type === 'newsletter_daily' ? 'daily' : 'weekly'
        )

        // En production, on sauvegarderait les résultats en base
        console.log(`Envoi terminé: ${result.success} succès, ${result.failed} échecs`)

        return NextResponse.json({
            success: true,
            message: 'Envoi en masse terminé',
            stats: result
        })

    } catch (error) {
        console.error('Bulk email send error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Données invalides', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Erreur serveur lors de l\'envoi en masse' },
            { status: 500 }
        )
    }
}