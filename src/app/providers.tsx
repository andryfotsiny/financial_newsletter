'use client'

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from "next-themes"
import { useState } from 'react'
import { SimpleToaster } from "@/components/ui/simple-toaster"

interface RootProvidersProps {
    children: ReactNode
}

export function RootProviders({ children }: RootProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: 1,
                        staleTime: 5 * 60 * 1000,
                    },
                },
            })
    )

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <SimpleToaster />
                </QueryClientProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}