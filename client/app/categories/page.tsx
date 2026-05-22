"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight, TrendingUp } from "lucide-react"
import Header from "@/components/marketplace/header"
import Footer from "@/components/marketplace/footer"
import { CATEGORIES } from "@/lib/constants"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Header */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-4 w-fit">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-4xl font-bold mb-2">Browse All Categories</h1>
          <p className="text-white/90">Explore over 600,000+ items across different categories</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{category.icon}</div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition">
                {category.name}
              </h3>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{category.count.toLocaleString()} listings</span>
                <div className="flex items-center gap-1 text-accent">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-semibold">Trending</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-card rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Why Shop on ASTU Gebeya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">🛡️</div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Safe & Secure</h3>
                <p className="text-sm text-muted-foreground">Verified sellers and secure transactions</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">⚡</div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">On-campus delivery within hours</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">💰</div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Great Prices</h3>
                <p className="text-sm text-muted-foreground">Competitive pricing from campus vendors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
