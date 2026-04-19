import { Star, Clock, Anchor, ShieldCheck, Package } from 'lucide-react';

export default function ProductHeader({ fish }: { fish: any }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <section>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-primary font-label text-sm uppercase tracking-[0.2em]">{fish.category}</span>
          {fish.tags && fish.tags.slice(0, 3).map((tag: string) => (
             <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs uppercase tracking-widest text-primary font-bold">
               {tag}
             </span>
          ))}
        </div>
        <h1 className="font-headline text-[28px] lg:text-[32px] font-black text-white mt-2 leading-tight tracking-tight">
           {fish.name.replace(/\s*\([^)]*\)\s*/g, '')}
        </h1>

        {/* Freshness Badge Below Name */}
        <div className="flex items-center gap-3 mt-4">
           <div className="px-3 py-1.5 bg-[#002f24]/80 backdrop-blur-md rounded-full border border-[#00ff88]/20 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
              <span className="text-sm uppercase tracking-widest text-[#00ff88] font-bold">
                 {fish.freshness || "Fresh Today"}
              </span>
           </div>
           <div className="flex items-center gap-1.5 text-sm text-on-surface-variant font-medium">
              <Clock className="w-4 h-4 text-primary/70" />
              <span>Caught Today 5:30 AM</span>
           </div>
        </div>
        
        {/* Local Name & Price Inline */}
        <div className="flex flex-col gap-2 mt-6">
           {fish.localName && (
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant font-bold">
                Local Name: <span className="text-white">{fish.localName}</span>
              </span>
           )}
           {fish.name.includes('(') && (
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant font-bold">
                Also known as: <span className="text-white">{fish.name.match(/\(([^)]+)\)/)?.[1]}</span>
              </span>
           )}
           <div className="flex items-center gap-3 mt-1">
              <span className="font-headline text-[24px] lg:text-[28px] font-black text-primary">₹{fish.pricePerKg || fish.price}</span>
              <span className="font-label text-sm uppercase tracking-widest text-on-surface-variant font-medium">/ kg (Gross Weight)</span>
           </div>
        </div>

        {/* Rating and Trust Bar */}
        <div className="flex flex-col gap-3 mt-4">
           <div className="flex items-center gap-2 text-on-surface-variant">
             <div className="flex gap-0.5">
               {[1,2,3,4,5].map(i => <Star key={i} className={`w-3.5 h-3.5 text-primary ${i <= (fish.rating || 5) ? 'fill-primary' : ''}`} />)}
             </div>
             <span className="text-sm font-bold uppercase tracking-widest border-l border-white/10 pl-2">
                ({fish.reviewsCount || 128} Verified Ratings)
             </span>
             <span className="text-sm font-bold uppercase tracking-widest text-primary ml-auto flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
               {fish.rating || 4.8}/5 
             </span>
           </div>

           <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-2.5 text-sm uppercase tracking-widest font-bold text-white/80 bg-surface-container/50 rounded-xl px-4 py-2.5 border border-white/5 shadow-sm">
                 <ShieldCheck className="w-4 h-4 text-primary" /> 
                 <span className="flex-1">Quality Certified (FSSAI)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm uppercase tracking-widest font-bold text-white/80 bg-surface-container/50 rounded-xl px-4 py-2.5 border border-white/5 shadow-sm">
                 <Package className="w-4 h-4 text-primary" /> 
                 <span className="flex-1">1000+ Fresh Deliveries</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm uppercase tracking-widest font-bold text-white/80 bg-surface-container/50 rounded-xl px-4 py-2.5 border border-white/5 shadow-sm">
                 <Anchor className="w-4 h-4 text-primary" /> 
                 <span className="flex-1">Direct: {fish.source || "Local Catch"}</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
