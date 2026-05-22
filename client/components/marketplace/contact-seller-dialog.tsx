"use client";

import { X, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

interface ContactSellerDialogProps {
  product: Product;
  onClose: () => void;
}

export default function ContactSellerDialog({ product, onClose }: ContactSellerDialogProps) {
  const message = encodeURIComponent(
    `Hi ${product.seller}, I'm interested in "${product.title}" listed on ASTU Gebeya for ETB ${product.price.toLocaleString()}.`
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl p-6 max-w-md w-full shadow-xl animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Contact Seller</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground text-sm mb-4">
          Reach out to <span className="font-semibold text-foreground">{product.seller}</span> about{" "}
          <span className="font-medium text-foreground">{product.title}</span>.
        </p>

        <div className="space-y-3">
          <a
            href={`https://wa.me/?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full p-4 rounded-lg border border-border hover:bg-muted transition"
          >
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-foreground text-sm">WhatsApp Message</p>
              <p className="text-xs text-muted-foreground">Send a pre-filled message</p>
            </div>
          </a>

          <a
            href={`tel:+251911000000`}
            className="flex items-center gap-3 w-full p-4 rounded-lg border border-border hover:bg-muted transition"
          >
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground text-sm">Call Seller</p>
              <p className="text-xs text-muted-foreground">Demo: +251 911 000 000</p>
            </div>
          </a>
        </div>

        <Button onClick={onClose} variant="outline" className="w-full mt-4 bg-transparent">
          Close
        </Button>
      </div>
    </div>
  );
}
