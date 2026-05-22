"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/marketplace/header";
import Footer from "@/components/marketplace/footer";
import ProductCard from "@/components/marketplace/product-card";
import { CATEGORIES } from "@/lib/constants";
import { getAllProducts, getFavorites, toggleFavorite } from "@/lib/products";

function BrowseContent() {
  const searchParams = useSearchParams();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setMounted(true);
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q) setSearchQuery(q);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = getAllProducts().filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.seller.toLowerCase().includes(q);
    const matchesCategory = !selectedCategory || p.category.toString() === selectedCategory;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

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

  const filterPanel = (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Search</label>
        <Input
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-input border-border"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Categories
        </h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
              selectedCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id.toString())}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                selectedCategory === cat.id.toString()
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-foreground mb-3">Price Range (ETB)</h3>
        <label className="block text-xs text-muted-foreground mb-1">Min: {priceRange[0].toLocaleString()}</label>
        <input
          type="range"
          min="0"
          max="2000000"
          step="1000"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
          className="w-full"
        />
        <label className="block text-xs text-muted-foreground mt-3 mb-1">Max: {priceRange[1].toLocaleString()}</label>
        <input
          type="range"
          min="0"
          max="2000000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-border bg-input text-foreground text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-4 w-fit text-sm">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">Browse All Items</h1>
          <p className="text-white/90 text-sm">Search and filter across all categories</p>
        </div>
      </div>

      <div className="flex flex-1 relative">
        <aside className="hidden lg:block w-72 bg-card border-r border-border p-6 shrink-0">
          <h2 className="text-lg font-bold mb-6">Filters</h2>
          {filterPanel}
        </aside>

        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <aside className="relative bg-card w-80 max-w-[85vw] h-full overflow-y-auto p-6 shadow-xl z-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button type="button" onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterPanel}
              <Button className="w-full mt-6" onClick={() => setMobileFiltersOpen(false)}>
                Apply Filters
              </Button>
            </aside>
          </div>
        )}

        <main className="flex-1 px-4 md:px-8 py-8 min-w-0">
          <div className="lg:hidden mb-4">
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setMobileFiltersOpen(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Show Filters
            </Button>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">
                {selectedCategory
                  ? CATEGORIES.find((c) => c.id.toString() === selectedCategory)?.name
                  : "All Items"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {mounted ? `${sortedProducts.length} items found` : "Loading..."}
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input text-sm lg:hidden"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>

          {mounted && sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
              <p className="text-muted-foreground">No items match your filters</p>
            </div>
          ) : null}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
