import { Clock, FileText, TrendingUp, Mail } from 'lucide-react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/shared/lib/prisma'
import { formatDate } from '@/shared/lib/utils'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'



export async function RecentActivity({ userId }: { userId: string }) {
    // 1. On récupère les 5 dernières lectures
    const recentReads = await prisma.readHistory.findMany({
        where: { userId },
        orderBy: { readAt: 'desc' },
        take: 5
    });

    // 2. On groupe les IDs par type de contenu
    const newsletterIds = recentReads
        .filter(r => r.contentType === "NEWSLETTER")
        .map(r => r.contentId);

    const analysisIds = recentReads
        .filter(r => r.contentType === "ANALYSIS")
        .map(r => r.contentId);

    // 3. On récupère tous les contenus liés, EN UNE FOIS par type
    const [newsletters, analyses] = await Promise.all([
        prisma.newsletter.findMany({
            where: { id: { in: newsletterIds } },
            select: { id: true, title: true, type: true, slug: true }
        }),
        prisma.analysis.findMany({
            where: { id: { in: analysisIds } },
            select: { id: true, title: true, type: true, slug: true }
        })
    ]);

    // 4. On les indexe pour accès rapide (par id)
    const newsletterMap = Object.fromEntries(newsletters.map(n => [n.id, n]));
    const analysisMap = Object.fromEntries(analyses.map(a => [a.id, a]));

    // 5. On remonte le tableau d'activités enrichi
    const readsWithContent = recentReads.map(activity => {
        let content = null;
        if (activity.contentType === "NEWSLETTER") {
            content = newsletterMap[activity.contentId] ?? null;
        } else if (activity.contentType === "ANALYSIS") {
            content = analysisMap[activity.contentId] ?? null;
        }
        return { ...activity, content };
    });

    // Render (le reste inchangé, adapte à ton JSX)
    if (readsWithContent.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>
                        Vos dernières lectures apparaîtront ici
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                        Aucune activité récente
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                    Vos dernières lectures et interactions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {readsWithContent.map((activity) => {
                        const content = activity.content;
                        if (!content) return null;

                        // Choix de l’icône selon le type de contenu
                        const Icon = activity.contentType === 'NEWSLETTER'
                            ? Mail
                            : activity.contentType === 'ANALYSIS'
                                ? TrendingUp
                                : FileText;

                        return (
                            <div key={activity.id} className="flex items-start gap-4">
                                <div className="p-2 rounded-full bg-muted">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <Link
                                        href={`${PUBLIC_ROUTES.ARCHIVES}/${content.slug}`}
                                        className="text-sm font-medium hover:underline"
                                    >
                                        {content.title}
                                    </Link>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {formatDate(activity.readAt, {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                        {activity.readProgress && (
                                            <span>{activity.readProgress}% lu</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
