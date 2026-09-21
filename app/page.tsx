// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Catalog from '@/components/Catalog';

// Data item slider untuk Hero Banner (PNG Transparent)
const HERO_SLIDES = [
  {
    id: 1,
    title: 'Wireless Headphone Max',
    badge: 'Audio Premium',
    image: 'https://pngimg.com/uploads/headphones/headphones_PNG101980.png',
  },
  {
    id: 2,
    title: 'Smartwatch Series Pro',
    badge: 'Best Seller',
    image: 'https://pngimg.com/uploads/laptop/laptop_PNG101764.png',
  },
  {
    id: 3,
    title: 'Pro Gaming Controller',
    badge: 'New Release',
    image: 'https://pngimg.com/uploads/apple_watch/apple_watch_PNG14.png',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide tiap 3 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-12">
        
        {/* 1. HERO BANNER WITH AUTO SLIDER & ORNAMENTS */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-100/80 border border-slate-200/80 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          {/* Teks & Akses Cepat */}
          <div className="space-y-4 max-w-xl text-left z-10">
            <span className="inline-block bg-red-100 text-red-600 border border-red-200 text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Temukan, Belanja, Upgrade
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Gadget Tech <span className="text-red-600">Terbaru.</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Jelajahi perangkat mutakhir untuk meningkatkan produktivitas dan gaya hidup digital kamu.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#katalog"
                className="bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-lg shadow-red-500/20 active:scale-95"
              >
                Belanja Sekarang
              </a>
              <a
                href="#katalog"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-medium px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-sm"
              >
                Lihat Koleksi
              </a>
            </div>
          </div>

          {/* Card Hero Kanan */}
          <div className="relative w-full md:w-1/2 h-72 md:h-96 flex items-center justify-center overflow-hidden rounded-[2.5rem] rounded-bl-[6rem]">
            <div className="absolute inset-0 bg-gradient-to-bl from-red-600 via-red-500/60 to-transparent shadow-lg" />
            <div className="absolute -bottom-6 -left-6 w-44 h-44 bg-red-400/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative w-full h-full flex items-center justify-center p-6 z-10">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-700 ease-in-out transform ${
                      isActive
                        ? 'opacity-100 translate-x-0 scale-100'
                        : 'opacity-0 translate-x-24 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                      {slide.badge}
                    </div>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 2. QUICK CATEGORY GRID */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { title: 'Audio', desc: 'Premium Sound', icon: '🎧' },
            { title: 'Smart Home', desc: 'Smarter Living', icon: '🏠' },
            { title: 'Wearables', desc: 'Track & Achieve', icon: '⌚' },
            { title: 'Accessories', desc: 'Designed For You', icon: '🔌' },
            { title: 'Special Deals', desc: 'Promo Hari Ini', icon: '🔥' },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-sm hover:shadow-md"
            >
              <span className="text-2xl bg-slate-100 p-2 rounded-xl group-hover:scale-110 transition">{cat.icon}</span>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 group-hover:text-red-600 transition">{cat.title}</h4>
                <p className="text-xs text-slate-500">{cat.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 3. KATALOG PRODUK (HANYA MEMANGGIL KOMPONEN INI) */}
        {/* Jika di Home kamu HANYA mau tampilkan card tanpa Search Bar, set showSearch={false} dan showCategories={false} */}
        <Catalog 
          title="Produk Populer" 
          subtitle="Pilihan favorit minggu ini" 
          limit={4} 
          showSeeAll={true} 
          showSearch={false}
          showCategories={false}
        />

        {/* 4. VALUE PROPOSITION BAR */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200/80 rounded-3xl p-6 text-center shadow-sm">
          {[
            { title: 'Pengiriman Cepat', desc: 'Pengiriman aman & teracak' },
            { title: 'Pembayaran Aman', desc: '100% proteksi transaksi' },
            { title: 'Garansi Resmi', desc: 'Jaminan produk original' },
            { title: 'Dukungan 24/7', desc: 'Layanan pelanggan siap bantu' },
          ].map((item, idx) => (
            <div key={idx} className="p-2 space-y-1">
              <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}