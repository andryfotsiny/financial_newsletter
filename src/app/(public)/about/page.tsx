'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Award, BarChart3, Globe, Mail, Phone, Shield, Target, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
//import { PUBLIC_ROUTES } from '@/shared/constants/routes'

const stats = [
    {
        icon: Users,
        value: "15,000+",
        label: "Investisseurs satisfaits",
        description: "Une communauté grandissante"
    },
    {
        icon: Award,
        value: "5 ans",
        label: "D'expertise",
        description: "Leader du marché depuis 2019"
    },
    {
        icon: Globe,
        value: "40+",
        label: "Pays couverts",
        description: "Présence internationale"
    },
    {
        icon: BarChart3,
        value: "87%",
        label: "Performance moyenne",
        description: "Retour sur investissement"
    }
]



export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero avec image de fond */}
            <section className="relative min-h-[90vh] flex items-center">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/images/about-hero.jpg)',
                            filter: 'brightness(0.3)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-background" />
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <Badge className="mb-6">Notre Histoire</Badge>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Investir avec <span className="text-primary">Excellence</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Depuis 2019, nous accompagnons les investisseurs vers la réussite financière
                            grâce à nos analyses approfondies et nos recommandations expertes.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                            >
                                <stat.icon className="h-8 w-8 text-primary mb-4" />
                                <p className="text-white text-3xl font-bold mb-2">{stat.value}</p>
                                <p className="text-gray-400">{stat.label}</p>
                                <p className="text-sm text-gray-500">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notre expertise */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Badge>Notre Expertise</Badge>
                            <h2 className="text-3xl font-bold mt-4 mb-6">
                                Une approche professionnelle de l&#39;investissement
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Target,
                                        title: "Analyses approfondies",
                                        description: "Études détaillées des marchés et des opportunités"
                                    },
                                    {
                                        icon: Shield,
                                        title: "Gestion des risques",
                                        description: "Stratégies de protection du capital"
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Performance optimale",
                                        description: "Maximisation des retours sur investissement"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <item.icon className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: 'url(/images/financier.jpg)', // Modifié ici
                                        filter: 'brightness(0.3)'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section contact */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Notre équipe est à votre disposition pour répondre à vos questions
                        </p>
                        <Card className="max-w-md mx-auto">
                            <CardContent className="space-y-4 pt-6">
                                <div className="flex justify-center gap-4">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span>contact@newsletter-financiere.com</span>
                                </div>
                                <div className="flex justify-center gap-4">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <span>+33 1 23 45 67 89</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Button size="lg" className="mt-8" asChild>
                            <Link href="#contact">
                                Nous contacter
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}