"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/lib/constants";
import { getCategoryListingCounts, getTotalListingCount } from "@/lib/products";
import { cn } from "@/lib/utils";

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
    <aside className="hidden md:block w-72 shrink-0 border-r border-border bg-sidebar sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-5">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Categories
        </h3>

        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory?.("")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200",
              !selectedCategory
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-muted/80 text-foreground"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-lg text-base shrink-0",
                !selectedCategory ? "bg-primary-foreground/15" : "bg-muted"
              )}
            >
              🏪
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm">All Categories</p>
              <p
                className={cn(
                  "text-xs",
                  !selectedCategory ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
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
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted/80 text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-lg text-lg shrink-0",
                    isSelected ? "bg-primary-foreground/15" : "bg-muted"
                  )}
                >
                  {category.icon}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{category.name}</p>
                  <p
                    className={cn(
                      "text-xs",
                      isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {listingCount.toLocaleString()} listing{listingCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
