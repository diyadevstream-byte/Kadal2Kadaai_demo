import { Flame, Activity, Info, ChevronRight, Utensils } from 'lucide-react';

export default function EngagingContent({ fish }: { fish: any }) {
  const fishName = fish.name.replace(/\s*\([^)]*\)\s*/g, '');

  return (
    <div className="w-full flex flex-col gap-10 mt-4 pb-12">
      
      {/* Dynamic Title */}
      <div className="flex items-center gap-4 border-b border-outline-variant/10 pb-6">
         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <Utensils className="w-5 h-5 text-primary" />
         </div>
         <h2 className="font-headline text-2xl font-black text-white tracking-tight">Experience {fishName}</h2>
      </div>

      <div className="flex flex-col gap-10 items-center lg:items-start">
        
        {/* Recipe Block - Fixed Proportion Styling (Width < Height) */}
        <div className="w-full max-w-[340px] md:max-w-sm group relative bg-surface-container-low rounded-[3rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl cursor-pointer flex flex-col min-h-[500px]">
           <div className="aspect-[4/5] w-full relative overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1594834749740-74b335dddd18?q=80&w=1000&auto=format&fit=crop" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 blur-[0.5px] group-hover:blur-0" 
               alt={`${fishName} Recipe`} 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent" />
             
             {/* Tag */}
             <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#ff9d00]" />
                <span className="text-xs uppercase font-black tracking-[0.2em] text-white">Signature Dish</span>
             </div>
           </div>

           <div className="p-8 lg:p-10 flex flex-col gap-5 z-10 -mt-20 bg-gradient-to-b from-transparent via-surface-container-low/98 to-surface-container-low flex-1">
              <h3 className="font-headline text-2xl font-black text-white group-hover:text-primary transition-colors leading-[1.1] tracking-tight">Pan-Seared Lemon Butter {fishName}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                High-heat preparation that locks in natural juices while creating a crisp, golden exterior.
              </p>
              <div className="mt-auto pt-4">
                 <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:drop-shadow-[0_0_12px_rgba(0,218,243,0.5)] transition-all">
                   Full Step-by-Step <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>

        {/* Nutritional Highlights - Balanced Proportion Styling */}
        <div className="w-full max-w-[340px] md:max-w-sm bg-surface-container-low rounded-[3rem] p-10 lg:p-12 border border-white/5 hover:bg-surface-container transition-all duration-500 shadow-xl flex flex-col gap-8 min-h-[400px]">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/20">
                <Activity className="w-4 h-4 text-[#00ff88]" />
              </div>
              <h4 className="font-headline text-xs font-black text-white uppercase tracking-[0.2em]">Bio-Stats</h4>
           </div>
           
           <div className="flex flex-col gap-8 py-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <span className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Protein</span>
                 <span className="text-3xl font-black text-white">21<span className="text-sm text-on-surface-variant font-medium ml-1">g</span></span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <span className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Calories</span>
                 <span className="text-3xl font-black text-white">140</span>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-xs uppercase tracking-widest text-on-surface-variant font-black">Omega-3</span>
                 <span className="text-2xl font-black text-[#00ff88] uppercase tracking-tighter">High Yield</span>
              </div>
           </div>
           
           <div className="mt-auto pt-6 text-[10px] text-on-surface-variant text-center opacity-40 uppercase tracking-[0.3em] leading-relaxed font-black">
             Estimates per 100g serving
           </div>
        </div>

        {/* Did You Know Fact - Vertical Block Styling */}
        <div className="w-full max-w-[340px] md:max-w-sm bg-gradient-to-br from-primary/10 to-surface-container-low rounded-[3rem] p-10 lg:p-12 border border-primary/20 flex flex-col justify-center relative overflow-hidden group min-h-[320px]">
           <div className="absolute -right-8 -top-8 opacity-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
             <Info className="w-48 h-48 text-primary" />
           </div>
           
           <div className="relative z-10 flex flex-col gap-6">
             <div className="flex items-center gap-3">
                <span className="flex w-8 h-8 bg-primary text-black rounded-lg items-center justify-center font-black text-sm shadow-xl shadow-primary/20">?</span>
                <span className="font-headline text-xs font-black text-primary uppercase tracking-[0.3em]">Trivia</span>
             </div>
             <p className="text-lg text-white font-medium leading-relaxed italic tracking-tight">
               "{fishName} is known for its incredible versatility. It works perfectly for grilling, steaming, or pan-frying without losing texture."
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
