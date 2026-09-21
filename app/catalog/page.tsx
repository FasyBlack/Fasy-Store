// app/katalog/page.tsx
'use client';

import Navbar from '@/components/Navbar';
import Catalog from '@/components/Catalog';

export default function KatalogPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-16">
        
        {/* 1. HERO BANNER KATALOG (Inspirasi Crescendo Header) */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl z-10">
            <span className="inline-block bg-red-600/30 text-red-400 border border-red-500/30 text-[11px] font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Katalog Lengkap
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Tingkatkan Pengalaman <span className="text-red-500">Digitalmu.</span>
            </h1>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Temukan seluruh koleksi perangkat premium, audio resolusi tinggi, hingga aksesori pintar terbaru dengan garansi resmi.
            </p>
          </div>

          <div className="relative w-full md:w-80 h-48 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-white/10">
            <div className="text-xs uppercase font-bold text-red-200 tracking-wider">
              Special Discount
            </div>
            <div>
              <div className="text-3xl font-black text-white">Hemat s/d 30%</div>
              <p className="text-[11px] text-red-100 mt-1">Untuk pembelian bundle produk hari ini</p>
            </div>
            <a
              href="#katalog-section"
              className="inline-block text-center bg-white text-slate-900 font-bold text-xs py-2 rounded-xl hover:bg-slate-100 transition"
            >
              Jelajahi Sekarang
            </a>
          </div>
        </section>

        {/* 2. SHOP BY CATEGORY CARDS (Sesuai gambar referensi kamu) */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Kategori Populer</h3>
            <span className="text-xs text-slate-500">Pilih kategori favoritmu</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Audio Premium',
                desc: 'Headphone & Earbuds dengan Active Noise Cancelling',
                bg: 'bg-slate-100',
                icon: '🎧',
              },
              {
                title: 'Aksesori Gadget',
                desc: 'Charger kilat, kabel tahan lama & docking station',
                bg: 'bg-red-50',
                icon: '🔌',
              },
              {
                title: 'Smart Wearables',
                desc: 'Smartwatch pendukung aktivitas harian & olahraga',
                bg: 'bg-slate-100',
                icon: '⌚',
              },
            ].map((cat, idx) => (
              <div
                key={idx}
                className={`${cat.bg} border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
              >
                <div>
                  <span className="text-3xl">{cat.icon}</span>
                  <h4 className="text-lg font-bold text-slate-900 mt-4">{cat.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.desc}</p>
                </div>
                <span className="text-xs font-semibold text-red-600 mt-6 inline-flex items-center gap-1">
                  Lihat Koleksi &rarr;
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SECTION SEARCH & ALL CATALOG PRODUCTS */}
        <div id="katalog-section">
          <Catalog
            title="Semua Produk Kami"
            subtitle="Gunakan fitur pencarian atau filter kategori di bawah untuk menemukan barang impianmu"
            showSearch={true}
            showCategories={true}
          />
        </div>

        {/* 4. VALUE PROPOSITION SECTION ("Why FasyStore?" seperti di referensi) */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">Mengapa Memilih FasyStore?</h3>
            <p className="text-xs md:text-sm text-slate-500">
              Komitmen kami memberikan pengalaman belanja teknologi terbaik & terpercaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🚀', title: 'Pengiriman Kilat', desc: 'Pesanan dikirim di hari yang sama' },
              { icon: '🛡️', title: 'Garansi Resmi', desc: '100% Produk Original bergaransi' },
              { icon: '💳', title: 'Pembayaran Aman', desc: 'Banyak pilihan metode pembayaran' },
              { icon: '🎧', title: 'Dukungan 24/7', desc: 'Tim CS kami siap membantu kapan saja' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 space-y-2">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h5 className="text-sm font-bold text-slate-900">{item.title}</h5>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}