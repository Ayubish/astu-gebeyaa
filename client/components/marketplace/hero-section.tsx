"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
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
    <section className="bg-gradient-to-br from-primary via-primary to-primary/85 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <p className="text-primary-foreground/80 text-sm font-medium mb-2 tracking-wide uppercase">
            ASTU Campus Marketplace
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            What are you looking for?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-sm md:text-base">
            Buy and sell with fellow students at Adama Science and Technology
            University{" "}
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-stretch gap-3 w-full bg-white/10 p-2 rounded-2xl backdrop-blur-sm border border-white/20"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 px-4 rounded-xl border-0 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent md:w-52 text-sm"
              aria-label="Category"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="flex-1 relative">
              <Input
                name="search"
                placeholder="Search phones, books, furniture..."
                className="w-full h-11 px-4 bg-white border-0 rounded-xl text-foreground pr-12 focus-visible:ring-2 focus-visible:ring-accent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <Button
              type="submit"
              className="h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl px-6"
            >
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2 justify-center items-center">
            <span className="text-sm text-primary-foreground/70">
              Trending:
            </span>
            {TRENDING_TAGS.map((tag) => (
              <Button
                key={tag.label}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleTrending(tag.query)}
                className="bg-white/15 border-white/30 text-primary-foreground hover:bg-white/25 rounded-full"
              >
                {tag.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
