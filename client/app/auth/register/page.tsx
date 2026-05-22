"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export default function RegisterPage() {
  const [step, setStep] = useState<"choice" | "buyer" | "seller">("choice");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "choice") return;

    setLoading(true);
    setError("");
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      userType: step,
    });
    setLoading(false);

    if (result.success) {
      router.push(step === "seller" ? "/sell" : "/");
    } else {
      setError(result.error ?? "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 mesh-hero opacity-[0.07] pointer-events-none" />
      <div className="w-full max-w-md relative">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="relative w-16 h-16 rounded-2xl bg-primary/5 p-2 ring-1 ring-primary/10">
            <Image src="/images/gebeyalogo.svg" alt="ASTU Gebeya" fill className="object-contain" priority />
          </div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">ASTU Gebeya</h1>
        </div>

        <div className="card-elevated shadow-xl p-8 animate-fade-in-up">
          {step === "choice" && (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-1 text-center">Join ASTU Gebeya</h2>
              <p className="text-muted-foreground mb-6 text-center text-sm">How will you use the marketplace?</p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setStep("buyer")}
                  className="w-full p-5 border-2 border-primary/30 rounded-2xl hover:bg-primary/5 hover:border-primary transition text-left"
                >
                  <div className="text-3xl mb-2">🛍️</div>
                  <h3 className="font-bold text-primary">I&apos;m a Buyer</h3>
                  <p className="text-sm text-muted-foreground mt-1">Browse and save campus deals</p>
                </button>

                <button
                  type="button"
                  onClick={() => setStep("seller")}
                  className="w-full p-5 border-2 border-accent/40 rounded-2xl hover:bg-accent/10 hover:border-accent transition text-left"
                >
                  <div className="text-3xl mb-2">📦</div>
                  <h3 className="font-bold text-foreground">I&apos;m a Seller</h3>
                  <p className="text-sm text-muted-foreground mt-1">List and sell your items</p>
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already registered?{" "}
                <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {(step === "buyer" || step === "seller") && (
            <>
              <h2 className="text-xl font-bold text-foreground mb-1 text-center">
                {step === "buyer" ? "Buyer Account" : "Seller Account"}
              </h2>
              <p className="text-muted-foreground mb-4 text-center text-sm">Fill in your details</p>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg mb-4">{error}</p>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} required className="bg-input border-border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="bg-input border-border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+251 9XX XXX XXXX" required className="bg-input border-border" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    minLength={6}
                    required
                    className="bg-input border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-9 right-3 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-semibold py-3">
                  {loading ? "Creating..." : "Create Account"}
                </Button>

                <button type="button" onClick={() => setStep("choice")} className="w-full text-sm text-muted-foreground hover:text-foreground">
                  Back
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
