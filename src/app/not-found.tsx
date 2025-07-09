import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
            <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <h2 className="text-xl font-semibold mb-4">Page non disponible</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
                Cette page n&apos;existe pas, ou bien elle est en cours de développement.<br />
                Revenez plus tard ou retournez à l&apos;accueil.
            </p>
            <Button asChild>
                <Link href={PUBLIC_ROUTES.HOME}>
                    <Home className="mr-2 h-4 w-4" />
                    Retour à l&apos;accueil
                </Link>
            </Button>
        </div>
    )
}
