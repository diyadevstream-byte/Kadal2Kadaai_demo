import React, { useState } from 'react';

export default function ImageGallery({ fish }: { fish: any }) {
  const [activeImage, setActiveImage] = useState<'primary' | 'secondary'>('primary');
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      <div className="md:col-span-1 hidden lg:flex flex-col gap-4 sticky top-24">
        <button 
          onClick={() => setActiveImage('primary')}
          className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === 'primary' ? 'border-primary' : 'border-transparent opacity-40'}`}
        >
          <img src={fish.primary} className="w-full h-full object-cover" alt="Primary" loading="lazy" />
        </button>
        {fish.secondary && (
           <button 
             onClick={() => setActiveImage('secondary')}
             className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === 'secondary' ? 'border-primary' : 'border-transparent opacity-40'}`}
           >
             <img src={fish.secondary} className="w-full h-full object-cover" alt="Secondary" loading="lazy" />
           </button>
        )}
      </div>

      <div 
        className="md:col-span-12 lg:col-span-5 relative group bg-surface-container-low rounded-[3rem] overflow-hidden aspect-square border border-outline-variant/10 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
      >
        <div className="absolute top-6 left-6 z-10">
          <div className="px-4 py-2 bg-background/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,218,243,0.8)]"></div>
            <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
              Fresh Catch
            </span>
          </div>
        </div>

        <img 
          src={activeImage === 'primary' ? fish.primary : fish.secondary} 
          className={`w-full h-full object-contain transition-transform duration-200 ${isZooming ? 'scale-[2.5]' : 'scale-100'}`}
          style={{
            transformOrigin: isZooming ? `${zoomPos.x}% ${zoomPos.y}%` : 'center'
          }}
          alt={fish.name}
          loading="lazy"
        />
      </div>
    </>
  );
}
