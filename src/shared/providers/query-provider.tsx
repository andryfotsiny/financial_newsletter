'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, ReactNode } from 'react'

interface QueryProviderProps {
    children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Avec SSR, on veut généralement désactiver le refetch
                        // pour éviter de refetch immédiatement côté client
                        refetchOnWindowFocus: false,
                        // Réessayer une fois en cas d'erreur
                        retry: 1,
                        // Cache les données pendant 5 minutes
                        staleTime: 5 * 60 * 1000,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    )
}