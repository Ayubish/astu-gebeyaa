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
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11">
            <Image
              src="/images/gebeyalogo.svg"
              alt="ASTU Gebeya Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-primary tracking-tight">
            ASTU <span className="text-foreground">Gebeya</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`text-foreground hover:bg-accent/10 ${
                  getActiveNav() === item.label
                    ? "font-semibold text-primary bg-primary/5"
                    : ""
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
          <Link href="/favorites">
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent/10 gap-1">
              <Heart className="w-4 h-4" />
              Saved
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard/profile">
                <Button variant="ghost" size="sm" className="gap-1 max-w-[140px]">
                  <User className="w-4 h-4 shrink-0" />
                  <span className="truncate">{user.name.split(" ")[0]}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <Button
            onClick={handleSell}
            size="sm"
            className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          >
            <Plus className="w-4 h-4 mr-1" />
            Sell
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  getActiveNav() === item.label ? "bg-primary/10 text-primary font-semibold" : ""
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
          <Link href="/favorites" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Heart className="w-4 h-4" /> Saved Items
            </Button>
          </Link>

          {user ? (
            <>
              <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="w-4 h-4" /> Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-destructive"
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
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground">Register</Button>
              </Link>
            </>
          )}

          <Button
            onClick={() => {
              handleSell();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-accent text-accent-foreground mt-2"
          >
            <Plus className="w-4 h-4 mr-1" /> Sell
          </Button>
        </div>
      )}
    </header>
  );
}
