'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Hitung total harga
  const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Keranjang Belanja</h1>

        {cart.length === 0 ? (
          // Tampilan kalau keranjang kosong
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Keranjangmu masih kosong</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Sepertinya kamu belum menambahkan apa pun. Yuk, lihat katalog produk terbaru kami!</p>
            <Link href="/#katalog" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          // Tampilan kalau ada barang di keranjang
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Daftar Produk Kiri */}
            <div className="flex-1 space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-slate-100 text-sm font-semibold text-slate-400 mb-4">
                  <div className="col-span-6">Produk</div>
                  <div className="col-span-2 text-center">Harga</div>
                  <div className="col-span-2 text-center">Jumlah</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center group">
                      
                      {/* Info Produk */}
                      <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors md:opacity-0 group-hover:opacity-100"
                          title="Hapus"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        {/* Placeholder Gambar (Kotak Abu-abu) */}
                        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex-shrink-0 flex items-center justify-center">
                            <span className="text-xs text-slate-400">Gambar</span>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-slate-800 line-clamp-2">{item.name}</h3>
                          {/* Opsional: Tambahan kategori kalau ada */}
                          <p className="text-sm text-slate-500 mt-1">Gadget</p>
                        </div>
                      </div>

                      {/* Harga (Hidden di HP biar gak kepenuhan) */}
                      <div className="col-span-2 text-center hidden md:block text-slate-600 font-medium">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>

                      {/* Kontrol Kuantitas */}
                      <div className="col-span-1 md:col-span-2 flex justify-center">
                        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            className="w-6 h-6 rounded-full flex items-center justify-center bg-white text-slate-600 hover:text-red-600 hover:bg-slate-100 shadow-sm transition-all"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-slate-800 w-4 text-center">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center bg-white text-slate-600 hover:text-red-600 hover:bg-slate-100 shadow-sm transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total per Item */}
                      <div className="col-span-1 md:col-span-2 text-right font-bold text-slate-900">
                         Rp {(item.price * (item.quantity || 1)).toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ringkasan Belanja Kanan */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-32">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Ringkasan Belanja</h3>
                
                <div className="space-y-4 mb-6 text-slate-600 text-sm">
                  <div className="flex justify-between">
                    <span>Total Harga ({cart.length} barang)</span>
                    <span className="font-medium">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diskon</span>
                    <span className="text-green-500 font-medium">- Rp 0</span>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center mt-2">
                    <span className="font-bold text-slate-800">Total Tagihan</span>
                    <span className="font-bold text-xl text-red-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Tombol Checkout (Nanti kita arahkan ke WA atau fitur checkout) */}
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow-sm">
                  Lanjut ke Pembayaran
                </button>
                
                <p className="text-xs text-center text-slate-400 mt-4">
                  Dengan melanjutkan pembayaran, Anda menyetujui Syarat & Ketentuan kami.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}