import React, { useState } from 'react';
import { 
  Droplets, AlertTriangle, BadgeCheck, Clock, Info, 
  Scale, Snowflake, Minus, Plus, ShoppingBag, 
  PlusCircle, CheckCircle, Utensils, Timer, ArrowRight, Heart,
  Star, Share2, X, Anchor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OceanButton from '../components/OceanButton';

function AddonCard({ addon }: { addon: { name: string, price: string, img: string }; key?: React.Key }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-w-[300px] md:min-w-[360px] shrink-0 snap-start bg-surface-container-low rounded-2xl p-4 flex gap-6 items-center outline outline-1 outline-outline-variant/15 hover:bg-surface-container transition-colors group">
      <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface shrink-0">
        <img alt={addon.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={addon.img} />
      </div>
      <div className="flex-1">
        <h4 className="font-headline font-semibold text-on-surface text-base">{addon.name}</h4>
        <p className="font-label text-sm text-primary mt-1 font-bold">{addon.price}</p>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          animate={added ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleAdd}
          className={`mt-3 text-sm font-label font-bold flex items-center gap-1.5 transition-colors origin-left ${added ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
        >
          <motion.div
            initial={false}
            animate={{ scale: added ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {added ? <CheckCircle className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </motion.div>
          {added ? 'Added' : 'Add to order'}
        </motion.button>
      </div>
    </div>
  );
}

const PRODUCT_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDgGmnG_VJo-DT2IBpDflrhZFhgCX-5nDzes1WECHixtIhVCTi9Bh_GV2vP79rFtsd0gZRpANdN4URRU3kcQnBy78AA4fKxW8MUDeJnAcz5PFi9OczCTDi-ynHjbrGh2R_hnJkgLqm5EhM2ZPJIuozO9QiIBvDZk5Wk7YKVYAKM2aersgtQhlgEqJKvcL4sGjl-6qRnZSYIFKubM0H3dy3f35mh9-OXmLPf6_04aOSANW54w7DObH6-wNF_8ljJigRP3O2CxaexZ0la",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVSDPED0Md864w_NuoZberAxwGt072dMIYf7_oPjT2zGcx9ALy-CD593AjM3oCSsamXuuAGcAM9NQhs5C6gJbNc12nr-wuAa-xC5uGJW3Q5CfynHyszfakXom40wTTUQ0jEVly2CpAhD5ijXL3k2X2FJup5Ukl35TpVpBXMM2SE4AY2yg1SnOx3L8eBEBzyrNqJ0aJzgTghq81MgFccHbGH2c0u2OQTTEAqMp6gXFC-dar60OvdXYkMo7LQFqHXhl5ogf2sDplwU5c",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAVGj4oeWjaIumGVaDQz5wZOYfcglPpDXbAeYbjKWzPXM1oGP5fPpZV7L1jD-MVPz4O4TJH2pKJWTzY940AvX4ZVGTOv5FqrEPzo1OKQLOxkN4qeilflfszO-HLiQlT3T1PV-5PfhziLB02Ejyg_9GPYMzyJz0mM58HzO3jKpNJL5LYGGLBNrj818_98QVI8nNU2Dy1TEBgSHfoIESBBX1ZKelpxKGlOfZ4QsXEysIvtx0uTs076ElGbdvyDi8z5HH4x6JzGV7uKqyZ"
];

import { useCart } from '../context/CartContext';

export default function Product() {
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cargoAdded, setCargoAdded] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPos, setPanPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleAddCargo = () => {
    addToCart({
      id: 'seer-fish',
      name: 'Seer Fish',
      price: 2822,
      weight: '1kg',
      cutType: 'Steaks',
      quantity: quantity,
      image: PRODUCT_IMAGES[activeImageIndex]
    });
    setCargoAdded(true);
    setTimeout(() => setCargoAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-on-surface">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4"></div>
      
      {/* GLOBAL LAYOUT CONSTRAINT CONTAINER (1200px) */}
      <main className="max-w-[1200px] mx-auto px-8 lg:px-12 pt-32 pb-24 relative z-10 flex flex-col gap-24">
        
        {/* TOP SECTION (55/45 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-20 items-start">
          
          {/* Left Column: Visuals (55%) */}
          <div className="w-full relative">
            <div 
              className={`relative w-full aspect-square rounded-[3rem] overflow-hidden bg-surface-container-low outline outline-1 outline-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); setDragStart({ x: e.clientX, y: e.clientY }); }}
              onMouseUp={() => setIsDragging(false)}
              onMouseMove={(e) => {
                if (isDragging) {
                  const dx = e.clientX - dragStart.x;
                  const dy = e.clientY - dragStart.y;
                  const { width, height } = e.currentTarget.getBoundingClientRect();
                  const percentX = (dx / width) * 100 * 0.7;
                  const percentY = (dy / height) * 100 * 0.7;
                  setPanPos(prev => ({ x: Math.max(0, Math.min(100, prev.x - percentX)), y: Math.max(0, Math.min(100, prev.y - percentY)) }));
                  setDragStart({ x: e.clientX, y: e.clientY });
                }
              }}
              onWheel={(e) => { if (isHoveringImage) setZoomScale(prev => Math.max(1, Math.min(3, prev - e.deltaY * 0.005))); }}
              onMouseEnter={() => { setIsHoveringImage(true); setZoomScale(1.5); }}
              onMouseLeave={() => { setIsHoveringImage(false); setIsDragging(false); setZoomScale(1); setPanPos({ x: 50, y: 50 }); }}
            >
              <img alt="Fresh Seer Fish" className="w-full h-full object-cover transition-transform duration-300 pointer-events-none" style={{ transform: `scale(${zoomScale})`, transformOrigin: `${panPos.x}% ${panPos.y}%` }} src={PRODUCT_IMAGES[activeImageIndex]} />
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <div className="inline-flex items-center gap-3 bg-surface-variant/90 backdrop-blur-3xl px-5 py-3 rounded-full border border-white/20 text-on-surface font-label text-xs tracking-[0.2em] uppercase shadow-2xl font-black">
                  <Droplets className="w-4 h-4 text-primary fill-current" /> Fresh Batch
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-10 overflow-x-auto pb-4 scrollbar-hide px-2">
              {PRODUCT_IMAGES.map((imgSrc, idx) => (
                <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-surface-container transition-all outline outline-1 outline-offset-4 ${activeImageIndex === idx ? 'outline-primary opacity-100 shadow-[0_0_20px_rgba(0,218,243,0.3)]' : 'outline-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}>
                  <img alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" src={imgSrc} />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Column: Transaction (45%) (Strict Vertical Stack) */}
          <div className="w-full flex flex-col gap-10 items-start lg:sticky lg:top-32 lg:max-w-[440px] ml-auto">
             
             {/* Product Identity Block */}
             <div className="w-full flex flex-col gap-8 bg-surface-container-low p-12 rounded-[3.5rem] border border-white/10 shadow-sm relative overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                     <BadgeCheck className="w-6 h-6 opacity-70" /> <span>Hygienic Control</span>
                  </div>
                  <h1 className="font-headline text-[56px] font-black text-on-surface tracking-tighter leading-none">Seer Fish</h1>
                  <span className="font-headline text-lg text-on-surface-variant font-bold tracking-tight">Premium King Fish</span>
                </div>

                <div className="flex justify-between items-end pt-8 border-t border-white/10">
                   <div className="flex flex-col gap-3">
                      <div className="flex gap-1.5 bg-primary/5 p-2 rounded-xl">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-primary text-primary" />)}
                      </div>
                      <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-black">Verified Ratings</span>
                   </div>
                   <div className="text-right flex flex-col gap-1">
                      <span className="font-headline text-[44px] font-black text-primary leading-none">₹2,822</span>
                      <span className="font-label text-on-surface-variant text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mt-2">Unit Price</span>
                   </div>
                </div>

                {/* Trust Badges Integrated Below Price */}
                <div className="flex flex-wrap gap-3 mt-4">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <Anchor className="w-3.5 h-3.5 text-primary" /> Dock Direct
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" /> FSSAI Approved
                   </div>
                </div>
             </div>

             {/* Purchase Engine Block */}
             <div className="w-full flex flex-col gap-8 bg-surface-container-low rounded-[4rem] p-12 border border-white/10 shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                
                <div className="flex flex-col gap-8">
                  <OceanButton onClick={handleAddCargo} className={`w-full h-24 font-headline font-black text-sm rounded-[2rem] overflow-hidden shadow-[0_25px_50px_-10px_rgba(0,218,243,0.3)] transition-all ${!cargoAdded ? 'bg-gradient-to-br from-[#002e34] to-[#001014] text-white border-primary/20' : 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20'}`}>
                     <div className="flex items-center justify-center gap-5 relative z-20">
                      {cargoAdded ? <CheckCircle className="w-10 h-10" /> : <ShoppingBag className="w-10 h-10" />}
                      <span className="uppercase tracking-[0.4em]">{cargoAdded ? 'Added' : 'Add Selection'}</span>
                    </div>
                  </OceanButton>

                  <div className="flex items-center justify-between bg-surface-container-lowest rounded-[2rem] outline outline-1 outline-white/10 px-10 h-24 shadow-inner">
                    <span className="font-label font-black text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">Quantity</span>
                    <div className="flex items-center gap-10">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-surface text-on-surface-variant hover:text-primary transition-all shadow-xl"><Minus className="w-6 h-6" /></button>
                      <span className="w-8 text-center font-headline font-black text-4xl text-white leading-none">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-surface text-on-surface-variant hover:text-primary transition-all shadow-xl"><Plus className="w-6 h-6" /></button>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* BOTTOM SECTION (Max 3 Columns) */}
        <div className="pt-24 border-t border-white/10">
           <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.6em] text-primary/30 mb-20 text-center lg:text-left">Intelligence Grid</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start">
              
              {/* Recipe Block */}
              <div className="flex flex-col w-full max-w-sm mx-auto lg:mx-0 bg-surface-container-low rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl">
                 <div className="aspect-square relative overflow-hidden">
                    <img alt="Cooked Fish" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbY54xBqWFGkLbLyvpKnDz89U4M98DqTlQdQy1YjLdvlwLJ-CsDAyaO663ap4CLdL3dq7UhoNPZ2hIhlzlVh5bUfbdR6_SkjwjaCCd7W3IqPHBpjMn-RnvIR1O9BIGoDD8BWyup8IRfSr4NsUok3M0kjolASEkCr9fCqPtpfTBTJqluOjZRg9tQNmpek4Np70g9hkVi16x4X8JdQxt_3gINNuAc4W2C1oG9NWt1iUaNw4jb_bqOMWrwj8JHR0e7Krp94LZst4_bm7d" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
                 </div>
                 <div className="p-12 flex flex-col gap-6">
                    <span className="font-label text-[10px] text-primary font-black uppercase tracking-[0.4em]">Culinary Feed</span>
                    <h4 className="font-headline text-2xl font-black text-white leading-tight">Coast Fry Perfection</h4>
                    <p className="text-base text-on-surface-variant font-medium leading-relaxed italic opacity-60">"15 minutes setup for total oceanic satisfaction."</p>
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary mt-6 group py-2">
                       View Guide <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                 </div>
              </div>

              {/* Nutrition Block */}
              <div className="flex flex-col w-full max-w-sm mx-auto lg:mx-0 p-14 bg-surface-container-low rounded-[4rem] border border-white/5 shadow-2xl gap-12 min-h-[500px]">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20"><Scale className="w-7 h-7 text-primary" /></div>
                    <span className="font-headline text-xs font-black uppercase tracking-[0.4em] text-white">Bio Stats</span>
                 </div>
                 <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Protein</span>
                       <span className="text-3xl font-black text-primary leading-none">22g</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Energy</span>
                       <span className="text-3xl font-black text-white leading-none">105</span>
                    </div>
                 </div>
                 <p className="text-lg text-on-surface-variant font-medium leading-relaxed mt-auto">High-integrity Omega-3 yields for peak performance diets.</p>
              </div>

              {/* Logistics Block */}
              <div className="flex flex-col w-full max-w-sm mx-auto lg:mx-0 p-14 bg-surface-container-low rounded-[4rem] border border-white/5 shadow-2xl gap-12 min-h-[500px]">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-3xl bg-[#00e5ff]/10 flex items-center justify-center border border-[#00e5ff]/20"><Snowflake className="w-7 h-7 text-[#00e5ff]" /></div>
                    <span className="font-headline text-xs font-black uppercase tracking-[0.4em] text-white">Cold Window</span>
                 </div>
                 <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-6">
                       <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,218,243,1)]"></div>
                       <div className="flex flex-col gap-1">
                          <span className="text-base font-black text-white uppercase tracking-widest">Constant Control</span>
                          <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.4em]">Maintained at 0–4°C</span>
                       </div>
                    </div>
                 </div>
                 <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.5em] leading-[2] mt-auto border-t border-white/5 pt-10 text-center">OCEAN FRESHNESS GUARANTEE FOR 48 HOURS</p>
              </div>
           </div>
        </div>
        
        {/* Cross-Sell */}
        <div className="pb-32">
          <h3 className="font-headline text-[32px] font-black text-on-surface tracking-tight mb-20">Paired Essentials</h3>
          <div className="flex gap-12 overflow-x-auto pb-12 snap-x hide-scrollbar">
            {[
              {
                name: 'Coastal Pepper Marinade', price: '₹705.50',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUwCT4l86pgNm7PYvaSJnaebGocn3Wp-2aobmMWlJ7eexjnzUFcqZcI-wjKRRCN88ZhT71g41Fq3pymMTmIptGUkXSI6YumQ54tfT5Ik00_PbJ5SSP_qJKlsEzifxwbGvqNSqK40rbzSNtAhFBuvHMCkMN3L9EBNMOYKX41JJSmcQ0LMmTFcZYcn0rutSPptfIL0HqFFZNTiOJlAgxtbe5BNSOSFNk_BcEt7EA7xdBoJ134-Ym6OX3cCwIFl4Cf1d6M5ntEQ7Uv598'
              },
              {
                name: 'Organic Amalfi Lemons', price: '₹332',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuH1bQ-dRgA3KivD6LVsysA91ZYYElyybcUXPNHvj3r_pEx60BMLR9qUvqr7FcNntVjzZ8h3cFwVAQ5lRAgyfdnp4Sx5AWgV4RooOrV3H6zRxXgmU8R5-Pv3Tiat_1-e37wlOmAlZE0TaKfWpNfDCFLtOaIn35R9dd9-rymodqd-vNgPiOhBrZodnwdEF6krAVSkCxchzzCq_SavqwtcZccw36Y-_EhfMIkT6gqnTqIYx1OTDFAU3EyD5cAq0EkWsXWfXDo7FXIM9q'
              }
            ].map((addon, i) => (
              <AddonCard key={i} addon={addon} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
