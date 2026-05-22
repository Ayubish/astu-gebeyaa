"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/marketplace/header";
import HeroSection from "@/components/marketplace/hero-section";
import ListingsGrid from "@/components/marketplace/listings-grid";
import CategoriesSidebar from "@/components/marketplace/categories-sidebar";
import Footer from "@/components/marketplace/footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleSearch = (query: string, categoryId?: string) => {
    setSearchQuery(query);
    if (categoryId !== undefined) setSelectedCategory(categoryId);
  };

  const handleSellClick = () => {
    router.push("/sell");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSellClick={handleSellClick} />

      <HeroSection onSearch={handleSearch} />

      <div className="flex">
        <CategoriesSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="flex-1 min-w-0">
          <ListingsGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
