import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FishProduct {
  name: string;
  category: string;
  price: number;
  primary: string;
  secondary: string;
}

import { Link } from 'react-router-dom';

export default function ProductCard({ fish }: { fish: FishProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/product/${encodeURIComponent(fish.name)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer group flex flex-col bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-primary/30 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-lowest">
        <AnimatePresence mode="wait">
          <motion.img
            key={isHovered && fish.secondary ? 'secondary' : 'primary'}
            src={isHovered && fish.secondary ? fish.secondary : fish.primary}
            alt={fish.name}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Essential Badge Only */}
        <div className="absolute top-4 left-4">
           <div className="px-2 py-1 bg-background/80 backdrop-blur-md rounded text-[9px] uppercase tracking-widest text-primary font-bold">
              FreshToday
           </div>
        </div>
      </div>

      {/* Primary Info */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-headline text-xl font-bold text-white line-clamp-1">
            {fish.name}
          </h3>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            {fish.category}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
           <div className="flex flex-col">
              <span className="font-headline text-2xl font-black text-white">
                ₹{fish.price}
              </span>
              <span className="font-label text-[9px] uppercase text-on-surface-variant/60 font-black">
                per kg
              </span>
           </div>

           <button 
             className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
             onClick={(e) => {
                e.stopPropagation();
                // Future cart logic
             }}
           >
             <ShoppingCart className="w-5 h-5" />
           </button>
        </div>
      </div>
    </Link>
  );
}
