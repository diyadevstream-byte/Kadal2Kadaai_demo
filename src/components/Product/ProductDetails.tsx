import React, { useState } from 'react';
import { Star, Anchor, Scissors, MapPin, CheckCircle2, Truck, Scale, ThermometerSnowflake, Clock, ShieldCheck, Package, Flame, ChefHat } from 'lucide-react';

export default function ProductDetails({ fish }: { fish: any }) {
  return (
    <div className="md:col-span-7 lg:col-span-3 flex flex-col gap-6">
      <section>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-primary font-label text-xs uppercase tracking-[0.2em]">{fish.category}</span>
          {fish.tags && fish.tags.slice(0, 3).map((tag: string) => (
             <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] uppercase tracking-widest text-primary font-bold">
               {tag}
             </span>
          ))}
        </div>
        <h1 className="font-headline text-4xl lg:text-5xl font-black text-white mt-2 leading-none tracking-tight">
           {fish.name.replace(/\s*\([^)]*\)\s*/g, '')}
        </h1>

        {/* Freshness Badge Below Name */}
        <div className="flex items-center gap-3 mt-4">
           <div className="px-3 py-1.5 bg-[#002f24]/80 backdrop-blur-md rounded-full border border-[#00ff88]/20 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-[#00ff88] font-bold">
                 {fish.freshness || "Fresh Today"}
              </span>
           </div>
           <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <Clock className="w-4 h-4 text-primary/70" />
              <span>Caught Today 5:30 AM</span>
           </div>
        </div>
        
        {/* Local Name & Price Inline */}
        <div className="flex flex-col gap-1 mt-6">
           {fish.localName && (
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant/80 font-bold">
                Local Name: <span className="text-white">{fish.localName}</span>
              </span>
           )}
           {fish.name.includes('(') && (
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant/80 font-bold">
                Also known as: <span className="text-white">{fish.name.match(/\(([^)]+)\)/)?.[1]}</span>
              </span>
           )}
           <div className="flex items-center gap-3 mt-1">
              <span className="font-headline text-3xl font-black text-primary">₹{fish.pricePerKg || fish.price}</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">/ kg (Gross Weight)</span>
           </div>
        </div>

        {/* Rating and Trust Bar */}
        <div className="flex flex-col gap-3 mt-4">
           {/* Rating */}
           <div className="flex items-center gap-2 text-on-surface-variant">
             <div className="flex gap-0.5">
               {[1,2,3,4,5].map(i => <Star key={i} className={`w-3.5 h-3.5 text-primary ${i <= (fish.rating || 5) ? 'fill-primary' : ''}`} />)}
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest border-l border-white/10 pl-2">
                ({fish.reviewsCount || 128} Verified Ratings)
             </span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-primary ml-auto flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
               {fish.rating || 4.8}/5 
             </span>
           </div>

           {/* FSSAI, 1000+ Deliveries, Supplier */}
           <div className="flex items-center gap-x-6 gap-y-2 flex-wrap mt-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/80 bg-surface-container rounded-lg px-2 py-1 border border-white/5">
                 <ShieldCheck className="w-3.5 h-3.5 text-primary" /> FSSAI Approved
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/80 bg-surface-container rounded-lg px-2 py-1 border border-white/5">
                 <Package className="w-3.5 h-3.5 text-primary" /> 1000+ Delivered
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/80 bg-surface-container rounded-lg px-2 py-1 border border-white/5">
                 <Anchor className="w-3.5 h-3.5 text-primary" /> Source: {fish.source || "Local Catch"}
              </div>
           </div>
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

      {/* Culinary Suggestions */}
      <section className="border-t border-outline-variant/10 pt-8 mt-4">
         <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-5 h-5 text-primary" />
            <h3 className="font-headline text-sm font-bold text-white">Culinary Guide</h3>
         </div>
         
         <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-bold text-white border border-white/5 flex items-center gap-1.5 shadow-sm">
               <Flame className="w-3.5 h-3.5 text-[#ff9d00]" /> Best for Fry
            </span>
            <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-bold text-white border border-white/5 shadow-sm">
               Ideal for Curry
            </span>
            <span className="px-3 py-1 bg-surface-container rounded-full text-xs font-bold text-white border border-white/5 shadow-sm">
               Grill Friendly
            </span>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group bg-surface-container-low rounded-2xl p-4 border border-white/5 hover:bg-surface-container hover:border-primary/20 transition-all cursor-default">
               <span className="font-label text-[9px] uppercase tracking-widest text-primary font-bold">Quick Recipe</span>
               <h4 className="font-headline text-sm font-bold text-white mt-1 mb-2 group-hover:text-primary transition-colors">Classic Coast Fry</h4>
               <p className="text-xs text-on-surface-variant leading-relaxed">
                  Marinate with turmeric, red chili powder, ginger-garlic paste, and lemon. Shallow fry in coconut oil until golden and crisp.
               </p>
            </div>
            <div className="group bg-surface-container-low rounded-2xl p-4 border border-white/5 hover:bg-surface-container hover:border-[#00e5ff]/20 transition-all cursor-default">
               <span className="font-label text-[9px] uppercase tracking-widest text-[#00e5ff] font-bold">Traditional</span>
               <h4 className="font-headline text-sm font-bold text-white mt-1 mb-2 group-hover:text-[#00e5ff] transition-colors">Spicy Tamarind Curry</h4>
               <p className="text-xs text-on-surface-variant leading-relaxed">
                  Simmer chunks in a tangy tamarind base infused with roasted coriander, fenugreek, and fresh curry leaves for 15 mins.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
