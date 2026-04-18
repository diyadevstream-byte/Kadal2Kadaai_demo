import React from 'react';
import { motion } from 'motion/react';
import { 
  Waves, 
  Fish, 
  Shell, 
  Trash2, 
  Droplets, 
  Anchor, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES = [
  { id: 'Marine fish', name: 'Marine Fish', icon: <Fish className="w-4 h-4" /> },
  { id: 'freshwater fish', name: 'Freshwater Fish', icon: <Droplets className="w-4 h-4" /> },
  { id: 'Freashwater Prawn', name: 'Prawns & Shrimp', icon: <Waves className="w-4 h-4" /> },
  { id: 'Crabs', name: 'Crabs & Shellfish', icon: <Shell className="w-4 h-4" /> },
  { id: 'Dry Seafood', name: 'Dry Seafood', icon: <Anchor className="w-4 h-4" /> },
  { id: 'Squid  Cuttlefish  Octopus', name: 'Exotics', icon: <Compass className="w-4 h-4" /> },
];

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategorySidebar({ activeCategory, onSelectCategory }: SidebarProps) {
  return (
    <aside className="w-72 h-full flex flex-col bg-surface-container-low/50 backdrop-blur-xl border-r border-outline-variant/10 p-6 gap-8">
      {/* Sidebar Header */}
      <div className="flex flex-col gap-2">
        <h3 className="font-headline text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
          The Sourcing
        </h3>
        <p className="font-body text-2xl font-black text-white tracking-tight">
          Categories
        </p>
      </div>

      {/* Category List */}
      <nav className="flex flex-col gap-2">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                ${isActive 
                  ? 'bg-primary/10 text-primary shadow-[0_8px_20px_-8px_rgba(0,218,243,0.3)]' 
                  : 'text-on-surface-variant hover:text-white hover:bg-surface-container-highest/30'}
              `}
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <motion.div 
                  layoutId="active-glow"
                  className="absolute inset-0 bg-primary/5 rounded-2xl blur-md"
                />
              )}

              <div className="flex items-center gap-4 relative z-10">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                  ${isActive ? 'bg-primary text-primary-container' : 'bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high group-hover:text-primary'}
                `}>
                  {category.icon}
                </div>
                <span className="font-headline font-bold text-sm tracking-tight capitalize">
                  {category.name}
                </span>
              </div>

              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Decorative Ocean Elements */}
      <div className="mt-auto relative p-6 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
        <div className="absolute top-0 right-0 p-2 opacity-20">
          <Waves className="w-12 h-12 text-primary rotate-45" />
        </div>
        <p className="font-headline text-xs font-bold text-primary/60 uppercase tracking-widest mb-2">
          Daily Catch
        </p>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          Refreshed at <span className="text-white font-bold">04:30 AM</span> from local coasts.
        </p>
      </div>
    </aside>
  );
}
