import React, { useState, useMemo } from 'react';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import fishData from '../data/fishData.json';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('Marine fish');

  const products = useMemo(() => {
    const categoryData = (fishData as any)[activeCategory];
    if (!categoryData) return [];
    return Object.values(categoryData);
  }, [activeCategory]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar / Mobile Category Bar */}
      <div className="hidden lg:block">
        <CategorySidebar 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
      </div>

      {/* Mobile Horizontal Category Scroller */}
      <div className="lg:hidden w-full bg-surface-container-low border-b border-outline-variant/10 py-4 px-4 overflow-x-auto flex gap-3 no-scrollbar shrink-0">
        {[
          { id: 'Marine fish', name: 'Marine' },
          { id: 'freshwater fish', name: 'Freshwater' },
          { id: 'Freashwater Prawn', name: 'Prawns' },
          { id: 'Crabs', name: 'Crabs' },
          { id: 'Dry Seafood', name: 'Dry' },
          { id: 'Squid  Cuttlefish  Octopus', name: 'Exotics' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-headline text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-primary text-black' : 'bg-surface-container text-on-surface-variant'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 lg:mb-12">
            <h1 className="font-headline text-3xl lg:text-5xl font-black text-white tracking-tight">
              {activeCategory}
            </h1>
          </header>

          {/* Product Grid / Empty State */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((fish: any) => (
                <ProductCard 
                  key={fish.name} 
                  fish={fish} 
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

              <h2 className="font-headline text-4xl font-black text-white mb-4 tracking-tighter">
                 The Depth is <span className="text-primary italic">Silent.</span>
              </h2>
              <p className="font-body text-on-surface-variant text-center max-w-sm leading-relaxed">
                Our trawlers are navigating through a calm current. No fresh catch available in this category yet.
              </p>
              
              <button 
                onClick={() => setActiveCategory('Marine fish')}
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
