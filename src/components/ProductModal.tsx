import React, { useState } from 'react';
import { X, ShoppingCart, Plus, Minus, ShieldCheck, Truck, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FishProduct {
  name: string;
  category: string;
  price: number;
  primary: string;
  secondary: string;
}

interface ProductModalProps {
  fish: FishProduct | null;
  onClose: () => void;
}

export default function ProductModal({ fish, onClose }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState<'primary' | 'secondary'>('primary');
  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  if (!fish) return null;

  const images = [
    { id: 'primary', url: fish.primary },
    { id: 'secondary', url: fish.secondary }
  ].filter(img => img.url);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#03070a]/90 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-surface-container-low rounded-[2rem] shadow-2xl border border-outline-variant/20 overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/40 backdrop-blur-md flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-surface-container-lowest relative overflow-hidden">
              <img 
                src={activeImage === 'primary' ? fish.primary : fish.secondary}
                alt={fish.name}
                loading="lazy"
                className="w-full h-full object-contain"
              />
              
              {/* Thumbnail Switcher (Floating Overlay) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img.id as any)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img.id ? 'border-primary' : 'border-transparent opacity-50'}`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" loading="lazy" alt="Thumbnail" />
                  </button>
                ))}
              </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col gap-6">
            <div>
              <span className="text-primary font-label text-[10px] uppercase tracking-widest">{fish.category}</span>
              <h1 className="font-headline text-3xl md:text-4xl font-black text-white leading-tight">
                {fish.name}
              </h1>
            </div>

            <div className="flex flex-col">
               <span className="font-headline text-4xl font-black text-primary">₹{fish.price}</span>
               <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Weight: per Kilogram</span>
            </div>

            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              Premium grade {fish.name}, freshly sourced and cleaned. 
              Delivered in temperature-controlled packaging within 24 hours.
            </p>

            <div className="h-px bg-outline-variant/10 mx-1"></div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 bg-surface-container rounded-2xl p-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-xs font-headline font-bold uppercase tracking-tight">Hygienically<br/>Cleaned</span>
               </div>
               <div className="flex items-center gap-3 bg-surface-container rounded-2xl p-4">
                  <Truck className="w-6 h-6 text-primary" />
                  <span className="text-xs font-headline font-bold uppercase tracking-tight">Express<br/>Cold Chain</span>
               </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-4">
              <div className="flex items-center justify-between bg-surface-container-highest/20 rounded-2xl p-2 outline outline-1 outline-outline-variant/20">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container text-white hover:text-primary transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-headline text-2xl font-bold w-12 text-center text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-container text-white hover:text-primary transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <div className="px-4 text-right">
                  <span className="block text-[10px] uppercase text-on-surface-variant font-bold">Total Est.</span>
                  <span className="font-headline font-bold text-lg text-white">₹{fish.price * quantity}</span>
                </div>
              </div>

              <button className="h-16 rounded-2xl bg-primary text-black font-headline font-black text-lg flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,218,243,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(0,218,243,0.6)] hover:scale-[1.02] active:scale-95 transition-all">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
