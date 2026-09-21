'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hitung total item (kuantitas) di dalam keranjang
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Katalog', href: '/catalog' },
    { name: 'Promo', href: '/promo' },
    { name: 'Tentang', href: '/tentang' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex flex-col items-center pt-4 sm:pt-6 px-4 pointer-events-none">
      
      {/* Wrapper Navbar dengan efek Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-lg shadow-slate-200/40 rounded-full px-5 py-3 flex items-center justify-between w-full max-w-6xl pointer-events-auto transition-all duration-300">
        
        {/* 1. Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 p-1.5 rounded-xl group-hover:rotate-12 group-hover:scale-105 transition-all duration-300 shadow-md shadow-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75ZM6.166 17.834a.75.75 0 0 0 1.06 1.06l1.591-1.59a.75.75 0 1 0-1.06-1.061l-1.591 1.59ZM4.5 12a.75.75 0 0 1-.75.75H1.5a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM5.106 6.166a.75.75 0 0 0 1.06 1.061L7.757 5.636a.75.75 0 0 0-1.06-1.06L5.106 6.166Z" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Fasy<span className="text-red-600">Store</span>
          </span>
        </Link>

        {/* 2. Menu Utama (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-red-600 font-extrabold' : 'text-slate-600 hover:text-red-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* 3. Aksi Kanan (Keranjang, Akun & Mobile Menu Toggle) */}
        <div className="flex items-center gap-2.5">
          
          {/* Tombol Keranjang Belanja */}
          <Link 
            href="/cart" 
            className={`relative flex items-center justify-center p-2.5 rounded-full transition-all duration-300 active:scale-95 ${
              pathname === '/cart'
                ? 'bg-red-600 text-white shadow-md shadow-red-500/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            
            {totalItems > 0 && (
              <span className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold rounded-full border-2 border-white animate-bounce-short ${
                pathname === '/cart' ? 'bg-slate-900 text-white' : 'bg-red-600 text-white'
              }`}>
                {totalItems}
              </span>
            )}
          </Link>

          {/* Tombol Masuk */}
          <button className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 shadow-sm">
            Masuk
          </button>

          {/* Tombol Hamburger (Hanya Tampil di Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition pointer-events-auto"
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
        
      </div>

      {/* Menu Dropdown untuk Layar Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full max-w-6xl mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-xl rounded-3xl p-5 flex flex-col gap-3 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1 font-bold text-sm text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-2xl hover:bg-slate-100 hover:text-red-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100">
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl font-bold text-sm shadow-md transition">
              Masuk
            </button>
          </div>
        </div>
      )}

    </nav>
  );
}