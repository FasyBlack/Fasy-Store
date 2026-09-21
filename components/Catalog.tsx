// components/Catalog.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import ProductModal from '@/components/ProductModal';

interface CatalogProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showSeeAll?: boolean;
  showSearch?: boolean;      // Mengontrol tampilan Search Bar
  showCategories?: boolean;  // Mengontrol filter kategori
}

export default function Catalog({
  title = 'Semua Produk',
  subtitle = 'Jelajahi seluruh koleksi gadget terbaik kami',
  limit,
  showSeeAll = false,
  showSearch = true,
  showCategories = true,
}: CatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Ambil semua daftar kategori unik dari data produk
  const categories = useMemo(() => {
    const unique = Array.from(new Set(PRODUCTS.map((p) => p.category).filter(Boolean)));
    return ['Semua', ...unique];
  }, []);

  // Filter produk berdasarkan Search Query & Kategori
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Semua' ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Jika ada limit (misal di Home cuma tampil 4)
  const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section id="katalog" className="space-y-6">
      {/* Header Catalog */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        {showSeeAll && (
          <Link
            href="/katalog"
            className="text-xs md:text-sm text-red-600 hover:text-red-500 font-semibold inline-flex items-center gap-1 group"
          >
            Lihat Semua
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        )}
      </div>

      {/* Bar Control: Search Input & Category Tabs */}
      {(showSearch || showCategories) && (
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white border border-slate-200/80 p-4 rounded-3xl shadow-sm">
          
          {/* Input Searching */}
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama produk, spesifikasi, atau kategori..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 text-xs md:text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Filter Kategori Tabs */}
          {showCategories && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-500/20 scale-105'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Informasi Jumlah Produk Terfilter */}
      {(showSearch || showCategories) && (
        <div className="flex justify-between items-center text-xs text-slate-500 px-1">
          <span>
            Menampilkan <strong className="text-slate-900">{displayedProducts.length}</strong> produk
            {selectedCategory !== 'Semua' && ` di kategori "${selectedCategory}"`}
            {searchQuery && ` dengan kata kunci "${searchQuery}"`}
          </span>
        </div>
      )}

      {/* Grid Produk */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenModal(product)}
              className="group bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60 cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm z-10">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-base font-semibold text-slate-900 line-clamp-1 mb-1 min-h-[1.5rem] group-hover:text-red-600 transition">
                  {product.name}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 h-9 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Harga</span>
                  <span className="text-sm font-bold text-slate-900">
                    Rp {product.price?.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(product);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-full text-xs transition-all duration-200 active:scale-95 shadow-md shadow-red-500/20"
                >
                  + Beli
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* State Jika Produk Tidak Ditemukan */
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <div className="text-5xl">🔍</div>
          <h3 className="text-lg font-bold text-slate-800">Produk Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tidak ada produk yang cocok dengan pencarian atau filter kamu. Coba gunakan kata kunci atau kategori lainnya.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-5 py-2.5 rounded-full transition"
          >
            Reset Filter & Pencarian
          </button>
        </div>
      )}

      {/* Modal Popup Detail Produk */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}