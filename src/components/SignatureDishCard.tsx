import { Star, Flame, Clock } from 'lucide-react';
import OceanButton from './OceanButton';
import { motion } from 'motion/react';

export default function SignatureDishCard() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative overflow-hidden bg-white rounded-[3.5rem] p-8 lg:p-12 border border-outline-variant/10 shadow-xl flex flex-col lg:flex-row gap-8 items-center group"
    >
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
      
      {/* Image Section */}
      <div className="relative w-full lg:w-48 h-48 rounded-[2.5rem] overflow-hidden shadow-lg shrink-0">
        <img 
          src="/Photos/Crabs/Mangrove Crab (Mangrove Nandu) (1).jpg" 
          alt="Mangrove Crab" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
           <div className="bg-primary px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-lg">Chef's Choice</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-4 text-center lg:text-left">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
             <div className="flex gap-0.5">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
             </div>
             <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">(108 Reviews)</span>
          </div>
          <h3 className="font-headline text-2xl lg:text-3xl font-black text-on-surface uppercase tracking-tight">Mangrove Crab (M)</h3>
          <p className="text-xs font-bold text-on-surface-variant leading-relaxed max-w-sm">
            Sourced from pristine backwaters. Sweet, succulent meat with a firm texture. Perfect for traditional masala fries.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
           <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-2xl border border-outline-variant/5">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Spicy Masala Ready</span>
           </div>
           <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-2xl border border-outline-variant/5">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">15m Prep Time</span>
           </div>
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
         <div className="flex flex-col items-center lg:items-end">
            <span className="text-xs font-bold text-on-surface-variant/40 line-through">₹499</span>
            <span className="font-headline text-4xl font-black text-primary leading-none">₹367</span>
         </div>
         <OceanButton className="px-8 h-12 rounded-xl bg-on-surface text-white font-black uppercase tracking-widest text-[10px]">
            Add to Feast
         </OceanButton>
      </div>
    </motion.div>
  );
}
