"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Crown,
  TrendingUp,
  FileText,
  Star,
  Eye,
  Bookmark,
  PieChart,
  Globe,
  Users,
  Award,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PUBLIC_ROUTES } from "@/shared/constants/routes";
import { formatDate, getInitials } from "@/shared/lib/utils";
import { useState, useEffect } from "react";

// Données statiques pour les dernières publications
const latestContent = [
  {
    id: "1",
    type: "newsletter",
    title: "Actualités financières du 15 décembre 2024",
    excerpt:
      "Points clés des marchés européens et américains, avec focus sur les résultats trimestriels et les perspectives 2025.",
    publishedAt: new Date("2024-12-15T08:00:00"),
    authorName: "Jean Dupont",
    isPremium: false,
    readTime: "5 min",
    views: 1247,
    slug: "actualites-financieres-15-decembre-2024",
    image: "/images/actu1.jpg",
  },
  {
    id: "2",
    type: "analysis",
    title: "Apple (AAPL) - Analyse technique et fondamentale",
    excerpt:
      "Analyse approfondie du géant technologique avec objectif de prix à 12 mois et recommandation d'investissement.",
    publishedAt: new Date("2024-12-14T16:30:00"),
    authorName: "Marie Martin",
    isPremium: true,
    readTime: "12 min",
    views: 892,
    slug: "apple-aapl-analyse-technique-fondamentale",
    image: "/images/actu2.jpg",
  },
  {
    id: "3",
    type: "selection",
    title: "Sélection momentum - Actions européennes Q4",
    excerpt:
      "Notre sélection de 12 valeurs européennes présentant un momentum positif pour les prochains mois.",
    publishedAt: new Date("2024-12-13T14:20:00"),
    authorName: "Pierre Dubois",
    isPremium: true,
    readTime: "8 min",
    views: 654,
    slug: "selection-momentum-actions-europeennes-q4",
    image: "/images/actu1.jpg",
  },
  {
    id: "4",
    type: "newsletter",
    title: "Newsletter hebdomadaire - Semaine du 9 décembre",
    excerpt:
      "Récapitulatif de la semaine avec les mouvements sectoriels marquants et notre vue sur les prochaines séances.",
    publishedAt: new Date("2024-12-12T09:00:00"),
    authorName: "Thomas Bernard",
    isPremium: false,
    readTime: "7 min",
    views: 1456,
    slug: "newsletter-hebdomadaire-semaine-9-decembre",
    image: "/images/actu1.jpg",
  },
  {
    id: "5",
    type: "analysis",
    title: "Secteur énergétique - Opportunités 2025",
    excerpt:
      "Analyse sectorielle complète sur les opportunités d'investissement dans l'énergie pour l'année à venir.",
    publishedAt: new Date("2024-12-11T11:15:00"),
    authorName: "Sophie Chen",
    isPremium: true,
    readTime: "15 min",
    views: 743,
    slug: "secteur-energetique-opportunites-2025",
    image: "/images/actu2.jpg",
  },
  {
    id: "6",
    type: "analysis",
    title: "Tesla Q4 2024 - Perspectives de croissance",
    excerpt:
      "Analyse détaillée des perspectives de Tesla pour le quatrième trimestre avec focus sur les livraisons.",
    publishedAt: new Date("2024-12-10T15:45:00"),
    authorName: "Alain Moreau",
    isPremium: true,
    readTime: "10 min",
    views: 567,
    slug: "tesla-q4-2024-perspectives-croissance",
    image: "/images/actu1.jpg",
  },
];

// Logos partenaires avec plus de contenu
const partners = [
  {
    name: "Bloomberg",
    logo: "/partners/bloomberg.png",
    description: "Données de marché temps réel",
  },
  {
    name: "FactSet",
    logo: "/partners/FactSet.jpeg",
    description: "Analytics financiers",
  },
  {
    name: "Refinitiv",
    logo: "/partners/refinitiv.png",
    description: "Flux d'actualités",
  },
  {
    name: "Reuters",
    logo: "/partners/reuters.jpg",
    description: "Informations mondiales",
  },
  {
    name: "Morningstar",
    logo: "/partners/morningstar.png",
    description: "Recherche investissement",
  },
  {
    name: "S&P Global",
    logo: "/partners/sp-global.jpg",
    description: "Notations et indices",
  },
  {
    name: "MSCI",
    logo: "/partners/MSCI-Logo.png",
    description: "Indices et analytics",
  },
  {
    name: "Dow Jones",
    logo: "/partners/dowjones.png",
    description: "Actualités financières",
  },
];

