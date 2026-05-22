"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/marketplace/product-card";
import { getAllProducts, getFavorites, toggleFavorite } from "@/lib/products";

interface ListingsGridProps {
  searchQuery?: string;
  selectedCategory?: string;
}

export default function ListingsGrid({
  searchQuery = "",
  selectedCategory = "",
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

  return (
    <section className="py-8 bg-background flex-1">
      <div className="px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          {searchQuery ? `Results for "${searchQuery}"` : "Trending Listings"}
        </h2>
        <p className="text-muted-foreground mb-8">
          {mounted ? `${filteredListings.length} items available` : "Loading listings..."}
        </p>

        {mounted && filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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
          <div className="text-center py-16 bg-card rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground text-lg mb-2">No listings found</p>
            <p className="text-muted-foreground text-sm">
              Try a different search or category, or{" "}
              <a href="/sell" className="text-primary font-medium hover:underline">
                post your own listing
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
