import React from 'react';
import { motion } from 'motion/react';

interface OceanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function OceanButton({ children, className = '', ...props }: OceanButtonProps) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden border border-primary/30 transition-all group ${className}`}
      {...props}
    >
      {/* Subtle watery gradient that shifts on hover */}
      <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-t from-primary/40 to-transparent" />
      
      {/* Wave animation layer 1 */}
      <div className="absolute -bottom-4 left-0 w-[200%] h-16 opacity-40 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-0 animate-wave pointer-events-none wave-shape" />
      
      {/* Wave animation layer 2 */}
      <div className="absolute -bottom-2 left-0 w-[200%] h-16 opacity-60 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75 z-0 animate-wave-slow pointer-events-none wave-shape" style={{ filter: 'brightness(1.5)' }} />

      {/* Swimming Fish (only shows/moves on hover) */}
      <div className="absolute z-10 pointer-events-none animate-fish hidden group-hover:block" style={{ top: '60%', left: '-10%' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary fill-current">
          <path d="M20.25 10C18.5 7 14 6 10 7C8.5 7.375 7 8 6 9.5C5.5 10.25 5.5 11.5 4 11C3 10.6667 1.5 10.5 1 11.5C1 12.5 2 13 3 13C4 13 5 12.5 6 13C7.5 14.5 10 15 13 14C17 12.6667 19.5 12 20.25 10Z"/>
          <path d="M4 11L1 9V14L4 12V11Z"/>
        </svg>
      </div>

      {/* Fish 2 (slightly offset) */}
      <div className="absolute z-10 pointer-events-none animate-fish-delayed hidden group-hover:block scale-75 opacity-70" style={{ top: '70%', left: '-10%' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current">
          <path d="M20.25 10C18.5 7 14 6 10 7C8.5 7.375 7 8 6 9.5C5.5 10.25 5.5 11.5 4 11C3 10.6667 1.5 10.5 1 11.5C1 12.5 2 13 3 13C4 13 5 12.5 6 13C7.5 14.5 10 15 13 14C17 12.6667 19.5 12 20.25 10Z"/>
          <path d="M4 11L1 9V14L4 12V11Z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center gap-2 w-full h-full pointer-events-none">
        {children}
      </div>
    </motion.button>
  );
}
