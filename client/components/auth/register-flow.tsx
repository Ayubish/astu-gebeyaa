"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/providers/auth-provider";

interface RegisterFlowProps {
  onClose: () => void;
}

export default function RegisterFlow({ onClose }: RegisterFlowProps) {
  const [step, setStep] = useState<"choice" | "buyer" | "seller">("choice");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "choice") return;

    setLoading(true);
    setError("");
    const result = await register({
      ...formData,
      userType: step,
    });
    setLoading(false);

    if (result.success) {
      onClose();
      router.push(step === "seller" ? "/sell" : "/");
    } else {
      setError(result.error ?? "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">
            {step === "choice" ? "Join ASTU Gebeya" : step === "buyer" ? "Buyer Sign Up" : "Seller Sign Up"}
          </h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "choice" ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setStep("buyer")}
              className="w-full p-5 border-2 border-primary rounded-xl hover:bg-primary/5 transition text-left"
            >
              <div className="text-3xl mb-2">🛍️</div>
              <h3 className="font-bold text-primary">I&apos;m a Buyer</h3>
              <p className="text-sm text-muted-foreground mt-1">Browse campus deals</p>
            </button>
            <button
              type="button"
              onClick={() => setStep("seller")}
              className="w-full p-5 border-2 border-accent rounded-xl hover:bg-accent/5 transition text-left"
            >
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-bold">I&apos;m a Seller</h3>
              <p className="text-sm text-muted-foreground mt-1">List items for sale</p>
            </button>
          </div>
        ) : (
          <>
            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg mb-4">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full name" required className="bg-input border-border" />
              <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="bg-input border-border" />
              <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required className="bg-input border-border" />
              <Input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password (min 6 chars)" minLength={6} required className="bg-input border-border" />
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-semibold py-5">
                {loading ? "Creating..." : "Create Account"}
              </Button>
              <button type="button" onClick={() => setStep("choice")} className="w-full text-sm text-muted-foreground">
                Back
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
