// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 mt-16">
      {/* Bagian Atas: Newsletter & Sosial Media */}
      <div className="max-w-7xl mx-auto p-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-slate-700">
        <div>
          <h3 className="text-xl font-bold mb-3">Newsletter Fasy Store</h3>
          <p className="text-slate-400 mb-4 text-sm">Dapatkan update terbaru tentang gadget terbaru dan promo eksklusif.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email kamu..." 
              className="flex-grow p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <button className="bg-red-600 text-white font-semibold p-3 px-6 rounded-xl text-sm hover:bg-red-700 transition">Berlangganan</button>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3 md:gap-4">
          <h4 className="text-lg font-semibold md:mb-2">Ikuti Kami</h4>
          <div className="flex gap-4">
            {/* Ganti teks dengan ikon sosial media yang sebenarnya nanti */}
            <span className="bg-slate-800 p-3 rounded-full text-slate-400 hover:text-white cursor-pointer">[FB]</span>
            <span className="bg-slate-800 p-3 rounded-full text-slate-400 hover:text-white cursor-pointer">[IG]</span>
            <span className="bg-slate-800 p-3 rounded-full text-slate-400 hover:text-white cursor-pointer">[TW]</span>
            <span className="bg-slate-800 p-3 rounded-full text-slate-400 hover:text-white cursor-pointer">[YT]</span>
          </div>
        </div>
      </div>

      {/* Bagian Utama: Kolom-kolom Link */}
      <div className="max-w-7xl mx-auto p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-4">Shop Categories</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-red-500">Audio</Link></li>
            <li><Link href="#" className="hover:text-red-500">Smart Home</Link></li>
            <li><Link href="#" className="hover:text-red-500">Wearables</Link></li>
            <li><Link href="#" className="hover:text-red-500">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-red-500">Lacak Pesanan</Link></li>
            <li><Link href="#" className="hover:text-red-500">FAQ</Link></li>
            <li><Link href="#" className="hover:text-red-500">Hubungi Kami</Link></li>
            <li><Link href="#" className="hover:text-red-500">Pengembalian</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-red-500">Tentang Kami</Link></li>
            <li><Link href="#" className="hover:text-red-500">Karir</Link></li>
            <li><Link href="#" className="hover:text-red-500">Kebijakan Privasi</Link></li>
            <li><Link href="#" className="hover:text-red-500">Syarat & Ketentuan</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Fasy Store</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-red-500">Lokasi Toko</Link></li>
            <li><Link href="#" className="hover:text-red-500">Peta</Link></li>
          </ul>
        </div>
      </div>

      {/* Bagian Bawah: Hak Cipta & Pembayaran */}
      <div className="bg-slate-950 p-6 border-t border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>&copy; 2026 Fasy Electronics LLC. All Rights Reserved.</p>
          <div className="flex gap-4">
            {/* Ganti dengan ikon metode pembayaran yang sebenarnya nanti */}
            <span>[VISA]</span>
            <span>[Mastercard]</span>
            <span>[American Express]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}