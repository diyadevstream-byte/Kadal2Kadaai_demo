import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Plus, ChevronDown, User, MessageSquare, ArrowLeft, Anchor } from 'lucide-react';
import fishData from '../data/seafoodProducts.json';
import ProductCard from '../components/ProductCard';

import ImageGallery from '../components/Product/ImageGallery';
import EngagingContent from '../components/Product/EngagingContent';
import ProductHeader from '../components/Product/ProductHeader';
import ProductExtendedDetails from '../components/Product/ProductExtendedDetails';
import PurchaseBox from '../components/Product/PurchaseBox';

export default function ProductPage() {
  const { fishName } = useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  let fish: any = null;
  let categoryName = '';
  
  for (const [cat, items] of Object.entries((fishData as any))) {
    const found = (items as any[]).find((item: any) => item.id === fishName || item.name === decodeURIComponent(fishName as string));
    if (found) {
      fish = { ...found, category: cat };
      categoryName = cat;
      break;
    }
  }

  const relatedFish = fish ? ((fishData as any)[categoryName] || [])
    .filter((f: any) => f.id !== fish.id && f.name !== fish.name)
    .slice(0, 4)
    .map((f: any) => ({ ...f, category: categoryName })) : [];

  if (!fish) {
    return (
      <main className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <h1 className="font-headline text-[32px] font-black tracking-tight">Product not found</h1>
        <Link to="/marketplace" className="text-primary hover:underline flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" /> Marketplace
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-on-surface">
      {/* Deep Sea Ambient Glows */}
      <div className="absolute top-[-5%] left-[-2%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-2%] w-[50vw] h-[50vw] bg-[#005f73]/15 rounded-full blur-[220px] pointer-events-none" />

      {/* GLOBAL LAYOUT CONSTRAINT CONTAINER */}
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="py-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-black border-b border-white/5 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-20" />
          <Link to="/marketplace" className="hover:text-primary transition-colors">Seafood</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-20" />
          <span className="text-primary">{fish.name}</span>
        </nav>

        {/* TOP SECTION: 55/45 GRID */}
        <section className="pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-20 items-start">
            
            {/* Left: Visual Pillar */}
            <div className="w-full">
               <div className="sticky top-24">
                  <ImageGallery fish={fish} />
               </div>
            </div>
            
            {/* Right: Transaction Pillar (Stacked Vertically) */}
            <div className="w-full flex flex-col gap-10 items-start lg:max-w-[440px] ml-auto">
               
               {/* PRIMARY INFO BLOCK: Title, Price, Rating, Trust */}
               <div className="w-full bg-surface-container-low p-12 rounded-[3.5rem] border border-white/10 shadow-sm overflow-hidden flex flex-col gap-8">
                  <ProductHeader fish={fish} />
               </div>

               {/* TRANSACTION BLOCK: Cart, Weight, Cut, Quantity */}
               <div className="w-full">
                  <PurchaseBox fish={fish} />
               </div>

            </div>

          </div>
        </section>

        {/* BOTTOM SECTION: INTEL GRID */}
        <section className="pb-32">
           <div className="border-t border-white/5 pt-20">
              <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.6em] text-primary/30 mb-16 text-center lg:text-left">Omni-Channel Quality Report</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start justify-items-center lg:justify-items-start">
                 {/* Column 1: Culinary Guide */}
                 <div className="w-full max-w-sm">
                    <EngagingContent fish={fish} />
                 </div>

                 {/* Column 2: Specifics */}
                 <div className="w-full max-w-sm bg-surface-container-low/20 p-12 rounded-[3.5rem] border border-white/5 min-h-[600px]">
                    <ProductExtendedDetails fish={fish} />
                 </div>

                 {/* Column 3: Trust Badges */}
                 <div className="w-full max-w-sm flex flex-col gap-10">
                    <div className="bg-surface-container-low rounded-[3rem] p-12 border border-white/5 shadow-xl flex flex-col gap-8 items-center text-center">
                       <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                          <Anchor className="w-10 h-10 text-primary" />
                       </div>
                       <span className="font-headline text-lg font-black text-white leading-tight">Coastal Proximity Direct</span>
                       <p className="text-sm text-on-surface-variant leading-relaxed">Sourced within 25km to maintain biological peak.</p>
                    </div>

                    <div className="bg-gradient-to-br from-surface-container-high to-black rounded-[3rem] p-12 border border-white/5 shadow-2xl flex flex-col gap-8">
                       <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 fill-primary text-primary" />
                          <span className="text-[10px] uppercase font-black text-white tracking-[0.3em]">QC Verified</span>
                       </div>
                       <p className="text-xl font-black text-white leading-snug">Hand-inspected for absolute oceanic purity.</p>
                       <div className="pt-6 border-t border-white/10 text-[10px] text-primary font-black uppercase tracking-widest">ISO 22000 Certified</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Frequently Bought Together */}
        <section className="pb-32 pt-20 border-t border-white/5 mt-10">
           <h2 className="font-headline text-[32px] font-black text-white mb-12">Paired Recommendations</h2>
           <div className="max-w-[900px] bg-surface-container-low rounded-[3rem] p-12 border border-white/5 flex flex-col lg:flex-row items-center gap-16 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-10 relative z-10 shrink-0">
                 <div className="w-32 h-32 rounded-3xl bg-surface-container-lowest overflow-hidden border border-primary/20 shadow-xl">
                    <img src={fish.image1 || fish.primary} className="w-full h-full object-cover" alt="Main Item" />
                 </div>
                 <Plus className="w-10 h-10 text-primary" />
                 <div className="w-32 h-32 rounded-3xl bg-surface-container-lowest overflow-hidden border border-outline-variant/20 p-6 flex items-center justify-center shadow-lg">
                    <div className="text-center font-headline text-[10px] lg:text-xs font-black text-on-surface-variant uppercase tracking-widest leading-relaxed">Prawns</div>
                 </div>
              </div>

              <div className="flex-1 flex flex-col relative z-10 text-center lg:text-left">
                 <span className="font-headline text-2xl font-black text-white mb-4">Seafood Fiesta Combo</span>
                 <p className="text-base text-on-surface-variant mb-8 leading-relaxed font-medium">Elevate your meal with premium cleaned prawns.</p>
                 <div className="flex items-center justify-center lg:justify-start gap-6">
                   <span className="font-headline text-[36px] font-black text-primary">₹{fish.price + 350}</span>
                   <span className="text-sm text-on-surface-variant/40 line-through font-bold">₹{fish.price + 450}</span>
                 </div>
              </div>

              <button className="h-16 px-14 rounded-3xl bg-primary text-black font-headline font-black uppercase text-xs tracking-widest hover:-translate-y-2 transition-all active:scale-95 relative z-10 shrink-0 shadow-xl shadow-primary/20">
                 Add Combo
              </button>
           </div>
        </section>

        {/* Related Products */}
        {relatedFish.length > 0 && (
          <section className="pb-40">
            <div className="flex items-end justify-between mb-16 border-b border-white/5 pb-8">
               <h2 className="font-headline text-[32px] font-black text-white tracking-tight">Explore More {fish.category}</h2>
               <Link to="/marketplace" className="text-primary text-xs font-black flex items-center gap-3 group uppercase tracking-[0.3em]">
                 Seafood <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
               {relatedFish.map((related: any) => (
                 <div key={related.name} className="flex justify-center">
                    <ProductCard fish={related} />
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* Community & FAQ */}
        <section className="pb-40 grid grid-cols-1 lg:grid-cols-2 gap-24 border-t border-white/5 pt-32">
          <div className="flex flex-col gap-16">
             <h2 className="font-headline text-[32px] font-black text-white flex items-center gap-6">
               <MessageSquare className="w-10 h-10 text-primary" /> Verified Feed
             </h2>
             <div className="flex flex-col gap-10">
                {[
                  { name: "Rahul S.", rating: 5, comment: "Absolutely fresh. The curry cut was perfect." },
                  { name: "Anita M.", rating: 5, comment: "Cold chain delivery really works. Highly recommend." }
                ].map((review, i) => (
                  <div key={i} className="bg-surface-container-low p-12 rounded-[3.5rem] border border-white/5 hover:bg-surface-container-low transition-all duration-500 shadow-xl max-w-xl">
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-primary font-black text-2xl border border-primary/20 shadow-xl">{review.name[0]}</div>
                           <span className="text-lg font-bold text-white tracking-tight">{review.name}</span>
                        </div>
                        <div className="flex gap-2">
                          {[1,2,3,4,5].map(star => <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-primary text-primary' : 'text-on-surface-variant opacity-20'}`} />)}
                        </div>
                     </div>
                     <p className="text-lg text-on-surface-variant leading-relaxed italic font-medium">"{review.comment}"</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-20">
             <div className="bg-surface-container-low p-14 rounded-[4rem] border border-primary/20 relative overflow-hidden group max-w-xl">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-150 transition-transform duration-1000"><Anchor className="w-48 h-48" /></div>
                <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-10">Transparency Hub</h3>
                <span className="text-4xl font-black text-white leading-tight tracking-tighter block mb-6">Direct Logistics</span>
                <p className="text-lg text-on-surface-variant leading-relaxed font-medium">Ocean-to-door direct sourcing platform.</p>
             </div>

             <div className="flex flex-col gap-12">
                <h2 className="font-headline text-[32px] font-black text-white">Common Questions</h2>
                <div className="flex flex-col gap-6">
                   {[
                     { q: "How is the fish cleaned?", a: "We use industrial-grade RO water for all cleaning. The fish is gutted, scaled, and washed multiple times before being vacuum sealed." },
                     { q: "When will my order arrive?", a: "Orders placed before 10 PM are delivered fresh the next morning between 7 AM and 10 AM using dedicated cold-chain vehicles." }
                   ].map((faq, idx) => (
                     <div key={idx} className="bg-surface-container-low rounded-[2.5rem] overflow-hidden border border-white/5 shadow-lg max-w-xl">
                        <button 
                          className="w-full flex items-center justify-between p-10 text-left group"
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        >
                           <span className="font-headline text-lg font-black text-white group-hover:text-primary transition-colors leading-snug">{faq.q}</span>
                           <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${openFaq === idx ? 'rotate-180 text-primary' : 'text-on-surface-variant'}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-500 ${openFaq === idx ? 'max-h-80 px-10 pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                           <p className="p-8 bg-black/10 rounded-3xl border border-white/5 text-base text-on-surface-variant leading-relaxed font-medium">{faq.a}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
