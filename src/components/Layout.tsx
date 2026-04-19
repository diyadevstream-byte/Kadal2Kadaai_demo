import React, { useState } from 'react';
import { MapPin, ShoppingBag, User, Search, X, ChevronRight, Moon, Sun } from 'lucide-react';
import { ScreenType } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import OceanButton from './OceanButton';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export default function Layout({ children, currentScreen, onNavigate }: LayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleScrollToFooter = (e?: React.MouseEvent) => {
    e?.preventDefault();
    document.getElementById('main-footer')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary">
      {/* TopNavBar */}
      <nav id="main-nav" className="fixed top-0 w-full z-50 bg-background/80 support-[backdrop-filter]:backdrop-blur-2xl border-b border-outline-variant/10 shadow-lg">
        {/* Subtle animated top glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
        
        <div className="flex justify-between items-center px-6 lg:px-12 h-20 w-full max-w-[1280px] mx-auto relative">
          
          {/* Left: Navigation Links */}
          <div className="flex-1 hidden lg:flex items-center gap-10">
            <button 
              onClick={() => onNavigate('home')} 
              className={`font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group h-20 flex items-center ${currentScreen === 'home' ? 'text-primary font-black' : 'text-on-surface-variant hover:text-on-surface font-bold'}`}
            >
              Sourcing
              <span className={`absolute bottom-0 left-0 h-[3px] transition-all duration-300 bg-primary ${currentScreen === 'home' ? 'w-full shadow-[0_0_10px_rgba(230,81,0,0.5)]' : 'w-0 group-hover:w-full opacity-50'}`}></span>
            </button>
            <button 
              onClick={() => onNavigate('marketplace')} 
              className={`font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group h-20 flex items-center ${currentScreen === 'marketplace' ? 'text-primary font-black' : 'text-on-surface-variant hover:text-on-surface font-bold'}`}
            >
              The Catch
              <span className={`absolute bottom-0 left-0 h-[3px] transition-all duration-300 bg-primary ${currentScreen === 'marketplace' ? 'w-full shadow-[0_0_10px_rgba(230,81,0,0.5)]' : 'w-0 group-hover:w-full opacity-50'}`}></span>
            </button>
          </div>

          {/* ... mobile menu ... */}

          {/* Center: Brand Wordmark (Redesigned from image to iconic type) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center h-full pointer-events-none">
            <button 
              onClick={() => onNavigate('home')}
              className="group relative flex items-center justify-center pointer-events-auto px-6 py-2"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-125"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-xl lg:text-2xl font-black tracking-[-0.03em] text-on-surface uppercase italic">
                    Kadal
                  </span>
                  <span className="font-headline text-2xl lg:text-3xl font-black text-primary -skew-x-12 px-1">2</span>
                  <span className="font-headline text-xl lg:text-2xl font-black tracking-[-0.03em] text-on-surface uppercase italic">
                    Kadaai
                  </span>
                </div>
                {/* Custom artistic underline */}
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent mt-[-4px] scale-x-50 group-hover:scale-x-100 transition-transform duration-700 shadow-[0_4px_12px_rgba(0,218,243,0.5)]"></div>
                <div className="font-label text-[8px] uppercase tracking-[0.5em] text-on-surface-variant/60 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  Fresh Seafoods Online
                </div>
              </div>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-1 sm:gap-3 text-on-surface-variant">
            <button 
              onClick={toggleTheme}
              className="flex w-10 h-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-300"
            >
              {theme === 'dark' ? <Sun className="w-[1.125rem] h-[1.125rem]" /> : <Moon className="w-[1.125rem] h-[1.125rem]" />}
            </button>
            
            <button 
              onClick={() => navigate('/cart')}
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-surface-container-high hover:text-primary transition-all duration-300 relative group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-on-surface" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg transform scale-110">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => navigate('/checkout')}
              className="hidden md:flex h-10 px-5 items-center justify-center rounded-full bg-primary text-white font-label text-[10px] items-center gap-2 font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Checkout
            </button>

            <button 
               onClick={() => setIsProfileOpen(true)}
               className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-surface-container-high hover:text-primary transition-all duration-300">
              <User className="w-[1.125rem] h-[1.125rem]" />
            </button>
          </div>
          
        </div>
      </nav>

      {/* Main Content */}
      <main className={`flex-grow ${['home', 'marketplace', 'product'].includes(currentScreen) ? 'pt-20' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer id="main-footer" className="bg-surface-container-low w-full py-20 mt-auto relative z-10 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 font-body text-sm leading-relaxed">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <span className="font-headline font-black text-2xl text-on-surface tracking-widest uppercase italic">Kadal 2 Kadaai</span>
            {currentScreen === 'home' ? (
              <p className="text-slate-500 mt-4 max-w-xs">
                Fresh Seafoods Online. Sourced directly from the coast to your kitchen with uncompromising quality and integrity.
              </p>
            ) : (
              <p className="text-primary mt-auto text-xs lg:text-sm">
                © 2024 KADAL 2 KADAAI. FRESH SEAFOODS ONLINE.
              </p>
            )}
          </div>
          
          {currentScreen === 'home' ? (
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-primary font-semibold mb-2 uppercase tracking-wider text-xs">Company</span>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Our Story</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Traceability</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Wholesale</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-primary font-semibold mb-2 uppercase tracking-wider text-xs">Support</span>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Shipping Policy</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">FAQ</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Contact</a>
              </div>
            </div>
          ) : (
            <>
              <div className="md:col-span-1 flex flex-col gap-4">
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Our Story</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Traceability</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Wholesale</a>
              </div>
              <div className="md:col-span-1 flex flex-col gap-4">
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Shipping Policy</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">FAQ</a>
                <a href="#main-footer" onClick={handleScrollToFooter} className="text-slate-500 hover:text-primary transition-all duration-200">Contact</a>
              </div>
            </>
          )}

          {currentScreen === 'home' && (
            <div className="col-span-1 md:col-span-1 flex flex-col justify-end text-slate-500 text-xs">
              <p>© 2024 KADAL 2 KADAAI. ALL RIGHTS RESERVED.</p>
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
              className="relative w-full max-w-md h-full bg-surface border-l border-outline-variant/30 shadow-2xl flex flex-col"
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
                    <p className="text-primary font-bold text-sm mb-2">₹2,822</p>
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
                    <p className="text-primary font-bold text-sm mb-2">₹373.50</p>
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
                  <span className="font-bold text-on-surface">₹3,569</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="text-primary font-medium">Calculated at checkout</span>
                </div>
                <div className="h-px w-full bg-outline-variant/30 my-2"></div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-headline font-bold text-lg text-on-surface">Total</span>
                  <span className="font-headline font-bold text-2xl text-primary">₹3,569</span>
                </div>
                <OceanButton 
                  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  className="w-full h-14 bg-primary text-primary-container font-bold hover:shadow-[0_0_30px_rgba(0,218,243,0.4)]"
                >
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
                <span className="font-headline text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary-container uppercase">
                  Kadal 2 Kadaai
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
                    onNavigate('marketplace');
                    setIsMenuOpen(false);
                  }}
                  className={`flex justify-between items-center p-4 rounded-xl transition-colors ${currentScreen === 'marketplace' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface hover:bg-surface-container'}`}
                >
                  <span className="font-headline font-bold uppercase tracking-widest text-sm">The Catch</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <button 
                  onClick={handleScrollToFooter}
                  className="flex justify-between items-center p-4 rounded-xl text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="font-headline font-bold uppercase tracking-widest text-sm">Culinary</span>
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </button>
                <div className="h-px bg-outline-variant/30 my-4"></div>
                <div className="flex flex-col gap-4 mt-2">
                  <div 
                    onClick={() => { setIsMenuOpen(false); setIsProfileOpen(true); }}
                    className="flex gap-4 text-on-surface-variant items-center px-4 hover:text-primary transition-colors cursor-pointer"
                  >
                    <User className="w-5 h-5" /> <span>Account</span>
                  </div>
                  <div 
                    onClick={() => { setIsMenuOpen(false); setIsLocationOpen(true); }}
                    className="flex gap-4 text-on-surface-variant items-center px-4 hover:text-primary transition-colors cursor-pointer"
                  >
                    <MapPin className="w-5 h-5" /> <span>Location</span>
                  </div>
                  <div 
                    onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                    className="flex gap-4 text-on-surface-variant items-center px-4 hover:text-primary transition-colors cursor-pointer"
                  >
                    <Search className="w-5 h-5" /> <span>Search</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex justify-center items-start pt-24">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl bg-surface-container border border-outline-variant/30 shadow-2xl rounded-2xl flex flex-col p-4 mx-4"
            >
              <div className="flex items-center gap-4 relative">
                <Search className="w-6 h-6 text-primary absolute left-4" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search for premium seafood..." 
                  className="w-full h-14 bg-surface rounded-xl pl-12 pr-12 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg font-body"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 p-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 px-4 pb-2">
                <h3 className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Bluefin Tuna', 'King Crab', 'Lobster Tails', 'Oysters', 'Caviar'].map((term) => (
                    <button key={term} className="px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all text-sm">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Location Modal */}
      <AnimatePresence>
        {isLocationOpen && (
          <div className="fixed inset-0 z-[100] flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-surface-container border border-outline-variant/30 shadow-2xl rounded-2xl flex flex-col p-6 mx-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
                  <MapPin className="text-primary w-5 h-5" /> Your Delivery Location
                </h3>
                <button 
                  onClick={() => setIsLocationOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-surface rounded-xl p-4 border border-outline-variant/20 mb-4">
                <p className="text-sm text-on-surface-variant mb-1">Current Location</p>
                <p className="font-bold text-on-surface flex items-center gap-2">
                   123 Ocean Drive, Miami FL
                   <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Active</span>
                </p>
              </div>

              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Enter a new zip code or address" 
                  className="w-full h-12 bg-surface rounded-xl px-4 text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary font-bold text-sm px-3 py-1 hover:bg-primary/10 rounded-lg transition-colors">
                  Update
                </button>
              </div>

              <OceanButton className="w-full h-12 bg-primary text-primary-container font-bold" onClick={() => setIsLocationOpen(false)}>
                <span>Confirm Location</span>
              </OceanButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-[100] flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-surface-container border border-outline-variant/30 shadow-2xl rounded-2xl flex flex-col p-6 mx-4 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/20 to-transparent"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-1 pt-2">
                  <h3 className="font-headline text-2xl font-bold text-on-surface">Welcome back</h3>
                  <p className="text-on-surface-variant text-sm flex items-center gap-2">
                    alex.ocean@example.com
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-bold uppercase">Pro</span>
                  </p>
                </div>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full relative z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col gap-2 mt-8 relative z-10">
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors text-left text-on-surface group">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">Personal Information</span>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors text-left text-on-surface group">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Order History</span>
                    <span className="text-xs text-on-surface-variant">2 pending orders</span>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors text-left text-on-surface group">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">Saved Addresses</span>
                </button>
              </div>

              <div className="h-px bg-outline-variant/30 my-4 relative z-10"></div>
              
              <button className="w-full py-3 text-error hover:bg-error/10 rounded-xl transition-colors font-medium text-sm relative z-10" onClick={() => setIsProfileOpen(false)}>
                Sign Out
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
