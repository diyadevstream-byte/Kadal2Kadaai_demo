import { ArrowRight, MapPin, BadgeCheck, Star, ShoppingCart, Plus, Anchor, Clock, ThermometerSnowflake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OceanButton from '../components/OceanButton';
import { useCart } from '../context/CartContext';

export default function Home({ onNavigate }: { onNavigate: () => void }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-container-lowest transition-colors duration-500">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Moody underwater shot of deep ocean currents" 
            className="w-full h-full object-cover opacity-40 dark:opacity-40 mix-blend-luminosity dark:mix-blend-luminosity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtXGRD9o16emfR5jNVOMUiCJtjyVHJgILUC9374MGmX75G8iTdrKFcferyuPQ20vxw58QUjEo0tYdB2GN2Udc04465-6JG_mjdiS9QjQ6pzSaJmnmWExPCSDUTpXfgx80QaVfCVigixtYG1iehiWFVIHdMwylmpbeAffnYSy8CP2itlXYOJ7Zb6nV1U8Gr5SqDidD2XVbFfj3N2yLQsd7F-22eqj5P6IcGuM-181Altw1orug2v37ljQJTqUDpsR3X09P24eOM47WC"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="absolute inset-0 faint-wave-overlay opacity-30"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Typography */}
          <div className="lg:col-span-7 flex flex-col gap-6 pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest/50 dark:bg-surface-container-highest/50 ghost-border backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label text-xs tracking-widest uppercase text-on-surface-variant">Arrival: 04:30 AM EST</span>
            </div>
            
            <div className="flex flex-col -gap-2 lg:-gap-4 mb-4">
               <h1 className="font-headline text-5xl md:text-7xl lg:text-[7rem] leading-[0.85] tracking-[-0.05em] font-black text-on-surface uppercase italic">
                  Kadal 2
               </h1>
               <h1 className="font-headline text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-[-0.05em] font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary-container to-primary uppercase">
                  Kadaai
               </h1>
            </div>
            
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed mt-4">
              Sustainably sourced from the planet's most pristine waters. Delivered to your kitchen with uncompromising traceability.
            </p>

            {/* Freshness Proof: High-Trust Banner */}
            <div className="flex flex-col gap-5 mt-6 relative w-fit">
               <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-[2rem] pointer-events-none"></div>
               <div className="relative bg-surface-container-low dark:bg-transparent dark:glass-panel rounded-3xl p-6 lg:p-8 flex flex-col md:row items-start md:items-center gap-6 lg:gap-10 border border-outline-variant/10 dark:border-white/10 shadow-xl dark:shadow-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  <div className="flex flex-col gap-1.5 shrink-0">
                     <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Today's Catch
                     </span>
                     <span className="font-headline text-lg lg:text-xl font-bold text-on-surface tracking-tight">Caught at 5:30 AM</span>
                  </div>

                  <div className="h-px md:w-px md:h-10 bg-outline-variant/20 hidden md:block"></div>

                  <div className="grid grid-cols-3 gap-6 lg:gap-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/10 shadow-inner">
                           <Anchor className="w-5 h-5 text-primary opacity-60" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[9px] uppercase font-black tracking-widest text-on-surface-variant">Source</span>
                           <span className="text-xs font-bold text-on-surface">Rameswaram</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/10 shadow-inner">
                           <Clock className="w-5 h-5 text-primary opacity-60" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[9px] uppercase font-black tracking-widest text-on-surface-variant">Time</span>
                           <span className="text-xs font-bold text-on-surface">6h Deliv.</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center border border-outline-variant/10 shadow-inner">
                           <ThermometerSnowflake className="w-5 h-5 text-primary opacity-60" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[9px] uppercase font-black tracking-widest text-on-surface-variant">Chain</span>
                           <span className="text-xs font-bold text-on-surface">0-4°C Pro</span>
                        </div>
                     </div>
                  </div>
               </div>
               
               <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2">Verified Sourcing Control System</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-10">
              <OceanButton 
                onClick={onNavigate}
                className="bg-primary text-white px-8 h-18 rounded-2xl font-headline font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
              >
                Explore The Catch
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </OceanButton>
              <button 
                onClick={() => document.getElementById('main-footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 h-18 flex items-center justify-center rounded-2xl font-headline font-bold uppercase tracking-widest text-xs text-on-surface bg-surface-container-high border border-outline-variant/50 hover:bg-surface-variant transition-all"
              >
                Our Standards
              </button>
            </div>
          </div>

          {/* Featured Product Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full z-0"></div>
            
            <div className="bg-surface-container rounded-3xl p-6 relative z-10 shadow-2xl film-grain border border-outline-variant/20">
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/3] group cursor-pointer" onClick={() => navigate('/product')}>
                <img 
                  alt="Jumbo tiger prawns" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUH7i5sYb3Oi3kmLNdKsYyJl78CoHuSzYU0kyjYK2t9r7gVdT6rY-h_mzqTq09PjXMfUjvfy70HN1yTJClTIMNFXOSSqsUjngzOHtK-5DXIGS0LO5VZwBIVsONK-ZtGP5ZMA4XyaIBfaA19QIqO3esjhSb7ixbU62Q3s-YkF6dv0GPQ5Xk5hrdpAmwQ9ltym4ATkrk9ClZgC9FsS2ISZpWoYCAdT7_vnyTKFP6-C7VeRMTYAZU2C2uXqoFta46YIyehk8N-kDaUOi3"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white rounded-lg font-label text-[10px] font-black uppercase tracking-widest">
                  Featured Catch
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-1">Jumbo Tiger Prawns</h3>
                  <p className="font-label text-sm text-on-surface-variant flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Bay of Bengal
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline text-2xl font-bold text-primary">₹3,486</span>
                  <span className="font-label text-xs text-on-surface-variant block uppercase font-bold tracking-widest">/ kg</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/10 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-label text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Status</span>
                    <span className="block font-label text-xs font-bold text-on-surface">Fresh Today</span>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/10 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-error">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-label text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Rating</span>
                    <span className="block font-label text-xs font-bold text-on-surface">4.9 (128)</span>
                  </div>
                </div>
              </div>
              
              <OceanButton 
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  addToCart({
                    id: 'tiger-prawns',
                    name: 'Tiger Prawns',
                    price: 3486,
                    weight: '1kg',
                    cutType: 'Whole',
                    quantity: 1,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUH7i5sYb3Oi3kmLNdKsYyJl78CoHuSzYU0kyjYK2t9r7gVdT6rY-h_mzqTq09PjXMfUjvfy70HN1yTJClTIMNFXOSSqsUjngzOHtK-5DXIGS0LO5VZwBIVsONK-ZtGP5ZMA4XyaIBfaA19QIqO3esjhSb7ixbU62Q3s-YkF6dv0GPQ5Xk5hrdpAmwQ9ltym4ATkrk9ClZgC9FsS2ISZpWoYCAdT7_vnyTKFP6-C7VeRMTYAZU2C2uXqoFta46YIyehk8N-kDaUOi3'
                  });
                }}
                className="w-full h-16 rounded-[1.5rem] bg-primary text-white font-headline font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cargo
              </OceanButton>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Arrivals */}
      <section className="py-16 bg-surface-container-low border-t border-outline-variant/10 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-headline text-3xl font-black text-on-surface tracking-tight uppercase">Fresh Arrivals</h2>
              <p className="font-body text-sm text-on-surface-variant mt-1">Sourced within the last 24 hours.</p>
            </div>
            <button 
              onClick={onNavigate}
              className="font-label text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container transition-colors flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
            
            {[
              {
                name: 'King Salmon', location: 'Copper River, AK', price: '₹2,822/lb', tag: 'Wild Caught', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-8SVr2T7TgmGxx_nAkQs3HdVHGT55A5CIEbJ3uGOpnW7r4AxO-41oEP_OQs3KUkxVqDtasDXQnTb94B25wMNUM36RNMx1DoFGG91EGxA0oYXK8zrntMRifA29cG2RcDc3rWwpa6j0VIrHxdrfpDevHshUK-gU_IwEY28rsFQQ35SMAr1wsYoFlLTCn58QzzsBJHkhS-fVDqEusgeZ1ENTyAoq0ysvYCn-O8ATFjSqFcRL3gtbxsy8Yh_kabQsflAjo15GiHStkmhx'
              },
              {
                name: 'Kumamoto Oysters', location: 'Puget Sound, WA', price: '₹2,324/dz', tag: '', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCntcUVtKDW7A4_otBSTowmrWbgCTjZfCgG7M8F_rJFBfmUYkDBXllzPmSKKzu9UrD8bWYYzq7BoG7_u5zpOEE_6dYzFtbY2QRrkGBrjjaKoemHGAm3PB3F4zs9r2lAcSa0yJPJnXMEcSoL0Zrq9lO3llRoa1x6oIn2DKlqfYWW1kWZeAn6spP2wk21P37ZgZJKZdM5bouY5YWzgV-n8WOVDOTDRPx_aZ9dEzjC6myrnAHcFNHnFv7Ub2wmDxc4wkvQywKonO-IKXEg'
              },
              {
                name: 'Diver Scallops', location: 'Georges Bank, MA', price: '₹3,735/lb', tag: 'Day Boat', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyY3TK4a_VxkPJtxsCYwa6I1hKQhbqMb4P5cgRpMr-3xetPChLu7GOXrVhhegAFKAWBAvZq1sETAVAi4Z4QyWMsArA5z_wfxcM794y0MvekveAmiu_awKnANFRtZ63WJw-icS85kSn2_G6HQ7tVewc8tq6dwpq9gPOjllhXr2EiuTF6QstLK0JtEzp85SlCHhIc1PsZLdy2ZFW0kQ4eDo4iNR8dx5i7QZPp15kiVckO8Q_GbsclHm-gmhWNEwkhd9NsA03f91-MuVI'
              },
              {
                name: 'Ahi Tuna Saku', location: 'Honolulu, HI', price: '₹3,154/lb', tag: '', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5GIyweXkgrnmS5QpTMggQ6Gxg1J4E97y_w6OXKLzmgSK_xV8JzAma0-2EWKWW4bumTtVSKbjFgfR6jCpvxswRKQ7pQotR8fus-ioowdYm4ft9nX8Axe5hYtALBcl4QsnbcyWMNg2XOlQgbZdGPrKdeb42vaUeAJP3dw4Jd_O5Kzx0-tOu80hvEwfb7WD7EgDKClZDTuTxq9uEP-McCrwUHORHfvNL5LAjWD-0CrZV2yImLTrNCu_94n8-RFbneWVUc5N5sO5dMiv'
              }
            ].map((p, i) => (
              <div key={i} onClick={() => navigate('/marketplace')} className="min-w-[300px] snap-start bg-surface rounded-[2rem] p-5 border border-outline-variant/30 hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer">
                <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-5 relative shadow-inner">
                  <img alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={p.img} />
                  {p.tag && (
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full font-label text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {p.tag}
                    </div>
                  )}
                </div>
                <h4 className="font-headline font-black text-on-surface text-xl tracking-tight leading-none mb-1">{p.name}</h4>
                <p className="font-label text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-4">{p.location}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant/10">
                  <span className="font-headline font-black text-lg text-primary">{p.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: p.name.toLowerCase().replace(/\s+/g, '-'),
                        name: p.name,
                        price: parseInt(p.price.replace(/[^\d]/g, '')),
                        weight: '1 unit',
                        cutType: 'Whole',
                        quantity: 1,
                        image: p.img
                      });
                    }}
                    className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </section>
    </>
  );
}
