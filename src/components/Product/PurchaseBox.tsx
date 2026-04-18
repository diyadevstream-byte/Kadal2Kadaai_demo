import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export default function PurchaseBox({ fish }: { fish: any }) {
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState<'500g' | '1kg' | 'Custom'>('1kg');

  return (
    <div className="md:col-span-5 lg:col-span-3 sticky top-24">
      <div className="bg-surface-container-high rounded-[2.5rem] p-6 lg:p-8 border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
             <span className="font-label text-[10px] uppercase tracking-widest text-primary font-black">In Stock</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="font-headline text-5xl font-black text-white leading-none">
               ₹{Math.round(fish.price * (weight === '500g' ? 0.5 : 1) * quantity)}
            </span>
          </div>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mt-1">
             Total calculated price
          </span>
        </div>

        <div className="flex flex-col gap-3">
           <span className="font-label text-xs uppercase tracking-widest text-white/50 font-bold">Select Gross Weight</span>
           <div className="grid grid-cols-3 gap-2">
             {['500g', '1kg', 'Custom'].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => setWeight(opt as any)}
                  className={`h-12 rounded-xl border flex items-center justify-center font-headline font-bold text-sm transition-all ${weight === opt ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant hover:text-white'}`}
                >
                   {opt}
                </button>
             ))}
           </div>
           {weight === 'Custom' && (
              <p className="text-[9px] text-primary/80 italic pl-1">For bulk orders (over 5kg), please contact support after checkout.</p>
           )}
        </div>

        <div className="flex items-center justify-between bg-surface-container-highest/30 rounded-2xl p-2 outline outline-1 outline-outline-variant/10">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container text-white hover:text-primary transition-colors hover:bg-surface-container-high"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center">
             <span className="font-headline text-2xl font-bold w-12 text-center text-white">{quantity}</span>
             <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Qty</span>
          </div>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container text-white hover:text-primary transition-colors hover:bg-surface-container-high"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <button className="w-full h-14 rounded-2xl bg-primary text-black font-headline font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_15px_30px_-5px_rgba(0,218,243,0.4)] hover:-translate-y-1 transition-all active:scale-95 duration-300">
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </button>
          <button className="w-full h-12 rounded-2xl border border-primary/20 text-primary font-headline font-black uppercase text-xs tracking-widest hover:bg-primary/10 transition-all">
            Buy It Now
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-2 py-4 border-t border-outline-variant/10">
           <div className="flex items-start gap-4">
              <Truck className="w-5 h-5 text-primary shrink-0 opacity-80" />
              <div className="flex flex-col gap-0.5">
                 <span className="font-headline text-xs font-bold text-white">Delivery by Tomorrow, 9 AM</span>
                 <span className="text-[10px] text-on-surface-variant leading-relaxed">Order within <span className="text-primary font-bold">2 hrs 45 mins</span> to get it fresh on the next delivery run.</span>
              </div>
           </div>
           <div className="flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 opacity-80" />
              <div className="flex flex-col gap-0.5">
                 <span className="font-headline text-xs font-bold text-white">100% Freshness Guarantee</span>
                 <span className="text-[10px] text-on-surface-variant leading-relaxed">If it's not ocean-fresh, get a no-questions-asked refund.</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
