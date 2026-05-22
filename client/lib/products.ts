import { MOCK_PRODUCTS } from "./constants";
import type { Product } from "./types";

export { getCategoryName } from "./constants";

const CUSTOM_PRODUCTS_KEY = "astu-gebeya-custom-products";
const FAVORITES_KEY = "astu-gebeya-favorites";

export function getAllProducts(): Product[] {
  const custom = getCustomProducts();
  return [...MOCK_PRODUCTS, ...custom];
}

export function getProductById(id: number): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return getAllProducts().filter((p) => p.category === categoryId);
}

export function getCategoryListingCounts(): Record<number, number> {
  const counts: Record<number, number> = {};
  for (const product of getAllProducts()) {
    counts[product.category] = (counts[product.category] ?? 0) + 1;
  }
  return counts;
}

export function getTotalListingCount(): number {
  return getAllProducts().length;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

function getCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addProduct(
  product: Omit<Product, "id" | "rating"> & { rating?: number }
): Product {
  const custom = getCustomProducts();
  const allIds = getAllProducts().map((p) => p.id);
  const newId = Math.max(0, ...allIds) + 1;

  const newProduct: Product = {
    ...product,
    id: newId,
    rating: product.rating ?? 5,
  };

  custom.push(newProduct);
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(custom));
  return newProduct;
}

export function getUserListings(sellerName: string): Product[] {
  return getAllProducts().filter(
    (p) => p.seller.toLowerCase() === sellerName.toLowerCase()
  );
}

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function setFavorites(ids: number[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function toggleFavorite(id: number): number[] {
  const favorites = getFavorites();
  const next = favorites.includes(id)
    ? favorites.filter((f) => f !== id)
    : [...favorites, id];
  setFavorites(next);
  return next;
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}
