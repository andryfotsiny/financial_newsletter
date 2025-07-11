import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getSession } from '@/shared/lib/auth-instance'
import { prisma } from '@/shared/lib/prisma'
import { isAdmin, isEditor } from '@/shared/lib/auth'
import { ERROR_MESSAGES } from '@/shared/lib/constants'
import { createNewsletterSchema } from '@/features/newsletter/types/newsletter.types'
import { slugify } from '@/shared/lib/utils'
import type { Prisma } from '@prisma/client'

// GET /api/newsletters - Liste des newsletters
export async function GET(request: NextRequest) {
    try {
        const session = await getSession()
        const { searchParams } = new URL(request.url)

        // Construire les filtres
        const where: Prisma.NewsletterWhereInput = {}

        // Filtres publics vs admin
        if (!session || (!isAdmin(session.user) && !isEditor(session.user))) {
            // Utilisateurs non-admin voient seulement les newsletters publiées
            where.status = 'PUBLISHED'
        } else {
            // Admin peut filtrer par statut
            const status = searchParams.get('status')
            if (status && status !== 'all') {
                where.status = status
            }
        }

        // Autres filtres
        const type = searchParams.get('type')
        if (type && type !== 'all') {
            where.type = type
        }

        const isPremium = searchParams.get('isPremium')
        if (isPremium !== null) {
            where.isPremium = isPremium === 'true'
        }

        const search = searchParams.get('search')
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { content: { contains: search } },
            ]
        }

        const newsletters = await prisma.newsletter.findMany({
            where,
            select: {
                id: true,
                title: true,
                subtitle: true,
                excerpt: true,
                type: true,
                status: true,
                isPremium: true,
                slug: true,
                publishedAt: true,
                scheduledFor: true,
                authorName: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ newsletters })
    } catch (error) {
        console.error('Get newsletters error:', error)
        return NextResponse.json(
            { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG },
            { status: 500 }
        )
    }
}

// POST /api/newsletters - Créer une newsletter
export async function POST(request: NextRequest) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        // Vérifier les permissions
        if (!isAdmin(session.user) && !isEditor(session.user)) {
            return NextResponse.json(
                { error: ERROR_MESSAGES.UNAUTHORIZED },
                { status: 403 }
            )
        }

        const body = await request.json()
        const validatedData = createNewsletterSchema.parse(body)

        // Générer un slug unique
        let slug = slugify(validatedData.title)
        let slugExists = await prisma.newsletter.findUnique({
            where: { slug },
        })

        let counter = 1
        while (slugExists) {
            slug = `${slugify(validatedData.title)}-${counter}`
            slugExists = await prisma.newsletter.findUnique({
                where: { slug },
            })
            counter++
        }

        const newsletter = await prisma.newsletter.create({
            data: {
                ...validatedData,
                slug,
                authorId: session.user.id,
                authorName: session.user.name || session.user.email,
                publishedAt: validatedData.status === 'PUBLISHED' ? new Date() : null,
            },
        })

        return NextResponse.json({ newsletter })
    } catch (error) {
        console.error('Create newsletter error:', error)

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