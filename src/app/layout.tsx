import type { Metadata } from "next"
import { Inter } from "next/font/google"       // <--- ICI
import "./globals.css"
import { APP_CONFIG } from "@/shared/lib/constants"
import { RootProviders } from "./providers"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
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

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={`${inter.variable} antialiased min-h-screen bg-background font-sans`}>
        <RootProviders>
            {children}
        </RootProviders>
        </body>
        </html>
    )
}
