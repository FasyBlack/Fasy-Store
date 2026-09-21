'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, addToCart } = useCart();

  // State untuk menyimpan ID produk yang dicentang
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // State untuk Modal Konfirmasi Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // State untuk Modal Ubah Varian Produk (Detail dari Cart)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [editQuantity, setEditQuantity] = useState<number>(1);

  // Daftar pilihan varian (bisa disesuaikan atau diambil dari data produk)
  const availableVariants = ['Rubber Strap (41mm)', 'Leather Strap (45mm)'];

  // Handle buka modal edit varian
  const handleOpenEditModal = (item: any) => {
    setActiveItem(item);
    // Ambil varian saat ini dari nama produk jika ada, atau default ke pilihan pertama
    setSelectedVariant(availableVariants.find(v => item.name.includes(v)) || availableVariants[0]);
    setEditQuantity(item.quantity || 1);
    setIsEditModalOpen(true);
  };

  // Simpan perubahan varian/pesanan
  const handleSaveEdit = () => {
    if (!activeItem) return;

    // Hapus item lama dari cart
    removeFromCart(activeItem.id);

    // Buat ID baru atau gabungkan nama dengan varian baru
    const baseName = activeItem.name.split(' (')[0]; // Ambil nama dasarnya saja
    const newName = `${baseName} (${selectedVariant})`;
    const newId = `${activeItem.id.split('-')[0]}-${selectedVariant.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // Masukkan kembali ke cart dengan data baru
    addToCart({
      id: newId,
      name: newName,
      price: activeItem.price,
      image: activeItem.image,
      quantity: editQuantity,
    });

    toast.success('Pesanan berhasil diperbarui!');
    setIsEditModalOpen(false);
    setActiveItem(null);
  };

  // Handle centang satuan
  const handleToggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Handle centang semua
  const handleToggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  // Filter produk yang dicentang
  const filteredCart = cart.filter((item) => selectedItems.includes(item.id));
  const totalPrice = filteredCart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleProceedToCheckout = () => {
    if (filteredCart.length === 0) {
      toast.error('Pilih minimal 1 produk untuk checkout!');
      return;
    }
    sessionStorage.setItem('checkout_items', JSON.stringify(filteredCart));
    router.push('/checkout');
  };

  const confirmDelete = (id: string | null) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAction = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete);
      setSelectedItems((prev) => prev.filter((id) => id !== itemToDelete));
      toast.success('Produk berhasil dihapus dari keranjang.');
    } else {
      selectedItems.forEach((id) => {
        removeFromCart(id);
      });
      setSelectedItems([]);
      toast.success('Produk terpilih berhasil dihapus.');
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans pb-20 selection:bg-red-600 selection:text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32">
        
        {/* Tombol Kembali */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Kembali
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-8">
          Keranjang Belanja
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[45vh]">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Keranjangmu masih kosong</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">Sepertinya kamu belum menambahkan apa pun. Yuk, temukan produk impianmu!</p>
            <Link href="/" className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-500/20 transition text-sm">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Daftar Produk Kiri */}
            <div className="flex-1 w-full space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cart.length && cart.length > 0}
                      onChange={handleToggleSelectAll}
                      className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                    />
                    <span className="text-sm font-bold text-slate-800">
                      Pilih Semua ({cart.length} Produk)
                    </span>
                  </label>

                  {selectedItems.length > 0 && (
                    <button
                      onClick={() => confirmDelete(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Hapus Terpilih ({selectedItems.length})
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {cart.map((item) => {
                    const isChecked = selectedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                          isChecked ? 'border-red-200 bg-red-50/20' : 'border-slate-100 bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSelect(item.id)}
                            className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 flex-shrink-0"
                          />

                          {/* Gambar diklik untuk buka modal edit varian */}
                          <div 
                            onClick={() => handleOpenEditModal(item)}
                            className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex-shrink-0 overflow-hidden relative group cursor-pointer"
                          >
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 bg-slate-100">No Image</div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Nama diklik untuk buka modal edit varian */}
                            <button 
                              onClick={() => handleOpenEditModal(item)}
                              className="font-bold text-sm text-slate-900 hover:text-red-600 transition line-clamp-2 text-left"
                            >
                              {item.name}
                            </button>
                            <p className="text-xs text-slate-500 mt-1">Kategori: Gadget / Aksesoris</p>
                            <p className="text-xs font-bold text-red-600 mt-1 sm:hidden">
                              Rp {item.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <div className="hidden sm:block text-sm font-semibold text-slate-700">
                            Rp {item.price.toLocaleString('id-ID')}
                          </div>

                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                              className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-700 hover:bg-red-600 hover:text-white transition"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-slate-900 w-5 text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-700 hover:bg-red-600 hover:text-white transition"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => confirmDelete(item.id)}
                            className="text-slate-400 hover:text-red-600 transition p-1.5 rounded-full hover:bg-red-50"
                            title="Hapus produk"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ringkasan Belanja Kanan */}
            <div className="w-full lg:w-96 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                Ringkasan Belanja
              </h3>

              <div className="space-y-4 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Total Terpilih ({filteredCart.length} barang)</span>
                  <span className="font-semibold text-slate-900">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Diskon Promo</span>
                  <span className="text-emerald-600 font-semibold">- Rp 0</span>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center mt-2">
                  <span className="font-bold text-slate-900">Total Tagihan</span>
                  <span className="font-extrabold text-xl text-red-600">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                disabled={filteredCart.length === 0}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold tracking-wide uppercase py-4 rounded-full text-sm shadow-lg shadow-red-500/20 transition active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
              >
                Lanjut ke Pembayaran ({filteredCart.length})
              </button>

              <p className="text-xs text-center text-slate-400 mt-4">
                Pilih produk yang ingin kamu beli dengan mencentang kotak di sebelah kiri daftar produk.
              </p>
            </div>

          </div>
        )}
      </div>

      {/* MODAL UBAH VARIAN / PESANAN (POPUP) */}
      {isEditModalOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Tombol Tutup (X) */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
            >
              ✕
            </button>

            {/* Info Produk Header */}
            <div className="flex gap-4 items-center mb-6 pr-8">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200">
                <img src={activeItem.image} alt={activeItem.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg line-clamp-2">
                  {activeItem.name.split(' (')[0]}
                </h3>
                <p className="text-red-600 font-extrabold text-lg sm:text-xl mt-1">
                  Rp {activeItem.price.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Stok: Tersedia</p>
              </div>
            </div>

            {/* Pilihan Tipe / Varian */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Pilih Tipe / Varian
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableVariants.map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`py-3 px-4 rounded-2xl border text-xs font-bold transition text-left ${
                      selectedVariant === variant
                        ? 'border-red-600 bg-red-50/40 text-red-600 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah Item */}
            <div className="flex items-center justify-between mb-8 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Jumlah Item
              </span>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                <button
                  onClick={() => setEditQuantity(Math.max(1, editQuantity - 1))}
                  className="w-7 h-7 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-sm hover:bg-red-600 hover:text-white transition font-bold"
                >
                  -
                </button>
                <span className="text-sm font-bold text-slate-900 w-6 text-center">
                  {editQuantity}
                </span>
                <button
                  onClick={() => setEditQuantity(editQuantity + 1)}
                  className="w-7 h-7 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-sm hover:bg-red-600 hover:text-white transition font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Tombol Aksi: Batal & Ubah Pesanan */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="py-3.5 px-6 rounded-full border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="py-3.5 px-6 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition"
              >
                Ubah Pesanan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {itemToDelete ? 'Hapus Produk Ini?' : `Hapus ${selectedItems.length} Produk Terpilih?`}
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Produk akan dihapus dari daftar keranjang belanjaanmu.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-full border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteAction}
                className="flex-1 py-3 px-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/20 transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}