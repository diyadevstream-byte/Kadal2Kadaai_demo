import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface OceanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function OceanButton({ children, className = '', ...props }: OceanButtonProps) {
  const { theme } = useTheme();
  
  return (
    <motion.div whileTap={{ scale: 0.98 }} className="inline-flex w-full">
      <button
        className={`relative overflow-hidden transition-all duration-500 group flex items-center justify-center ${className}`}
        {...props}
      >
        {/* Deep Water Base Layer (Dark Only) */}
        <div className={`absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container to-background opacity-90 ${theme === 'light' ? 'hidden' : ''}`} />
        
        {/* Solid Background for Light Theme */}
        <div className={`absolute inset-0 bg-primary ${theme === 'light' ? '' : 'hidden'}`} />

        {/* Shimmering Surface Light (Enhanced for Dark) */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 opacity-30 group-hover:opacity-60 transition-opacity duration-700 ${theme === 'light' ? 'opacity-40' : ''}`} />

        {/* Dynamic Glow Layer */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_120%,var(--theme-primary),transparent_70%)] blur-2xl -bottom-1/2 ${theme === 'light' ? 'group-hover:opacity-40' : ''}`} />

        {/* Wave animations (Subtle in Light, Distinct in Dark) */}
        <div className={`absolute -bottom-6 left-0 w-[200%] h-20 opacity-20 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 z-0 animate-wave pointer-events-none wave-shape scale-x-110 ${theme === 'light' ? 'opacity-10 saturate-200' : ''}`} />
        <div className={`absolute -bottom-4 left-0 w-[200%] h-20 opacity-40 translate-y-6 group-hover:translate-y-0 transition-transform duration-1000 delay-100 z-0 animate-wave-slow pointer-events-none wave-shape scale-x-125 saturate-150 ${theme === 'light' ? 'opacity-20 translate-y-4' : ''}`} />

        {/* Bubbles on hover (Mainly for Dark) */}
        <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 overflow-hidden ${theme === 'light' ? 'group-hover:opacity-10' : ''}`}>
           {[...Array(6)].map((_, i) => (
             <div 
               key={i} 
               className="absolute bg-white rounded-full animate-bubble" 
               style={{ 
                 width: `${Math.random() * 4 + 2}px`, 
                 height: `${Math.random() * 4 + 2}px`, 
                 bottom: '-10%', 
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 2}s`
               }} 
             />
           ))}
        </div>

        {/* Swimming Fish (Dark Only) */}
        {theme === 'dark' && (
          <div className="absolute z-10 pointer-events-none animate-fish hidden group-hover:block" style={{ top: '60%', left: '-15%' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/60 fill-current drop-shadow-[0_0_8px_rgba(0,218,243,0.5)]">
              <path d="M20.25 10C18.5 7 14 6 10 7C8.5 7.375 7 8 6 9.5C5.5 10.25 5.5 11.5 4 11C3 10.6667 1.5 10.5 1 11.5C1 12.5 2 13 3 13C4 13 5 12.5 6 13C7.5 14.5 10 15 13 14C17 12.6667 19.5 12 20.25 10Z"/>
              <path d="M4 11L1 9V14L4 12V11Z"/>
            </svg>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-20 flex items-center justify-center gap-3 w-full h-full py-4 px-6 pointer-events-none">
          <span className={`font-headline font-black uppercase tracking-[0.2em] text-sm transition-colors duration-500 flex items-center gap-3 ${theme === 'light' ? 'text-white' : 'text-primary group-hover:text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'}`}>
            {children}
          </span>
        </div>

        {/* Bottom shine highlight */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </button>
    </motion.div>
  );
}
