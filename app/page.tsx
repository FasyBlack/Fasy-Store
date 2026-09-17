'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const supabase = createClient();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans antialiased selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section Khas Apple */}
        <section className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Desain Elegan. Performa Unggul.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal">
            Jelajahi koleksi produk pilihan dengan standar kualitas terbaik untuk mendukung gaya hidup kamu.
          </p>
        </section>

        {/* Catalog Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 tracking-tight text-slate-200">
            Katalog Terbaru
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-slate-900/50 animate-pulse rounded-3xl border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-[#161617] border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden"
                >
                  {/* Efek Light Glow saat hover */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />

                  <div>
                    {/* Gambar Produk */}
                    <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center">
                      <img
                        src={product.image_url || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Informasi Produk */}
                    <h3 className="text-xl font-semibold tracking-tight text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4 font-normal leading-relaxed">
                      {product.description || 'Pengalaman penggunaan luar biasa dengan presisi tinggi.'}
                    </p>
                  </div>

                  {/* Harga dan Aksi */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider block">Harga</span>
                      <span className="text-lg font-semibold text-white">
                        Rp {product.price?.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-white hover:bg-slate-200 text-black font-medium px-5 py-2.5 rounded-full text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-white/5"
                    >
                      + Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}