// Statistiques de performance
const performanceStats = [
  { label: "Abonnés actifs", value: "15,000+", icon: Users },
  { label: "Analyses publiées", value: "2,400+", icon: FileText },
  { label: "Taux de réussite", value: "87%", icon: Award },
  { label: "Années d'expérience", value: "12", icon: Shield },
];

// Types de contenu disponibles
const contentTypes = [
  {
    icon: FileText,
    title: "Actualités marchés",
    description:
      "Newsletter quotidienne envoyée chaque matin avec les points clés des marchés",
    frequency: "Quotidien",
  },
  {
    icon: TrendingUp,
    title: "Sélection de titres",
    description:
      "Recommandations d'investissement avec objectifs de prix et analyse risque/rendement",
    frequency: "2x/semaine",
  },
  {
    icon: PieChart,
    title: "Sélection de fonds",
    description:
      "Analyse et sélection des meilleurs fonds d'investissement par catégorie",
    frequency: "Hebdomadaire",
  },
  {
    icon: Globe,
    title: "Analyses macroéconomiques",
    description:
      "Décryptage des grandes tendances économiques et impact sur les marchés",
    frequency: "Bi-mensuel",
  },
  {
    icon: Eye,
    title: "Recherches thématiques",
    description:
      "Études approfondies sur les secteurs et tendances d'investissement émergentes",
    frequency: "Mensuel",
  },
];

// Avis clients étendus
const featuredReviews = [
  {
    name: "Marie Dubois",
    role: "Investisseur particulier",
    rating: 5,
    content:
      "Analyses de qualité exceptionnelle qui m'ont permis de diversifier mon portefeuille avec succès.",
    avatar: null,
    performance: "+28% en 2024",
  },
  {
    name: "Jean-Pierre Martin",
    role: "Gérant de patrimoine",
    rating: 5,
    content:
      "Outil indispensable pour enrichir mes analyses. Les décryptages macro sont particulièrement pertinents.",
    avatar: null,
    performance: "Client depuis 3 ans",
  },
  {
    name: "Sophie Laurent",
    role: "Entrepreneuse",
    rating: 5,
    content:
      "Parfait pour débuter en investissement. Les explications sont claires et les conseils pratiques.",
    avatar: null,
    performance: "Novice → Experte",
  },
  {
    name: "Marc Dubois",
    role: "Trader indépendant",
    rating: 5,
    content:
      "Les signaux de trading sont d'une précision remarquable. Mes performances se sont nettement améliorées.",
    avatar: null,
    performance: "+45% cette année",
  },
];

