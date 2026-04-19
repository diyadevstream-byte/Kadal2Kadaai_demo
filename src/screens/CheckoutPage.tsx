import { useState } from 'react';
import { useCart, CartItem } from '../context/CartContext';
import { MapPin, Clock, CreditCard, ShoppingBag, CheckCircle2, User, Phone, Trash2, Plus, Minus, ArrowLeft, Zap, Flame, ThermometerSnowflake, ShieldCheck, Info, Leaf, Sparkles, Scale, Heart, Activity, ShieldPlus, Award } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import OceanButton from '../components/OceanButton';
import SeaLifeCanvas from '../components/SeaLifeCanvas';
import SignatureDishCard from '../components/SignatureDishCard';
import { motion, AnimatePresence } from 'motion/react';

// Meta-data helper for fish categories
const FISH_METADATA: Record<string, { benefits: string[], tips: string, hacks: string, freshness: string, badges: string[] }> = {
  "Marine fish": {
    benefits: ["Rich in Omega-3", "Heart Healthy", "Premium Protein"],
    tips: "Tastes best when pan-seared with butter & herbs.",
    hacks: "Add a splash of lemon juice while cooking to keep the meat firm.",
    freshness: "Deep-sea catch, boat-to-dock in 6 hours.",
    badges: ["Omega-3 Rich", "Zero Antibiotics", "Wild Caught"]
  },
  "freshwater fish": {
    benefits: ["High Lean Protein", "Easy to Digest", "Low Calorie"],
    tips: "Perfect for traditional spicy curries or deep frying.",
    hacks: "Marinate with turmeric and salt for 15 mins to reduce moisture.",
    freshness: "Farm-harvested daily. Flash-chilled immediately.",
    badges: ["Lean Protein", "Pure Sourced", "Daily Harvest"]
  },
  "Brackish Water Fish": {
    benefits: ["Naturally Sweet Meat", "Potassium-Rich", "Zero Antibiotics"],
    tips: "Excellent for grilling or steaming with ginger.",
    hacks: "Score the skin slightly to let spices penetrate deeper.",
    freshness: "Sourced from pristine local backwaters.",
    badges: ["Mineral Rich", "Sustainably Sourced", "Chef's Choice"]
  },
  "Crabs": {
    benefits: ["B-12 Powerhouse", "Zinc & Selenium", "Very Low Fat"],
    tips: "Steam for 10-12 mins to retain natural sweetness.",
    hacks: "Freeze for 10 mins before cleaning to lock in flavor.",
    freshness: "Live caught, packed in chilled humidity.",
    badges: ["B-12 Boost", "Low Mercury", "Live Inspected"]
  },
  "Freashwater Prawn": {
    benefits: ["Phosphorus-rich", "Muscle Recovery", "Heart Friendly"],
    tips: "Avoid overcooking; sauté for just 3-4 mins.",
    hacks: "Cook with shells on for a deeper, nuttier flavor profile.",
    freshness: "Harvested at dawn, delivered by noon.",
    badges: ["High Zinc", "Purity Tested", "A+ Grade"]
  },
  "Shellfish": {
    benefits: ["Iron Booster", "Healthy Magnesium", "Amino Acids"],
    tips: "Scrub well and steam until shells open wide.",
    hacks: "Discard any shells that don't open after cooking.",
    freshness: "Morning inspection for peak purity labels.",
    badges: ["Iron Rich", "Inspected", "Ocean Prime"]
  },
  "default": {
    benefits: ["Premium Protein", "Omega-3 Rich", "Daily Nutrition"],
    tips: "Keep refrigerated and consume within 24 hours.",
    hacks: "Store in the coldest part of your fridge (0-2°C).",
    freshness: "Sourced directly from certified coastal hubs.",
    badges: ["Nutrient Dense", "Certified Fresh", "Grade A"]
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
  const taxAmount = Math.round(cartTotal * 0.05);
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
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <SeaLifeCanvas />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-10 max-w-xl z-10"
        >
          <div className="w-48 h-48 rounded-[4rem] bg-white flex items-center justify-center relative shadow-[0_40px_80px_-15px_rgba(230,81,0,0.15)] border border-primary/5">
             <ShoppingBag className="w-20 h-20 text-primary opacity-20" />
             <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div 
                   animate={{ 
                     scale: [1, 1.2, 1],
                     rotate: [0, 5, -5, 0]
                   }} 
                   transition={{ repeat: Infinity, duration: 4 }}
                 >
                    <Award className="w-12 h-12 text-primary shadow-sm" />
                 </motion.div>
             </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-headline text-6xl font-black text-[#2D2321] uppercase tracking-tighter leading-none">Your Net is empty</h1>
            <p className="text-[#5D4037] font-bold text-xl leading-relaxed px-12 opacity-80">
              The daily catch is arriving at the docks! Don't miss out on the freshest seafood selected just for you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/marketplace">
              <OceanButton className="px-12 h-20 rounded-[2rem] bg-[#2D2321] text-white font-black uppercase tracking-widest text-sm shadow-2xl">
                See Today's Arrivals
              </OceanButton>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] relative overflow-hidden">
        <SeaLifeCanvas />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-10 text-center z-10 p-12 bg-white/60 backdrop-blur-xl rounded-[5rem] border border-white shadow-2xl shadow-primary/10">
          <div className="w-40 h-40 rounded-[3rem] bg-primary/20 flex items-center justify-center text-primary shadow-xl">
            <CheckCircle2 className="w-20 h-20" />
          </div>
          <div className="flex flex-col gap-4 px-6">
            <h1 className="font-headline text-5xl font-black text-[#2D2321] uppercase tracking-tighter">Harvest Secured!</h1>
            <p className="text-[#5D4037] font-bold text-xl max-w-sm mx-auto opacity-80">
              {formData.fullName}, your fresh catch is being prioritized for the next cold-chain dispatch.
            </p>
          </div>
          <div className="w-64 h-2 bg-[#F3EFE6] rounded-full overflow-hidden">
             <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 3 }} className="w-full h-full bg-primary" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">Navigating to Home</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen relative overflow-hidden">
      <SeaLifeCanvas />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-24 flex flex-col gap-12 relative z-10">
        
        <div className="flex flex-col gap-4">
          <Link to="/marketplace" className="flex items-center gap-2 text-[#5D4037] hover:text-primary transition-colors font-black text-[10px] uppercase tracking-[0.4em]">
            <ArrowLeft className="w-4 h-4" /> Go Back to Catch
          </Link>
          <h1 className="font-headline text-7xl font-black text-[#2D2321] tracking-tighter uppercase leading-[0.85] py-4">Checkout</h1>
        </div>

        {/* Signature Selection */}
        <div className="flex flex-col gap-4">
           <SignatureDishCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 items-start">
          
          {/* Main Controls */}
          <div className="flex flex-col gap-10">
            
            <section className="bg-white rounded-[4rem] p-10 lg:p-14 border border-outline-variant/10 shadow-[0_8px_32px_rgba(45,35,33,0.05)] flex flex-col gap-12">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[2rem] bg-[#F3EFE6] flex items-center justify-center font-headline font-black text-3xl text-primary border border-primary/5">1</div>
                  <div className="flex flex-col">
                     <h2 className="font-headline text-4xl font-black text-[#2D2321] tracking-tight uppercase leading-none mb-2">Billing Dock</h2>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] opacity-40">Verified Coastal Transaction Support</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-4">
                     <label className="font-label text-xs uppercase tracking-[0.3em] text-[#5D4037] font-black">Captain's Name</label>
                     <input 
                      value={formData.fullName}
                      onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                      className="w-full h-18 bg-[#FAF7F2] rounded-3xl px-8 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-body text-base text-[#2D2321] font-black outline-none shadow-sm" 
                      placeholder="Enter Full Name" 
                     />
                  </div>
                  <div className="flex flex-col gap-4">
                     <label className="font-label text-xs uppercase tracking-[0.3em] text-[#5D4037] font-black">Satellite Phone</label>
                     <input 
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full h-18 bg-[#FAF7F2] rounded-3xl px-8 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-body text-base text-[#2D2321] font-black outline-none shadow-sm" 
                      placeholder="+91" 
                     />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-4">
                     <label className="font-label text-xs uppercase tracking-[0.3em] text-[#5D4037] font-black">Exact Docking Location</label>
                     <textarea 
                      value={formData.address}
                      onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                      className="w-full h-36 bg-[#FAF7F2] rounded-[2.5rem] px-8 py-6 border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all font-body text-base text-[#2D2321] font-black outline-none resize-none shadow-sm" 
                      placeholder="House No, Street, Landmark..." 
                     />
                  </div>
               </div>
            </section>

            <section className="bg-white rounded-[4rem] p-10 lg:p-14 border border-outline-variant/10 shadow-[0_8px_32px_rgba(45,35,33,0.05)] flex flex-col gap-12">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[2rem] bg-[#F3EFE6] flex items-center justify-center font-headline font-black text-3xl text-primary border border-primary/5">2</div>
                  <h2 className="font-headline text-4xl font-black text-[#2D2321] tracking-tight uppercase leading-none">Express Logistics</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 {[
                   { id: 'morning', label: 'Dawn Express', time: '6-9 AM', desc: 'Pre-Noon Batch' },
                   { id: 'afternoon', label: 'Solar Cool', time: '1-4 PM', desc: 'Chilled Transit' },
                   { id: 'evening', label: 'Starlight', time: '7-10 PM', desc: 'Overnight Fresh' }
                 ].map((s) => (
                    <button 
                      key={s.id} 
                      onClick={() => setDeliverySlot(s.id)}
                      className={`flex flex-col gap-3 p-8 rounded-[2.5rem] transition-all text-left border-4 relative overflow-hidden group ${deliverySlot === s.id ? 'bg-[#2D2321] border-[#2D2321] shadow-2xl scale-[1.05]' : 'bg-[#FAF7F2] border-transparent hover:border-primary/20'}`}
                    >
                       <span className={`font-headline font-black uppercase tracking-widest text-xs ${deliverySlot === s.id ? 'text-white' : 'text-[#2D2321]'}`}>{s.label}</span>
                       <div className="flex flex-col">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${deliverySlot === s.id ? 'text-primary' : 'text-[#5D4037]'}`}>{s.time}</span>
                          <span className={`text-[9px] font-bold ${deliverySlot === s.id ? 'text-white/40' : 'text-[#5D4037] opacity-40'}`}>{s.desc}</span>
                       </div>
                       {deliverySlot === s.id && <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/20 rounded-full blur-xl" />}
                    </button>
                 ))}
               </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="flex flex-col gap-10 lg:sticky lg:top-32">
             <div className="bg-[#2D2321] rounded-[4.5rem] p-10 lg:p-14 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.3)] flex flex-col gap-12 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
                
                <h2 className="font-headline text-4xl font-black text-white px-2 uppercase tracking-tighter leading-none">The Chef's Net</h2>
                
                <div className="flex flex-col gap-8 overflow-y-auto max-h-[700px] pr-4 custom-scrollbar-dark px-2">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                        const facts = getFishFacts(item.image.split('/')[2]);
                        return (
                          <motion.div 
                            key={`${item.id}-${item.cutType}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col gap-6 bg-white/5 p-8 rounded-[3rem] border border-white/10 group backdrop-blur-sm"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-white shadow-xl border-4 border-white/5 shrink-0">
                                   <img src={item.image} className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-1000" />
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                   <div className="flex items-center justify-between">
                                      <h4 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{item.name}</h4>
                                      <button onClick={() => removeFromCart(item.id, item.cutType, item.weight)} className="text-white/20 hover:text-primary transition-colors"><Trash2 className="w-5 h-5" /></button>
                                   </div>
                                   <div className="flex flex-wrap gap-2 pt-1">
                                      {facts.badges.map((badge, idx) => (
                                         <span key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary font-black text-[8px] uppercase tracking-widest border border-primary/20">
                                            {badge}
                                         </span>
                                      ))}
                                   </div>
                                </div>
                             </div>

                             {/* Freshness Progress Bar */}
                             <div className="flex flex-col gap-3 px-2">
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
                                   <span className="text-white/30">Harvest</span>
                                   <span className="text-primary">Inspected</span>
                                   <span className="text-white/30">Your Dock</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded-full flex items-center">
                                   <div className="h-full w-2/3 bg-primary rounded-full relative shadow-[0_0_15px_rgba(230,81,0,0.5)]">
                                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border-2 border-primary" />
                                   </div>
                                </div>
                             </div>

                             <div className="p-5 bg-white/5 rounded-2xl flex gap-4 border border-white/5 items-start">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0"><ShieldPlus className="w-5 h-5 text-primary" /></div>
                                <div className="flex flex-col gap-1">
                                   <span className="text-[10px] font-black uppercase text-white leading-none mb-1">Health Optimization</span>
                                   <p className="text-[9px] font-bold text-white/50 leading-relaxed uppercase">{facts.hacks}</p>
                                </div>
                             </div>

                             <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                                   <button onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity - 1)} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"><Minus className="w-4 h-4" /></button>
                                   <span className="text-sm font-black text-white w-4 text-center">{item.quantity}</span>
                                   <button onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity + 1)} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"><Plus className="w-4 h-4" /></button>
                                </div>
                                <div className="flex flex-col items-end">
                                   <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Total Unit Val</span>
                                   <span className="text-2xl font-black text-white leading-none tracking-tighter">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                             </div>
                          </motion.div>
                        )
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-5 px-4 pt-10 border-t border-white/10 relative">
                   <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-white/40">
                      <span>Total Net Capture</span>
                      <span className="text-white">{formatPrice(cartTotal)}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-primary">
                      <span>Cold Chain Logistics</span>
                      <span>{formatPrice(deliveryFee)}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-white/40">
                      <span>Capture Tax (GST 5%)</span>
                      <span className="text-white">{formatPrice(taxAmount)}</span>
                   </div>
                   <div className="mt-8 pt-8 border-t-4 border-white border-double">
                      <div className="flex justify-between items-end">
                         <span className="font-headline text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">Grand Total</span>
                         <div className="flex flex-col items-end">
                            <span className="text-7xl font-black text-primary tracking-tighter leading-[0.85]">{formatPrice(finalTotal)}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-6 mt-4">
                  {error && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-error/10 border border-error/20 text-error text-[10px] font-black uppercase tracking-widest text-center rounded-3xl">{error}</motion.div>}
                  <OceanButton 
                    onClick={handlePlaceOrder}
                    className="w-full h-28 rounded-[3rem] bg-white text-[#2D2321] font-headline font-black uppercase tracking-[0.3em] text-sm shadow-3xl hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Confirm & Capture Dispatch
                  </OceanButton>
                </div>

             </div>
             
             <div className="px-10 py-8 bg-white rounded-[3rem] border border-outline-variant/10 flex items-center gap-6 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-[#F3EFE6] flex items-center justify-center shrink-0">
                   <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-black uppercase text-[#2D2321] leading-none mb-2 tracking-widest">Coastal Secure</span>
                   <p className="text-[9px] font-bold text-[#5D4037] leading-relaxed uppercase opacity-60">Verified Marine Trade Protection. Your payment is secured via 256-bit SSL encryption.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
