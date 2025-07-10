import { ReactNode } from 'react'
import { Header } from '@/shared/components/layout/Header'
import { Footer } from '@/shared/components/layout/Footer'

interface PublicLayoutProps {
    children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    )
}