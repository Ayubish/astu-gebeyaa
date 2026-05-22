"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import Header from "@/components/marketplace/header";
import Footer from "@/components/marketplace/footer";
import ProductCard from "@/components/marketplace/product-card";
import { getAllProducts, getFavorites, toggleFavorite } from "@/lib/products";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setMounted(true);
  }, []);

  const products = getAllProducts().filter((p) => favorites.includes(p.id));

  const handleToggle = (id: number) => {
    setFavorites(toggleFavorite(id));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-4 w-fit">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="w-8 h-8 fill-white" />
            Saved Items
          </h1>
          <p className="text-white/90 mt-1">
            {mounted ? `${products.length} saved listing${products.length !== 1 ? "s" : ""}` : "Loading..."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex-1">
        {mounted && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={handleToggle}
                index={index}
              />
            ))}
          </div>
        ) : mounted ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-40" />
            <p className="text-lg text-foreground font-medium mb-2">No saved items yet</p>
            <p className="text-muted-foreground text-sm mb-6">
              Tap the heart on any listing to save it here.
            </p>
            <Link href="/browse">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90">
                Browse Listings
              </button>
            </Link>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
