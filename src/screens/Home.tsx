import React from 'react';
import { ArrowRight, MapPin, BadgeCheck, Star, ShoppingCart, Plus } from 'lucide-react';
import OceanButton from '../components/OceanButton';

export default function Home({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      <section className="relative min-h-[921px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Dark, moody underwater shot of deep ocean currents" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtXGRD9o16emfR5jNVOMUiCJtjyVHJgILUC9374MGmX75G8iTdrKFcferyuPQ20vxw58QUjEo0tYdB2GN2Udc04465-6JG_mjdiS9QjQ6pzSaJmnmWExPCSDUTpXfgx80QaVfCVigixtYG1iehiWFVIHdMwylmpbeAffnYSy8CP2itlXYOJ7Zb6nV1U8Gr5SqDidD2XVbFfj3N2yLQsd7F-22eqj5P6IcGuM-181Altw1orug2v37ljQJTqUDpsR3X09P24eOM47WC"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="absolute inset-0 faint-wave-overlay opacity-30"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Typography */}
          <div className="lg:col-span-7 flex flex-col gap-6 pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest/50 ghost-border backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label text-xs tracking-widest uppercase text-on-surface-variant">Arrival: 04:30 AM EST</span>
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-[-0.03em] font-bold text-white">
              The Depth of <br/>
              <span className="text-gradient">Flavor.</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed mt-4">
              Sustainably sourced from the planet's most pristine waters. Delivered to your kitchen with uncompromising traceability.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <OceanButton 
                onClick={onNavigate}
                className="bg-gradient-to-br from-[#002e34] to-[#001f24] text-white px-8 py-4 rounded-xl font-headline font-bold tracking-tight shadow-[0_0_20px_rgba(0,218,243,0.15)] hover:shadow-[0_0_30px_rgba(0,218,243,0.4)]"
              >
                Explore The Catch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </OceanButton>
              <button className="px-8 py-4 rounded-xl font-headline font-medium text-white bg-surface-container-highest ghost-border hover:bg-surface-variant transition-colors duration-300">
                Our Standards
              </button>
            </div>
          </div>

          {/* Featured Product Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full z-0"></div>
            
            <div className="glass-panel rounded-2xl p-6 relative z-10 deep-sea-shadow film-grain border border-outline-variant/20">
              <div className="relative rounded-xl overflow-hidden mb-6 aspect-[4/3] group cursor-pointer" onClick={onNavigate}>
                <img 
                  alt="Jumbo tiger prawns" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUH7i5sYb3Oi3kmLNdKsYyJl78CoHuSzYU0kyjYK2t9r7gVdT6rY-h_mzqTq09PjXMfUjvfy70HN1yTJClTIMNFXOSSqsUjngzOHtK-5DXIGS0LO5VZwBIVsONK-ZtGP5ZMA4XyaIBfaA19QIqO3esjhSb7ixbU62Q3s-YkF6dv0GPQ5Xk5hrdpAmwQ9ltym4ATkrk9ClZgC9FsS2ISZpWoYCAdT7_vnyTKFP6-C7VeRMTYAZU2C2uXqoFta46YIyehk8N-kDaUOi3"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded-lg font-label text-xs font-semibold text-primary">
                  Featured Catch
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-white mb-1">Jumbo Tiger Prawns</h3>
                  <p className="font-label text-sm text-on-surface-variant flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Bay of Bengal
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline text-2xl font-bold text-primary">$42</span>
                  <span className="font-label text-xs text-on-surface-variant block">/ lb</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Status</span>
                    <span className="block font-label text-xs font-semibold text-white">Fresh Today</span>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-error">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Rating</span>
                    <span className="block font-label text-xs font-semibold text-white">4.9 (128)</span>
                  </div>
                </div>
              </div>
              
              <OceanButton 
                onClick={onNavigate}
                className="w-full py-3 rounded-lg bg-[#001f24] text-white font-headline font-semibold"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </OceanButton>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Arrivals */}
      <section className="py-12 bg-background border-t border-surface-container-low relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-white">Fresh Arrivals</h2>
              <p className="font-body text-sm text-on-surface-variant mt-1">Sourced within the last 24 hours.</p>
            </div>
            <button 
              onClick={onNavigate}
              className="font-label text-sm text-primary hover:text-white transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
            
            {[
              {
                name: 'King Salmon', location: 'Copper River, AK', price: '$34/lb', tag: 'Wild Caught', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-8SVr2T7TgmGxx_nAkQs3HdVHGT55A5CIEbJ3uGOpnW7r4AxO-41oEP_OQs3KUkxVqDtasDXQnTb94B25wMNUM36RNMx1DoFGG91EGxA0oYXK8zrntMRifA29cG2RcDc3rWwpa6j0VIrHxdrfpDevHshUK-gU_IwEY28rsFQQ35SMAr1wsYoFlLTCn58QzzsBJHkhS-fVDqEusgeZ1ENTyAoq0ysvYCn-O8ATFjSqFcRL3gtbxsy8Yh_kabQsflAjo15GiHStkmhx'
              },
              {
                name: 'Kumamoto Oysters', location: 'Puget Sound, WA', price: '$28/dz', tag: '', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCntcUVtKDW7A4_otBSTowmrWbgCTjZfCgG7M8F_rJFBfmUYkDBXllzPmSKKzu9UrD8bWYYzq7BoG7_u5zpOEE_6dYzFtbY2QRrkGBrjjaKoemHGAm3PB3F4zs9r2lAcSa0yJPJnXMEcSoL0Zrq9lO3llRoa1x6oIn2DKlqfYWW1kWZeAn6spP2wk21P37ZgZJKZdM5bouY5YWzgV-n8WOVDOTDRPx_aZ9dEzjC6myrnAHcFNHnFv7Ub2wmDxc4wkvQywKonO-IKXEg'
              },
              {
                name: 'Diver Scallops', location: 'Georges Bank, MA', price: '$45/lb', tag: 'Day Boat', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyY3TK4a_VxkPJtxsCYwa6I1hKQhbqMb4P5cgRpMr-3xetPChLu7GOXrVhhegAFKAWBAvZq1sETAVAi4Z4QyWMsArA5z_wfxcM794y0MvekveAmiu_awKnANFRtZ63WJw-icS85kSn2_G6HQ7tVewc8tq6dwpq9gPOjllhXr2EiuTF6QstLK0JtEzp85SlCHhIc1PsZLdy2ZFW0kQ4eDo4iNR8dx5i7QZPp15kiVckO8Q_GbsclHm-gmhWNEwkhd9NsA03f91-MuVI'
              },
              {
                name: 'Ahi Tuna Saku', location: 'Honolulu, HI', price: '$38/lb', tag: '', 
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5GIyweXkgrnmS5QpTMggQ6Gxg1J4E97y_w6OXKLzmgSK_xV8JzAma0-2EWKWW4bumTtVSKbjFgfR6jCpvxswRKQ7pQotR8fus-ioowdYm4ft9nX8Axe5hYtALBcl4QsnbcyWMNg2XOlQgbZdGPrKdeb42vaUeAJP3dw4Jd_O5Kzx0-tOu80hvEwfb7WD7EgDKClZDTuTxq9uEP-McCrwUHORHfvNL5LAjWD-0CrZV2yImLTrNCu_94n8-RFbneWVUc5N5sO5dMiv'
              }
            ].map((p, i) => (
              <div key={i} onClick={onNavigate} className="min-w-[280px] snap-start bg-surface-container rounded-xl p-4 ghost-border hover:bg-surface-container-high transition-colors group cursor-pointer">
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 relative">
                  <img alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.img} />
                  {p.tag && (
                    <div className="absolute top-2 right-2 bg-surface-container-lowest/80 backdrop-blur rounded px-2 py-1 font-label text-[10px] text-white">
                      {p.tag}
                    </div>
                  )}
                </div>
                <h4 className="font-headline font-bold text-white text-lg">{p.name}</h4>
                <p className="font-label text-xs text-on-surface-variant mt-1 mb-3">{p.location}</p>
                <div className="flex justify-between items-center">
                  <span className="font-headline font-bold text-primary">{p.price}</span>
                  <button className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-white hover:text-primary transition-colors">
                    <Plus className="w-4 h-4" />
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
