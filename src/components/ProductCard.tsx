import { useState } from 'react';
import { ShoppingCart, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface FishProduct {
  id: string;
  name: string;
  localName?: string;
  pricePerKg?: number;
  price?: number;
  image1?: string;
  primary?: string;
  image2?: string;
  secondary?: string;
  category?: string;
  source?: string;
  freshness?: string;
  tags?: string[];
}

export default function ProductCard({ fish, pricingMode = 'Retail' }: { fish: FishProduct; pricingMode?: 'Retail' | 'Wholesale'; [key: string]: any }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback map: image1 / image2 or primary / secondary
  const img1 = fish.image1 || fish.primary;
  const img2 = fish.image2 || fish.secondary;
  const currentImage = isHovered && img2 ? img2 : img1;

  // Let's ensure the route is /product/{id}
  const productUrl = `/product/${fish.id || encodeURIComponent(fish.name)}`;

  return (
    <Link 
      to={productUrl}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer group flex flex-col bg-surface rounded-[2rem] overflow-hidden border border-outline-variant/20 hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(230,81,0,0.1)] transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-background flex items-center justify-center">
        {/* Depth Gradient in Card */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--theme-surface-container-low),_var(--theme-background))] opacity-60" />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-surface-container/50 animate-pulse" />
        )}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={currentImage || 'https://placehold.co/400x500/03070c/00daf3?text=Fresh+Seafood'}
            alt={fish.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`relative z-10 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={(e) => {
              if (!e.currentTarget.src.includes('placeholder')) {
                e.currentTarget.src = 'https://placehold.co/400x500/03070c/00daf3?text=Fresh+Seafood';
              }
            }}
          />
        </AnimatePresence>

        {/* Freshness Badge Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
           <div className="px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-white font-black flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              {fish.freshness || "Fresh Today"}
           </div>
        </div>
      </div>

      {/* Primary Info Drop-Card */}
      <div className="p-5 flex flex-col gap-3 flex-1 bg-gradient-to-b from-surface-container-low to-surface relative z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="flex flex-col gap-1">
          <h3 className="font-headline text-xl font-black text-on-surface line-clamp-1 leading-tight uppercase tracking-tight">
            {fish.name}
          </h3>
          <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            {fish.category || fish.localName}
          </span>
          {fish.tags && fish.tags.length > 0 && (
             <div className="flex items-center gap-2 mt-1.5 flex-wrap">
               {fish.tags.slice(0, 2).map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] uppercase tracking-widest text-primary font-black">
                    {tag}
                  </span>
               ))}
             </div>
          )}
        </div>
        
        {/* Source & Freshness subtle row */}
        <div className="flex items-center gap-4 text-xs text-on-surface-variant font-bold mt-auto mb-1">
           <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Caught Today</span>
           </div>
           <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="truncate">{fish.source || "Coastal"}</span>
           </div>
        </div>

        <div className="flex items-center justify-between mt-1">
           <div className="flex flex-col">
              {pricingMode === 'Retail' ? (
                 <>
                    <span className="font-headline text-[22px] font-black text-white">
                      ₹{fish.pricePerKg || fish.price}
                    </span>
                    <span className="font-label text-[10px] uppercase text-on-surface-variant font-black">
                      per kg
                    </span>
                 </>
              ) : (
                 <>
                    <span className="font-headline text-[22px] font-black text-[#ff9d00]">
                      ₹{Math.round((fish.pricePerKg || fish.price || 0) * 0.95)}
                    </span>
                    <span className="font-label text-[10px] uppercase text-[#ff9d00] font-black flex items-center gap-2 mt-0.5 font-bold">
                      per kg <span className="bg-[#ff9d00]/20 px-1.5 py-0.5 rounded text-[10px] border border-[#ff9d00]/20">5KG MOQ</span>
                    </span>
                 </>
              )}
           </div>

           <button 
             className={`w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shrink-0 bg-primary text-white shadow-xl shadow-primary/20`}
             onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToCart({
                  id: fish.id || encodeURIComponent(fish.name),
                  name: fish.name,
                  price: pricingMode === 'Retail' ? (fish.pricePerKg || fish.price || 0) : Math.round((fish.pricePerKg || fish.price || 0) * 0.95) * 5,
                  weight: pricingMode === 'Retail' ? '1kg' : '5kg Wholesale',
                  cutType: 'Whole',
                  quantity: 1,
                  image: currentImage
                });
             }}
           >
             <ShoppingCart className="w-6 h-6" />
           </button>
        </div>
      </div>
    </Link>
  );
}
