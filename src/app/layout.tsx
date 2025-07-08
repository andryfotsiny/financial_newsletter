import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { APP_CONFIG } from "@/shared/lib/constants"
import { Providers } from "@/shared/providers"
import { Header } from "@/shared/components/layout/Header"
import { Footer } from "@/shared/components/layout/Footer"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: {
        default: APP_CONFIG.name,
        template: `%s | ${APP_CONFIG.name}`
    },
    description: APP_CONFIG.description,
    metadataBase: new URL(APP_CONFIG.url),
    openGraph: {
        title: APP_CONFIG.name,
        description: APP_CONFIG.description,
        url: APP_CONFIG.url,
        siteName: APP_CONFIG.name,
        type: 'website',
        locale: 'fr_FR',
    },
    twitter: {
        card: 'summary_large_image',
        title: APP_CONFIG.name,
        description: APP_CONFIG.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

// Providers seront ajoutés dans la prochaine phase
interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
        >
        <Providers>
            <div className="relative flex min-h-screen flex-col">
                <Header />

                <main className="flex-1">
                    {children}
                </main>

                <Footer />
            </div>
        </Providers>
        </body>
        </html>
    )
}