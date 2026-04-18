import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Plus, ChevronDown, User, MessageSquare, ArrowLeft, Anchor } from 'lucide-react';
import fishData from '../data/fishData.json';
import ProductCard from '../components/ProductCard';

import ImageGallery from '../components/Product/ImageGallery';
import ProductDetails from '../components/Product/ProductDetails';
import PurchaseBox from '../components/Product/PurchaseBox';

export default function ProductPage() {
  const { fishName } = useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Find the fish in the nested data
  const fish = Object.values(fishData).reduce((acc: any, category: any) => {
    if (acc) return acc;
    return category[fishName as string] || null;
  }, null);

  const relatedFish = fish ? Object.values((fishData as any)[fish.category] || {})
    .filter((f: any) => f.name !== fish.name)
    .slice(0, 4) : [];

  if (!fish) {
    return (
      <main className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <h1 className="font-headline text-3xl font-bold">Fish not found</h1>
        <Link to="/marketplace" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03070C] relative overflow-hidden text-on-surface">
      {/* Deep Sea Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#005f73]/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[30vw] h-[30vw] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Breadcrumbs */}
      <nav className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-black">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-white/20" />
        <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
        <ChevronRight className="w-3 h-3 text-white/20" />
        <span className="text-primary opacity-80">{fish.name}</span>
      </nav>

      {/* Main Layout Section */}
      <section className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start pb-24">
        {/* Image Section */}
        <ImageGallery fish={fish} />
        {/* Product Info */}
        <ProductDetails fish={fish} />
        {/* Purchase Box */}
        <PurchaseBox fish={fish} />
      </section>

      {/* Frequently Bought Together */}
      <section className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-24 border-t border-outline-variant/10 pt-16 mt-8">
         <h2 className="font-headline text-2xl font-black text-white mb-8">Frequently Bought Together</h2>
         <div className="bg-surface-container-low rounded-[2.5rem] p-6 lg:p-8 border border-white/5 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex items-center gap-4">
               <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest overflow-hidden border border-primary/20">
                  <img src={fish.primary} className="w-full h-full object-cover" alt="Main Item" loading="lazy" />
               </div>
               <Plus className="w-6 h-6 text-on-surface-variant" />
               <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest overflow-hidden border border-outline-variant/20 p-2 flex items-center justify-center">
                  <div className="text-center font-headline text-[10px] font-bold text-on-surface-variant uppercase">Prawns<br/>Add-on</div>
               </div>
            </div>
            <div className="flex-1 flex flex-col">
               <span className="font-headline text-xl font-bold text-white mb-1">Seafood Fiesta Combo</span>
               <span className="text-sm text-on-surface-variant mb-4">Pair with premium Prawns for the ultimate meal experience.</span>
               <span className="font-headline text-2xl font-black text-primary">₹{fish.price + 350}</span>
            </div>
            <button className="h-12 px-8 rounded-xl bg-primary text-black font-headline font-bold text-sm hover:-translate-y-1 hover:shadow-lg transition-all">
               Add Combo
            </button>
         </div>
      </section>

      {/* Related Products */}
      {relatedFish.length > 0 && (
        <section className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-24">
          <div className="flex items-center justify-between mb-8">
             <h2 className="font-headline text-2xl font-black text-white">More in {fish.category}</h2>
             <Link to="/marketplace" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">View All <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {relatedFish.map((related: any) => (
               <ProductCard key={related.name} fish={related} />
             ))}
          </div>
        </section>
      )}

      {/* Bottom Info Grid */}
      <section className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Customer Reviews */}
        <div className="flex flex-col gap-8">
           <h2 className="font-headline text-2xl font-black text-white flex items-center gap-3">
             <MessageSquare className="w-6 h-6 text-primary" /> Verified Reviews
           </h2>
           <div className="flex flex-col gap-6">
              {[
                { name: "Rahul S.", date: "2 days ago", rating: 5, comment: "Absolutely fresh. The curry cut was perfect, saved me so much prep time!" },
                { name: "Anita M.", date: "1 week ago", rating: 5, comment: "I usually hesitate buying seafood online, but the cold chain delivery really works. Highly recommend." }
              ].map((review, i) => (
                <div key={i} className="bg-surface-container-low/50 rounded-3xl p-6 border border-white/5">
                   <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">
                           {review.name[0]}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">{review.name}</span>
                            <span className="text-[10px] text-on-surface-variant font-medium">{review.date}</span>
                         </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(star => <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-primary text-primary' : 'text-on-surface-variant'}`} />)}
                      </div>
                   </div>
                   <p className="text-sm text-on-surface-variant leading-relaxed">"{review.comment}"</p>
                </div>
              ))}
           </div>
        </div>

        {/* Seller & FAQ */}
        <div className="flex flex-col gap-12">
           <div className="bg-surface-container-lowest rounded-3xl p-6 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Anchor className="w-24 h-24" /></div>
              <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Transparency Source
              </h3>
              <div className="flex flex-col gap-1 relative z-10">
                 <span className="text-lg font-black text-white mb-1">Local Coastal Trawlers</span>
                 <span className="text-xs text-on-surface-variant">Sourced directly from independent fishermen docking at the eastern coastline. Bypassing middlemen ensures better income for them, and absolute freshness for you.</span>
              </div>
           </div>

           <div className="flex flex-col gap-6">
              <h2 className="font-headline text-2xl font-black text-white">Common Questions</h2>
              <div className="flex flex-col gap-3">
                 {[
                   { q: "How is the fish cleaned?", a: "We use industrial-grade RO water for all cleaning. The fish is gutted, scaled, and washed multiple times before being vacuum sealed." },
                   { q: "When will my order arrive?", a: "Orders placed before 10 PM are delivered fresh the next morning between 7 AM and 10 AM using dedicated cold-chain vehicles." },
                   { q: "How long can I store this?", a: "For optimal taste, consume within 2 days (store at 0-4°C). If freezing, do not thaw and refreeze." }
                 ].map((faq, idx) => (
                   <div key={idx} className="bg-surface-container-low rounded-2xl overflow-hidden border border-white/5 transition-all">
                      <button 
                        className="w-full flex items-center justify-between p-5 text-left"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      >
                         <span className="font-headline text-sm font-bold text-white">{faq.q}</span>
                         <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 px-5 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                         <p className="text-xs text-on-surface-variant leading-relaxed">{faq.a}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
