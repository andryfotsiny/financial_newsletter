//src/app/admin/tags/page.tsx
import { Metadata } from 'next'
import { TagManager } from '@/features/admin/components/TagManager'

export const metadata: Metadata = {
    title: 'Gestion des tags - Administration',
    description: 'Gérer les tags et l\'organisation du contenu',
}

// Données statiques pour les tags
const staticTags = [
    {
        id: '1',
        name: 'Intelligence Artificielle',
        slug: 'intelligence-artificielle',
        description: 'Articles et analyses sur l\'IA et ses applications financières',
        color: '#3B82F6',
        usageCount: 15,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-12-10')
    },
    {
        id: '2',
        name: 'Énergie Verte',
        slug: 'energie-verte',
        description: 'Transition énergétique et investissements durables',
        color: '#10B981',
        usageCount: 12,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-12-08')
    },
    {
        id: '3',
        name: 'Biotechnologie',
        slug: 'biotechnologie',
        description: 'Innovations et investissements dans les biotechs',
        color: '#8B5CF6',
        usageCount: 8,
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-11-25')
    },
    {
        id: '4',
        name: 'Cybersécurité',
        slug: 'cybersecurite',
        description: 'Sécurité informatique et protection des données',
        color: '#EF4444',
        usageCount: 10,
        createdAt: new Date('2024-04-05'),
        updatedAt: new Date('2024-12-01')
    },
    {
        id: '5',
        name: 'Immobilier',
        slug: 'immobilier',
        description: 'Marché immobilier et REITs',
        color: '#F59E0B',
        usageCount: 18,
        createdAt: new Date('2024-01-30'),
        updatedAt: new Date('2024-12-05')
    },
    {
        id: '6',
        name: 'Dividendes',
        slug: 'dividendes',
        description: 'Actions à dividendes et stratégies de revenus',
        color: '#06B6D4',
        usageCount: 22,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-12-12')
    },
    {
        id: '7',
        name: 'Small Caps',
        slug: 'small-caps',
        description: 'Petites capitalisations et croissance',
        color: '#84CC16',
        usageCount: 6,
        createdAt: new Date('2024-05-20'),
        updatedAt: new Date('2024-11-30')
    },
    {
        id: '8',
        name: 'Tech Européenne',
        slug: 'tech-europeenne',
        description: 'Entreprises technologiques européennes',
        color: '#EC4899',
        usageCount: 9,
        createdAt: new Date('2024-06-12'),
        updatedAt: new Date('2024-12-03')
    },
    {
        id: '9',
        name: 'Crypto',
        slug: 'crypto',
        description: 'Cryptomonnaies et blockchain',
        color: '#F97316',
        usageCount: 14,
        createdAt: new Date('2024-03-25'),
        updatedAt: new Date('2024-12-14')
    },
    {
        id: '10',
        name: 'ESG',
        slug: 'esg',
        description: 'Investissement responsable et critères ESG',
        color: '#10B981',
        usageCount: 7,
        createdAt: new Date('2024-07-08'),
        updatedAt: new Date('2024-11-20')
    },
    {
        id: '11',
        name: 'Matières Premières',
        slug: 'matieres-premieres',
        description: 'Commodités et ressources naturelles',
        color: '#6B7280',
        usageCount: 5,
        createdAt: new Date('2024-08-14'),
        updatedAt: new Date('2024-10-15')
    },
    {
        id: '12',
        name: 'Analyse Technique',
        slug: 'analyse-technique',
        description: 'Graphiques, indicateurs et patterns',
        color: '#1F2937',
        usageCount: 0,
        createdAt: new Date('2024-09-01'),
        updatedAt: new Date('2024-09-01')
    }
]

export default async function TagsAdminPage() {
    // Pour la production, on récupérerait les données via Prisma :
    /*
    const tags = await prisma.tag.findMany({
        include: {
            _count: {
                select: {
                    contentTags: true
                }
            }
        },
        orderBy: { name: 'asc' }
    })

    const tagsWithUsage = tags.map(tag => ({
        ...tag,
        usageCount: tag._count.contentTags
    }))
    */

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Gestion des tags</h1>
                <p className="text-muted-foreground mt-2">
                    Organisez et catégorisez votre contenu avec des tags thématiques
                </p>
            </div>

            <TagManager tags={staticTags} />
        </div>
    )
}