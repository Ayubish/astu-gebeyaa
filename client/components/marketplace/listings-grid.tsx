"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageOpen, Plus } from "lucide-react";
import ProductCard from "@/components/marketplace/product-card";
import { Button } from "@/components/ui/button";
import { getAllProducts, getFavorites, toggleFavorite } from "@/lib/products";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ListingsGridProps {
  searchQuery?: string;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  showMobileCategories?: boolean;
}

export default function ListingsGrid({
  searchQuery = "",
  selectedCategory = "",
  onSelectCategory,
  showMobileCategories = false,
}: ListingsGridProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setMounted(true);
  }, []);

  const filteredListings = getAllProducts().filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.seller.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q);

    const matchesCategory =
      !selectedCategory || item.category.toString() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleToggleFavorite = (id: number) => {
    setFavorites(toggleFavorite(id));
  };

  const categoryLabel = selectedCategory
    ? CATEGORIES.find((c) => c.id.toString() === selectedCategory)?.name
    : null;

  return (
    <section className="py-8 md:py-10 bg-background flex-1 min-w-0">
      <div className="px-4 md:px-8">
        {showMobileCategories && onSelectCategory && (
          <div className="md:hidden mb-6 -mx-1">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
              <button
                type="button"
                onClick={() => onSelectCategory("")}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                  !selectedCategory
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:border-primary/30"
                )}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id.toString())}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap",
                    selectedCategory === cat.id.toString()
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-foreground hover:border-primary/30"
                  )}
                >
                  {cat.icon} {cat.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : categoryLabel
                  ? categoryLabel
                  : "Trending Listings"}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {mounted
                ? `${filteredListings.length} item${filteredListings.length !== 1 ? "s" : ""} available`
                : "Loading listings..."}
            </p>
          </div>
          <Link href="/sell" className="shrink-0">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5 bg-transparent">
              <Plus className="w-4 h-4" />
              Post a listing
            </Button>
          </Link>
        </div>

        {mounted && filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredListings.map((listing, index) => (
              <ProductCard
                key={listing.id}
                product={listing}
                isFavorite={favorites.includes(listing.id)}
                onToggleFavorite={handleToggleFavorite}
                index={index}
              />
            ))}
          </div>
        ) : mounted ? (
          <div className="text-center py-20 card-elevated border-dashed">
            <PackageOpen className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-foreground font-medium text-lg mb-1">No listings found</p>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Try a different search or category, or be the first to list something.
            </p>
            <Link href="/sell">
              <Button className="rounded-full">Post your listing</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-24 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
