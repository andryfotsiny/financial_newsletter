'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter} from 'next/navigation'
import {Menu, User, LogOut, Settings, BookOpen, Search, Grid2X2} from 'lucide-react'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

import { PUBLIC_ROUTES, USER_ROUTES, ADMIN_ROUTES } from '@/shared/constants/routes'
import { isAdmin } from '@/shared/lib/auth'
import { ThemeToggle } from '../common/ThemeToggle'
import { Navigation } from './Navigation'

export function Header() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Gérer le scroll pour réduire le header
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            setScrolled(offset > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSignOut = async () => {
        await signOut({ redirect: false })
        router.push(PUBLIC_ROUTES.HOME)
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`${PUBLIC_ROUTES.ARCHIVES}?search=${encodeURIComponent(searchQuery)}`)
            setSearchQuery('')
        }
    }

    const userInitials = session?.user?.name
        ? session.user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        : session?.user?.email?.[0].toUpperCase() || 'U'

    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/40">
            {/* Header principal */}
            <div className={`transition-all duration-300 ease-in-out ${scrolled ? 'py-2' : 'py-3 sm:py-4'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Navigation gauche - Desktop uniquement */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground p-2"
                                title="Tous les sites"
                            >
                                <Grid2X2 className="h-8 w-8" />
                            </Button>

                            {/* Recherche Desktop */}
                            <div className="relative">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Recherche..."
                                            className={`pl-10 pr-4 bg-muted/50 border-muted-foreground/20 rounded-full transition-all duration-300 w-56 ${
                                                scrolled
                                                    ? 'h-8 text-sm'
                                                    : 'h-10'
                                            }`}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Menu mobile et recherche mobile */}
                        <div className="flex lg:hidden items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground p-2"
                                title="Tous les sites"
                            >
                                <Grid2X2 className="h-6 w-6" />
                            </Button>

                            {/* Recherche mobile simplifiée */}
                            <div className="relative">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Recherche..."
                                            className="pl-9 pr-3 bg-muted/50 border-muted-foreground/20 rounded-full h-8 text-sm w-32 sm:w-40"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Logo centré */}
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <Link
                                href={PUBLIC_ROUTES.HOME}
                                className={`flex items-center justify-center font-bold transition-all duration-300 ease-in-out ${
                                    scrolled
                                        ? 'text-xl sm:text-2xl'
                                        : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                                }`}
                            >
                                <span className="text-foreground">Alphavice</span>
                            </Link>
                        </div>

                        {/* Actions droite */}
                        <div className="flex items-center gap-2">
                            <ThemeToggle />

                            {status === 'loading' ? (
                                <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
                            ) : session ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={session.user.image || undefined} />
                                                <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
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
                                    <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                                        <Link href={PUBLIC_ROUTES.LOGIN}>
                                            <User className="h-4 w-4 mr-2" />
                                            Se connecter
                                        </Link>
                                    </Button>
                                    <Button size="sm" asChild className="bg-yellow-400 text-black hover:bg-yellow-500 font-medium text-xs sm:text-sm px-3 sm:px-4">
                                        <Link href={PUBLIC_ROUTES.REGISTER}>S&#39;abonner</Link>
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
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <SheetHeader>
                                        <SheetTitle>Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-6">
                                        <Navigation
                                            className="flex flex-col space-y-4"
                                            onLinkClick={() => setIsMenuOpen(false)}
                                        />

                                        {/* Actions utilisateur dans le menu mobile */}
                                        {!session && (
                                            <div className="flex flex-col items-center space-y-3 mt-6 pt-6 border-t">
                                                <Button variant="ghost" size="sm" asChild className="justify-start">
                                                    <Link href={PUBLIC_ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                                                        <User className="h-4 w-4 mr-2" />
                                                        Se connecter
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation principale - Desktop uniquement */}
            <div className={`hidden md:block transition-all duration-300 ease-in-out ${
                scrolled ? 'transform -translate-y-1 opacity-95' : 'transform translate-y-0 opacity-100'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex h-12 items-center justify-center">
                        <Navigation />
                    </div>
                </div>
            </div>
        </header>
    )
}