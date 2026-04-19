import React from 'react';
import { motion } from 'motion/react';
import { 
  Waves, 
  Fish, 
  Shell, 
  Droplets, 
  Anchor, 
  Compass,
  ArrowRight,
  Zap,
  Leaf,
  Package,
  Wind
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  categories: Category[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'Marine fish':                  <Fish className="w-4 h-4" />,
  'Crabs':                        <Shell className="w-4 h-4" />,
  'Craps':                        <Shell className="w-4 h-4" />,
  'Shellfish':                    <Shell className="w-4 h-4" />,
  'Freashwater Prawn':            <Droplets className="w-4 h-4" />,
  'freshwater fish':              <Waves className="w-4 h-4" />,
  'Brackish Water Fish':          <Anchor className="w-4 h-4" />,
  'Cat Fish':                     <Fish className="w-4 h-4" />,
  'Murrel Fish':                  <Zap className="w-4 h-4" />,
  'Eel Fish':                     <Wind className="w-4 h-4" />,
  'Dry Seafood':                  <Package className="w-4 h-4" />,
  'Squid  Cuttlefish  Octopus':   <Compass className="w-4 h-4" />,
  'seconadary fresh water fish':  <Leaf className="w-4 h-4" />,
};

const GROUP_MAP: Record<string, string> = {
  'Marine Fish': 'Sea & Estuary',
  'Brackish Water Fish': 'Sea & Estuary',
  'Freshwater Fish': 'Inland Waters',
  'Cat Fish': 'Inland Waters',
  'Murrel Fish': 'Inland Waters',
  'Eel Fish': 'Inland Waters',
  'Seconadary Fresh Water Fish': 'Inland Waters',
  'Crabs': 'Shellfish & Others',
  'Craps': 'Shellfish & Others',
  'Shellfish': 'Shellfish & Others',
  'Freashwater Prawn': 'Shellfish & Others',
  'Squid  Cuttlefish  Octopus': 'Shellfish & Others',
  'Dry Seafood': 'Cured & Specialty',
};

export default function CategorySidebar({ activeCategory, onSelectCategory, categories }: SidebarProps) {
  // Group categories
  const groupedCategories = categories.reduce((acc, cat) => {
    const groupName = GROUP_MAP[cat.id] || 'Other Harvests';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(cat);
    return acc;
  }, {} as Record<string, Category[]>);

  const groupOrder = ['Sea & Estuary', 'Inland Waters', 'Shellfish & Others', 'Cured & Specialty', 'Other Harvests'];

  return (
    <aside className="w-80 h-full flex flex-col bg-surface-container-low/30 backdrop-blur-3xl p-6 gap-6 relative overflow-y-auto custom-scrollbar">
      {/* Sidebar Header */}
      <div className="flex flex-col gap-2 mb-2">
        <h3 className="font-headline text-xs font-bold uppercase tracking-[0.4em] text-primary/70">
          The Sourcing
        </h3>
        <p className="font-body text-2xl font-black text-white tracking-tight">
          Categories
        </p>
      </div>

      {/* Category Groups */}
      <div className="flex flex-col gap-8">
        {groupOrder.map(groupName => {
          const groupCats = groupedCategories[groupName];
          if (!groupCats || groupCats.length === 0) return null;

          return (
            <div key={groupName} className="flex flex-col gap-3">
              <h4 className="font-headline text-[10px] uppercase font-black tracking-[0.2em] text-on-surface-variant/40 border-b border-white/5 pb-2 ml-4">
                {groupName}
              </h4>
              
              <nav className="flex flex-col gap-1.5">
                {groupCats.map((category) => {
                  const isActive = activeCategory === category.id;
                  const displayIcon = ICON_MAP[category.id] || <Fish className="w-4 h-4" />;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => onSelectCategory(category.id)}
                      className={`
                        group relative flex items-center justify-between p-3 rounded-xl transition-all duration-500
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary shadow-[0_15px_30px_-5px_rgba(0,218,243,0.15)] border-l-2 border-primary' 
                          : 'text-on-surface-variant hover:text-white hover:bg-surface-container-highest/30 border-l-2 border-transparent'}
                      `}
                    >
                      {/* Active Indicator Glow */}
                      {isActive && (
                        <motion.div 
                          layoutId="active-glow"
                          className="absolute inset-0 bg-primary/5 rounded-xl blur-md"
                        />
                      )}
        
                      <div className="flex items-center gap-3 relative z-10 w-full">
                        <div className={`
                          w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0
                          ${isActive ? 'bg-primary text-primary-container shadow-primary/20' : 'bg-surface-container-high/50 text-on-surface-variant group-hover:bg-surface-container-highest group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(0,218,243,0.1)]'}
                        `}>
                          {displayIcon}
                        </div>
                        <span className="font-headline font-bold text-[12px] tracking-tight leading-tight whitespace-normal text-left">
                          {category.name.replace('seconadary', 'Secondary').replace('Freashwater', 'Freshwater')}
                        </span>
                      </div>
        
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="relative z-10 shrink-0"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          );
        })}
      </div>

      {/* Decorative Ocean Elements */}
      <div className="mt-8 mb-4 relative p-5 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 shrink-0">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Waves className="w-10 h-10 text-primary rotate-45" />
        </div>
        <p className="font-headline text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1.5">
          Daily Catch
        </p>
        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
          Refreshed at <span className="text-white font-bold">04:30 AM</span> directly from local coastal trawlers.
        </p>
      </div>
    </aside>
  );
}
