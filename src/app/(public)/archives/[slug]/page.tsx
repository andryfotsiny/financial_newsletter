import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Lock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { prisma } from '@/shared/lib/prisma'
import { formatDate } from '@/shared/lib/utils'
import { getNewsletterTypeLabel } from '@/features/newsletter/types/newsletter.types'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { getSession } from '@/shared/lib/auth-instance'
import { hasPremiumAccess } from '@/shared/lib/auth'
import {NewsletterType} from "@/shared/types/database";

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params

    const newsletter = await prisma.newsletter.findUnique({
        where: { slug },
        select: {
            title: true,
            seoTitle: true,
            excerpt: true,
            seoDescription: true,
        },
    })

    if (!newsletter) {
        return {
            title: 'Newsletter non trouvée',
        }
    }

    return {
        title: newsletter.seoTitle || newsletter.title,
        description: newsletter.seoDescription || newsletter.excerpt || '',
    }
}

export default async function NewsletterDetailPage({ params }: PageProps) {
    const { slug } = await params
    const session = await getSession()

    // Récupérer la newsletter
    const newsletter = await prisma.newsletter.findUnique({
        where: {
            slug,
            status: 'PUBLISHED', // Seulement les newsletters publiées
        },
    })

    if (!newsletter) {
        notFound()
    }

    // Vérifier l'accès premium
    const hasAccess = !newsletter.isPremium || hasPremiumAccess(session?.user || null)

    // Enregistrer la vue si l'utilisateur est connecté
    if (session?.user && hasAccess) {
        await prisma.readHistory.create({
            data: {
                userId: session.user.id,
                contentType: 'NEWSLETTER',
                contentId: newsletter.id,
            },
        }).catch(() => {
            // Ignorer l'erreur si la vue existe déjà
        })
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Navigation */}
            <div className="mb-6">
                <Button variant="ghost" asChild>
                    <Link href={PUBLIC_ROUTES.ARCHIVES}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux archives
                    </Link>
                </Button>
            </div>

            {/* Header */}
            <header className="space-y-4 mb-8">
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">
                        {getNewsletterTypeLabel(newsletter.type as NewsletterType)}
                    </Badge>
                    {newsletter.isPremium && (
                        <Badge variant="default">
                            <Lock className="h-3 w-3 mr-1" />
                            Premium
                        </Badge>
                    )}
                </div>

                <h1 className="text-4xl font-bold">
                    {newsletter.title}
                </h1>

                {newsletter.subtitle && (
                    <p className="text-xl text-muted-foreground">
                        {newsletter.subtitle}
                    </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {newsletter.authorName && (
                        <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
                            {newsletter.authorName}
            </span>
                    )}

                    {newsletter.publishedAt && (
                        <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
                            {formatDate(newsletter.publishedAt)}
            </span>
                    )}

                    <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            5 min de lecture
          </span>
                </div>
            </header>

            {/* Contenu */}
            {hasAccess ? (
                <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: newsletter.content }} />
                </div>
            ) : (
                <Card className="bg-muted/50">
                    <CardContent className="py-16 text-center space-y-4">
                        <Lock className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="text-xl font-semibold">Contenu Premium</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Cette newsletter est réservée aux abonnés Premium.
                            Abonnez-vous pour accéder à l&#39;intégralité de nos analyses.
                        </p>
                        <div className="flex gap-4 justify-center">
                            {session ? (
                                <Button asChild>
                                    <Link href={PUBLIC_ROUTES.PREMIUM}>
                                        Découvrir nos offres
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline" asChild>
                                        <Link href={PUBLIC_ROUTES.LOGIN}>
                                            Se connecter
                                        </Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={PUBLIC_ROUTES.REGISTER}>
                                            S&#39;inscrire
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Navigation entre newsletters */}
            <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">À lire également</h3>
                {/* TODO: Ajouter des suggestions de newsletters similaires */}
            </div>
        </article>
    )
}