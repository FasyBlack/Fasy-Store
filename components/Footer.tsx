// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-100 mt-20 border-t border-zinc-800">
      {/* Section 1: Newsletter & Sosial Media */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-zinc-800">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Newsletter Fasy Store</h3>
          <p className="text-zinc-400 mb-4 text-sm">Dapatkan info gadget terbaru dan promo eksklusif langsung ke inbox kamu.</p>
          <div className="flex gap-2 max-w-md">
            <input 
              type="email" 
              placeholder="Masukkan email kamu..." 
              className="flex-grow px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none transition"
            />
            <button className="bg-red-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-red-700 transition">
              Berlangganan
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end justify-center gap-3">
          <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Ikuti Kami</h4>
          <div className="flex gap-3">
            {['FB', 'IG', 'TW', 'YT'].map((sosmed) => (
              <span key={sosmed} className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 hover:text-white hover:border-red-600 hover:bg-zinc-800 cursor-pointer transition">
                {sosmed}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Navigasi Tautan */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">Kategori</h4>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li><Link href="#" className="hover:text-red-500 transition">Audio & Sound</Link></li>
            <li><Link href="#" className="hover:text-red-500 transition">Smartwatch</Link></li>
            <li><Link href="#" className="hover:text-red-500 transition">Aksesoris Gadget</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">Layanan</h4>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li><Link href="#" className="hover:text-red-500 transition">Lacak Pesanan</Link></li>
            <li><Link href="#" className="hover:text-red-500 transition">Pusat Bantuan</Link></li>
            <li><Link href="#" className="hover:text-red-500 transition">Garansi & Retur</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">Perusahaan</h4>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li><Link href="#" className="hover:text-red-500 transition">Tentang Fasy Store</Link></li>
            <li><Link href="#" className="hover:text-red-500 transition">Syarat & Ketentuan</Link></li>
            <li><Link href="#" className="hover:text-red-500 transition">Kebijakan Privasi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">Metode Pembayaran</h4>
          <p className="text-xs text-zinc-500 mb-3">Mendukung pembayaran transfer bank, e-wallet, dan kartu kredit.</p>
          <div className="flex gap-2 text-xs font-semibold text-zinc-400">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">BCA</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Mandiri</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">QRIS</span>
          </div>
        </div>
      </div>

      {/* Section 3: Copyright */}
      <div className="bg-black py-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500 text-xs">
          <p>&copy; 2026 Fasy Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}