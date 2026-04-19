import { useState } from 'react';
import { useCart, CartItem } from '../context/CartContext';
import { MapPin, Clock, CreditCard, ShoppingBag, CheckCircle2, ChevronRight, User, Phone, Trash2, Plus, Minus, ArrowLeft, Zap, Flame, ThermometerSnowflake, ShieldCheck, Info } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import OceanButton from '../components/OceanButton';
import { motion, AnimatePresence } from 'motion/react';

// Meta-data helper for fish categories
const FISH_METADATA: Record<string, { benefits: string[], tips: string, freshness: string }> = {
  "Marine fish": {
    benefits: ["Rich in Omega-3", "Heart Healthy", "Premium Protein"],
    tips: "Tastes best when pan-seared with butter & herbs.",
    freshness: "Deep-sea catch, chilled at 2°C since harvest."
  },
  "freshwater fish": {
    benefits: ["High Lean Protein", "Easy to Digest", "Low Calorie"],
    tips: "Perfect for traditional spicy curries or deep frying.",
    freshness: "Farm-to-door in 12 hours. Pure & antibiotic-free."
  },
  "Brackish Water Fish": {
    benefits: ["Naturally Sweet Meat", "Potassium-Rich", "Zero Antibiotics"],
    tips: "Excellent for grilling or steaming with ginger.",
    freshness: "Sourced from pristine backwaters at dawn."
  },
  "Crabs": {
    benefits: ["B-12 Powerhouse", "Zinc & Selenium", "Very Low Fat"],
    tips: "Steam for 10-12 mins to retain natural sweetness.",
    freshness: "Live caught, packed with ocean-state moisture."
  },
  "Freashwater Prawn": {
    benefits: ["Phosphorus-rich", "Muscle Recovery", "Heart Friendly"],
    tips: "Avoid overcooking; sauté for just 3-4 mins.",
    freshness: "Ponds harvested daily. Flash-chilled immediately."
  },
  "Shellfish": {
    benefits: ["Iron Booster", "Healthy Magnesium", "Amino Acids"],
    tips: "Scrub well and steam until shells open wide.",
    freshness: "Morning harvest, inspected for peak purity."
  },
  "default": {
    benefits: ["Premium Protein", "Omega-3 Rich", "Daily Nutrition"],
    tips: "Keep refrigerated and consume within 24 hours.",
    freshness: "Sourced directly from coastal hubs."
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Please enter your full name";
    if (!formData.phone.trim()) return "Please enter a valid phone number";
    if (!formData.address.trim()) return "Shipping address is required";
    return null;
  };

  const handlePlaceOrder = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  // Convert USD to INR (For display only, assuming JSON is already in INR-representative values)
  const formatPrice = (amount: number) => `₹ ${amount.toLocaleString()}`;

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="min-h-[80vh] bg-surface flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-8 max-w-lg"
        >
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center relative">
             <ShoppingBag className="w-12 h-12 text-primary opacity-40" />
             <div className="absolute -top-1 -right-1 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                 <Trash2 className="w-6 h-6 text-error opacity-20" />
             </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-headline text-4xl font-black text-on-surface uppercase tracking-tight">Your boat is empty</h1>
            <p className="text-on-surface-variant font-bold leading-relaxed">
              Don't wait for the tide to turn! Add some high-quality, fresh seafood to your cart to proceed with checkout.
            </p>
          </div>
          <Link to="/marketplace">
            <OceanButton className="px-12 h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
              Explore Fresh Catch
            </OceanButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-6 text-center bg-surface">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="w-28 h-28 rounded-[2.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_80px_rgba(230,81,0,0.3)]"
        >
          <CheckCircle2 className="w-14 h-14" />
        </motion.div>
        <div className="flex flex-col gap-4">
          <h1 className="font-headline text-4xl font-black text-on-surface uppercase tracking-tight">Catch Secured!</h1>
          <p className="text-on-surface-variant font-bold max-w-sm mx-auto leading-relaxed">
            Order confirmed for {formData.fullName}. Our dispatch hub is preparing your seafood for specialized cold-chain delivery.
          </p>
        </div>
        <div className="flex flex-col gap-2">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">Navigating to Home</p>
           <div className="w-48 h-1 bg-surface-container rounded-full overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               animate={{ x: "0%" }}
               transition={{ duration: 3 }}
               className="w-full h-full bg-primary"
             />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20 flex flex-col gap-12">
        
        <div className="flex flex-col gap-3">
          <Link to="/marketplace" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Go back to Market
          </Link>
          <div className="flex items-center gap-6 mt-4">
            <h1 className="font-headline text-5xl font-black text-on-surface tracking-tighter uppercase leading-none">Checkout</h1>
            <div className="hidden sm:flex items-center gap-2 px-4 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest">
               <ShieldCheck className="w-3.5 h-3.5" /> Secure Market Channel
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-12 items-start">
          
          {/* LEFT: Checkout Deck */}
          <div className="flex flex-col gap-8">
            
            {/* 1. Delivery & Contact Identity */}
            <section className="bg-white rounded-[3rem] p-8 lg:p-12 border border-outline-variant/10 shadow-sm flex flex-col gap-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center font-headline font-black text-xl text-primary border border-outline-variant/10">01</div>
                 <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight uppercase">Billing & Identity</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-3">
                    <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-black">Full Name</label>
                    <div className="relative group">
                       <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                       <input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full h-16 bg-surface-container rounded-2xl pl-13 pr-6 border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-body text-sm text-on-surface font-black outline-none placeholder:font-normal" 
                        placeholder="John Oceanic" 
                       />
                    </div>
                 </div>
                 <div className="flex flex-col gap-3">
                    <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-black">Contact Number</label>
                    <div className="relative group">
                       <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                       <input 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-16 bg-surface-container rounded-2xl pl-13 pr-6 border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-body text-sm text-on-surface font-black outline-none placeholder:font-normal" 
                        placeholder="+91 88888 00000" 
                       />
                    </div>
                 </div>
                 <div className="md:col-span-2 flex flex-col gap-3">
                    <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-black">Precise Shipping Address</label>
                    <div className="relative group">
                       <MapPin className="absolute left-5 top-6 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                       <textarea 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full h-32 bg-surface-container rounded-3xl pl-13 pr-6 py-5 border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-body text-sm text-on-surface font-black outline-none resize-none placeholder:font-normal" 
                        placeholder="House No, Street, Landmarks, City, PIN..." 
                       />
                    </div>
                 </div>
              </div>
            </section>

            {/* 2. Dispatch Timings */}
            <section className="bg-white rounded-[3rem] p-8 lg:p-12 border border-outline-variant/10 shadow-sm flex flex-col gap-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center font-headline font-black text-xl text-primary border border-outline-variant/10">02</div>
                 <div className="flex flex-col">
                    <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight uppercase">Express Cold Chain Slot</h2>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest flex items-center gap-1"><ThermometerSnowflake className="w-3 h-3" /> Chilled Logistics Guaranteed</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {[
                   { id: 'morning', label: 'Sunrise Batch', time: '6 AM - 9 AM', icon: <Clock className="w-4 h-4" /> },
                   { id: 'afternoon', label: 'Mid-Day Cool', time: '12 PM - 3 PM', icon: <Clock className="w-4 h-4" /> },
                   { id: 'evening', label: 'Sunset Express', time: '6 PM - 9 PM', icon: <Clock className="w-4 h-4" /> }
                 ].map((slot) => (
                    <button 
                      key={slot.id}
                      onClick={() => setDeliverySlot(slot.id)}
                      className={`flex flex-col gap-2 p-6 rounded-3xl border-2 transition-all text-left relative group ${deliverySlot === slot.id ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'bg-surface-container border-transparent text-on-surface-variant hover:border-outline-variant/30'}`}
                    >
                       <span className={`font-headline font-black uppercase tracking-widest text-[11px] mb-1 ${deliverySlot === slot.id ? 'text-white' : 'text-on-surface'}`}>{slot.label}</span>
                       <span className={`text-[10px] font-bold flex items-center gap-2 ${deliverySlot === slot.id ? 'text-white/80' : 'opacity-60'}`}>{slot.icon} {slot.time}</span>
                       {deliverySlot === slot.id && <div className="absolute top-4 right-4"><CheckCircle2 className="w-5 h-5 text-white" /></div>}
                    </button>
                 ))}
              </div>
            </section>

            {/* 3. Secure Treasury (Payment) */}
            <section className="bg-white rounded-[3rem] p-8 lg:p-12 border border-outline-variant/10 shadow-sm flex flex-col gap-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center font-headline font-black text-xl text-primary border border-outline-variant/10">03</div>
                 <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight uppercase">Payment Vault</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { id: 'cod', label: 'Cash / Pay on Door', sub: 'Coastal Cash', icon: <MapPin className="w-5 h-5" /> },
                   { id: 'upi', label: 'UPI / Scan & Pay', sub: 'Instant Transfer', icon: <Zap className="w-5 h-5" /> },
                   { id: 'card', label: 'Credit & Debit', sub: 'Secure Network', icon: <CreditCard className="w-5 h-5" /> }
                 ].map((method) => (
                    <button 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${paymentMethod === method.id ? 'bg-white border-primary shadow-lg shadow-primary/5' : 'bg-surface-container border-transparent text-on-surface-variant'}`}
                    >
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-white text-on-surface-variant'}`}>
                          {method.icon}
                       </div>
                       <div className="flex flex-col">
                          <span className={`font-headline font-black uppercase tracking-tighter text-sm ${paymentMethod === method.id ? 'text-primary' : 'text-on-surface'}`}>{method.label}</span>
                          <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{method.sub}</span>
                       </div>
                    </button>
                 ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Fresh Order Sidebar */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
             <div className="bg-white rounded-[3.5rem] p-8 lg:p-12 border border-outline-variant/10 shadow-2xl flex flex-col gap-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 border border-primary/10" />
                
                <h2 className="font-headline text-3xl font-black text-on-surface px-2 uppercase tracking-tighter">The Daily Catch</h2>
                
                <div className="flex flex-col gap-8 max-h-[500px] overflow-y-auto px-2 custom-scrollbar pr-4">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                        const facts = getFishFacts(item.image.split('/')[2]); // Try to get by category name from path
                        return (
                          <motion.div 
                            key={`${item.id}-${item.cutType}-${item.weight}`}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col gap-5 p-6 rounded-[2rem] bg-surface-container border border-outline-variant/5 group hover:border-primary/20 transition-all shadow-sm hover:shadow-lg"
                          >
                            <div className="flex items-center gap-5">
                              <div className="w-20 h-20 rounded-2xl bg-white border border-outline-variant/10 overflow-hidden shrink-0 shadow-sm">
                                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex-1 flex flex-col gap-1">
                                  <div className="flex items-center justify-between">
                                     <span className="text-base font-black text-on-surface uppercase tracking-tighter leading-none">{item.name}</span>
                                     <button onClick={() => removeFromCart(item.id, item.cutType, item.weight)} className="text-on-surface-variant/30 hover:text-error transition-colors"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                     <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-black text-[9px] uppercase tracking-widest">Fresh Catch</span>
                                     <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-black text-[9px] uppercase tracking-widest">{item.weight} Portions</span>
                                  </div>
                              </div>
                            </div>

                            {/* Nutrition & Tips Info Section */}
                            <div className="flex flex-col gap-4 py-4 border-t border-outline-variant/10">
                               <div className="flex flex-wrap gap-2">
                                  {facts.benefits.map((b, i) => (
                                     <span key={i} className="flex items-center gap-1.5 text-[10px] font-black text-on-surface-variant/70 uppercase tracking-widest bg-white border border-outline-variant/5 px-2.5 py-1.5 rounded-xl">
                                        <div className="w-1 h-1 rounded-full bg-primary" /> {b}
                                     </span>
                                  ))}
                               </div>
                               <div className="flex gap-3 bg-white/50 p-4 rounded-2xl border border-outline-variant/5">
                                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Flame className="w-4 h-4 text-primary" /></div>
                                  <div className="flex flex-col gap-1">
                                     <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Chef's Advice</span>
                                     <p className="text-[10px] font-bold text-on-surface/70 leading-relaxed uppercase">{facts.tips}</p>
                                  </div>
                               </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                               <div className="flex items-center gap-5">
                                  <div className="flex items-center gap-3">
                                     <button onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity - 1)} className="w-7 h-7 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                                     <span className="text-xs font-black text-on-surface w-4 text-center">{item.quantity}</span>
                                     <button onClick={() => updateQuantity(item.id, item.cutType, item.weight, item.quantity + 1)} className="w-7 h-7 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
                                  </div>
                               </div>
                               <div className="flex flex-col items-end">
                                  <span className="text-xs font-bold text-on-surface-variant/40 line-through">₹{(item.price * 1.2 * item.quantity).toFixed(0)}</span>
                                  <span className="text-base font-black text-primary leading-none uppercase">{formatPrice(item.price * item.quantity)}</span>
                               </div>
                            </div>
                          </motion.div>
                        );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-5 px-4 pt-10 border-t border-outline-variant/10">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-on-surface-variant">Market Subtotal</span>
                    <span className="text-on-surface">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-on-surface-variant">Coastal Delivery</span>
                    <span className="text-primary">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-on-surface-variant">Govt. Tax (GST 5%)</span>
                    <span className="text-on-surface">{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-6 pt-6 border-t-2 border-on-surface border-dotted">
                     <div className="flex justify-between items-end">
                        <span className="font-headline text-xl font-black text-on-surface tracking-tighter uppercase leading-none">Net Total</span>
                        <span className="font-headline text-5xl font-black text-primary leading-none tracking-tighter">{formatPrice(finalTotal)}</span>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-2">
                       <Info className="w-4 h-4" /> {error}
                    </motion.div>
                  )}
                  
                  <OceanButton 
                    onClick={handlePlaceOrder}
                    className="w-full h-24 rounded-[2.5rem] bg-primary text-white font-headline font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/30 relative overflow-hidden group"
                  >
                    <div className="relative z-10 flex flex-col items-center gap-1">
                       <span className="group-hover:scale-110 transition-transform">Confirm & Harvest</span>
                       <span className="text-[8px] opacity-60 tracking-[0.4em] font-black">Dispatch to Cold Chain</span>
                    </div>
                  </OceanButton>
                </div>

                <div className="flex flex-col gap-6 mt-6 p-6 rounded-3xl bg-surface-container border border-outline-variant/5">
                   <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5 text-primary" /></div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Coastal Pledge</span>
                         <p className="text-[10px] font-bold text-on-surface-variant uppercase leading-loose">100% Freshness Guarantee. Sourced from active boat landings within 24 hours of dispatch.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
