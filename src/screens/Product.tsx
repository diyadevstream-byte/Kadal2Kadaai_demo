import React, { useState } from 'react';
import { 
  Droplets, AlertTriangle, BadgeCheck, Clock, Info, 
  Scale, Snowflake, Minus, Plus, ShoppingBag, 
  PlusCircle, CheckCircle, Utensils, Timer, ArrowRight, Heart,
  Star, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OceanButton from '../components/OceanButton';

function AddonCard({ addon }: { addon: { name: string, price: string, img: string } }) {
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
        <h4 className="font-headline font-semibold text-on-surface">{addon.name}</h4>
        <p className="font-label text-xs text-primary mt-1">{addon.price}</p>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          animate={added ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleAdd}
          className={`mt-3 text-xs font-label font-medium flex items-center gap-1 transition-colors origin-left ${added ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
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

export default function Product() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'nutrition' | 'storage'>('description');
  const [cargoAdded, setCargoAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [panPos, setPanPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoomScale, setZoomScale] = useState(1);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewFormRating, setReviewFormRating] = useState(0);
  const [reviewFormHoverRating, setReviewFormHoverRating] = useState(0);

  const handleAddCargo = () => {
    if (cargoAdded) return;
    setCargoAdded(true);
    setTimeout(() => setCargoAdded(false), 2000);
  };

  return (
    <>
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
          
          {/* Left: Hero Imagery (Asymmetric) */}
          <div className="lg:col-span-7 relative">
            <div 
              className={`relative w-full aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden bg-surface-container-low outline outline-1 outline-outline-variant/15 shadow-[0_24px_48px_rgba(0,0,0,0.4)] group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDragging(true);
                setDragStart({ x: e.clientX, y: e.clientY });
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseMove={(e) => {
                if (isDragging) {
                  const dx = e.clientX - dragStart.x;
                  const dy = e.clientY - dragStart.y;
                  const { width, height } = e.currentTarget.getBoundingClientRect();
                  
                  // Inverting delta to make origin pan correctly
                  const percentX = (dx / width) * 100 * 0.7; // Speed modifier
                  const percentY = (dy / height) * 100 * 0.7;
                  
                  setPanPos(prev => ({
                    x: Math.max(0, Math.min(100, prev.x - percentX)),
                    y: Math.max(0, Math.min(100, prev.y - percentY))
                  }));
                  setDragStart({ x: e.clientX, y: e.clientY });
                }
              }}
              onWheel={(e) => {
                if (isHoveringImage) {
                  e.preventDefault(); // Might not work purely in React without passive: false, but adds UX intent
                  setZoomScale(prev => Math.max(1, Math.min(3, prev - e.deltaY * 0.005)));
                }
              }}
              onMouseEnter={() => {
                setIsHoveringImage(true);
                setZoomScale(1.5);
              }}
              onMouseLeave={() => {
                setIsHoveringImage(false);
                setIsDragging(false);
                setZoomScale(1);
                setPanPos({ x: 50, y: 50 });
              }}
            >
              <img 
                alt="Fresh Seer Fish" 
                className="w-full h-full object-cover transition-transform duration-300 pointer-events-none" 
                style={{ 
                  transform: `scale(${zoomScale})`,
                  transformOrigin: `${panPos.x}% ${panPos.y}%` 
                }}
                src={PRODUCT_IMAGES[activeImageIndex]}
              />
              
              {/* Floating Tags */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 bg-surface-variant/80 backdrop-blur-[20px] px-4 py-2 rounded-full outline outline-1 outline-outline-variant/30 text-on-surface font-label text-xs tracking-wider uppercase shadow-lg">
                  <Droplets className="w-4 h-4 text-primary fill-current" />
                  Fresh Catch
                </div>
                <div className="inline-flex items-center gap-2 bg-error-container/80 backdrop-blur-[20px] px-4 py-2 rounded-full outline outline-1 outline-error/30 text-on-error-container font-label text-xs tracking-wider uppercase shadow-lg w-max">
                  <AlertTriangle className="w-4 h-4" />
                  Low Stock
                </div>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 pl-8 overflow-x-auto pb-2 scrollbar-hide">
              {PRODUCT_IMAGES.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-surface-container transition-all outline outline-1 outline-offset-2 ${activeImageIndex === idx ? 'outline-primary opacity-100 shadow-[0_0_15px_rgba(0,218,243,0.2)]' : 'outline-transparent opacity-50 hover:opacity-80 hover:outline-outline-variant/30 grayscale hover:grayscale-0'}`}
                >
                  <img alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" src={imgSrc} />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right: Product Information & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Trust Badges */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-primary text-sm font-label">
                <BadgeCheck className="w-5 h-5" />
                <span>Cut & Cleaned Today</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <div className="flex items-center gap-1.5 text-on-surface-variant text-sm font-label">
                <Clock className="w-5 h-5" />
                <span>Delivers by 4 PM</span>
              </div>
            </div>
            
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <h1 className="font-headline text-5xl lg:text-[4rem] font-bold text-on-surface tracking-tighter leading-[0.9]">Seer Fish</h1>
                <h2 className="font-headline text-2xl text-on-surface-variant font-medium tracking-tight">(Vanjaram / King Fish)</h2>
              </div>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsShared(true);
                  setTimeout(() => setIsShared(false), 2000);
                  // Optional: Can add navigator.clipboard.writeText(window.location.href) here if needed
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container hover:bg-surface-container-high outline outline-1 outline-outline-variant/30 hover:outline-primary/50 text-on-surface-variant hover:text-primary transition-all shadow-sm shrink-0 relative group"
                title="Share this product"
              >
                <motion.div
                  initial={false}
                  animate={{ scale: isShared ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isShared ? <CheckCircle className="w-5 h-5 text-primary" /> : <Share2 className="w-5 h-5" />}
                </motion.div>
                
                {/* Tooltip */}
                <div className="absolute -top-10 bg-surface-variant text-on-surface-variant text-xs font-label px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {isShared ? 'Link Copied!' : 'Share Product'}
                </div>
              </motion.button>
            </div>
            
            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star 
                      className={`w-6 h-6 transition-colors duration-200 ${
                        (hoverRating || rating) >= star 
                          ? 'fill-primary text-primary drop-shadow-[0_0_8px_rgba(0,218,243,0.4)]' 
                          : 'fill-transparent text-outline-variant hover:text-primary/50'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <span className="font-label text-sm text-on-surface-variant group cursor-pointer hover:text-primary transition-colors">
                <span className="font-bold text-on-surface group-hover:text-primary">{rating}.0</span> / 5.0 (128 Reviews)
              </span>
            </div>

            {/* Wishlist Social Proof */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" className="w-7 h-7 rounded-full border-2 border-background object-cover" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" className="w-7 h-7 rounded-full border-2 border-background object-cover" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User" className="w-7 h-7 rounded-full border-2 border-background object-cover" />
                <div className="w-7 h-7 rounded-full border-2 border-background bg-surface-container flex items-center justify-center">
                  <Heart className="w-3 h-3 text-primary" />
                </div>
              </div>
              <span className="font-label text-sm text-on-surface-variant">
                <strong className="text-on-surface">1.2k+</strong> people have wishlisted this
              </span>
            </div>
            
            <div className="mt-8 flex items-end gap-3">
              <span className="font-headline text-4xl font-bold text-primary">$34.00</span>
              <span className="font-label text-on-surface-variant text-sm mb-1.5">/ 500g (Approx. 4-5 Steaks)</span>
            </div>
            
            {/* Interactive Content Tabs */}
            <div className="mt-10 bg-surface-container-low rounded-2xl p-2 outline outline-1 outline-outline-variant/15">
              <div className="flex gap-2 p-1 bg-surface-container-highest/30 rounded-xl">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-label text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'description' ? 'bg-surface-variant text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface font-medium'}`}
                >
                  <Info className="w-4 h-4" /> Description
                </button>
                <button 
                  onClick={() => setActiveTab('nutrition')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-label text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'nutrition' ? 'bg-surface-variant text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface font-medium'}`}
                >
                  <Scale className="w-4 h-4" /> Nutrition
                </button>
                <button 
                  onClick={() => setActiveTab('storage')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-label text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'storage' ? 'bg-surface-variant text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface font-medium'}`}
                >
                  <Snowflake className="w-4 h-4" /> Storage
                </button>
              </div>
              <div className="p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                    <motion.div 
                      key="description"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-body text-base text-on-surface leading-relaxed">
                        Known as the King of the Indian Ocean, our Vanjaram boasts a firm texture and a rich, distinct flavor. Sourced from deep sea currents, these steaks hold their shape beautifully whether pan-seared, grilled, or slow-cooked in traditional curries. Features a single central bone for effortless eating.
                      </p>
                    </motion.div>
                  )}
                  
                  {activeTab === 'nutrition' && (
                    <motion.div 
                      key="nutrition"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface-container rounded-xl p-4 outline outline-1 outline-outline-variant/15 flex flex-col justify-center">
                          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-1">Calories</p>
                          <p className="font-headline text-2xl font-bold text-primary">105 <span className="text-sm text-on-surface-variant font-medium">kcal</span></p>
                        </div>
                        <div className="bg-surface-container rounded-xl p-4 outline outline-1 outline-outline-variant/15 flex flex-col justify-center">
                          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-1">Protein</p>
                          <p className="font-headline text-2xl font-bold text-on-surface">22 <span className="text-sm text-on-surface-variant font-medium">g</span></p>
                        </div>
                        <div className="bg-surface-container rounded-xl p-4 outline outline-1 outline-outline-variant/15 flex flex-col justify-center">
                          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-1">Fat</p>
                          <p className="font-headline text-2xl font-bold text-on-surface">2.4 <span className="text-sm text-on-surface-variant font-medium">g</span></p>
                        </div>
                        <div className="bg-surface-container rounded-xl p-4 outline outline-1 outline-outline-variant/15 flex flex-col justify-center">
                          <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-1">Carbs</p>
                          <p className="font-headline text-2xl font-bold text-on-surface">0 <span className="text-sm text-on-surface-variant font-medium">g</span></p>
                        </div>
                      </div>
                      <p className="font-label text-xs text-on-surface-variant mt-4 opacity-70">* Nutritional values are approximate per 100g serving.</p>
                    </motion.div>
                  )}

                  {activeTab === 'storage' && (
                    <motion.div 
                      key="storage"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-body text-base text-on-surface leading-relaxed">
                        Keep refrigerated below 4°C (39°F). Consume within 2 days of delivery. For longer storage, freeze immediately upon receiving and consume within 3 months. Thaw safely in the refrigerator overnight before cooking.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Add to Cart Area */}
            <div className="mt-12 flex flex-col gap-4">
              
              <div className="relative w-full">
                {/* Floating Confirmation Toast */}
                <AnimatePresence>
                  {cargoAdded && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -50, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="absolute top-0 right-0 left-0 mx-auto w-max flex items-center justify-center gap-2 bg-surface-variant/90 backdrop-blur-md text-primary font-headline text-sm font-bold px-4 py-2 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-primary/20 pointer-events-none z-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Successfully added to cargo
                    </motion.div>
                  )}
                </AnimatePresence>

                <OceanButton 
                  onClick={handleAddCargo}
                  className={`w-full h-16 font-headline font-bold text-lg rounded-xl overflow-hidden transition-all duration-500 group ${!cargoAdded ? 'bg-gradient-to-br from-[#002e34]/80 to-[#001418] text-white border-primary/40 shadow-[0_0_25px_rgba(0,218,243,0.15)] hover:shadow-[0_0_35px_rgba(0,218,243,0.35)] hover:border-primary' : 'bg-surface-container text-primary border-primary/10 shadow-none'}`}
                >
                  {/* Subtle color overlay enhancer matching primary theme purely visually on hover */}
                  {!cargoAdded && <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 z-10 pointer-events-none"></div>}

                  <motion.div
                    initial={false}
                    animate={{ scale: cargoAdded ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 relative z-20"
                  >
                    {cargoAdded ? <CheckCircle className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
                  </motion.div>
                  <span className="relative z-20 mx-2">{cargoAdded ? 'Added to Cargo' : 'Add to Cargo'}</span>
                  {!cargoAdded && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current opacity-80 relative z-20">
                      <path d="M20.25 10C18.5 7 14 6 10 7C8.5 7.375 7 8 6 9.5C5.5 10.25 5.5 11.5 4 11C3 10.6667 1.5 10.5 1 11.5C1 12.5 2 13 3 13C4 13 5 12.5 6 13C7.5 14.5 10 15 13 14C17 12.6667 19.5 12 20.25 10Z"/>
                      <path d="M4 11L1 9V14L4 12V11Z"/>
                    </svg>
                  )}
                </OceanButton>
                
                {/* Bubble burst animation */}
                {cargoAdded && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                    {[...Array(12)].map((_, i) => {
                      const angle = (i / 12) * Math.PI * 2;
                      const distance = 40 + Math.random() * 60;
                      const x = Math.cos(angle) * distance;
                      const y = Math.sin(angle) * distance - 20; // Bias upwards
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                          animate={{ 
                            opacity: [1, 1, 0],
                            scale: [0, Math.random() * 0.8 + 0.4, 0.2],
                            x: x, 
                            y: y 
                          }}
                          transition={{ 
                            duration: 0.8 + Math.random() * 0.5, 
                            ease: "easeOut" 
                          }}
                          className="absolute w-3 h-3 bg-primary rounded-full blur-[1px]"
                          style={{ boxShadow: '0 0 10px rgba(0,218,243,0.8)' }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quantity Selector moved below the Add to Cargo button */}
              <div className="flex items-center justify-between bg-surface-container-lowest rounded-xl outline outline-1 outline-outline-variant/30 px-4 h-14 mt-2">
                <span className="font-label font-medium text-sm text-on-surface-variant uppercase tracking-wider">Quantity</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface hover:bg-surface-variant text-on-surface-variant hover:text-primary transition-all shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-headline font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface hover:bg-surface-variant text-on-surface-variant hover:text-primary transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Wishlist Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center justify-center gap-2 w-full h-14 rounded-xl font-headline font-semibold text-sm tracking-wide transition-all duration-300 outline outline-1 ${isWishlisted ? 'bg-error/10 text-error outline-error/30 hover:bg-error/20' : 'bg-transparent text-on-surface-variant outline-outline-variant/30 hover:text-on-surface hover:bg-surface-container-high hover:outline-outline-variant'}`}
              >
                <Heart className={`w-5 h-5 transition-transform duration-300 ${isWishlisted ? 'fill-current scale-110' : 'hover:scale-110'}`} />
                <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </motion.button>
            </div>
            
          </div>
        </div>
      </main>

      {/* Cross-Sell */}
      <section className="bg-surface-container-lowest py-20 relative outline outline-1 outline-outline-variant/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight">Complete Your Catch</h3>
              <p className="font-label text-sm text-on-surface-variant mt-2">Elevate your preparation with these essentials.</p>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {[
              {
                name: 'Coastal Pepper Marinade', price: '$8.50',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUwCT4l86pgNm7PYvaSJnaebGocn3Wp-2aobmMWlJ7eexjnzUFcqZcI-wjKRRCN88ZhT71g41Fq3pymMTmIptGUkXSI6YumQ54tfT5Ik00_PbJ5SSP_qJKlsEzifxwbGvqNSqK40rbzSNtAhFBuvHMCkMN3L9EBNMOYKX41JJSmcQ0LMmTFcZYcn0rutSPptfIL0HqFFZNTiOJlAgxtbe5BNSOSFNk_BcEt7EA7xdBoJ134-Ym6OX3cCwIFl4Cf1d6M5ntEQ7Uv598'
              },
              {
                name: 'Organic Amalfi Lemons', price: '$4.00',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuH1bQ-dRgA3KivD6LVsysA91ZYYElyybcUXPNHvj3r_pEx60BMLR9qUvqr7FcNntVjzZ8h3cFwVAQ5lRAgyfdnp4Sx5AWgV4RooOrV3H6zRxXgmU8R5-Pv3Tiat_1-e37wlOmAlZE0TaKfWpNfDCFLtOaIn35R9dd9-rymodqd-vNgPiOhBrZodnwdEF6krAVSkCxchzzCq_SavqwtcZccw36Y-_EhfMIkT6gqnTqIYx1OTDFAU3EyD5cAq0EkWsXWfXDo7FXIM9q'
              },
              {
                name: 'Fresh Dill Bunch', price: '$2.50',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHsjK7i86ugSz9roI1QgE-D2nw1wVLsMX0ifxQWtxKFHqDzMF0b6oq4wJIDiJWuv3J4P23fvKA3-maeJsB8PTnBWH0gvXsww7Wtexkpydhn8HGl8FBry8cHPr6wfLtvCBEXbQ3uL01l5jlP3Cqyy2Zt28qSiXj3v0nGISZv61jXCgaqUysRWXhNLNiI2Zq0EpLZEIwjsmsOiA58R3ut9ZT78eG-J_gz9iXP8sjBDJ3TuPTyN8OMGa4MMxzU9uh7-J58Ltp9ohULXjy'
              }
            ].map((addon, i) => (
              <AddonCard key={i} addon={addon} />
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Inspiration */}
      <section className="py-32 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1 lg:pr-12">
            <div className="inline-flex items-center gap-2 text-primary font-label text-sm tracking-widest uppercase mb-6">
              <Utensils className="w-4 h-4" /> Culinary Inspiration
            </div>
            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter leading-tight mb-6">
              Pan-Seared <br/><span className="text-on-surface-variant">Perfection.</span>
            </h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8">
              Unlock the rich, flaky texture of Vanjaram. A quick sear in a hot cast-iron skillet with brown butter, coastal spices, and a squeeze of fresh citrus is all it takes to elevate this premium cut into a masterpiece.
            </p>
            <a href="#" className="inline-flex items-center gap-3 text-primary font-headline font-semibold text-lg group">
              View Full Recipe
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] outline outline-1 outline-outline-variant/20 -rotate-2">
              <img alt="Cooked Seer Fish" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbY54xBqWFGkLbLyvpKnDz89U4M98DqTlQdQy1YjLdvlwLJ-CsDAyaO663ap4CLdL3dq7UhoNPZ2hIhlzlVh5bUfbdR6_SkjwjaCCd7W3IqPHBpjMn-RnvIR1O9BIGoDD8BWyup8IRfSr4NsUok3M0kjolASEkCr9fCqPtpfTBTJqluOjZRg9tQNmpek4Np70g9hkVi16x4X8JdQxt_3gINNuAc4W2C1oG9NWt1iUaNw4jb_bqOMWrwj8JHR0e7Krp94LZst4_bm7d" />
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-surface-container-high/90 backdrop-blur-md p-6 rounded-2xl shadow-xl outline outline-1 outline-outline-variant/30 hidden md:block">
              <div className="flex gap-4 items-center">
                <Timer className="w-10 h-10 text-primary" />
                <div>
                  <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider">Prep & Cook</p>
                  <p className="font-headline text-xl font-bold text-on-surface">15 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24 bg-surface-container-lowest relative border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="inline-flex items-center gap-2 text-primary font-label text-sm tracking-widest uppercase mb-4">
              <Star className="w-4 h-4 fill-primary" /> Customer Reviews
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tighter mb-4">
              Trusted by the community
            </h2>
            <p className="font-body text-on-surface-variant max-w-xl mb-8">
              See what our customers are saying about the quality and taste of our freshly sourced Seer Fish steaks.
            </p>
            <OceanButton
              onClick={() => setIsReviewOpen(true)}
              className="px-8 py-3 rounded-full text-sm font-label uppercase tracking-widest bg-surface-container-high border-outline-variant/30 text-on-surface hover:text-primary transition-colors hover:border-primary/50 shadow-sm"
            >
              Write a Review
            </OceanButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-surface-container-low rounded-2xl p-8 outline outline-1 outline-outline-variant/15 flex flex-col items-start hover:outline-primary/30 transition-all hover:bg-surface-container group">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(0,218,243,0.3)] transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />)}
              </div>
              <p className="font-body text-base text-on-surface leading-relaxed flex-grow mb-8">
                "Absolutely fantastic! The steaks were remarkably fresh, firm, and grilled beautifully with just a little olive oil and sea salt."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-headline font-bold text-primary border border-primary/20">JD</div>
                <div className="flex flex-col">
                  <span className="font-headline font-bold text-sm text-on-surface">John D.</span>
                  <span className="font-label text-xs text-on-surface-variant">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-surface-container-low rounded-2xl p-8 outline outline-1 outline-outline-variant/15 flex flex-col items-start hover:outline-primary/30 transition-all hover:bg-surface-container group">
              <div className="flex gap-1 mb-6">
                {[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(0,218,243,0.3)] transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />)}
                <Star className="w-5 h-5 text-on-surface-variant/30 transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `200ms` }} />
              </div>
              <p className="font-body text-base text-on-surface leading-relaxed flex-grow mb-8">
                "Great cuts, arrived perfectly frozen using the premium packaging. Thawed excellently and tasted like a fresh catch."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-headline font-bold text-primary border border-primary/20">SM</div>
                <div className="flex flex-col">
                  <span className="font-headline font-bold text-sm text-on-surface">Sarah M.</span>
                  <span className="font-label text-xs text-on-surface-variant">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-surface-container-low rounded-2xl p-8 outline outline-1 outline-outline-variant/15 flex flex-col items-start hover:outline-primary/30 transition-all hover:bg-surface-container group">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(0,218,243,0.3)] transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />)}
              </div>
              <p className="font-body text-base text-on-surface leading-relaxed flex-grow mb-8">
                "The best seer fish I've bought online. Makes a perfect Kerala curry. The thickness of the steaks was extremely consistent."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-headline font-bold text-primary border border-primary/20">PT</div>
                <div className="flex flex-col">
                  <span className="font-headline font-bold text-sm text-on-surface">Priya T.</span>
                  <span className="font-label text-xs text-on-surface-variant">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewOpen(false)}
              className="absolute inset-0 bg-[#03070a]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline text-2xl font-bold text-on-surface">Write a Review</h3>
                  <button 
                    onClick={() => setIsReviewOpen(false)}
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-surface-container rounded-full hover:shadow-[0_0_15px_rgba(0,218,243,0.3)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Rating Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-sm text-on-surface-variant uppercase tracking-wider">Your Rating</label>
                    <div className="flex gap-2" onMouseLeave={() => setReviewFormHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setReviewFormHoverRating(star)}
                          onClick={() => setReviewFormRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                        >
                          <Star 
                            className={`w-8 h-8 transition-colors duration-200 ${
                              (reviewFormHoverRating || reviewFormRating) >= star 
                                ? 'fill-primary text-primary drop-shadow-[0_0_8px_rgba(0,218,243,0.4)]' 
                                : 'fill-transparent text-outline-variant hover:text-primary/50'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-label text-sm text-on-surface-variant uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe" 
                      className="w-full bg-surface-container rounded-xl p-4 text-on-surface border border-outline-variant/20 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-body"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-label text-sm text-on-surface-variant uppercase tracking-wider">Review</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us what you loved about this catch..." 
                      className="w-full bg-surface-container rounded-xl p-4 text-on-surface border border-outline-variant/20 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-body resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button 
                    onClick={() => setIsReviewOpen(false)}
                    className="px-6 py-3 rounded-xl font-label text-sm hover:bg-surface-container text-on-surface-variant transition-colors"
                  >
                    Cancel
                  </button>
                  <OceanButton 
                    onClick={() => setIsReviewOpen(false)}
                    className="px-8 py-3 rounded-xl font-label text-sm font-bold bg-primary text-[#001418] hover:shadow-[0_0_20px_rgba(0,218,243,0.4)] transition-all"
                  >
                    Submit Review
                  </OceanButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
