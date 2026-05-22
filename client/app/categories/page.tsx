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
      <div className="page-banner text-primary-foreground">
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-foreground/75 hover:text-primary-foreground mb-5 w-fit text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Browse Categories</h1>
          <p className="text-primary-foreground/75 text-sm md:text-base">Find what you need across campus listings</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group card-elevated p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted text-3xl group-hover:scale-105 transition-transform">
                  {category.icon}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>

              <div className="flex items-center justify-between text-sm mt-auto">
                <span className="text-muted-foreground">{category.count.toLocaleString()} listings</span>
                <div className="flex items-center gap-1 text-accent">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">Trending</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 card-elevated p-8 md:p-10">
          <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">Why ASTU Gebeya?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-2xl shrink-0">🛡️</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Safe & Secure</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Verified sellers and secure on-campus meetups</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 text-2xl shrink-0">⚡</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Campus Local</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Meet sellers right on ASTU campus</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-2xl shrink-0">💰</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Student Prices</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Great deals from fellow students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
