import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function ImageGallery({ fish }: { fish: any }) {
  const [activeImage, setActiveImage] = useState<'primary' | 'secondary'>('primary');

  const src = activeImage === 'primary' ? (fish.primary || fish.image1) : (fish.secondary || fish.image2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start min-h-[400px] w-full">
      {/* Thumbnail strip - desktop only */}
      <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 sticky top-24">
        {[
          { type: 'primary', img: fish.primary || fish.image1 || 'https://placehold.co/200x200/03070c/00daf3?text=Main' },
          { type: 'secondary', img: fish.secondary || fish.image2 }
        ].filter(t => t.img).map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveImage(item.type as 'primary' | 'secondary')}
            className={`w-full aspect-square rounded-3xl overflow-hidden border-2 transition-all bg-surface-container-low/50 ${activeImage === item.type ? 'border-primary shadow-[0_0_20px_rgba(0,218,243,0.4)]' : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/10'}`}
          >
            <img src={item.img} className="w-full h-full object-cover" alt={item.type} loading="lazy" />
          </button>
        ))}
      </div>

      {/* Main image container */}
      <div className="md:col-span-12 lg:col-span-10 relative bg-surface-container-low/10 rounded-[4rem] overflow-hidden border border-white/5 flex items-center justify-center p-4 group shadow-2xl" style={{ aspectRatio: '16/10' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/10 opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="absolute top-8 left-8 z-20">
          <div className="px-5 py-2.5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center gap-3 shadow-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#00daf3]" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-black">Verified Fresh</span>
          </div>
        </div>

        <motion.img
          key={src || 'fallback'}
          src={src || 'https://placehold.co/1200x800/03070c/00daf3?text=Product+Image'}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full h-full object-contain p-4 drop-shadow-[0_50px_100px_rgba(0,0,0,0.95)] group-hover:scale-[1.05] transition-transform duration-1000"
          alt={fish.name}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/1200x800/03070c/00daf3?text=Image+Load+Failed';
          }}
        />
      </div>
    </div>
  );
}
