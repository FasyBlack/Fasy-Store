// app/produk/[id]/page.tsx
'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetailProdukPage({ params }: PageProps) {
  // 1. Unwrap params untuk mendapatkan ID dari URL (Next.js 15)
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // 2. Cari data produk yang cocok
  const product = PRODUCTS.find((item) => item.id === productId);

  // 3. State untuk interaksi UI
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const { addToCart } = useCart();

  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Produk Tidak Ditemukan</h1>
        <p className="text-zinc-500 text-sm mb-6">Produk yang kamu cari tidak ada di katalog kami.</p>
        <Link href="/" className="bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-red-700 transition">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.name} (${selectedColor})`,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Breadcrumb Navigasi */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
        <Link href="/" className="hover:text-red-600 transition">Beranda</Link>
        <span>/</span>
        <span className="text-zinc-400">{product.category}</span>
        <span>/</span>
        <span className="text-zinc-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Container Utama Detail Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Gambar Produk */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <div className="aspect-square relative flex items-center justify-center bg-zinc-50 rounded-xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Informasi & Kontrol Produk */}
        <div className="flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <span className="bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-zinc-700">
              <span className="text-amber-500">★</span>
              <span>{product.rating}</span>
              <span className="text-zinc-400 font-normal">({product.reviewsCount} ulasan)</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-red-600">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>

          <p className="text-zinc-600 text-sm leading-relaxed">
            {product.description}
          </p>

          <hr className="border-zinc-200" />

          {/* Opsi Warna */}
          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Pilih Warna: <span className="text-red-600 font-semibold">{selectedColor}</span>
            </label>
            <div className="flex gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    selectedColor === color
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Kuantitas */}
          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Jumlah:
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-zinc-200 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3.5 py-2 text-zinc-600 hover:bg-zinc-100 font-bold transition text-sm"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-zinc-900 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                  className="px-3.5 py-2 text-zinc-600 hover:bg-zinc-100 font-bold transition text-sm"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-zinc-500">
                Stok: <strong className="text-zinc-800">{product.stock}</strong> pcs
              </span>
            </div>
          </div>

          {/* Tombol Tambah Keranjang */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
            }`}
          >
            {isAdded ? '✓ Berhasil Ditambahkan!' : '+ Tambah ke Keranjang'}
          </button>

        </div>
      </div>
    </div>
  );
}