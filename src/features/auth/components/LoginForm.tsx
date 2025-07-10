'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
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

import { loginSchema, type LoginInput } from '../types/auth.types'
import { PUBLIC_ROUTES, USER_ROUTES, ADMIN_ROUTES } from '@/shared/constants/routes'
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/shared/lib/constants'

export function LoginForm() {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginInput) => {
        try {
            setIsLoading(true)
            setError(null)

            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (result?.error) {
                setError(ERROR_MESSAGES.INVALID_CREDENTIALS)
                return
            }

            toast({
                title: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                description: "Vous allez être redirigé...",
            })

            // Redirection selon le rôle
            if (result.ok) {
                // Récupérer la session pour vérifier le rôle
                const response = await fetch('/api/auth/session')
                const session = await response.json()

                if (session?.user?.role === 'ADMIN') {
                    router.push(ADMIN_ROUTES.DASHBOARD)
                } else {
                    router.push(USER_ROUTES.DASHBOARD)
                }
                router.refresh()
            }
        } catch (error) {
            console.error('Login error:', error)
            setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
                <CardDescription>
                    Entrez vos identifiants pour accéder à votre compte
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Link
                                href={PUBLIC_ROUTES.FORGOT_PASSWORD}
                                className="text-sm text-primary hover:underline"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
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

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connexion en cours...
                            </>
                        ) : (
                            'Se connecter'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-muted-foreground">
                    Pas encore de compte ?{' '}
                    <Link
                        href={PUBLIC_ROUTES.REGISTER}
                        className="text-primary hover:underline font-medium"
                    >
                        Créer un compte
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}