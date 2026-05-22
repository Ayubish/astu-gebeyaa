"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { getCategoryListingCounts, getTotalListingCount } from "@/lib/products";

interface CategoriesSidebarProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function CategoriesSidebar({
  selectedCategory,
  onSelectCategory,
}: CategoriesSidebarProps) {
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [totalCount, setTotalCount] = useState(0);

  const refreshCounts = () => {
    setCounts(getCategoryListingCounts());
    setTotalCount(getTotalListingCount());
  };

  useEffect(() => {
    refreshCounts();
    window.addEventListener("focus", refreshCounts);
    return () => window.removeEventListener("focus", refreshCounts);
  }, []);

  return (
    <aside className="hidden md:block w-64 bg-background border-r border-border sticky top-[4.5rem] h-[calc(100vh-4.5rem)] overflow-y-auto">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Browse Categories
        </h3>

        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory?.("")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              !selectedCategory
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted text-foreground"
            }`}
          >
            <div className="text-left">
              <p className="font-medium text-sm">All Categories</p>
              <p
                className={`text-xs ${
                  !selectedCategory ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {totalCount.toLocaleString()} listing{totalCount !== 1 ? "s" : ""}
              </p>
            </div>
          </button>

          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id.toString();
            const listingCount = counts[category.id] ?? 0;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory?.(category.id.toString())}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg ${
                      isSelected ? "bg-primary-foreground/20" : "bg-muted"
                    }`}
                  >
                    {category.icon}
                  </span>

                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{category.name}</p>
                    <p
                      className={`text-xs ${
                        isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {listingCount.toLocaleString()} listing{listingCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 ml-2 shrink-0 ${
                    isSelected ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
