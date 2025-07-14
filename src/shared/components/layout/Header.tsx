'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import {Menu, User, LogOut, Settings, BookOpen, Search,  Grid2X2} from 'lucide-react'
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
        <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md" style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'}}>
            {/* Header principal */}
            <div className={`transition-all duration-300 ease-in-out ${scrolled ? 'py-2' : 'py-4'}`}>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Navigation gauche */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground p-2"
                                title="Tous les sites"
                            >
                                <Grid2X2 className="h-10 w-10" />
                            </Button>

                            {/* Recherche */}
                            <div className="relative">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            name="search"
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

                        {/* Logo centré */}
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <Link
                                href={PUBLIC_ROUTES.HOME}
                                className={`flex items-center justify-center font-bold transition-all duration-300 ease-in-out ${
                                    scrolled
                                        ? 'text-2xl'
                                        : 'text-4xl md:text-5xl'
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
                                    <Button size="sm" asChild className="bg-yellow-400 text-black hover:bg-yellow-500 font-medium">
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
            </div>

            {/* Navigation principale - VOTRE MENU EXISTANT */}
            <div className={`transition-all duration-300 ease-in-out ${
                scrolled ? 'transform -translate-y-2 opacity-90' : 'transform translate-y-0 opacity-100'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex h-12 items-center justify-center overflow-x-auto">
                        <Navigation className="hidden md:flex whitespace-nowrap" />

                        {/* Navigation mobile simplifiée */}
                        <div className="flex md:hidden items-center gap-6 w-full justify-center">
                            <Link
                                href={PUBLIC_ROUTES.HOME}
                                className={`relative text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground pb-3 group ${
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
                                className={`relative text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground pb-3 group ${
                                    pathname === PUBLIC_ROUTES.ARCHIVES
                                        ? 'text-foreground'
                                        : 'text-foreground/80'
                                }`}
                            >
                                bibliothèque
                                {pathname === PUBLIC_ROUTES.ARCHIVES && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                                )}
                                {pathname !== PUBLIC_ROUTES.ARCHIVES && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                                )}
                            </Link>
                            <Link
                                href={PUBLIC_ROUTES.PREMIUM}
                                className={`relative text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground pb-3 group ${
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