import { Star, Flame, Clock, Sparkles } from 'lucide-react';
import OceanButton from './OceanButton';
import { motion } from 'motion/react';

export default function SignatureDishCard() {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-white rounded-[4rem] p-8 lg:p-12 border-2 border-primary/5 shadow-[0_32px_64px_-12px_rgba(230,81,0,0.15)] flex flex-col lg:flex-row gap-12 items-center group mb-12"
    >
      {/* Premium Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      {/* Corner Ribbon */}
      <div className="absolute -top-1 -right-1 overflow-hidden w-40 h-40 pointer-events-none">
        <div className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] py-2 text-center rotate-45 translate-x-12 translate-y-6 shadow-lg border-b-2 border-white/20">
          Signature
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full lg:w-64 h-64 rounded-[3rem] overflow-hidden shadow-2xl shrink-0 border-4 border-[#F3EFE6]">
        <img 
          src="/Photos/Crabs/Mangrove Crab (Mangrove Nandu) (1).jpg" 
          alt="Mangrove Crab" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-6 left-6 ring-4 ring-white/30 rounded-full">
           <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> High Demand
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
             <div className="flex gap-1">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
             </div>
             <span className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40">Exclusive Selection</span>
          </div>
          <h3 className="font-headline text-3xl lg:text-5xl font-black text-[#2D2321] uppercase tracking-tighter leading-none">Mangrove Crab <span className="text-primary italic font-light font-body">(Premium)</span></h3>
          <p className="text-sm font-bold text-[#5D4037] leading-relaxed max-w-md opacity-80">
            Known for its sweet, earthy flavor and buttery texture. Harvested from the estuarine mud flats, ensuring the freshest catch for your gourmet meal.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
           <div className="flex items-center gap-3 bg-[#FAF7F2] px-6 py-3 rounded-2xl border border-outline-variant/10 group-hover:border-primary/20 transition-colors">
              <Flame className="w-5 h-5 text-primary" strokeWidth={2.5} />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#2D2321]">Curry Expert</span>
                 <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Ideal for Gravies</span>
              </div>
           </div>
           <div className="flex items-center gap-3 bg-[#FAF7F2] px-6 py-3 rounded-2xl border border-outline-variant/10 group-hover:border-primary/20 transition-colors">
              <Clock className="w-5 h-5 text-primary" strokeWidth={2.5} />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#2D2321]">Zero-Wait</span>
                 <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Ready in 20 Mins</span>
              </div>
           </div>
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex flex-col items-center lg:items-end gap-6 shrink-0 pt-6 lg:pt-0 lg:border-l border-outline-variant/10 lg:pl-12">
         <div className="flex flex-col items-center lg:items-end">
            <span className="text-xs font-black text-[#E65100]/40 uppercase tracking-widest">Market Value ₹499</span>
            <span className="font-headline text-6xl font-black text-primary leading-none tracking-tighter">₹367</span>
         </div>
         <OceanButton className="px-10 h-16 rounded-2xl bg-[#2D2321] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-colors shadow-xl">
            Add to Order
         </OceanButton>
      </div>
    </motion.div>
  );
}
