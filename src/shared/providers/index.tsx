'use client'

import { ReactNode } from "react"
import { AuthProvider } from "./auth-provider"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/toaster"

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <QueryProvider>
                    {children}
                    <Toaster />
                </QueryProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}