const getContentIcon = (type: string) => {
  switch (type) {
    case "newsletter":
      return <FileText className="h-4 w-4" />;
    case "analysis":
      return <TrendingUp className="h-4 w-4" />;
    case "selection":
      return <Eye className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getContentTypeLabel = (type: string) => {
  switch (type) {
    case "newsletter":
      return "Newsletter";
    case "analysis":
      return "Analyse";
    case "selection":
      return "Sélection";
    default:
      return "Article";
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const [translateX, setTranslateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const partnersPerView = 4;
  const cardWidth = 100 / partnersPerView;

  // Animation continue avec vitesse constante
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setTranslateX((prev) => {
          const speed = 0.05; // Vitesse très lente et constante
          const newTranslateX = prev - speed;
          const maxTranslate = (8 * cardWidth) / 2; // 8 = nombre de partenaires

          if (Math.abs(newTranslateX) >= maxTranslate) {
            return 0;
          }
          return newTranslateX;
        });
      }, 50); // Intervalle fixe de 50ms pour régularité

      return () => clearInterval(interval);
    }
  }, [isHovered, cardWidth]); // Suppression de partners.length

  const nextPartners = () => {
    setTranslateX((prev) => {
      const newTranslateX = prev - cardWidth;
      const maxTranslate = (8 * cardWidth) / 2; // 8 = nombre de partenaires
      if (Math.abs(newTranslateX) >= maxTranslate) {
        return 0;
      }
      return newTranslateX;
    });
  };

  const prevPartners = () => {
    setTranslateX((prev) => {
      const newTranslateX = prev + cardWidth;
      const maxTranslate = (8 * cardWidth) / 2; // 8 = nombre de partenaires
      if (newTranslateX > 0) {
        return -maxTranslate + cardWidth;
      }
      return newTranslateX;
    });
  };

  // Article principal
  const mainArticle = latestContent[0];
  // Articles secondaires
  const secondaryArticles = latestContent.slice(1);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Section Hero
            <section className="relative min-h-[85vh] flex items-center">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(/images/best-financial.jpg)',
                            filter: 'brightness(0.3)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                Expert en <span className="text-primary">Finance</span><br />
                                à votre service
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Accédez à des analyses financières professionnelles et des recommandations
                                d&#39;investissement exclusives pour maximiser vos performances.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" variant="outline" className="text-lg text-white" asChild>
                                    <Link href={PUBLIC_ROUTES.REGISTER}>
                                        Commencer gratuitement
                                        <ArrowRight className="ml-2" />
                                    </Link>
                                </Button>

                                <Button size="lg" variant="secondary" className="text-lg" asChild>
                                    <Link href={PUBLIC_ROUTES.PREMIUM}>
                                        Découvrir Premium
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hidden lg:block"
                        >
                            <Card className="bg-black/40 backdrop-blur-sm border-primary/20">
                                <CardHeader className="border-b border-primary/10">
                                    <CardTitle className="text-2xl text-primary">Performance 2024</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {[
                                        { label: "Rendement moyen", value: "+32.5%" },
                                        { label: "Taux de réussite", value: "87%" },
                                        { label: "Signaux gagnants", value: "142/163" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex justify-between items-center text-white">
                                            <span>{stat.label}</span>
                                            <span className="text-primary font-bold">{stat.value}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section> */}

      {/* Liste des dernières publications - Style bibliothèque */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Ligne de séparation verticale */}
            <div className="hidden lg:block absolute left-3/4 top-0 w-px bg-border/40 h-full ml-4"></div>

            {/* Colonne principale */}
            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Dernières publications
                  </h2>
                  <p className="text-muted-foreground">
                    Nos analyses et newsletters les plus récentes
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href={PUBLIC_ROUTES.ARCHIVES}>
                    Voir toutes les archives
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Article principal */}
              <article className="group">
                <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${mainArticle.slug}`}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={mainArticle.image}
                      alt={mainArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                </Link>

                <div className="mt-4">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {getContentIcon(mainArticle.type)}
                      {getContentTypeLabel(mainArticle.type)}
                    </Badge>
                    {mainArticle.isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>

                  <Link href={`${PUBLIC_ROUTES.ARCHIVES}/${mainArticle.slug}`}>
                    <h1 className="text-2xl font-bold text-foreground hover:text-primary transition-colors mb-3 line-clamp-2">
                      {mainArticle.title}
                    </h1>
                  </Link>

                  <p className="text-muted-foreground text-lg leading-relaxed mb-4 line-clamp-3">
                    {mainArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{mainArticle.authorName}</span>
                      <span>•</span>
                      <span>
                        {formatDate(mainArticle.publishedAt, {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                      <span>•</span>
                      <span>{mainArticle.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Articles secondaires - Style Les Échos */}
              <div className="space-y-6">
                {secondaryArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group border-b border-border/50 pb-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Contenu à gauche */}
                      <div className="md:col-span-3 md:order-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 text-xs"
                          >
                            {getContentIcon(article.type)}
                            {getContentTypeLabel(article.type)}
                          </Badge>
                          {article.isPremium && (
                            <Badge variant="secondary" className="text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>

                        <Link
                          href={`${PUBLIC_ROUTES.ARCHIVES}/${article.slug}`}
                        >
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                        </Link>

                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{article.authorName}</span>
                            <span>•</span>
                            <span>
                              {formatDate(article.publishedAt, {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>

                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Image à droite */}
                      <Link
                        href={`${PUBLIC_ROUTES.ARCHIVES}/${article.slug}`}
                        className="md:col-span-1 md:order-2"
                      >
                        <div className="relative aspect-square w-2/3 overflow-hidden rounded">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 200px, 150px"
                          />
                        </div>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar - Types de contenu */}
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Types de recherche
                </h3>
                <div className="space-y-4">
                  {contentTypes.map((type, index) => (
                    <div
                      key={index}
                      className="border-b border-border/30 pb-4 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <type.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">
                            {type.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {type.description}
                          </p>
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {type.frequency}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques de performance */}
      <section className="py-16 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {performanceStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16  rounded-full flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partenaires avec carousel automatique */}
      <section className="py-16 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Nos sources de données</h2>
            <p className="text-muted-foreground">
              Nous nous appuyons sur les meilleures sources financières
              mondiales
            </p>
          </motion.div>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Flèches de navigation */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={prevPartners}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={nextPartners}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Container du carousel */}
            <div className="overflow-hidden mx-12 group">
              <motion.div
                className="flex gap-6"
                style={{
                  transform: `translateX(${translateX}%)`,
                  width: `${partners.length * 2 * (100 / partnersPerView)}%`,
                  willChange: "transform", // Optimisation GPU
                }}
              >
                {/* Dupliquer les partenaires pour créer une boucle infinie parfaite */}
                {[...partners, ...partners].map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex-shrink-0"
                    style={{ width: `${100 / (partners.length * 2)}%` }}
                  >
                    <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center border border-border/50">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-3 mx-auto overflow-hidden relative">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          fill
                          className="object-cover"
                          sizes="64px"
                          onError={(e) => {
                            // Fallback en cas d'erreur de chargement - TypeScript fix
                            const target = e.target as HTMLImageElement;
                            const fallback = target.nextSibling as HTMLElement;
                            target.style.display = "none";
                            if (fallback) {
                              fallback.style.display = "flex";
                            }
                          }}
                        />
                        <div className="w-full h-full bg-muted rounded-lg hidden items-center justify-center absolute inset-0">
                          <span className="text-sm font-semibold text-muted-foreground">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-medium text-sm mb-1">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {partner.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Indicateurs de position */}
            <div className="flex justify-center mt-6 gap-3">
              {partners
                .slice(0, Math.ceil(partners.length / partnersPerView))
                .map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                      Math.floor(Math.abs(translateX) / cardWidth) %
                        Math.ceil(partners.length / partnersPerView) ===
                      index
                        ? "bg-primary border-primary shadow-lg scale-125"
                        : "bg-transparent border-primary/40 hover:border-primary/70 hover:scale-110"
                    }`}
                    onClick={() =>
                      setTranslateX(-index * cardWidth * partnersPerView)
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avis clients étendus */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">
              Ce que disent nos abonnés
            </h2>
            <p className="text-muted-foreground">
              Plus de 15,000 investisseurs nous font confiance
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredReviews.map((review, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatar || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(review.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {review.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      &#34;{review.content}&#34;
                    </p>
                    <div className="text-xs  text-primary px-2 py-1 rounded">
                      {review.performance}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" asChild>
              <Link href={PUBLIC_ROUTES.REVIEWS}>
                Voir tous les avis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section CTA Premium */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Crown className="h-10 w-10 text-primary" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground">
              Prêt à transformer votre approche de l&#39;investissement ?
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rejoignez plus de 15,000 investisseurs qui utilisent nos analyses
              pour prendre des décisions éclairées et optimiser leurs
              performances.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  7 jours
                </div>
                <div className="text-sm text-muted-foreground">
                  Essai gratuit
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">29€</div>
                <div className="text-sm text-muted-foreground">
                  Par mois seulement
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Support client
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={PUBLIC_ROUTES.PREMIUM}>
                  <Crown className="mr-2 h-5 w-5" />
                  Commencer l&#39;essai gratuit
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href={PUBLIC_ROUTES.ABOUT}>En savoir plus</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Aucun engagement • Annulation à tout moment • Support inclus
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section FAQ rapide */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-muted-foreground">
              Tout ce que vous devez savoir pour commencer
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                question: "Que contient l'abonnement Premium ?",
                answer:
                  "Accès complet à toutes nos analyses, sélections de titres, newsletters quotidiennes et recherches thématiques exclusives.",
              },
              {
                question: "Puis-je annuler à tout moment ?",
                answer:
                  "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace client. Aucun frais d'annulation.",
              },
              {
                question: "Comment fonctionne l'essai gratuit ?",
                answer:
                  "7 jours d'accès complet à toutes les fonctionnalités Premium, sans engagement ni prélèvement.",
              },
              {
                question: "Vos analyses conviennent-elles aux débutants ?",
                answer:
                  "Absolument ! Nos contenus sont adaptés à tous les niveaux avec des explications claires et pédagogiques.",
              },
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" asChild>
              <Link href={PUBLIC_ROUTES.ABOUT}>
                Plus de questions ?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
