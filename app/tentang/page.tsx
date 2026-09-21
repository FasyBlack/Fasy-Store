'use client';

import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function TentangPage() {
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pesanmu berhasil terkirim! Tim kami akan membalas segera.');
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 pb-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32">
        
        {/* Tentang Kami Story */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Tentang <span className="text-red-600">FasyStore</span>
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            FasyStore hadir sebagai penyedia perangkat teknologi, gadget, dan aksesoris terdepan di Indonesia. 
            Kami bertekad menyajikan produk 100% original bergaransi resmi dengan pengalaman belanja digital yang modern, cepat, dan terpercaya.
          </p>
        </div>

        {/* Keunggulan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl">
              ✓
            </div>
            <h3 className="font-bold text-slate-900 mb-1">100% Original</h3>
            <p className="text-xs text-slate-500">Semua produk dijamin asli dan memiliki garansi resmi pabrikan.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl">
              🚀
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Pengiriman Cepat</h3>
            <p className="text-xs text-slate-500">Dukungan ekspedisi instan dan reguler terpercaya ke seluruh Indonesia.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl">
              💬
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Layanan 24/7</h3>
            <p className="text-xs text-slate-500">Tim bantuan siap menjawab pertanyaan dan kendalamu kapan saja.</p>
          </div>
        </div>

        {/* Form Kontak & Info */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Hubungi Kami</h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Punya pertanyaan mengenai produk atau pesanan? Silakan kirimkan pesan melalui form di bawah atau langsung via WhatsApp.
            </p>

            <div className="space-y-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">📍</span>
                <span>Lumajang, Jawa Timur, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">✉️</span>
                <span>support@fasystore.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">📱</span>
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Masukkan nama"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Email / No WhatsApp</label>
              <input
                type="text"
                required
                placeholder="contoh@email.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Pesan</label>
              <textarea
                rows={3}
                required
                placeholder="Tuliskan pertanyaanmu di sini..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-red-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-red-500/20"
            >
              Kirim Pesan
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}