import { Anchor, Scissors, MapPin, CheckCircle2, Truck, Scale, ThermometerSnowflake, Clock, Flame, ChefHat } from 'lucide-react';

export default function ProductExtendedDetails({ fish }: { fish: any }) {
  return (
    <div className="flex flex-col gap-14 w-full mt-4">
      {/* Description Block */}
      <section className="flex flex-col gap-6 max-w-xl">
         <h3 className="font-headline text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
           <Anchor className="w-5 h-5" /> The Source & Cut
         </h3>
         <p className="font-body text-lg text-on-surface-variant leading-relaxed font-medium">
            Sustainably harvested from coastal deep waters and processed within hours to guarantee peak freshness. 
            Available in multiple prime formats.
         </p>
         <div className="flex gap-4 mt-2 flex-wrap">
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-surface-container-low border border-white/5 text-xs font-black uppercase tracking-widest text-white/90 shadow-sm shadow-black/20">
               <Scissors className="w-4 h-4 text-primary" /> Whole Cleaned
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-surface-container-low border border-white/5 text-xs font-black uppercase tracking-widest text-white/90 shadow-sm shadow-black/20">
               <Scissors className="w-4 h-4 text-primary" /> Curry Cut
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-surface-container-low border border-white/5 text-xs font-black uppercase tracking-widest text-white/90 shadow-sm shadow-black/20">
               <MapPin className="w-4 h-4 text-primary" /> Eastern Bay
            </span>
         </div>
      </section>

      {/* Key Highlights Card - Block Styling (Width < Height focus) */}
      <section className="bg-gradient-to-br from-surface-container to-surface-container-low rounded-[3rem] p-10 lg:p-12 border border-white/[0.03] shadow-2xl max-w-sm mr-auto min-h-[480px] flex flex-col">
         <h3 className="font-headline text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-10 border-b border-white/5 pb-6">Marketplace Promises</h3>
         <ul className="flex flex-col gap-10">
           <li className="flex flex-col gap-4 group">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6 text-primary" />
             </div>
             <div className="flex flex-col gap-1.5">
                <span className="font-headline text-lg font-black text-white">Hygienically Processed</span>
                <span className="text-sm text-on-surface-variant font-medium leading-relaxed">RO water washed and vacuum packed at source.</span>
             </div>
           </li>
           <li className="flex flex-col gap-4 group">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                <Anchor className="w-6 h-6 text-primary" />
             </div>
             <div className="flex flex-col gap-1.5">
                <span className="font-headline text-lg font-black text-white">Same Day Batch</span>
                <span className="text-sm text-on-surface-variant font-medium leading-relaxed">Never industrial-frozen. Sourced daily from local docks.</span>
             </div>
           </li>
           <li className="flex flex-col gap-4 group">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6 text-primary" />
             </div>
             <div className="flex flex-col gap-1.5">
                <span className="font-headline text-lg font-black text-white">Bio-Cold Shield</span>
                <span className="text-sm text-on-surface-variant font-medium leading-relaxed">Continuous 0-4°C monitoring until doorstep.</span>
             </div>
           </li>
         </ul>
      </section>

      {/* Specifications Block - Vertical Hierarchy */}
      <section className="border-t border-white/5 pt-14">
         <h3 className="font-headline text-xs font-black text-white/40 mb-10 flex items-center gap-3 uppercase tracking-[0.4em]">
           <Scale className="w-5 h-5 text-primary" /> Tech Specifications
         </h3>
         <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex flex-col gap-3 p-6 bg-surface-container-low/40 rounded-3xl border border-white/5 hover:border-primary/20 transition-all shadow-sm">
               <div className="flex items-center gap-2.5 text-on-surface-variant mb-1">
                  <Scale className="w-4 h-4 text-primary" /> <span className="font-label text-[10px] uppercase tracking-[0.3em] font-black">Net Mass Match</span>
               </div>
               <span className="text-sm text-white font-bold leading-relaxed">Yield is typically 15-20% lower after core cleaning.</span>
            </div>
            <div className="flex flex-col gap-3 p-6 bg-surface-container-low/40 rounded-3xl border border-white/5 hover:border-primary/20 transition-all shadow-sm">
               <div className="flex items-center gap-2.5 text-on-surface-variant mb-1">
                  <ThermometerSnowflake className="w-4 h-4 text-primary" /> <span className="font-label text-[10px] uppercase tracking-[0.3em] font-black">Optimal Storage</span>
               </div>
               <span className="text-sm text-white font-bold leading-relaxed">Maintain strict 0-4°C refrigeration environment.</span>
            </div>
            <div className="flex flex-col gap-3 p-6 bg-surface-container-low/40 rounded-3xl border border-white/5 hover:border-primary/20 transition-all shadow-sm">
               <div className="flex items-center gap-2.5 text-on-surface-variant mb-1">
                  <Clock className="w-4 h-4 text-primary" /> <span className="font-label text-[10px] uppercase tracking-[0.3em] font-black">Integrity Window</span>
               </div>
               <span className="text-sm text-white font-bold leading-relaxed">Peak oceanic flavor within 48 hours of delivery.</span>
            </div>
         </div>
      </section>

      {/* Culinary Suggestions - Vertical Cards */}
      <section className="border-t border-white/5 pt-14 mt-4">
         <div className="flex items-center gap-3 mb-10">
            <ChefHat className="w-6 h-6 text-primary" />
            <h3 className="font-headline text-xs font-black text-white uppercase tracking-[0.4em]">Culinary Index</h3>
         </div>
         
         <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-5 py-2.5 bg-surface-container rounded-2xl text-[10px] font-black text-white border border-white/5 flex items-center gap-2.5 shadow-md uppercase tracking-[0.2em]">
               <Flame className="w-4 h-4 text-[#ff9d00]" /> Ideal: Fry
            </span>
            <span className="px-5 py-2.5 bg-surface-container rounded-2xl text-[10px] font-black text-white border border-white/5 shadow-md uppercase tracking-[0.2em]">
               Prime: Curry
            </span>
         </div>

         <div className="flex flex-col md:flex-row gap-8 max-w-2xl">
            <div className="flex-1 group bg-surface-container-low rounded-[2.5rem] p-8 border border-white/5 hover:bg-surface-container hover:border-primary/30 transition-all cursor-default shadow-xl min-h-[220px] flex flex-col justify-center">
               <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary font-black">Fast Mode</span>
               <h4 className="font-headline text-lg font-black text-white mt-3 mb-4 group-hover:text-primary transition-colors">Classic Coastal Fry</h4>
               <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic">
                  Marinate with turmeric and chili. Shallow fry in local coconut oil until golden-crisp.
               </p>
            </div>
            <div className="flex-1 group bg-surface-container-low rounded-[2.5rem] p-8 border border-white/5 hover:bg-surface-container hover:border-[#00e5ff]/30 transition-all cursor-default shadow-xl min-h-[220px] flex flex-col justify-center">
               <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#00e5ff] font-black">Traditional</span>
               <h4 className="font-headline text-lg font-black text-white mt-3 mb-4 group-hover:text-[#00e5ff] transition-colors">Spicy Tamarind Gravy</h4>
               <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic">
                  Simmer in tangy tamarind base infused with roasted coriander for 15-20 minutes.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
