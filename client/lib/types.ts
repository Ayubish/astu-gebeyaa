export interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  condition: "Brand New" | "Used" | "Like New";
  seller: string;
  /** Whether the seller/listing is verified (optional) */
  verified?: boolean;
  rating: number;
  category: number;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export interface User {
  id: string;
  email: string;
  userType: "buyer" | "seller";
  name: string;
  phone?: string;
  avatar?: string;
  rating?: number;
  bio?: string;
  location?: string;
  createdAt: Date;
}

export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  phone?: string;
  userType?: "buyer" | "seller";
}
