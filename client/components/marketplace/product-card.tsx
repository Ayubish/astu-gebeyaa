"use client";

import Link from "next/link";
import { Heart, MapPin, Star, BadgeCheck, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  index?: number;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  index = 0,
}: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full group/card">
      <article
        className="card-elevated h-full flex flex-col overflow-hidden animate-stagger-in"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <div className="relative overflow-hidden bg-muted aspect-[4/3]">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

          <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/95 backdrop-blur-sm text-foreground text-[11px] font-semibold rounded-lg shadow-sm border border-border/50">
            {product.condition}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all",
              isFavorite
                ? "bg-red-500/90 text-white shadow-md"
                : "bg-card/90 text-muted-foreground hover:text-red-500 hover:bg-card shadow-sm"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <p className="text-lg font-bold text-primary tracking-tight">
            ETB {product.price.toLocaleString()}
          </p>
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 mt-1 mb-3 leading-snug group-hover/card:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground/40"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">{product.rating}</span>
          </div>

          <div className="mt-auto pt-3 border-t border-border/80">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-medium text-foreground truncate">{product.seller}</span>
              {product.verified && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                  <BadgeCheck className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-0">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{product.location}</span>
              </div>
              <span className="text-xs font-medium text-primary opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-0.5 shrink-0">
                View
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
