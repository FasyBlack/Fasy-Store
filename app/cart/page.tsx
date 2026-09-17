'use client';

import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-400 mb-4">Keranjang belanjaan kamu masih kosong nih.</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Lihat Katalog Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daftar Produk */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={item.image_url || 'https://via.placeholder.com/100'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-white">{item.name}</h2>
                    <p className="text-emerald-400 font-bold text-sm">
                      Rp {item.price?.toLocaleString('id-ID')}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-slate-800 hover:bg-slate-700 text-white w-7 h-7 rounded flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-slate-800 hover:bg-slate-700 text-white w-7 h-7 rounded flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-400 p-2 text-sm transition"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Ringkasan Belanja */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit space-y-4">
              <h2 className="text-lg font-bold border-b border-slate-800 pb-3">Ringkasan Belanja</h2>
              <div className="flex justify-between text-slate-300">
                <span>Total Harga</span>
                <span className="font-bold text-emerald-400">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={() => alert('Fitur checkout/pembayaran akan kita buat di tahap selanjutnya!')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg text-center transition"
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}