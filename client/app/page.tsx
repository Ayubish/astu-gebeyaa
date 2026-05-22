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
    <div className="min-h-screen bg-background flex flex-col">
      <Header onSellClick={handleSellClick} />
      <HeroSection onSearch={handleSearch} />

      <div className="flex flex-1">
        <CategoriesSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ListingsGrid
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          showMobileCategories
        />
      </div>

      <Footer />
    </div>
  );
}
