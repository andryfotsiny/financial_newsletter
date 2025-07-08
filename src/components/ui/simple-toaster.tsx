'use client'

import { useToast } from "@/shared/hooks/use-toast"
import { useEffect } from "react"

export function SimpleToaster() {
    const { toasts } = useToast()

    useEffect(() => {
        if (toasts.length > 0) {
            const latestToast = toasts[toasts.length - 1]
            // Pour l'instant, on affiche juste une alerte
            if (latestToast.title) {
                alert(`${latestToast.title}${latestToast.description ? '\n' + latestToast.description : ''}`)
            }
        }
    }, [toasts])

    return null
}