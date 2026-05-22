"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import Header from "@/components/marketplace/header";
import Footer from "@/components/marketplace/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/constants";
import { addProduct } from "@/lib/products";
import { useAuth } from "@/components/providers/auth-provider";
import type { Product } from "@/lib/types";

export default function SellPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "ASTU Campus, Adama",
    condition: "Used" as Product["condition"],
    category: "3",
    description: "",
    image: "/placeholder.svg",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign in to sell</h1>
            <p className="text-muted-foreground mb-6">
              Create an account or log in to list items on ASTU Gebeya.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/auth/login">
                <Button className="bg-primary text-primary-foreground">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" className="bg-transparent">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const price = Number.parseFloat(form.price);
    if (!form.title.trim() || !price || price <= 0) {
      setError("Please enter a valid title and price.");
      return;
    }

    setSubmitting(true);
    const product = addProduct({
      title: form.title.trim(),
      price,
      location: form.location.trim(),
      image: form.image,
      condition: form.condition,
      seller: user.name,
      verified: false,
      category: Number.parseInt(form.category),
      description: form.description.trim() || undefined,
    });

    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => router.push(`/products/${product.id}`), 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-4 w-fit">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-3xl font-bold">Post a Listing</h1>
          <p className="text-white/90 mt-1">Sell to students on campus — listings save locally for this demo</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex-1 max-w-2xl">
        {success ? (
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 text-center">
            <p className="text-lg font-semibold text-foreground">Listing published!</p>
            <p className="text-muted-foreground text-sm mt-2">Redirecting to your product...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-sm">
            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Scientific Calculator TI-84"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price (ETB)</label>
                <Input
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="500"
                  required
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-input text-foreground text-sm"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Condition</label>
                <select
                  value={form.condition}
                  onChange={(e) =>
                    setForm({ ...form, condition: e.target.value as Product["condition"] })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-border bg-input text-foreground text-sm"
                >
                  <option value="Brand New">Brand New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your item..."
                className="w-full p-3 rounded-lg border border-border bg-input text-foreground text-sm min-h-28 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Image URL (optional)</label>
              <div className="flex gap-2">
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://cdn.pixabay.com/photo/2017/03/18/16/17/algebra-2154417_1280.png"
                  className="bg-input border-border flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent shrink-0"
                  onClick={() => setForm({ ...form, image: "/placeholder.svg" })}
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Paste a direct image link (e.g. from Pixabay, Unsplash). Example:{" "}
                <span className="font-mono text-[11px] break-all">
                  https://cdn.pixabay.com/photo/2017/03/18/16/17/algebra-2154417_1280.png
                </span>
              </p>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-6"
            >
              {submitting ? "Publishing..." : "Publish Listing"}
            </Button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
