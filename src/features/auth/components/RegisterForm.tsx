'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/shared/hooks/use-toast'

import { registerSchema, type RegisterInput } from '../types/auth.types'
import { PUBLIC_ROUTES } from '@/shared/constants/routes'
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/shared/lib/constants'

export function RegisterForm() {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterInput) => {
        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    name: data.name,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                setError(result.error || ERROR_MESSAGES.SOMETHING_WENT_WRONG)
                return
            }

            toast({
                title: SUCCESS_MESSAGES.REGISTER_SUCCESS,
                description: "Vous pouvez maintenant vous connecter",
            })

            // Redirection vers la page de connexion
            router.push(PUBLIC_ROUTES.LOGIN)
        } catch (error) {
            setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
                <CardDescription>
                    Inscrivez-vous pour accéder à notre newsletter financière
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">Nom (optionnel)</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Jean Dupont"
                            {...register('name')}
                            disabled={isLoading}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            {...register('email')}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Création en cours...
                            </>
                        ) : (
                            'Créer mon compte'
                        )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        En créant un compte, vous acceptez nos{' '}
                        <Link href="/terms" className="underline hover:text-primary">
                            conditions d&apos;utilisation
                        </Link>{' '}
                        et notre{' '}
                        <Link href="/privacy" className="underline hover:text-primary">
                            politique de confidentialité
                        </Link>
                    </p>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-muted-foreground">
                    Déjà un compte ?{' '}
                    <Link
                        href={PUBLIC_ROUTES.LOGIN}
                        className="text-primary hover:underline font-medium"
                    >
                        Se connecter
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}