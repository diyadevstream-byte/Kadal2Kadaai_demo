import React, { useState } from 'react';
import { MapPin, ShoppingBag, User, Search, X, ChevronRight } from 'lucide-react';
import { ScreenType } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import OceanButton from './OceanButton';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export default function Layout({ children, currentScreen, onNavigate }: LayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary">
      {/* TopNavBar */}
      <nav id="main-nav" className="fixed top-0 w-full z-50 bg-[#03070a]/75 support-[backdrop-filter]:backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
        {/* Subtle animated top glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(0,218,243,0.8)] opacity-50"></div>
        
        <div className="flex justify-between items-center px-6 lg:px-12 h-20 w-full max-w-[1600px] mx-auto relative">
          
          {/* Left: Navigation Links */}
          <div className="flex-1 hidden lg:flex items-center gap-10">
            <button 
              onClick={() => onNavigate('home')} 
              className={`font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group h-20 flex items-center ${currentScreen === 'home' ? 'text-primary drop-shadow-[0_0_8px_rgba(0,218,243,0.3)]' : 'text-on-surface-variant hover:text-white'}`}
            >
              Sourcing
              <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 bg-primary shadow-[0_0_10px_rgba(0,218,243,0.8)] ${currentScreen === 'home' ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`}></span>
            </button>
            <button 
              onClick={() => onNavigate('marketplace')} 
              className={`font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group h-20 flex items-center ${currentScreen === 'marketplace' ? 'text-primary drop-shadow-[0_0_8px_rgba(0,218,243,0.3)]' : 'text-on-surface-variant hover:text-white'}`}
            >
              The Catch
              <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 bg-primary shadow-[0_0_10px_rgba(0,218,243,0.8)] ${currentScreen === 'marketplace' ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`}></span>
            </button>
            <button className="font-label text-xs tracking-[0.2em] uppercase text-on-surface-variant hover:text-white transition-all duration-300 relative group h-20 flex items-center">
              Culinary
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(0,218,243,0.8)] transition-all duration-300 group-hover:w-full opacity-50"></span>
            </button>
          </div>

          {/* Mobile Menu Icon (Left on mobile) */}
          <div className="flex-1 flex lg:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 p-2 -ml-2 rounded-full hover:bg-surface-container"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Center: Brand Logo (Absolutely centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center h-full pointer-events-none">
            <button 
              onClick={() => onNavigate('home')}
              className="group relative flex items-center justify-center p-2 pointer-events-auto"
            >
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
              <span className="font-headline text-2xl lg:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-primary-container to-[#006e7a] hover:to-primary relative z-10 transition-colors duration-500 will-change-transform group-hover:scale-105">
                ABYSSAL
              </span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-1 sm:gap-2 text-on-surface-variant">
            <button className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full hover:bg-surface-container-high hover:text-primary hover:shadow-[0_0_15px_rgba(0,218,243,0.15)] transition-all duration-300">
              <Search className="w-[1.125rem] h-[1.125rem]" />
            </button>
            <button className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full hover:bg-surface-container-high hover:text-primary hover:shadow-[0_0_15px_rgba(0,218,243,0.15)] transition-all duration-300">
              <MapPin className="w-[1.125rem] h-[1.125rem]" />
            </button>
            <button className="hidden sm:flex w-11 h-11 items-center justify-center rounded-full hover:bg-surface-container-high hover:text-primary hover:shadow-[0_0_15px_rgba(0,218,243,0.15)] transition-all duration-300">
              <User className="w-[1.125rem] h-[1.125rem]" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex w-11 h-11 items-center justify-center rounded-full hover:bg-surface-container-high hover:text-primary hover:shadow-[0_0_15px_rgba(0,218,243,0.15)] transition-all duration-300 relative group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute top-1.5 right-1.5 bg-primary border-2 border-[#03070a] text-[#001418] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,218,243,0.8)] scale-110 relative z-10 transition-transform duration-300 group-hover:scale-125">
                2
              </span>
            </button>
          </div>
          
        </div>
      </nav>

      {/* Main Content */}
      <main className={`flex-grow ${['home', 'marketplace'].includes(currentScreen) ? 'pt-20' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer id="main-footer" className="bg-surface-container-lowest w-full py-20 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 font-body text-sm leading-relaxed">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <span className="font-headline font-black text-xl text-white">ABYSSAL</span>
            {currentScreen === 'home' ? (
              <p className="text-slate-500 mt-4 max-w-xs">
                Curating the finest catches from the deep. Uncompromising quality, delivered with integrity.
              </p>
            ) : (
              <p className="text-primary mt-auto text-xs lg:text-sm">
                © 2024 ABYSSAL SEAFOOD CO. HARVESTED RESPONSIBLY.
              </p>
            )}
          </div>
          
          {currentScreen === 'home' ? (
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-primary font-semibold mb-2 uppercase tracking-wider text-xs">Company</span>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Our Story</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Traceability</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Wholesale</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-primary font-semibold mb-2 uppercase tracking-wider text-xs">Support</span>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Shipping Policy</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">FAQ</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Contact</a>
              </div>
            </div>
          ) : (
            <>
              <div className="md:col-span-1 flex flex-col gap-4">
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Our Story</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Traceability</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Wholesale</a>
              </div>
              <div className="md:col-span-1 flex flex-col gap-4">
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Shipping Policy</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">FAQ</a>
                <a href="#" className="text-slate-500 hover:text-primary transition-all duration-200">Contact</a>
              </div>
            </>
          )}

          {currentScreen === 'home' && (
            <div className="col-span-1 md:col-span-1 flex flex-col justify-end text-slate-500 text-xs">
              <p>© 2024 ABYSSAL SEAFOOD CO. HARVESTED RESPONSIBLY.</p>
            </div>
          )}
        </div>
      </footer>

      {/* Cargo Sidebar Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            {/* Sidebar */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md h-full bg-surface-container-low border-l border-outline-variant/30 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-outline-variant/30">
                <h2 className="font-headline text-xl font-bold text-on-surface">Your Cargo</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-surface-container rounded-full hover:shadow-[0_0_15px_rgba(0,218,243,0.3)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cargo Items */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="flex gap-4 items-center bg-surface-container rounded-xl p-3 border border-outline-variant/15">
                  <div className="w-20 h-20 rounded-lg bg-surface overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1599084940562-b2d97ad0bc87?auto=format&fit=crop&q=80&w=400&h=400" alt="Seer Fish Steak" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline font-bold text-on-surface mb-1 text-sm">Seer Fish (Vanjaram) Steaks</h4>
                    <p className="text-primary font-bold text-sm mb-2">$34.00</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-on-surface-variant">Qty: 1</span>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-error transition-colors p-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex gap-4 items-center bg-surface-container rounded-xl p-3 border border-outline-variant/15">
                  <div className="w-20 h-20 rounded-lg bg-surface overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1596624063236-8c2cbab2a69d?auto=format&fit=crop&q=80&w=400&h=400" alt="Lemon Herb Butter" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline font-bold text-on-surface mb-1 text-sm">Lemon Herb Butter</h4>
                    <p className="text-primary font-bold text-sm mb-2">$4.50</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-on-surface-variant">Qty: 2</span>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-error transition-colors p-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Footer / Checkout */}
              <div className="p-6 bg-surface-container border-t border-outline-variant/30 flex flex-col gap-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-bold text-on-surface">$43.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-primary font-medium">Calculated at checkout</span>
                </div>
                <div className="h-px w-full bg-outline-variant/30 my-2"></div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-headline font-bold text-lg text-on-surface">Total</span>
                  <span className="font-headline font-bold text-2xl text-primary">$43.00</span>
                </div>
                <OceanButton className="w-full h-14 bg-primary text-primary-container font-bold hover:shadow-[0_0_30px_rgba(0,218,243,0.4)]">
                  <span>Proceed to Checkout</span>
                </OceanButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-start lg:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            {/* Sidebar */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-[80vw] sm:max-w-sm h-full bg-surface-container-low border-r border-outline-variant/30 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
                <span className="font-headline text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary-container">
                  ABYSSAL
                </span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-surface-container rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-2">
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setIsMenuOpen(false);
                  }}
                  className={`flex justify-between items-center p-4 rounded-xl transition-colors ${currentScreen === 'home' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface hover:bg-surface-container'}`}
                >
                  <span className="font-headline font-bold uppercase tracking-widest text-sm">Sourcing</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <button 
                  onClick={() => {
                    onNavigate('product');
                    setIsMenuOpen(false);
                  }}
                  className={`flex justify-between items-center p-4 rounded-xl transition-colors ${currentScreen === 'product' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface hover:bg-surface-container'}`}
                >
                  <span className="font-headline font-bold uppercase tracking-widest text-sm">The Catch</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <button className="flex justify-between items-center p-4 rounded-xl text-on-surface hover:bg-surface-container transition-colors">
                  <span className="font-headline font-bold uppercase tracking-widest text-sm">Culinary</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <div className="h-px bg-outline-variant/30 my-4"></div>
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex gap-4 text-on-surface-variant items-center px-4 hover:text-primary transition-colors cursor-pointer">
                    <User className="w-5 h-5" /> <span>Account</span>
                  </div>
                  <div className="flex gap-4 text-on-surface-variant items-center px-4 hover:text-primary transition-colors cursor-pointer">
                    <MapPin className="w-5 h-5" /> <span>Location</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
