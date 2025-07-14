'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

import { PUBLIC_ROUTES, USER_ROUTES, ADMIN_ROUTES } from '@/shared/constants/routes'
import { isAdmin } from '@/shared/lib/auth'
import { ThemeToggle } from '../common/ThemeToggle'
import { Navigation } from './Navigation'

export function Header() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

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
        const formData = new FormData(e.currentTarget)
        const search = formData.get('search') as string

        if (search.trim()) {
            router.push(`${PUBLIC_ROUTES.ARCHIVES}?search=${encodeURIComponent(search)}`)
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
        <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md border-b border-border/40">
            {/* Header principal */}
            <div className={`transition-all duration-300 ease-in-out ${scrolled ? 'py-2' : 'py-3 sm:py-4'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Navigation gauche */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none">
                            {/* Bouton Grid - masqué sur mobile */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground p-2 hidden sm:flex"
                                title="Tous les sites"
                            >
                                <Grid2X2 className={`${scrolled ? 'h-6 w-6' : 'h-8 w-8'} transition-all duration-300`} />
                            </Button>

                            {/* Recherche - Version desktop */}
                            <div className="relative hidden md:block">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            name="search"
                                            placeholder="Recherche..."
                                            className={`pl-10 pr-4 bg-muted/50 border-muted-foreground/20 rounded-full transition-all duration-300 ${
                                                scrolled
                                                    ? 'h-8 text-sm w-48'
                                                    : 'h-10 w-56'
                                            }`}
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Bouton recherche mobile */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground p-2 md:hidden"
                                onClick={() => setSearchOpen(!searchOpen)}
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Logo centré */}
                        <div className="flex-1 flex justify-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
                            <Link
                                href={PUBLIC_ROUTES.HOME}
                                className={`font-bold transition-all duration-300 ease-in-out ${
                                    scrolled
                                        ? 'text-lg sm:text-xl md:text-2xl'
                                        : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'
                                }`}
                            >
                                <span className="text-foreground">Alphavice</span>
                            </Link>
                        </div>

                        {/* Actions droite */}
                        <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-end sm:flex-none">
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
                                    <Button size="sm" asChild className="bg-yellow-400 text-black hover:bg-yellow-500 font-medium text-xs sm:text-sm px-2 sm:px-4">
                                        <Link href={PUBLIC_ROUTES.REGISTER}>S&#39;abonner</Link>
                                    </Button>
                                </div>
                            )}

                            {/* Menu mobile */}
                            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <div className="flex flex-col space-y-4 mt-4">
                                        {/* Recherche mobile dans le menu */}
                                        <div className="md:hidden">
                                            <form onSubmit={handleSearch}>
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                                    <Input
                                                        name="search"
                                                        placeholder="Recherche..."
                                                        className="pl-10 pr-4 bg-muted/50 border-muted-foreground/20 rounded-full"
                                                    />
                                                </div>
                                            </form>
                                        </div>

                                        <Navigation
                                            className="flex flex-col space-y-4"
                                            onLinkClick={() => setIsMenuOpen(false)}
                                        />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barre de recherche mobile extensible */}
            {searchOpen && (
                <div className="md:hidden bg-background/80 backdrop-blur-sm border-t border-border/40 px-4 py-3">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                name="search"
                                placeholder="Recherche..."
                                className="pl-10 pr-4 bg-muted/50 border-muted-foreground/20 rounded-full"
                                autoFocus
                            />
                        </div>
                    </form>
                </div>
            )}

            {/* Navigation principale */}
            <div className={`transition-all duration-300 ease-in-out border-t border-border/20 ${
                scrolled ? 'transform -translate-y-1 opacity-95' : 'transform translate-y-0 opacity-100'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex h-10 sm:h-12 items-center justify-center overflow-x-auto">
                        {/* Navigation desktop */}
                        <Navigation className="hidden lg:flex whitespace-nowrap" />

                        {/* Navigation mobile/tablette simplifiée */}
                        <div className="flex lg:hidden items-center gap-4 sm:gap-6 w-full justify-center">
                            <Link
                                href={PUBLIC_ROUTES.HOME}
                                className={`relative text-xs sm:text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground pb-2 sm:pb-3 group ${
                                    pathname === PUBLIC_ROUTES.HOME
                                        ? 'text-foreground'
                                        : 'text-foreground/80'
                                }`}
                            >
                                Accueil
                                {pathname === PUBLIC_ROUTES.HOME && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                                )}
                                {pathname !== PUBLIC_ROUTES.HOME && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                                )}
                            </Link>
                            <Link
                                href={PUBLIC_ROUTES.ARCHIVES}
                                className={`relative text-xs sm:text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground pb-2 sm:pb-3 group ${
                                    pathname === PUBLIC_ROUTES.ARCHIVES
                                        ? 'text-foreground'
                                        : 'text-foreground/80'
                                }`}
                            >
                                Bibliothèque
                                {pathname === PUBLIC_ROUTES.ARCHIVES && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                                )}
                                {pathname !== PUBLIC_ROUTES.ARCHIVES && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                                )}
                            </Link>
                            <Link
                                href={PUBLIC_ROUTES.PREMIUM}
                                className={`relative text-xs sm:text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground pb-2 sm:pb-3 group ${
                                    pathname === PUBLIC_ROUTES.PREMIUM
                                        ? 'text-foreground'
                                        : 'text-foreground/80'
                                }`}
                            >
                                Premium
                                {pathname === PUBLIC_ROUTES.PREMIUM && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                                )}
                                {pathname !== PUBLIC_ROUTES.PREMIUM && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}