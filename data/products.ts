// data/products.ts
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  colors: string[];
  rating: number;
  reviewsCount: number;
  variants?: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fasy Headphones Pro Wireless",
    price: 250000,
    category: "Audio",
    description: "Headphone nirkabel kelas premium dengan fitur Active Noise Cancelling, daya tahan baterai hingga 30 jam, dan bass mendalam.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    stock: 12,
    colors: ["Hitam", "Merah", "Silver"],
    rating: 4.8,
    reviewsCount: 124,
  },
  {
    id: "2",
    name: "Fasy Smartwatch Gen X",
    price: 750000,
    category: "Wearables",
    description: "Smartwatch canggih untuk memantau kesehatan harian, detak jantung, pola tidur, serta dilengkapi lebih dari 50 mode olahraga.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    variants: [
      { id: 'v4', name: 'Rubber Strap (41mm)', price: 2200000, stock: 8 },
      { id: 'v5', name: 'Leather Strap (45mm)', price: 2600000, stock: 4 },
    ],
    stock: 8,
    colors: ["Hitam", "Navy"],
    rating: 4.6,
    reviewsCount: 89,
  },
  {
    id: "3",
    name: "Fasy Wireless Earbuds Air",
    price: 250000,
    category: "Audio",
    description: "Earbuds ringkas dengan koneksi Bluetooth 5.3 secepat kilat, tahan percikan air (IPX4), dan case pengisi daya nirkabel.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    stock: 3,
    colors: ["Hitam", "Putih"],
    rating: 4.9,
    reviewsCount: 210,
    variants: [
      { id: 'v1', name: 'Black - Standard', price: 1500000, stock: 12 },
      { id: 'v2', name: 'White - Active ANC', price: 1800000, stock: 5 },
      { id: 'v3', name: 'Red Special Edition', price: 2000000, stock: 3 },
    ],
  },
  {
    id: "4",
    name: "Fasy Soundbar Boom 360",
    price: 450000,
    category: "Audio",
    description: "Speaker Soundbar dengan suara stereo 360 derajat, konektivitas AUX, Bluetooth, dan USB. Cocok untuk TV dan Setup Desk.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    stock: 5,
    colors: ["Hitam"],
    rating: 4.7,
    reviewsCount: 54,
    variants: [
      { id: 'v4', name: 'Rubber Strap (41mm)', price: 2200000, stock: 8 },
      { id: 'v5', name: 'Leather Strap (45mm)', price: 2600000, stock: 4 },
    ],
  }
];