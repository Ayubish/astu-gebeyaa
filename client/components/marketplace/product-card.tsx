"use client";

import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

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
    <Link href={`/products/${product.id}`}>
      <div
        className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer h-full"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <div className="relative overflow-hidden bg-muted h-56">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-md">
              {product.condition}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(product.id);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white transition shadow-sm"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 transition ${
                isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
          </button>
        </div>

        <div className="p-3">
          <p className="text-xl font-bold text-primary">
            ETB {product.price.toLocaleString()}
          </p>
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-2 mt-1">
            {product.title}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>

          <div className="border-t border-border pt-2 mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">{product.seller}</span>
              {product.verified && (
                <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{product.location}</span>
            </div>
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm py-2">
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}
