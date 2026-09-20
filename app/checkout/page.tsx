// app/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });

  const [deliveryType, setDeliveryType] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedItems = sessionStorage.getItem('checkout_items');
    
    if (storedItems) {
      setCheckoutItems(JSON.parse(storedItems));
    } else {
      setCheckoutItems(cart);
    }
  }, [cart]);

  const subtotal = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = deliveryType === 'express' ? 50000 : 0;
  const grandTotal = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.address) {
      toast.error('Mohon lengkapi informasi pengiriman!');
      return;
    }

    setIsProcessing(true);
    toast.loading('Memproses pembayaran...', { id: 'checkout' });

    setTimeout(() => {
      toast.success('Pesanan berhasil dibuat!', { id: 'checkout' });
      setIsProcessing(false);
      sessionStorage.removeItem('checkout_items');
      router.push('/');
    }, 2000);
  };

  if (!isMounted) return null;

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fbfbfd] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Tidak ada produk untuk di-checkout</h2>
        <button onClick={() => router.push('/')} className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-md hover:bg-red-500 transition">
          Kembali Belanja
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-red-600 selection:text-white pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32">
        {/* JUDUL TETAP BESAR SEPERTI GAYAMU */}
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 text-slate-900">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* KOLOM KIRI: FORM (Dibuat Card Putih Modern & Clean) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-10">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-10">
              
              {/* SECTION: Information */}
              <div>
                <div className="flex justify-between items-end mb-6 pb-3 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">Information</h2>
                  <span className="text-xs text-slate-500">Sudah punya akun? <a href="#" className="text-red-600 font-semibold hover:underline">Masuk</a></span>
                </div>
                
                <div className="space-y-5">
                  <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 px-4 py-3 text-sm transition-all outline-none" />
                    <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 px-4 py-3 text-sm transition-all outline-none" />
                    <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 px-4 py-3 text-sm transition-all outline-none" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 px-4 py-3 text-sm transition-all outline-none" />
                  </div>

                  <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider pt-3">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 px-4 py-3 text-sm transition-all outline-none" />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/10 px-4 py-3 text-sm transition-all outline-none" />
                  </div>
                </div>
              </div>

              {/* SECTION: Delivery */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Delivery</h2>
                <div className="space-y-3">
                  <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${deliveryType === 'standard' ? 'border-red-600 bg-red-50/40 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" checked={deliveryType === 'standard'} onChange={() => setDeliveryType('standard')} className="text-red-600 focus:ring-red-500" />
                      <div>
                        <p className="font-bold text-sm text-slate-900">Standard Delivery</p>
                        <p className="text-xs text-slate-500">Estimasi 3-5 hari kerja</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">Gratis</span>
                  </label>

                  <label className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${deliveryType === 'express' ? 'border-red-600 bg-red-50/40 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" checked={deliveryType === 'express'} onChange={() => setDeliveryType('express')} className="text-red-600 focus:ring-red-500" />
                      <div>
                        <p className="font-bold text-sm text-slate-900">Express Shipping</p>
                        <p className="text-xs text-slate-500">Estimasi 1-2 hari kerja</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">Rp 50.000</span>
                  </label>
                </div>
              </div>

              {/* SECTION: Payment */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">Payment Method</h2>
                <div className="space-y-3 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <label className="flex items-center justify-between p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} className="text-red-600 focus:ring-red-500" />
                      <span className="font-bold text-sm text-slate-900">Credit / Debit Card</span>
                    </div>
                    <span className="text-lg">💳</span>
                  </label>
                  
                  {paymentMethod === 'credit_card' && (
                    <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
                      <input type="text" placeholder="Card number" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-500" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/YY" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-500" />
                        <input type="text" placeholder="CVC" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-500" />
                      </div>
                    </div>
                  )}

                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'bank_transfer'} onChange={() => setPaymentMethod('bank_transfer')} className="text-red-600 focus:ring-red-500" />
                      <span className="font-bold text-sm text-slate-900">Bank Transfer</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">BCA / Mandiri</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold tracking-wide uppercase py-4 rounded-full text-sm shadow-lg shadow-red-500/20 transition-all active:scale-[0.98] disabled:bg-slate-300"
              >
                {isProcessing ? 'Memproses...' : 'Buat Pesanan Sekarang'}
              </button>
            </form>
          </div>

          {/* KOLOM KANAN: ORDER SUMMARY (Card Putih Bersih Selaras) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm sticky top-28">
            <h2 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100 flex justify-between items-center">
              <span>Shopping Bag</span>
              <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-bold">
                {checkoutItems.length} Item
              </span>
            </h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-1">
              {checkoutItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl p-1 flex-shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-slate-500 font-medium">Qty: {item.quantity}</span>
                      <span className="text-xs font-extrabold text-slate-900">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex gap-2">
                <input type="text" placeholder="Kode promo" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-red-500" />
                <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">Apply</button>
              </div>

              <div className="pt-2 space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">{shippingCost === 0 ? 'Free' : `Rp ${shippingCost.toLocaleString('id-ID')}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-base font-bold text-slate-900">Total Akhir:</span>
                <span className="text-xl font-extrabold text-red-600">Rp {grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}