import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Clock, CreditCard, ShoppingBag, CheckCircle2, ChevronRight, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OceanButton from '../components/OceanButton';
import { motion } from 'motion/react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState('morning');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const deliveryFee = 50;

  const handlePlaceOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !isOrdered) {
    navigate('/cart');
    return null;
  }

  if (isOrdered) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8 px-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_50px_rgba(230,81,0,0.3)]"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <div className="flex flex-col gap-4">
          <h1 className="font-headline text-4xl font-black text-on-surface uppercase tracking-tight">Order Confirmed!</h1>
          <p className="text-on-surface-variant font-bold max-w-sm mx-auto leading-relaxed">
            Your fresh catch is being prioritized. You'll receive a confirmation call from our coastal hub shortly.
          </p>
        </div>
        <p className="text-xs font-black uppercase tracking-[0.4em] text-primary animate-pulse mt-4">
          Redirecting to Home...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12 lg:py-20 flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <h1 className="font-headline text-4xl font-black text-on-surface tracking-tight uppercase">Checkout</h1>
        <p className="text-on-surface-variant font-bold">Complete your order details and secure your delivery slot.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16 items-start">
        
        {/* LEFT: Checkout Forms */}
        <div className="flex flex-col gap-12">
          
          {/* Section 1: Delivery Address */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4 border-b border-outline-variant/10 pb-4">
               <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20"><MapPin className="w-5 h-5 text-primary" /></div>
               <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight uppercase">Delivery Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Full Name</label>
                  <div className="relative">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                     <input className="w-full h-14 bg-surface-container rounded-2xl pl-12 pr-6 border border-outline-variant/10 focus:border-primary transition-all font-body text-sm outline-none text-on-surface font-bold placeholder:font-normal" placeholder="Alex Ocean" />
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Phone Number</label>
                  <div className="relative">
                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                     <input className="w-full h-14 bg-surface-container rounded-2xl pl-12 pr-6 border border-outline-variant/10 focus:border-primary transition-all font-body text-sm outline-none text-on-surface font-bold placeholder:font-normal" placeholder="+91 98765 43210" />
                  </div>
               </div>
               <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Full Shipping Address</label>
                  <textarea className="w-full h-32 bg-surface-container rounded-2xl p-6 border border-outline-variant/10 focus:border-primary transition-all font-body text-sm outline-none resize-none text-on-surface font-bold placeholder:font-normal" placeholder="Apartment, Street, Area, LandMark..." />
               </div>
            </div>
          </section>

          {/* Section 2: Delivery Slot */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4 border-b border-outline-variant/10 pb-4">
               <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20"><Clock className="w-5 h-5 text-primary" /></div>
               <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight uppercase">Preferred Slot</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {[
                 { id: 'morning', label: 'Morning', time: '7 AM - 10 AM' },
                 { id: 'afternoon', label: 'Afternoon', time: '11 AM - 3 PM' },
                 { id: 'evening', label: 'Evening', time: '5 PM - 8 PM' }
               ].map((slot) => (
                  <button 
                    key={slot.id}
                    onClick={() => setDeliverySlot(slot.id)}
                    className={`flex flex-col gap-1 p-6 rounded-3xl border transition-all text-left ${deliverySlot === slot.id ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' : 'bg-surface-container border-outline-variant/10 text-on-surface-variant hover:border-primary/20 font-bold'}`}
                  >
                     <span className="font-headline font-black uppercase tracking-widest text-xs">{slot.label}</span>
                     <span className="text-[10px] font-bold opacity-60">{slot.time}</span>
                  </button>
               ))}
            </div>
          </section>

          {/* Section 3: Payment Method */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4 border-b border-outline-variant/10 pb-4">
               <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20"><CreditCard className="w-5 h-5 text-primary" /></div>
               <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight uppercase">Payment Method</h2>
            </div>
            <div className="flex flex-col gap-4">
               {[
                 { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your seafood arrives' },
                 { id: 'upi', label: 'UPI (Mock)', desc: 'Pay via any UPI app' },
                 { id: 'card', label: 'Credit / Debit Card', desc: 'Secure online payment' }
               ].map((method) => (
                  <button 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${paymentMethod === method.id ? 'bg-primary/10 border-primary shadow-sm' : 'bg-surface-container border-outline-variant/10 hover:border-primary/30'}`}
                  >
                     <div className="flex flex-col gap-1 text-left">
                        <span className={`font-headline font-black text-base ${paymentMethod === method.id ? 'text-primary' : 'text-on-surface'}`}>{method.label}</span>
                        <span className="text-xs text-on-surface-variant font-bold">{method.desc}</span>
                     </div>
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary' : 'border-outline-variant/30'}`}>
                        {paymentMethod === method.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                     </div>
                  </button>
               ))}
            </div>
          </section>
        </div>

        {/* RIGHT: Confirmation Sidebar */}
        <div className="flex flex-col gap-10 lg:sticky lg:top-32">
           <div className="bg-surface rounded-[3rem] p-10 lg:p-12 border border-outline-variant/10 shadow-2xl flex flex-col gap-10">
              <h2 className="font-headline text-2xl font-black text-on-surface px-2 uppercase tracking-tight">Final Summary</h2>
              
              <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto px-2 custom-scrollbar">
                 {cart.map((item) => (
                    <div key={`${item.id}-${item.cutType}-${item.weight}`} className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant/10 overflow-hidden shrink-0 shadow-sm">
                          <img src={item.image} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 flex flex-col gap-1">
                          <span className="text-sm font-black text-on-surface uppercase tracking-tight line-clamp-1">{item.name}</span>
                          <span className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">{item.quantity} x {item.weight} unit</span>
                       </div>
                       <span className="text-sm font-black text-on-surface-variant">₹{item.price * item.quantity}</span>
                    </div>
                 ))}
              </div>

              <div className="flex flex-col gap-5 px-2 pt-8 border-t border-outline-variant/10">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-on-surface-variant">Order Subtotal</span>
                  <span className="text-on-surface font-black">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-on-surface-variant">Shipping Fee</span>
                  <span className="text-primary font-black">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <span className="font-headline text-lg font-black text-on-surface tracking-widest uppercase">Payable</span>
                  <span className="font-headline text-[44px] font-black text-primary leading-none">₹{cartTotal + deliveryFee}</span>
                </div>
              </div>

              <OceanButton 
                onClick={handlePlaceOrder}
                className="w-full h-20 rounded-[2rem] bg-primary text-white font-headline font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 relative overflow-hidden group"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                   Confirm & Place Order <CheckCircle2 className="w-5 h-5" />
                </div>
              </OceanButton>
           </div>

           <div className="px-10 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-30">
                 <ShieldCheck className="w-5 h-5" /> 256-Bit SSL Encrypted
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}
