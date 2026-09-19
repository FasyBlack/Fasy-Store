// components/ProductModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductVariant } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Set default varian saat modal terbuka
  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      } else {
        setSelectedVariant(null);
      }
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  // Tentukan harga acuan (pilih varian atau harga base)
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const totalPrice = currentPrice * quantity;

  // Masukkan ke keranjang
  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedVariant ? selectedVariant.id : 'default'}`,
      name: selectedVariant ? `${product.name} (${selectedVariant.name})` : product.name,
      price: currentPrice,
      image: product.image,
      quantity: quantity,
    });
    onClose();
  };

  // Beli Langsung (Tambah ke keranjang & Lanjut ke Checkout)
  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>

        {/* Ringkasan Header Produk */}
        <div className="flex gap-4 border-b border-slate-100 pb-4">
          <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{product.name}</h3>
            <span className="text-2xl font-extrabold text-red-600 mt-1">
              Rp {totalPrice.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-slate-400">
              Stok: {selectedVariant ? selectedVariant.stock : 'Tersedia'}
            </span>
          </div>
        </div>

        {/* Pilih Jenis / Varian Produk */}
        {product.variants && product.variants.length > 0 && (
          <div className="py-4 border-b border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Pilih Tipe / Varian
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3.5 py-2 text-xs rounded-xl border font-medium transition-all duration-200 ${
                      isSelected
                        ? 'border-red-600 bg-red-50 text-red-600 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Jumlah Item */}
        <div className="py-4 flex items-center justify-between border-b border-slate-100">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Jumlah Item
          </span>
          <div className="flex items-center border border-slate-200 rounded-full p-1 bg-slate-50">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center justify-center transition active:scale-90"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-bold text-slate-800">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center justify-center transition active:scale-90"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons ala Shopee */}
        <div className="pt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold py-3 px-4 rounded-full text-xs transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            🛒 + Keranjang
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-4 rounded-full text-xs transition active:scale-95 shadow-lg shadow-red-500/20"
          >
            ⚡ Beli Langsung
          </button>
        </div>

      </div>
    </div>
  );
}