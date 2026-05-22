"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Plus, Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import ThemeToggle from "@/components/marketplace/theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSellClick?: () => void;
}

export default function Header({ onSellClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const getActiveNav = () => {
    if (pathname === "/") return "Home";
    if (pathname.startsWith("/categories")) return "Categories";
    if (pathname === "/browse") return "Browse";
    return "";
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Browse", href: "/browse" },
  ];

  const handleSell = () => {
    if (onSellClick) onSellClick();
    else router.push("/sell");
  };

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/5 p-1 ring-1 ring-primary/10">
            <Image
              src="/images/gebeyalogo.svg"
              alt="ASTU Gebeya Logo"
              fill
              className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="block text-base sm:text-lg font-bold text-primary tracking-tight">
              ASTU Gebeya
            </span>
            <span className="hidden sm:block text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Campus Marketplace
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 bg-muted/60 rounded-full p-1">
          {navItems.map((item) => {
            const active = getActiveNav() === item.label;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full px-4 h-8 text-sm font-medium transition-all",
                    active
                      ? "bg-card text-primary shadow-sm hover:bg-card"
                      : "text-muted-foreground hover:text-foreground hover:bg-transparent"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            );
          })}
          <Link href="/favorites">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full px-4 h-8 gap-1.5 text-sm font-medium",
                pathname === "/favorites"
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className="w-3.5 h-3.5" />
              Saved
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          {user ? (
            <div className="hidden md:flex items-center gap-1">
              <Link href="/dashboard/profile">
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-full max-w-[140px] h-8">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="truncate text-sm">{user.name.split(" ")[0]}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="rounded-full w-8 h-8 text-muted-foreground hover:text-foreground"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="rounded-full h-8 font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="rounded-full h-8 px-4 font-semibold shadow-sm">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <Button
            onClick={handleSell}
            size="sm"
            className="hidden sm:inline-flex rounded-full h-8 px-4 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Sell
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-card/95 backdrop-blur-xl px-4 py-4 space-y-1 animate-fade-in-up">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start rounded-xl h-10",
                  getActiveNav() === item.label && "bg-primary/10 text-primary font-semibold"
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
          <Link href="/favorites" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start rounded-xl h-10 gap-2">
              <Heart className="w-4 h-4" /> Saved Items
            </Button>
          </Link>

          {user ? (
            <>
              <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start rounded-xl h-10 gap-2">
                  <User className="w-4 h-4" /> Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl h-10 gap-2 text-destructive"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start rounded-xl h-10 bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl h-10">Register</Button>
              </Link>
            </>
          )}

          <Button
            onClick={() => {
              handleSell();
              setMobileMenuOpen(false);
            }}
            className="w-full rounded-xl h-10 bg-accent text-accent-foreground mt-2 font-semibold"
          >
            <Plus className="w-4 h-4" /> Sell an Item
          </Button>
        </div>
      )}
    </header>
  );
}
