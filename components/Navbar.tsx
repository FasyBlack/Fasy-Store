'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  
  // Hitung total item (kuantitas) di dalam keranjang
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      
      {/* Wrapper Navbar dengan efek Glassmorphism */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-sm shadow-slate-200/50 rounded-full px-5 py-3 flex items-center justify-between w-full max-w-6xl pointer-events-auto transition-all duration-300">
        
        {/* 1. Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 p-1.5 rounded-xl group-hover:rotate-12 group-hover:scale-105 transition-all duration-300">
            {/* Icon simpel pengganti logo gambar */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75ZM6.166 17.834a.75.75 0 0 0 1.06 1.06l1.591-1.59a.75.75 0 1 0-1.06-1.061l-1.591 1.59ZM4.5 12a.75.75 0 0 1-.75.75H1.5a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM5.106 6.166a.75.75 0 0 0 1.06 1.061L7.757 5.636a.75.75 0 0 0-1.06-1.06L5.106 6.166Z" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Fasy<span className="text-red-600">Store</span>
          </span>
        </Link>

        {/* 2. Menu Tengah (Hidden di HP, muncul di layar agak besar) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link href="/#katalog" className="hover:text-red-600 transition-colors">Katalog</Link>
          <Link href="#" className="hover:text-red-600 transition-colors">Promo</Link>
          <Link href="#" className="hover:text-red-600 transition-colors">Tentang</Link>
        </div>

        {/* 3. Aksi Kanan (Keranjang & Akun) */}
        <div className="flex items-center gap-3">
          
          {/* Tombol Keranjang */}
          <Link 
            href="/cart" 
            className="relative flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-all duration-300 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            
            {/* Badge Indicator muncul otomatis kalau ada isi */}
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold text-white bg-red-600 rounded-full border-2 border-white animate-bounce-short shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Tombol Masuk/Login */}
          <button className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 shadow-sm">
            Masuk
          </button>
        </div>
        
      </div>
    </nav>
  );
}