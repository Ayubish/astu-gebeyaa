"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error ?? "Login failed.");
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
          <p className="text-xs text-muted-foreground">Campus marketplace</p>
        </div>

        <div className="card-elevated shadow-xl p-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-foreground mb-1 text-center">Welcome Back</h2>
          <p className="text-muted-foreground mb-6 text-center text-sm">
            Sign in to your account
          </p>

          <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground">
            <strong className="text-foreground">Demo account:</strong> abebe@gmail.com / demo1234
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg mb-4">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@gmail.com"
                className="bg-input border-border"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-input border-border pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
