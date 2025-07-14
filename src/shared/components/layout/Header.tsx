"use client";

import type React from "react";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Menu,
  User,
  LogOut,
  Settings,
  BookOpen,
  Search,
  Grid2X2,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  PUBLIC_ROUTES,
  USER_ROUTES,
  ADMIN_ROUTES,
} from "@/shared/constants/routes";
import { isAdmin } from "@/shared/lib/auth";
import { ThemeToggle } from "../common/ThemeToggle";
import { Navigation } from "./Navigation";
import { cn } from "@/shared/lib/utils";

// Hook personnalisé pour la position de scroll optimisé
function useScrollPosition(threshold = 50) {
  const [scrollPosition, setScrollPosition] = useState({
    scrolled: false,
    scrollY: 0,
    scrollDirection: "down" as "up" | "down",
  });

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrolled = currentScrollY > threshold;
    const scrollDirection =
      currentScrollY > scrollPosition.scrollY ? "down" : "up";

    setScrollPosition((prev) => ({
      scrolled,
      scrollY: currentScrollY,
      scrollDirection:
        prev.scrollY !== currentScrollY
          ? scrollDirection
          : prev.scrollDirection,
    }));
  }, [threshold, scrollPosition.scrollY]);

  useEffect(() => {
    let ticking = false;

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", requestTick);
  }, [handleScroll]);

  return scrollPosition;
}

// Composant Logo mémorisé
const Logo = memo(function Logo({ size }: { size: string }) {
  return (
    <Link
      href={PUBLIC_ROUTES.HOME}
      className={cn(
        "flex items-center justify-center font-bold",
        "transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md",
        "tracking-tight text-foreground",
        size
      )}
      aria-label="Alphavice - Retour à l'accueil"
    >
      <span>Alphavice</span>
    </Link>
  );
});

// Composant SearchBar mémorisé
const SearchBar = memo(function SearchBar({
  variant,
  compact = false,
  className,
}: {
  variant: "desktop" | "mobile";
  compact?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(
          `${PUBLIC_ROUTES.ARCHIVES}?search=${encodeURIComponent(
            searchQuery.trim()
          )}`
        );
        setSearchQuery("");
        inputRef.current?.blur();
      }
    },
    [searchQuery, router]
  );

  const handleClear = useCallback(() => {
    setSearchQuery("");
    inputRef.current?.focus();
  }, []);

  const inputHeight = compact ? "h-8" : "h-9 sm:h-10";
  const iconSize = compact ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("relative group", className)}>
      <form onSubmit={handleSearch} role="search">
        <div className="relative">
          <Search
            className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-colors",
              isFocused && "text-primary",
              iconSize
            )}
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Rechercher..."
            className={cn(
              "pl-10 pr-10 bg-muted/50 border-input rounded-full",
              "transition-all duration-300 ease-out",
              "focus:bg-background focus:border-ring focus:ring-2 focus:ring-ring/20",
              "hover:bg-muted/70",
              inputHeight,
              variant === "mobile" && "text-sm",
              variant === "desktop" && (compact ? "text-sm" : "text-base")
            )}
            aria-label="Rechercher du contenu"
            autoComplete="off"
            spellCheck="false"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className={cn(
                "absolute right-1 top-1/2 transform -translate-y-1/2",
                "h-6 w-6 p-0 hover:bg-muted rounded-full",
                "opacity-0 group-hover:opacity-100 transition-opacity"
              )}
              aria-label="Effacer la recherche"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
});

// Composant QuickActions mémorisé
const QuickActions = memo(function QuickActions({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const iconSize = mobile ? "h-5 w-5" : "h-6 w-6";
  const buttonSize = mobile ? "h-8 w-8" : "h-9 w-9";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-200",
        "hover:bg-accent active:scale-95",
        buttonSize
      )}
      aria-label="Voir tous les sites"
      title="Tous les sites"
    >
      <Grid2X2 className={iconSize} />
    </Button>
  );
});

