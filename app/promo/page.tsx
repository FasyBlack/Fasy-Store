'use client';

import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function PromoPage() {
  const promos = [
    {
      code: 'FASYGACOA',
      title: 'Diskon Spesial Gadget 10%',
      desc: 'Maksimal potongan Rp 1.000.000 tanpa minimal belanja.',
      validUntil: '30 September 2026',
      bg: 'from-red-600 to-rose-500',
    },
    {
      code: 'FREEOK2026',
      title: 'Gratis Ongkir Seluruh Indonesia',
      desc: 'Berlaku untuk pengiriman reguler dan ekspres.',
      validUntil: '15 Oktober 2026',
      bg: 'from-slate-900 to-slate-800',
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Kode ${code} berhasil disalin!`);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32">
        <div className="text-center mb-10">
          <span className="bg-red-100 text-red-600 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
            Kupon & Voucher
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 uppercase tracking-tight">
            Promo <span className="text-red-600">Spesial</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Gunakan kode promo di bawah ini saat checkout untuk mendapatkan potongan harga terbaik.
          </p>
        </div>

        <div className="space-y-6">
          {promos.map((promo) => (
            <div
              key={promo.code}
              className={`bg-gradient-to-r ${promo.bg} text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden`}
            >
              <div>
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                  Berlaku hingga: {promo.validUntil}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1">{promo.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1">{promo.desc}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-between">
                <span className="font-mono font-black text-lg tracking-wider px-2">{promo.code}</span>
                <button
                  onClick={() => handleCopyCode(promo.code)}
                  className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-4 py-2 rounded-xl text-xs shadow transition active:scale-95"
                >
                  Salin Kode
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}