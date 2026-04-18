import React, { useState } from 'react';
import { Star, Anchor, Scissors, MapPin, CheckCircle2, Truck, Scale, ThermometerSnowflake, Clock } from 'lucide-react';

export default function ProductDetails({ fish }: { fish: any }) {
  return (
    <div className="md:col-span-7 lg:col-span-3 flex flex-col gap-10 py-4">
      <section>
        <span className="text-primary font-label text-xs uppercase tracking-[0.2em]">{fish.category}</span>
        <h1 className="font-headline text-4xl lg:text-5xl font-black text-white mt-2 leading-none tracking-tight">
           {fish.name.replace(/\s*\([^)]*\)\s*/g, '')}
        </h1>
        
        {/* Local Name & Price Inline */}
        <div className="flex flex-col gap-1 mt-4">
           {fish.name.includes('(') && (
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant/80 font-bold">
                Also known as: <span className="text-white">{fish.name.match(/\(([^)]+)\)/)?.[1]}</span>
              </span>
           )}
           <div className="flex items-center gap-3">
              <span className="font-headline text-3xl font-black text-primary">₹{fish.price}</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">/ kg (Gross Weight)</span>
           </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-on-surface-variant">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest border-l border-white/10 pl-2">(128 Verified Ratings)</span>
        </div>
      </section>

      {/* Description Block */}
      <section className="flex flex-col gap-4">
         <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
           <Anchor className="w-4 h-4 text-primary" /> The Source & Cut
         </h3>
         <p className="font-body text-sm text-on-surface-variant leading-relaxed">
           Sustainably harvested from the coastal deep waters and processed within hours to guarantee peak freshness. 
           Available in multiple preferred formats.
         </p>
         <div className="flex gap-3 mt-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/10 text-xs font-medium text-white/90">
               <Scissors className="w-3.5 h-3.5 text-primary/70" /> Whole Cleaned
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/10 text-xs font-medium text-white/90">
               <Scissors className="w-3.5 h-3.5 text-primary/70" /> Curry Cut
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/10 text-xs font-medium text-white/90">
               <MapPin className="w-3.5 h-3.5 text-primary/70" /> Bay of Bengal
            </span>
         </div>
      </section>

      {/* Key Highlights */}
      <section className="bg-gradient-to-br from-surface-container to-surface-container-low rounded-[2rem] p-6 lg:p-8 border border-white/[0.03]">
         <h3 className="font-headline text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-6">Marketplace Promises</h3>
         <ul className="flex flex-col gap-5">
           <li className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
             </div>
             <div className="flex flex-col">
                <span className="font-headline text-sm font-bold text-white">Hygienically Cleaned</span>
                <span className="text-xs text-on-surface-variant font-medium mt-0.5">RO water washed and vacuum packed.</span>
             </div>
           </li>
           <li className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Anchor className="w-4 h-4 text-primary" />
             </div>
             <div className="flex flex-col">
                <span className="font-headline text-sm font-bold text-white">Same Day Catch</span>
                <span className="text-xs text-on-surface-variant font-medium mt-0.5">Never frozen. Sourced fresh daily from local docks.</span>
             </div>
           </li>
           <li className="flex items-start gap-4">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-primary" />
             </div>
             <div className="flex flex-col">
                <span className="font-headline text-sm font-bold text-white">Cold Chain Delivery</span>
                <span className="text-xs text-on-surface-variant font-medium mt-0.5">Delivered at 0-4°C to retain biological integrity.</span>
             </div>
           </li>
         </ul>
      </section>

      {/* Specifications */}
      <section className="border-t border-outline-variant/10 pt-8">
         <h3 className="font-headline text-sm font-bold text-white mb-6">Specifications</h3>
         <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-on-surface-variant mb-1">
                  <Scale className="w-4 h-4" /> <span className="font-label text-[10px] uppercase tracking-widest font-bold">Weight Match</span>
               </div>
               <span className="text-sm text-white font-medium">Net wt. usually 15-20% lower after cleaning</span>
            </div>
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-on-surface-variant mb-1">
                  <ThermometerSnowflake className="w-4 h-4" /> <span className="font-label text-[10px] uppercase tracking-widest font-bold">Storage</span>
               </div>
               <span className="text-sm text-white font-medium">Refrigerate at 0-4°C</span>
            </div>
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-on-surface-variant mb-1">
                  <Clock className="w-4 h-4" /> <span className="font-label text-[10px] uppercase tracking-widest font-bold">Shelf Life</span>
               </div>
               <span className="text-sm text-white font-medium">Best within 2 days of delivery</span>
            </div>
         </div>
      </section>
    </div>
  );
}
