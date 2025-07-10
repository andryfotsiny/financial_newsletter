'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Menu, User, LogOut, Settings, BookOpen } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { PUBLIC_ROUTES, USER_ROUTES, ADMIN_ROUTES } from '@/shared/constants/routes'
import { APP_CONFIG } from '@/shared/lib/constants'
import { isAdmin } from '@/shared/lib/auth'
import { ThemeToggle } from '../common/ThemeToggle'
import { Navigation } from './Navigation'

export function Header() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut({ redirect: false })
        router.push(PUBLIC_ROUTES.HOME)
    }

    const userInitials = session?.user?.name
        ? session.user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        : session?.user?.email?.[0].toUpperCase() || 'U'

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo et navigation desktop */}
                    <div className="flex items-center gap-6">
                        <Link href={PUBLIC_ROUTES.HOME} className="flex items-center space-x-2">
                            <span className="text-xl font-bold">{APP_CONFIG.name}</span>
                        </Link>

                        <Navigation className="hidden md:flex" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {status === 'loading' ? (
                            <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
                        ) : session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user.image || undefined} />
                                            <AvatarFallback>{userInitials}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {session.user.name || 'Utilisateur'}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem asChild>
                                        <Link href={USER_ROUTES.DASHBOARD}>
                                            <User className="mr-2 h-4 w-4" />
                                            Mon compte
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href={USER_ROUTES.FAVORITES}>
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Mes favoris
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href={USER_ROUTES.PREFERENCES}>
                                            <Settings className="mr-2 h-4 w-4" />
                                            Préférences
                                        </Link>
                                    </DropdownMenuItem>

                                    {isAdmin(session.user) && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={ADMIN_ROUTES.DASHBOARD} className="text-primary font-medium">
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Administration
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Déconnexion
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                                    <Link href={PUBLIC_ROUTES.LOGIN}>Connexion</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={PUBLIC_ROUTES.REGISTER}>S'inscrire</Link>
                                </Button>
                            </div>
                        )}

                        {/* Menu mobile */}
                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <Navigation
                                    className="flex flex-col space-y-4"
                                    onLinkClick={() => setIsMenuOpen(false)}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}