import React, { useState, useMemo } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import fishData from '../data/seafoodProducts.json';
import { motion } from 'motion/react';

// Dynamically built from whatever folders exist in public/Photos
const CATEGORIES = Object.keys(fishData as any).map(key => ({ id: key, name: key }));

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [pricingMode, setPricingMode] = useState<'Retail' | 'Wholesale'>('Retail');

  const products = useMemo(() => {
    // Cast fishData to any to handle indexing dynamically
    const categoryData: any[] = (fishData as any)[activeCategory];
    if (!categoryData) return [];
    
    // Inject category into each product for the card display
    return categoryData.map(product => ({
      ...product,
      category: activeCategory
    }));
  }, [activeCategory]);

  return (
    <div className="flex flex-col lg:flex-row bg-background relative">
      {/* Desktop Sidebar / Mobile Category Bar */}
      <div className="hidden lg:block sticky top-20 overflow-y-auto h-[calc(100vh-80px)] w-80 border-r border-outline-variant/10 shrink-0 custom-scrollbar">
        <CategorySidebar 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
          categories={CATEGORIES} // Ensure CategorySidebar accepts this, or modify CategorySidebar
        />
      </div>

      {/* Mobile Horizontal Category Scroller */}
      <div className="lg:hidden w-full bg-surface-container-low border-b border-outline-variant/10 py-4 px-4 overflow-x-auto flex gap-3 hide-scrollbar shrink-0">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-4 min-h-[48px] rounded-full font-headline text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-primary text-white shadow-lg' : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-bold'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <main className="flex-1 px-4 md:px-8 lg:px-10 py-8 lg:py-12 relative">
        <div className="max-w-[1280px] mx-auto">
          <header className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline-variant/10">
            <div className="flex flex-col gap-2">
               <h1 className="font-headline text-3xl lg:text-5xl font-black text-on-surface tracking-tight uppercase">
                 {activeCategory.replace('secondary', 'Secondary')}
               </h1>
               <p className="text-sm text-on-surface-variant font-medium">Sustainably sourced directly from local deep sea trawlers.</p>
            </div>

             {/* Global Pricing Toggle */}
            <div className="flex flex-col items-end gap-2 shrink-0">
               <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant/60">Market Selection</span>
               <div className="flex items-center bg-surface-container-low rounded-full p-2 border border-outline-variant/10 shadow-sm">
                  <button 
                    onClick={() => setPricingMode('Retail')} 
                    className={`px-6 py-3 min-h-[48px] rounded-full text-xs font-bold uppercase tracking-widest transition-all ${pricingMode === 'Retail' ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-on-surface font-bold'}`}
                  >
                    Retail (1kg)
                  </button>
                  <button 
                    onClick={() => setPricingMode('Wholesale')} 
                    className={`px-6 py-3 min-h-[48px] rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 ${pricingMode === 'Wholesale' ? 'bg-[#D84315] text-white shadow-lg' : 'text-on-surface-variant hover:text-on-surface font-bold'}`}
                  >
                    Wholesale (B2B)
                  </button>
               </div>
            </div>
          </header>

          {/* Product Grid / Empty State */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((fish: any) => (
                <ProductCard 
                  key={fish.id || fish.name} 
                  fish={fish} 
                  pricingMode={pricingMode}
                />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-40 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-50 group-hover:scale-100 transition-transform duration-1000"></div>
              
              {/* Custom SVG Illustration for Empty State */}
              <div className="relative w-64 h-64 mb-8">
                 <motion.div 
                   animate={{ 
                     y: [0, -10, 0],
                     rotate: [0, 2, 0]
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 flex items-center justify-center text-primary/20"
                 >
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 16s.5-1 2-1 2 2 4 2 2-1 4-1 2 2 4 2 2-1 4-1 2 2 4 2" />
                      <path d="M2 20s.5-1 2-1 2 2 4 2 2-1 4-1 2 2 4 2 2-1 4-1 2 2 4 2" />
                      <path d="m22 10-4-4" />
                      <path d="m22 6-4 4" />
                      <path d="M18 8h-4" />
                      <path d="M18 10h-4" />
                      <circle cx="8" cy="8" r="4" />
                    </svg>
                 </motion.div>
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-primary/20 animate-ping"></div>
                 </div>
              </div>

              <h2 className="font-headline text-4xl font-black text-on-surface mb-4 tracking-tighter uppercase">
                 The Depth is <span className="text-primary italic">Silent.</span>
              </h2>
              <p className="font-body text-on-surface-variant text-center max-w-sm leading-relaxed">
                Our trawlers are navigating through a calm current. No fresh catch available in this category yet.
              </p>
              
              <button 
                onClick={() => setActiveCategory(CATEGORIES[0]?.id)}
                className="mt-10 px-8 py-3 rounded-full border border-primary/30 text-primary font-label text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all"
              >
                Back to Deep Sea
              </button>
            </motion.div>
          )}
          
          {/* Footer of Grid */}
          <div className="mt-24 pt-12 border-t border-outline-variant/10 text-center">
             <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
                All weights are measured prior to cleaning unless stated.
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}
