'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, FileText, Users } from 'lucide-react'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
}

const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
}


const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const scaleOnHover = {
    hover: {
        scale: 1.05,
        transition: { duration: 0.2 }
    }
}

export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-50"
                        style={{ backgroundImage: 'url(/images/financier.jpg)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
                </div>
                <div className="container mx-auto max-w-4xl relative z-10">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white dark:text-white"
                        style={{
                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)'
                        }}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Newsletter Financière Premium
                    </motion.h1>
                    <motion.p
                        className="text-xl mb-8 max-w-2xl mx-auto text-gray-100 dark:text-gray-200"
                        style={{
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        Analyses approfondies, sélections d&apos;investissement et actualités des marchés
                        directement dans votre boîte mail.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm shadow-lg"
                            >
                                <Link href={PUBLIC_ROUTES.REGISTER}>
                                    Commencer gratuitement
                                    <motion.div
                                        className="ml-2"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </motion.div>
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                variant="default"
                                asChild
                                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                            >
                                <Link href={PUBLIC_ROUTES.PREMIUM}>
                                    Découvrir Premium
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <motion.h2
                        className="text-3xl font-bold text-center mb-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Tout ce dont vous avez besoin pour investir
                    </motion.h2>
                    <motion.div
                        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeInUp} whileHover={scaleOnHover.hover}>
                            <Card className="h-full border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <TrendingUp className="h-10 w-10 text-primary mb-4" />
                                    <CardTitle>Analyses de marché</CardTitle>
                                    <CardDescription>
                                        Analyses quotidiennes et hebdomadaires des marchés financiers
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <motion.ul
                                        className="space-y-2 text-sm text-muted-foreground"
                                        variants={staggerContainer}
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                    >
                                        {[
                                            "• Récapitulatif quotidien",
                                            "• Analyse hebdomadaire approfondie",
                                            "• Indicateurs techniques",
                                            "• Perspectives macro-économiques"
                                        ].map((item, index) => (
                                            <motion.li
                                                key={index}
                                                variants={fadeInLeft}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {item}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp} whileHover={scaleOnHover.hover}>
                            <Card className="h-full border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <FileText className="h-10 w-10 text-primary mb-4" />
                                    <CardTitle>Sélections d&apos;investissement</CardTitle>
                                    <CardDescription>
                                        Nos meilleures idées d&apos;investissement, deux fois par semaine
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <motion.ul
                                        className="space-y-2 text-sm text-muted-foreground"
                                        variants={staggerContainer}
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                    >
                                        {[
                                            "• Sélection de titres",
                                            "• Analyse fondamentale",
                                            "• Prix cibles et recommandations",
                                            "• Suivi des performances"
                                        ].map((item, index) => (
                                            <motion.li
                                                key={index}
                                                variants={fadeInLeft}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {item}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp} whileHover={scaleOnHover.hover}>
                            <Card className="h-full border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <Users className="h-10 w-10 text-primary mb-4" />
                                    <CardTitle>Communauté exclusive</CardTitle>
                                    <CardDescription>
                                        Rejoignez une communauté d&apos;investisseurs avertis
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <motion.ul
                                        className="space-y-2 text-sm text-muted-foreground"
                                        variants={staggerContainer}
                                        initial="initial"
                                        whileInView="animate"
                                        viewport={{ once: true }}
                                    >
                                        {[
                                            "• Accès aux archives complètes",
                                            "• Contenu premium exclusif",
                                            "• Support prioritaire",
                                            "• Webinaires mensuels"
                                        ].map((item, index) => (
                                            <motion.li
                                                key={index}
                                                variants={fadeInLeft}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {item}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="container mx-auto text-center max-w-3xl">
                    <motion.h2
                        className="text-3xl font-bold mb-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Prêt à prendre de meilleures décisions d&apos;investissement ?
                    </motion.h2>
                    <motion.p
                        className="text-lg text-muted-foreground mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        Rejoignez des milliers d&apos;investisseurs qui font confiance à nos analyses.
                        Commencez avec notre offre gratuite dès aujourd&apos;hui.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button size="lg" asChild className="shadow-lg">
                            <Link href={PUBLIC_ROUTES.REGISTER}>
                                Créer mon compte gratuit
                                <motion.div
                                    className="ml-2"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </motion.div>
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}