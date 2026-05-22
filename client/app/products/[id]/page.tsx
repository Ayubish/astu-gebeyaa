"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Heart, Share2, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/marketplace/header";
import Footer from "@/components/marketplace/footer";
import ProductCard from "@/components/marketplace/product-card";
import ContactSellerDialog from "@/components/marketplace/contact-seller-dialog";
import {
  getProductById,
  getRelatedProducts,
  getCategoryName,
  getFavorites,
  toggleFavorite,
} from "@/lib/products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const product = getProductById(Number.parseInt(resolvedParams.id));

  useEffect(() => {
    const favs = getFavorites();
    setFavorites(favs);
    setIsFavorite(favs.includes(Number.parseInt(resolvedParams.id)));
    setMounted(true);
  }, [resolvedParams.id]);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.title,
          text: `Check out ${product?.title} on ASTU Gebeya`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied to clipboard!");
        setTimeout(() => setShareMessage(""), 3000);
      }
    } catch {
      /* user cancelled share */
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-4">Product not found</p>
            <Link href="/browse" className="text-primary font-medium hover:underline">
              Browse all listings
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const categoryName = getCategoryName(product.category);

  const handleToggleFavorite = () => {
    const next = toggleFavorite(product.id);
    setFavorites(next);
    setIsFavorite(next.includes(product.id));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="bg-primary/95 text-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/browse" className="flex items-center gap-2 text-white/80 hover:text-white w-fit text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to browse
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <div className="relative w-full bg-muted rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                  {product.condition}
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white transition shadow"
                aria-label="Toggle favorite"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{categoryName}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.title}</h1>
              <p className="text-3xl font-bold text-primary">ETB {product.price.toLocaleString()}</p>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground text-sm">({Math.floor(product.rating * 26)} reviews)</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-3">Seller</h3>
              <div className="flex items-center justify-between">
                <span className="font-medium">{product.seller}</span>
                {product.verified && (
                  <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
                <MapPin className="w-4 h-4" />
                {product.location}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Condition</span>
                <span className="font-medium">{product.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{categoryName}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setShowContact(true)}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6"
              >
                Contact Seller
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="sm:w-14 bg-transparent"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {shareMessage && (
              <p className="text-sm text-primary font-medium">{shareMessage}</p>
            )}

            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-accent shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Stay Safe on Campus</p>
                  <ul className="text-muted-foreground space-y-1 text-xs list-disc pl-4">
                    <li>Meet in public places on campus</li>
                    <li>Inspect items before paying</li>
                    <li>Prefer in-person handoff for high-value items</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.description ??
                  "Quality item listed on ASTU Gebeya. Contact the seller for more details or to arrange pickup on campus."}
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && mounted && (
          <div className="mt-14">
            <h2 className="text-xl font-bold mb-6">Related in {categoryName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((item, index) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showContact && <ContactSellerDialog product={product} onClose={() => setShowContact(false)} />}

      <Footer />
    </div>
  );
}
