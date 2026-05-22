"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Star,
  Edit2,
  LogOut,
  Package,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/marketplace/header";
import Footer from "@/components/marketplace/footer";
import ProductCard from "@/components/marketplace/product-card";
import { useAuth } from "@/components/providers/auth-provider";
import * as authLib from "@/lib/auth";
import { getUserListings, getFavorites, toggleFavorite } from "@/lib/products";

export default function ProfilePage() {
  const { user, logout, refresh, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "ASTU Campus, Adama",
    bio: "",
    userType: "buyer" as "buyer" | "seller",
    rating: 5,
  });

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone ?? "",
        location: user.location ?? "ASTU Campus, Adama",
        bio: user.bio ?? "ASTU Gebeya member",
        userType: user.userType,
        rating: user.rating ?? 5,
      });
    }
  }, [user, loading, router]);

  const listings = user ? getUserListings(user.name) : [];

  const handleSave = () => {
    if (!user) return;
    authLib.updateProfile(user.id, {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      bio: profile.bio,
      location: profile.location,
    });
    refresh();
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-6 w-fit text-sm">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-4xl font-bold shrink-0">
              {profile.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <span className="px-3 py-1 bg-white/20 text-sm font-semibold rounded-full capitalize">
                  {profile.userType}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(profile.rating) ? "fill-white" : "text-white/40"}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{profile.rating}</span>
              </div>

              <p className="text-white/90 text-sm">{profile.bio}</p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {isEditing ? "Save" : "Edit Profile"}
              </Button>
              {profile.userType === "seller" && (
                <Link href="/sell">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10 bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    New Listing
                  </Button>
                </Link>
              )}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  value={profile.name}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone
                </label>
                <Input
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </label>
                <Input
                  value={profile.location}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 rounded-lg border border-border bg-input text-sm min-h-24 disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">My listings</span>
                <span className="font-bold">{listings.length}</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Saved items</span>
                <span className="font-bold">{favorites.length}</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-ET", {
                        month: "short",
                        year: "numeric",
                      })
                    : "2025"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" />
            My Listings ({listings.length})
          </h2>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={(id) => setFavorites(toggleFavorite(id))}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-dashed border-border p-10 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground mb-4">You haven&apos;t posted any listings yet.</p>
              <Link href="/sell">
                <Button className="bg-primary text-primary-foreground">Post Your First Item</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
