// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// 1. Impor CartProvider dari file context kamu
import { CartProvider } from "@/context/CartContext"; 
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fasy Store - Katalog Toko Online",
  description: "Toko Online Modern dengan Next.js dan Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Gunakan backticks (`) untuk template literal ini agar benar */}
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* 2. Pindahkan CartProvider ke sini, bungkus semuanya! */}
        <CartProvider>
          {/* Navbar sekarang di dalam CartProvider, jadi useCart() akan berhasil */}
          <Navbar />
          
          <main className="flex-grow pt-28 pt-20"> {/* Perbaiki padding agar Navbar tidak menumpuk */}
            {children}
          </main>
          
          <Footer />
          <Toaster 
          position="top-center" // Posisi pop-up
          toastOptions={{
            duration: 3000, // Hilang otomatis dalam 3 detik
            style: {
              background: '#334155', // Warna slate-800
              color: '#fff',
              borderRadius: '999px', // Biar rounded sesuai tema UI kamu
              fontSize: '14px',
              marginTop: '100px',
            },
          }} 
        />
        </CartProvider> {/* 3. Selesai membungkus CartProvider */}
      </body>
    </html>
  );
}