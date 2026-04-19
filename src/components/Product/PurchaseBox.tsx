import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Info, Star, Package, ThermometerSnowflake, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';

export default function PurchaseBox({ fish }: { fish: any }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState<'500g' | '1kg' | 'Custom'>('1kg');
  const [prepCut, setPrepCut] = useState('Curry Cut');
  const [isCleaned, setIsCleaned] = useState(true);
  const [purchaseMode, setPurchaseMode] = useState<'Retail' | 'Wholesale'>('Retail');
  const [wholesaleWeight, setWholesaleWeight] = useState<1 | 5 | 10>(5);
  const [deliverySlot, setDeliverySlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [isAdded, setIsAdded] = useState(false);

  const basePrice = fish.pricePerKg || fish.price;
  let finalTotal = 0;
  if (purchaseMode === 'Retail') {
    finalTotal = Math.round(basePrice * (weight === '500g' ? 0.5 : 1) * quantity);
  } else {
    // Wholesale mode dynamic scaling
    let pricePerKg = basePrice;
    if (wholesaleWeight === 5) pricePerKg = Math.round(basePrice * 0.95);
    else if (wholesaleWeight === 10) pricePerKg = Math.round(basePrice * 0.90);
    finalTotal = pricePerKg * wholesaleWeight * quantity;
  }

  const handleAddToCart = () => {
    addToCart({
      id: fish.id || fish.name,
      name: fish.name.replace(/\s*\([^)]*\)\s*/g, ''),
      price: purchaseMode === 'Retail' ? (weight === '500g' ? basePrice * 0.5 : basePrice) : (wholesaleWeight === 5 ? basePrice * 0.95 : wholesaleWeight === 10 ? basePrice * 0.90 : basePrice) * wholesaleWeight,
      weight: purchaseMode === 'Retail' ? weight : `${wholesaleWeight}kg Wholesale`,
      cutType: `${isCleaned ? 'Cleaned' : 'Raw'} ${prepCut}`,
      quantity: quantity,
      image: fish.image1 || fish.primary
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center lg:items-start lg:shrink-0">
      <div className="w-full max-w-md bg-surface-container-high rounded-[2.5rem] p-8 lg:p-10 border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        {/* Toggle Retail vs Wholesale */}
        <div className="flex items-center gap-1 bg-surface-container/50 p-1.5 rounded-full border border-outline-variant/10 w-full mb-2">
           <button onClick={() => setPurchaseMode('Retail')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all ${purchaseMode === 'Retail' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-white'}`}>Retail</button>
           <button onClick={() => setPurchaseMode('Wholesale')} className={`flex-1 py-4 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all ${purchaseMode === 'Wholesale' ? 'bg-[#ff9d00] text-black shadow-lg shadow-[#ff9d00]/20' : 'text-on-surface-variant hover:text-white'}`}>Wholesale</button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                <span className="font-label text-sm uppercase tracking-[0.2em] text-primary font-black">In Stock Now</span>
             </div>
             <div className="flex items-center gap-1.5 bg-surface-container rounded-full px-3 py-1.5 border border-white/10 shadow-sm">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-black tracking-widest text-white">{fish.rating || 4.8} <span className="text-white/40 font-bold ml-1">({fish.reviewsCount || 128})</span></span>
             </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-[40px] lg:text-[48px] font-black text-white leading-none">
               ₹{finalTotal}
            </span>
          </div>
          <span className="text-xs text-on-surface-variant uppercase font-black tracking-[0.2em] mt-2 opacity-60">
             Final Estimated Total
          </span>
        </div>

        {/* Preparation Options Block */}
        <div className="flex flex-col gap-6 pt-4 pb-4 border-y border-white/5 my-2">
           <div className="flex items-center justify-between">
              <span className="font-label text-sm uppercase tracking-widest text-white/40 font-black">Style</span>
              <div className="flex items-center gap-1 bg-surface-container rounded-full p-1.5 border border-outline-variant/10 shadow-inner">
                 <button onClick={() => setIsCleaned(false)} className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${!isCleaned ? 'bg-[#ff6b6b] text-white shadow-md' : 'text-on-surface-variant hover:text-white'}`}>Raw</button>
                 <button onClick={() => setIsCleaned(true)} className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isCleaned ? 'bg-primary text-black shadow-md' : 'text-on-surface-variant hover:text-white'}`}>Clean</button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3">
             {[
               { id: 'Whole', desc: 'Kept fully intact.' },
               { id: 'Curry Cut', desc: 'Medium chunks suitable for gravies.' },
               { id: 'Fry Cut', desc: 'Slightly thicker slices.' },
               { id: 'Fillet', desc: 'Precision boneless side cuts.' }
             ].map((cut) => (
                <button 
                  key={cut.id}
                  onClick={() => setPrepCut(cut.id)}
                  className={`relative flex flex-col items-center justify-center p-5 rounded-3xl border transition-all text-center group min-h-[80px] ${prepCut === cut.id ? 'border-primary bg-primary/10 shadow-[0_10px_20px_-5px_rgba(0,218,243,0.3)]' : 'border-outline-variant/20 hover:border-outline-variant hover:bg-surface-container-high'}`}
                >
                   <span className={`font-headline font-bold text-sm uppercase tracking-widest ${prepCut === cut.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-white'}`}>{cut.id}</span>
                   <div className="group/tooltip absolute top-2 right-2">
                     <Info className={`w-3.5 h-3.5 ${prepCut === cut.id ? 'text-primary' : 'text-white/20'}`} />
                     <div className="absolute bottom-full right-[-10px] mb-3 w-48 p-4 bg-[#0a1a1f] border border-primary/20 rounded-2xl text-[11px] text-white font-medium opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all z-20 shadow-2xl leading-relaxed backdrop-blur-xl">
                        {cut.desc}
                     </div>
                   </div>
                </button>
             ))}
           </div>
           
           <div className="text-[11px] text-primary font-black uppercase tracking-[0.15em] bg-primary/5 px-4 py-3 rounded-2xl border border-primary/10 flex items-center justify-center">
             Selection: <span className="ml-2 text-white">{isCleaned ? 'Cleaned' : 'Raw'} {prepCut}</span>
           </div>
        </div>

        {purchaseMode === 'Retail' ? (
           <div className="flex flex-col gap-4">
              <span className="font-label text-sm uppercase tracking-widest text-white/40 font-black">Weight (Gross)</span>
              <div className="grid grid-cols-3 gap-3">
                {['500g', '1kg', 'Custom'].map((opt) => (
                   <button 
                     key={opt}
                     onClick={() => setWeight(opt as any)}
                     className={`h-14 rounded-2xl border flex items-center justify-center font-headline font-black text-sm uppercase tracking-widest transition-all ${weight === opt ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10' : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant hover:text-white'}`}
                   >
                      {opt}
                   </button>
                ))}
              </div>
              {weight === 'Custom' && (
                 <p className="text-[11px] text-primary/70 font-bold italic pl-1 text-center bg-primary/5 py-2 rounded-lg border border-primary/10">Bulk orders contact support</p>
              )}
           </div>
        ) : (
           <div className="flex flex-col gap-5 mt-2 bg-[#ff9d00]/5 p-6 rounded-[2rem] border border-[#ff9d00]/10">
              <div className="flex items-center justify-between">
                 <span className="font-label text-xs uppercase tracking-[0.2em] text-[#ff9d00] font-black">Bulk Packs</span>
                 <span className="px-2.5 py-1 bg-[#ff9d00] text-black rounded-lg text-[10px] uppercase tracking-widest font-black shrink-0 border border-white/10">Restaurant Grade</span>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { kg: 1, label: '1kg MOQ', price: basePrice, discount: '0%' },
                  { kg: 5, label: '5kg MOQ', price: Math.round(basePrice * 0.95), discount: '5% off' },
                  { kg: 10, label: '10kg MOQ', price: Math.round(basePrice * 0.90), discount: '10% off', best: true }
                ].map((tier) => (
                   <button 
                     key={tier.kg}
                     onClick={() => setWholesaleWeight(tier.kg as any)}
                     className={`flex flex-col gap-1 p-5 rounded-2xl border transition-all relative overflow-hidden ${wholesaleWeight === tier.kg ? 'border-[#ff9d00] bg-[#ff9d00]/10 shadow-[0_10px_20px_-5px_rgba(255,157,0,0.2)]' : 'border-outline-variant/10 hover:border-outline-variant hover:bg-surface-container-high'}`}
                   >
                     <div className="flex items-center justify-between w-full">
                        <span className={`font-headline font-black text-base uppercase tracking-widest ${wholesaleWeight === tier.kg ? 'text-[#ff9d00]' : 'text-white/60'}`}>{tier.label}</span>
                        <span className="font-headline font-black text-white text-lg">₹{tier.price}/kg</span>
                     </div>
                     <div className="flex items-center justify-between w-full mt-1">
                        {tier.best ? <span className="bg-[#ff9d00] text-black text-[9px] uppercase font-black px-2 py-0.5 rounded-sm">Premium Price</span> : <div/>}
                        {tier.discount !== '0%' && <span className="text-[10px] text-[#00ff88] font-black uppercase tracking-widest">Save {tier.discount} Total</span>}
                     </div>
                   </button>
                ))}
              </div>
           </div>
        )}

        <div className="flex items-center justify-between bg-surface-container-highest/30 rounded-3xl p-3 outline outline-1 outline-outline-variant/15 shadow-inner">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-surface-container text-white hover:text-primary transition-all hover:bg-surface-container-high active:scale-95"
          >
            <Minus className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
             <span className="font-headline text-3xl font-black w-16 text-center text-white">{quantity}</span>
             <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black opacity-60">Unit Qty</span>
          </div>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-surface-container text-white hover:text-primary transition-all hover:bg-surface-container-high active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full h-20 rounded-[2rem] font-headline font-black uppercase text-base tracking-[0.2em] flex items-center justify-center gap-4 transition-all active:scale-95 duration-500 relative overflow-hidden group ${isAdded ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20' : 'bg-primary text-black hover:shadow-[0_20px_40px_-5px_rgba(0,218,243,0.4)] hover:-translate-y-2'}`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div key="check" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                  <CheckCircle className="w-7 h-7" /> Added
                </motion.div>
              ) : (
                <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                  <ShoppingBag className="w-7 h-7" />
                  Add to Cargo
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          
          <div className="flex justify-between items-center bg-surface-container rounded-2xl p-4 border border-outline-variant/10 shadow-sm">
             <div className="flex items-center gap-2.5 w-1/2 justify-center border-r border-white/10">
                <ShieldCheck className="w-5 h-5 text-primary opacity-80" />
                <span className="text-[10px] uppercase font-black tracking-widest text-white/50">Safe Pay</span>
             </div>
             <div className="flex items-center gap-2.5 w-1/2 justify-center">
                <Package className="w-5 h-5 text-primary opacity-80" />
                <span className="text-[10px] uppercase font-black tracking-widest text-white/50">Fast Ship</span>
             </div>
          </div>
        </div>

        {/* Delivery Information System */}
        <div className="flex flex-col gap-5 py-6 border-t border-outline-variant/10">
           <span className="font-label text-sm uppercase tracking-widest text-white/40 font-black mb-1">Pick Your Slot</span>
           <div className="grid grid-cols-3 gap-3">
             {['Morning', 'Afternoon', 'Evening'].map((slot) => (
               <button 
                 key={slot}
                 onClick={() => setDeliverySlot(slot as any)}
                 className={`h-16 rounded-xl border flex items-center justify-center font-headline font-bold text-xs uppercase tracking-widest transition-all ${deliverySlot === slot ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10' : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant hover:text-white'}`}
               >
                 {slot}
               </button>
             ))}
           </div>
           
           <div className="flex flex-col gap-6 mt-2 bg-black/20 rounded-[2rem] p-6 lg:p-8 border border-white/5 shadow-inner">
             <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                   <Truck className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                   <span className="font-headline text-base font-bold text-white leading-tight">Hyper-Local Speed</span>
                   <p className="text-sm text-on-surface-variant leading-relaxed font-medium">Delivered to your door in <span className="text-white font-bold">6–8 hours</span>.</p>
                </div>
             </div>
             
             <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-2xl bg-[#00e5ff]/10 flex items-center justify-center shrink-0 border border-[#00e5ff]/20">
                   <ThermometerSnowflake className="w-5 h-5 text-[#00e5ff]" />
                </div>
                <div className="flex flex-col gap-1">
                   <span className="font-headline text-base font-bold text-white leading-tight">Bio-Cold Shield</span>
                   <p className="text-sm text-on-surface-variant leading-relaxed font-medium">Thermal monitoring at <span className="text-[#00e5ff] font-black">0–4°C</span>.</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
