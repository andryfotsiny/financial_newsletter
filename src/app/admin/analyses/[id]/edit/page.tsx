//src/app/admin/analyses/[id]/edit/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnalysisEditor } from '@/features/analysis/components/AnalysisEditor'

export const metadata: Metadata = {
    title: 'Modifier l\'analyse - Administration',
    description: 'Modifier une analyse financière existante',
}

interface PageProps {
    params: Promise<{
        id: string
    }>
}

// Données statiques pour simulation (même que dans la liste)
const staticAnalyses = [
    {
        id: '1',
        title: 'Apple (AAPL) - Analyse technique et fondamentale Q4 2024',
        subtitle: 'Évaluation complète des perspectives d\'investissement',
        content: `# Apple (AAPL) - Analyse Q4 2024

## Résumé exécutif

Apple Inc. (NASDAQ: AAPL) présente des fondamentaux solides malgré un environnement macroéconomique incertain. Notre analyse technique et fondamentale suggère un potentiel de hausse modéré à court terme.

## Analyse fondamentale

### Revenus et croissance
- Chiffre d'affaires T3 2024 : $89.5 milliards (+2.8% YoY)
- Marge brute : 46.2% (stable)
- Services en croissance de 16% YoY

### Positionnement concurrentiel
Apple maintient sa position de leader sur le marché premium des smartphones avec l'iPhone 15 Pro et l'intégration de l'IA.

## Analyse technique

### Support et résistances
- Support majeur : $180
- Résistance clé : $200
- Objectif 12 mois : $250

### Indicateurs techniques
- RSI : 58 (neutre)
- MACD : Signal d'achat faible
- Moyennes mobiles : Tendance haussière

## Risques

1. **Risque géopolitique** : Tensions avec la Chine
2. **Concurrence** : Pression d'Android et des fabricants chinois
3. **Cycle de renouvellement** : Allongement du cycle de remplacement

## Recommandation

**ACHAT** avec un objectif de prix à 12 mois de **$250**, soit un potentiel de hausse de 25% par rapport au cours actuel.`,
        excerpt: 'Analyse approfondie du géant technologique américain avec focus sur les perspectives 2025 et l\'impact de l\'IA.',
        type: 'STOCK_ANALYSIS',
        status: 'PUBLISHED',
        isPremium: true,
        ticker: 'AAPL',
        sector: 'Technology',
        recommendation: 'BUY',
        targetPrice: 250.00,
        publishedAt: new Date('2024-12-15'),
        authorName: 'Marie Martin'
    },
    {
        id: '2',
        title: 'Secteur énergétique européen - Opportunités 2025',
        subtitle: 'Transition énergétique et investissements verts',
        content: `# Secteur énergétique européen - Perspectives 2025

## Vue d'ensemble du marché

Le secteur énergétique européen traverse une période de transformation majeure, portée par la transition vers les énergies renouvelables et les investissements dans les infrastructures vertes.

## Tendances clés

### 1. Énergies renouvelables
- Croissance attendue de 15% par an jusqu'en 2025
- Investissements massifs dans l'éolien offshore
- Développement du solaire photovoltaïque

### 2. Stockage d'énergie
- Marché des batteries en forte expansion
- Technologies innovantes (hydrogène vert)
- Soutien réglementaire européen

## Recommandations sectorielles

Notre analyse privilégie les entreprises positionnées sur :
- Les infrastructures renouvelables
- Les technologies de stockage
- La distribution intelligente (smart grid)

## Risques

- Volatilité des prix de l'énergie
- Dépendance aux subventions publiques
- Défis technologiques du stockage

## Conclusion

Perspective **POSITIVE** pour le secteur avec un biais **HOLD** en attendant une meilleure visibilité sur les valorisations.`,
        excerpt: 'Analyse du secteur énergétique européen et des opportunités d\'investissement dans la transition verte.',
        type: 'SECTOR_ANALYSIS',
        status: 'PUBLISHED',
        isPremium: true,
        sector: 'Energy',
        recommendation: 'HOLD',
        publishedAt: new Date('2024-12-14'),
        authorName: 'Thomas Bernard'
    },
    {
        id: '3',
        title: 'Nvidia (NVDA) - Impact de l\'IA sur la valorisation',
        subtitle: 'Évaluation du potentiel à long terme',
        content: `# Nvidia (NVDA) - Analyse IA et Valorisation

## Positionnement sur l'IA

Nvidia s'est imposé comme le leader incontesté des puces dédiées à l'intelligence artificielle avec ses GPU H100 et A100.

### Avantages concurrentiels
- Écosystème CUDA mature
- Partenariats stratégiques (Microsoft, Google, Amazon)
- Innovation continue (architecture Hopper)

## Analyse financière

### Métriques clés Q3 2024
- Revenus Data Center : $14.5 milliards (+206% YoY)
- Marge opérationnelle : 62%
- Free cash flow : $7.3 milliards

### Valorisation
- P/E forward : 25x
- PEG ratio : 0.8 (attractif pour la croissance)

## Perspectives

L'adoption massive de l'IA générative devrait soutenir la demande pour les solutions Nvidia jusqu'en 2026 minimum.

### Catalyseurs
- Déploiement des LLM en entreprise
- Expansion dans l'automobile (conduite autonome)
- Croissance du marché des data centers

## Risques

1. **Concurrence** : AMD, Intel, puces custom (Google TPU)
2. **Géopolitique** : Restrictions export vers la Chine
3. **Cycle** : Normalisation possible de la demande post-boom IA

## Recommandation

**ACHAT** avec objectif $180, potentiel de 15% malgré la valorisation élevée.`,
        excerpt: 'Analyse de l\'impact de l\'intelligence artificielle sur la valorisation de Nvidia et ses perspectives de croissance.',
        type: 'FUNDAMENTAL_ANALYSIS',
        status: 'DRAFT',
        isPremium: true,
        ticker: 'NVDA',
        sector: 'Technology',
        recommendation: 'BUY',
        targetPrice: 180.50,
        authorName: 'Isabelle Durand'
    }
]

export default async function EditAnalysisPage({ params }: PageProps) {
    const { id } = await params

    // Trouver l'analyse dans les données statiques
    const analysis = staticAnalyses.find(a => a.id === id)

    if (!analysis) {
        notFound()
    }

    // Pour la production, on utiliserait Prisma :
    /*
    const analysis = await prisma.analysis.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            subtitle: true,
            content: true,
            excerpt: true,
            type: true,
            status: true,
            isPremium: true,
            ticker: true,
            sector: true,
            recommendation: true,
            targetPrice: true,
        }
    })

    if (!analysis) {
        notFound()
    }
    */

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Modifier l&#39;analyse</h1>
                <p className="text-muted-foreground mt-2">
                    Modifiez le contenu et les paramètres de cette analyse
                </p>
            </div>

            <AnalysisEditor mode="edit" analysis={analysis} />
        </div>
    )
}