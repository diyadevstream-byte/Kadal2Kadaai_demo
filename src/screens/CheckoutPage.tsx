import { useState } from 'react';
import { useCart, CartItem } from '../context/CartContext';
import { MapPin, Clock, CreditCard, ShoppingBag, CheckCircle2, User, Phone, Trash2, Plus, Minus, ArrowLeft, Zap, Flame, ThermometerSnowflake, ShieldCheck, Info, Leaf, Sparkles, Scale, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import OceanButton from '../components/OceanButton';
import SeaLifeCanvas from '../components/SeaLifeCanvas';
import SignatureDishCard from '../components/SignatureDishCard';
import { motion, AnimatePresence } from 'motion/react';

// Meta-data helper for fish categories
const FISH_METADATA: Record<string, { benefits: string[], tips: string, hacks: string, freshness: string }> = {
  "Marine fish": {
    benefits: ["Rich in Omega-3", "Heart Healthy", "Premium Protein"],
    tips: "Tastes best when pan-seared with butter & herbs.",
    hacks: "Add a splash of lemon juice while cooking to keep the meat firm.",
    freshness: "Deep-sea catch, boat-to-dock in 6 hours."
  },
  "freshwater fish": {
    benefits: ["High Lean Protein", "Easy to Digest", "Low Calorie"],
    tips: "Perfect for traditional spicy curries or deep frying.",
    hacks: "Marinate with turmeric and salt for 15 mins to reduce moisture.",
    freshness: "Farm-harvested daily. Flash-chilled immediately."
  },
  "Brackish Water Fish": {
    benefits: ["Naturally Sweet Meat", "Potassium-Rich", "Zero Antibiotics"],
    tips: "Excellent for grilling or steaming with ginger.",
    hacks: "Score the skin slightly to let spices penetrate deeper.",
    freshness: "Sourced from pristine local backwaters."
  },
  "Crabs": {
    benefits: ["B-12 Powerhouse", "Zinc & Selenium", "Very Low Fat"],
    tips: "Steam for 10-12 mins to retain natural sweetness.",
    hacks: "Freeze for 10 mins before cleaning to lock in flavor.",
    freshness: "Live caught, packed in chilled humidity."
  },
  "Freashwater Prawn": {
    benefits: ["Phosphorus-rich", "Muscle Recovery", "Heart Friendly"],
    tips: "Avoid overcooking; sauté for just 3-4 mins.",
    hacks: "Cook with shells on for a deeper, nuttier flavor profile.",
    freshness: "Harvested at dawn, delivered by noon."
  },
  "Shellfish": {
    benefits: ["Iron Booster", "Healthy Magnesium", "Amino Acids"],
    tips: "Scrub well and steam until shells open wide.",
    hacks: "Discard any shells that don't open after cooking.",
    freshness: "Morning inspection for peak purity labels."
  },
  "default": {
    benefits: ["Premium Protein", "Omega-3 Rich", "Daily Nutrition"],
    tips: "Keep refrigerated and consume within 24 hours.",
    hacks: "Store in the coldest part of your fridge (0-2°C).",
    freshness: "Sourced directly from certified coastal hubs."
  }
};

const getFishFacts = (category: string) => FISH_METADATA[category as keyof typeof FISH_METADATA] || FISH_METADATA.default;

export default function CheckoutPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isOrdered, setIsOrdered] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState('morning');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');

  const deliveryFee = 50;
  const taxAmount = Math.round(cartTotal * 0.05); // 5% GST
  const finalTotal = cartTotal + deliveryFee + taxAmount;

  const handlePlaceOrder = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError("Please complete all delivery details");
      return;
    }
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  const formatPrice = (amount: number) => `₹ ${amount.toLocaleString()}`;

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="min-h-[90vh] bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <SeaLifeCanvas />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-10 max-w-xl z-10"
        >
          <div className="w-40 h-40 rounded-[3rem] bg-primary/10 flex items-center justify-center relative shadow-2xl shadow-primary/5">
             <ShoppingBag className="w-16 h-16 text-primary opacity-40" />
             <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-[#FAF7F2]">
                 <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <Scale className="w-7 h-7 text-primary" />
                 </motion.div>
             </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-headline text-5xl font-black text-[#2D2321] uppercase tracking-tighter">Your Boat is Empty</h1>
            <p className="text-[#5D4037] font-bold text-lg leading-relaxed px-6">
              The tide is high and the catch is fresh! Don't let the best items swim away—head back to the market to fill your net.
            </p>
          </div>
          <Link to="/marketplace">
            <OceanButton className="px-12 h-20 rounded-[2rem] bg-primary text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              Explore Fresh Catch
            </OceanButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] relative">
        <SeaLifeCanvas />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-10 text-center z-10">
          <div className="w-32 h-32 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_80px_rgba(230,81,0,0.3)]">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <div className="flex flex-col gap-4 px-6">
            <h1 className="font-headline text-5xl font-black text-[#2D2321] uppercase tracking-tighter">Harvest Secured!</h1>
            <p className="text-[#5D4037] font-bold text-lg max-w-sm mx-auto">
              Your seafood is being prioritized for dispatch. Get the kitchen ready!
            </p>
          </div>
          <div className="w-64 h-2 bg-surface-container rounded-full overflow-hidden">
             <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 3 }} className="w-full h-full bg-primary" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen relative overflow-hidden">
      {/* 3D Animation Background */}
      <SeaLifeCanvas />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-24 flex flex-col gap-12 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <Link to="/marketplace" className="flex items-center gap-2 text-[#5D4037] hover:text-primary transition-colors font-black text-xs uppercase tracking-[0.3em]">
            <ArrowLeft className="w-4 h-4" /> Market Return
          </Link>
          <h1 className="font-headline text-6xl font-black text-[#2D2321] tracking-tighter uppercase leading-tight">Checkout</h1>
        </div>

        {/* TOP SECTION: Signature Dish */}
        <div className="flex flex-col gap-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="font-headline text-lg font-black text-[#2D2321] uppercase tracking-[0.2em] flex items-center gap-3">
                 <Sparkles className="w-5 h-5 text-primary" /> Chef's Signature Selection
              </h3>
           </div>
           <SignatureDishCard />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-12 items-start">
          
          {/* CONTENT: Forms & Progress */}
          <div className="flex flex-col gap-10">
            
            {/* Delivery Card */}
            <section className="bg-white rounded-[3.5rem] p-8 lg:p-12 border border-outline-variant/10 shadow-sm flex flex-col gap-12">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-3xl bg-[#F3EFE6] flex items-center justify-center font-headline font-black text-2xl text-primary border border-outline-variant/5">01</div>
                  <div className="flex flex-col">
                     <h2 className="font-headline text-3xl font-black text-[#2D2321] tracking-tight uppercase">Billing Hub</h2>
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#5D4037] opacity-60">Verified Marine Buyer Profile</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                     <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#5D4037] font-black">Full Name</label>
                     <input 
                      value={formData.fullName}
                      onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                      className="w-full h-16 bg-[#FAF7F2] rounded-2xl px-6 border border-outline-variant/5 focus:border-primary transition-all font-body text-sm text-[#2D2321] font-black outline-none" 
                      placeholder="Alex Ocean" 
                     />
                  </div>
                  <div className="flex flex-col gap-3">
                     <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#5D4037] font-black">Contact Number</label>
                     <input 
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full h-16 bg-[#FAF7F2] rounded-2xl px-6 border border-outline-variant/5 focus:border-primary transition-all font-body text-sm text-[#2D2321] font-black outline-none" 
                      placeholder="+91 0000 0000" 
                     />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-3">
                     <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#5D4037] font-black">Precise Docking Address</label>
                     <textarea 
                      value={formData.address}
                      onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                      className="w-full h-32 bg-[#FAF7F2] rounded-3xl px-6 py-5 border border-outline-variant/5 focus:border-primary transition-all font-body text-sm text-[#2D2321] font-black outline-none resize-none" 
                      placeholder="House, Street, Area, Landmarks..." 
                     />
                  </div>
               </div>
            </section>

            {/* Logistics Card */}
            <section className="bg-white rounded-[3.5rem] p-8 lg:p-12 border border-outline-variant/10 shadow-sm flex flex-col gap-10">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-3xl bg-[#F3EFE6] flex items-center justify-center font-headline font-black text-2xl text-primary border border-outline-variant/5">02</div>
                  <h2 className="font-headline text-3xl font-black text-[#2D2321] tracking-tight uppercase">Express Logistics</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {[
                   { id: 'morning', label: 'Sunrise Batch', time: '6-9 AM' },
                   { id: 'afternoon', label: 'Noon Chilled', time: '1-4 PM' },
                   { id: 'evening', label: 'Night Catch', time: '7-10 PM' }
                 ].map((s) => (
                    <button 
                      key={s.id} 
                      onClick={() => setDeliverySlot(s.id)}
                      className={`flex flex-col gap-2 p-6 rounded-3xl transition-all text-left border-3 ${deliverySlot === s.id ? 'bg-primary border-primary shadow-xl shadow-primary/20 scale-[1.05]' : 'bg-[#FAF7F2] border-transparent'}`}
                    >
                       <span className={`font-headline font-black uppercase tracking-widest text-[11px] ${deliverySlot === s.id ? 'text-white' : 'text-[#2D2321]'}`}>{s.label}</span>
                       <span className={`text-[10px] font-bold ${deliverySlot === s.id ? 'text-white/80' : 'text-[#5D4037] opacity-60'}`}>{s.time}</span>
                    </button>
                 ))}
               </div>
            </section>
          </div>

          {/* SIDEBAR: Order Intelligence */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
             <div className="bg-white rounded-[4rem] p-8 lg:p-12 border border-outline-variant/10 shadow-2xl flex flex-col gap-10">
                <h2 className="font-headline text-3xl font-black text-[#2D2321] px-2 uppercase tracking-tighter">Your Feast Summary</h2>
                
                <div className="flex flex-col gap-10 overflow-y-auto max-h-[600px] pr-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                        const facts = getFishFacts(item.image.split('/')[2]);
                        return (
                          <motion.div 
                            key={`${item.id}-${item.cutType}`}
                            layout
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-5 bg-[#FAF7F2] p-6 rounded-[2.5rem] border border-outline-variant/5 group"
                          >
                             <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-sm border border-outline-variant/5">
                                   <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                   <div className="flex items-center justify-between">
                                      <h4 className="text-base font-black text-[#2D2321] uppercase tracking-tighter">{item.name}</h4>
                                      <button onClick={() => removeFromCart(item.id, item.cutType, item.weight)} className="text-error/40 hover:text-error transition-colors"><Trash2 className="w-4 h-4" /></button>
                                   </div>
                                   <div className="flex items-center gap-2">
                                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-black text-[8px] uppercase tracking-widest">
                                         <Leaf className="w-2.5 h-2.5" /> {facts.freshness}
                                      </span>
                                   </div>
                                </div>
                             </div>

                             {/* Nutrition & Hacks */}
                             <div className="flex flex-col gap-4 py-4 border-y border-outline-variant/10 border-dotted">
                                <div className="flex gap-2">
                                   {facts.benefits.slice(0, 2).map((b, i) => (
                                      <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-outline-variant/5 rounded-lg">
                                         <div className="w-1 h-1 rounded-full bg-primary" />
                                         <span className="text-[9px] font-black text-[#5D4037] uppercase tracking-widest">{b}</span>
                                      </div>
                                   ))}
                                </div>
                                <div className="p-4 bg-white/50 rounded-2xl flex gap-3 border border-outline-variant/5">
                                   <Flame className="w-4 h-4 text-primary shrink-0" />
                                   <div className="flex flex-col">
                                      <span className="text-[9px] font-black uppercase text-[#2D2321] leading-none mb-1">Culinary Hack</span>
                                      <p className="text-[9px] font-bold text-[#5D4037] leading-relaxed uppercase">{facts.hacks}</p>
                                   </div>
                                </div>
                             </div>

                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <button onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity - 1)} className="w-8 h-8 rounded-xl bg-white border border-outline-variant/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                                   <span className="text-xs font-black text-[#2D2321] w-4 text-center">{item.quantity}</span>
                                   <button onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity + 1)} className="w-8 h-8 rounded-xl bg-white border border-outline-variant/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
                                </div>
                                <div className="flex flex-col items-end">
                                   <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Pricing Unit</span>
                                   <span className="text-lg font-black text-primary leading-none">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                             </div>
                          </motion.div>
                        )
                    })}
                  </AnimatePresence>
                </div>

                {/* Final Breakdown */}
                <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/10">
                   <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-[#5D4037]">
                      <span>Catch Total</span>
                      <span className="text-[#2D2321]">{formatPrice(cartTotal)}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-primary">
                      <span>Express Shipping</span>
                      <span>{formatPrice(deliveryFee)}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-[#5D4037]">
                      <span>GST (5%)</span>
                      <span className="text-[#2D2321]">{formatPrice(taxAmount)}</span>
                   </div>
                   <div className="mt-6 flex flex-col gap-1 border-t-4 border-[#2D2321] border-double pt-6">
                      <div className="flex justify-between items-end">
                         <span className="font-headline text-xl font-black text-[#2D2321] uppercase tracking-tighter">Amount Payable</span>
                         <span className="font-headline text-5xl font-black text-primary tracking-tighter leading-none">{formatPrice(finalTotal)}</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                  {error && <div className="p-4 bg-error/10 border border-error/20 text-error text-[10px] font-black uppercase tracking-widest text-center rounded-2xl">{error}</div>}
                  <OceanButton 
                    onClick={handlePlaceOrder}
                    className="w-full h-24 rounded-[2.5rem] bg-on-surface text-white font-headline font-black uppercase tracking-[0.25em] text-sm shadow-2xl relative overflow-hidden group"
                  >
                    <div className="relative z-10 flex flex-col items-center">
                       <span className="group-hover:scale-105 transition-transform">Secure Harvest</span>
                       <span className="text-[8px] opacity-40 font-black mt-1">Dispatching to Cold Chain</span>
                    </div>
                  </OceanButton>
                </div>

                <div className="flex items-center justify-center gap-3 p-6 bg-[#F3EFE6] rounded-[2rem] border border-outline-variant/5">
                   <ShieldCheck className="w-6 h-6 text-primary" />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-[#2D2321] leading-none mb-1">SeaSafe Checkout</span>
                      <p className="text-[8px] font-bold text-[#5D4037] leading-relaxed uppercase">256-Bit SSL protection for all maritime transactions.</p>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