// Composant UserActions mémorisé
const UserActions = memo(function UserActions({
  session,
  isLoading,
  isAuthenticated,
}: {
  session: any;
  isLoading: boolean;
  isAuthenticated: boolean;
}) {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ redirect: false });
      router.push(PUBLIC_ROUTES.HOME);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  }, [router]);

  const userInitials = useMemo(() => {
    if (session?.user?.name) {
      return session.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return session?.user?.email?.[0].toUpperCase() || "U";
  }, [session?.user?.name, session?.user?.email]);

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />

      {isLoading ? (
        <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
      ) : isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full hover:bg-accent transition-colors"
              aria-label="Menu utilisateur"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.image || undefined}
                  alt={session?.user?.name || "Avatar utilisateur"}
                />
                <AvatarFallback className="text-xs font-medium bg-secondary text-secondary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            forceMount
            sideOffset={8}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none truncate">
                  {session?.user?.name || "Utilisateur"}
                </p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={USER_ROUTES.DASHBOARD} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Mon compte
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={USER_ROUTES.FAVORITES} className="cursor-pointer">
                <BookOpen className="mr-2 h-4 w-4" />
                Mes favoris
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={USER_ROUTES.PREFERENCES} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Préférences
              </Link>
            </DropdownMenuItem>

            {session?.user && isAdmin(session.user) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={ADMIN_ROUTES.DASHBOARD}
                    className="cursor-pointer text-primary font-medium"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Administration
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:inline-flex hover:bg-accent transition-colors"
          >
            <Link href={PUBLIC_ROUTES.LOGIN}>
              <User className="h-4 w-4 mr-2" />
              Se connecter
            </Link>
          </Button>

          <Button
            size="sm"
            asChild
            className="font-medium text-xs sm:text-sm px-3 sm:px-4 shadow-sm hover:shadow-md transition-all"
          >
            <Link href={PUBLIC_ROUTES.REGISTER}>S&apos;abonner</Link>
          </Button>
        </div>
      )}
    </div>
  );
});

// Composant MobileMenu mémorisé
const MobileMenu = memo(function MobileMenu({
  session,
  isAuthenticated,
}: {
  session: any;
  isAuthenticated: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-accent transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Navigation
            className="flex flex-col space-y-4"
            onLinkClick={handleLinkClick}
          />

          {!isAuthenticated && (
            <div className="pt-6 border-t">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="w-full justify-start"
              >
                <Link href={PUBLIC_ROUTES.LOGIN} onClick={handleLinkClick}>
                  <User className="h-4 w-4 mr-2" />
                  Se connecter
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
});

// Composant principal Header
export const Header = memo(function Header() {
  const { data: session, status } = useSession();
  const { scrolled, scrollY } = useScrollPosition();

  // Calculs mémorisés pour les performances
  const headerHeight = useMemo(() => {
    return scrolled ? "h-14" : "h-16 sm:h-20";
  }, [scrolled]);

  const logoSize = useMemo(() => {
    if (scrollY > 100) return "text-xl sm:text-2xl";
    if (scrolled) return "text-xl sm:text-2xl md:text-3xl";
    return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
  }, [scrolled, scrollY]);

  const isAuthenticated = useMemo(
    () => session && status === "authenticated",
    [session, status]
  );

  const isLoading = status === "loading";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
        "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        scrolled && "shadow-sm"
      )}
      role="banner"
    >
      {/* Header principal */}
      <div className={cn("transition-all duration-300 ease-out", headerHeight)}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Section gauche - Desktop */}
            <div className="hidden lg:flex items-center gap-4 flex-1">
              <QuickActions />
              <SearchBar
                variant="desktop"
                compact={scrolled}
                className="max-w-xs"
              />
            </div>

            {/* Section gauche mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <QuickActions mobile />
              <SearchBar
                variant="mobile"
                compact={scrolled}
                className="w-32 sm:w-40"
              />
            </div>

            {/* Logo centré */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <Logo size={logoSize} />
            </div>

            {/* Section droite */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              <UserActions
                session={session}
                isLoading={isLoading}
                isAuthenticated={!!isAuthenticated}
              />
              <MobileMenu
                session={session}
                isAuthenticated={!!isAuthenticated}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Desktop avec border au bas */}
      <div
        className={cn(
          "hidden md:block transition-all duration-300 ease-out",
          "border-none p-0",
          scrolled ? "" : "transform translate-y-0 opacity-100"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
});
