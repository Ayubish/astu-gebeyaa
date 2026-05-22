"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";

interface HeroSectionProps {
  onSearch?: (query: string, categoryId?: string) => void;
}

const TRENDING_TAGS = [
  { label: "Phones", query: "phone" },
  { label: "Laptops", query: "macbook" },
  { label: "Vehicles", query: "toyota" },
  { label: "Fashion", query: "jacket" },
];

const STATS = [
  { value: "14+", label: "Live listings" },
  { value: "8", label: "Categories" },
  { value: "100%", label: "Campus verified" },
];

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = (formData.get("search") as string) || "";

    if (onSearch) {
      onSearch(query, selectedCategory || undefined);
    } else {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (selectedCategory) params.set("category", selectedCategory);
      router.push(`/browse?${params.toString()}`);
    }
  };

  const handleTrending = (query: string) => {
    if (onSearch) onSearch(query);
    else router.push(`/browse?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="mesh-hero relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:24px_24px]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-primary-foreground/90 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            ASTU Campus Marketplace
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 tracking-tight text-balance">
            Buy & sell with fellow students
          </h2>
          <p className="text-primary-foreground/75 mb-10 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Your trusted marketplace at Adama Science and Technology University — phones,
            books, furniture, and more.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl shadow-black/20"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 rounded-xl border border-border bg-muted/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 sm:w-44 text-sm font-medium shrink-0"
              aria-label="Category"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                name="search"
                placeholder="Search phones, books, furniture..."
                className="w-full h-12 pl-10 pr-4 bg-transparent border-0 rounded-xl text-foreground shadow-none focus-visible:ring-0"
              />
            </div>

            <Button
              type="submit"
              className="h-12 rounded-xl px-6 font-semibold shrink-0 shadow-sm"
            >
              Search
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2 justify-center items-center">
            <span className="text-xs text-primary-foreground/60 font-medium">Popular:</span>
            {TRENDING_TAGS.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleTrending(tag.query)}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-primary-foreground hover:bg-white/20 transition-colors"
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl md:text-2xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-[11px] md:text-xs text-primary-foreground/60 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
