"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/marketplace/header";
import Footer from "@/components/marketplace/footer";
import ProductCard from "@/components/marketplace/product-card";
import { CATEGORIES } from "@/lib/constants";
import { getProductsByCategory, getFavorites, toggleFavorite } from "@/lib/products";

interface CategoryDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryDetailsPage({ params }: CategoryDetailsPageProps) {
  const resolvedParams = use(params);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchInCategory, setSearchInCategory] = useState("");
  const [mounted, setMounted] = useState(false);

  const category = CATEGORIES.find((c) => c.id.toString() === resolvedParams.id);
  const categoryProducts = getProductsByCategory(Number.parseInt(resolvedParams.id));

  useEffect(() => {
    setFavorites(getFavorites());
    setMounted(true);
  }, []);

  const filteredProducts = categoryProducts.filter((p) =>
    p.title.toLowerCase().includes(searchInCategory.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.id - a.id;
    }
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-4">Category not found</p>
            <Link href="/categories" className="text-primary font-medium hover:underline">
              Browse all categories
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="bg-gradient-to-r from-primary to-primary/85 text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/categories" className="flex items-center gap-2 text-white/80 hover:text-white mb-4 w-fit text-sm">
            <ArrowLeft className="w-5 h-5" />
            All Categories
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
              <p className="text-white/90 text-sm">
                {mounted ? `${sortedProducts.length} items available` : "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border-b border-border sticky top-[4.5rem] z-20">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search in this category..."
            value={searchInCategory}
            onChange={(e) => setSearchInCategory(e.target.value)}
            className="bg-input border-border flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-sm h-10"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex-1">
        {mounted && sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
                index={index}
              />
            ))}
          </div>
        ) : mounted ? (
          <div className="text-center py-16 bg-card rounded-xl border border-dashed border-border">
            <Search className="w-14 h-14 mx-auto text-muted-foreground mb-4 opacity-40" />
            <p className="text-muted-foreground mb-4">No items in this category yet</p>
            <Link href="/sell">
              <Button className="bg-accent text-accent-foreground">Be the first to sell here</Button>
            </Link>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
