import { motion } from 'framer-motion';

export default function DeepSeaSonar() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Topographical Grid Lines (Stylized Background) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] stroke-primary" xmlns="http://www.w3.org/2000/svg">
        <pattern id="sonar-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#sonar-grid)" />
        
        {/* Procedural Topo Lines (SVG Paths) */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M -200 ${300 + i * 150} Q 400 ${200 + i * 50} 800 ${400 + i * 100} T 1600 ${300 + i * 80}`}
            fill="none"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, delay: i * 0.5, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}
      </svg>

      {/* Floating Coordinate Data Streams */}
      <div className="absolute left-12 top-1/4 flex flex-col gap-32 opacity-10">
         <div className="flex flex-col gap-2">
            <span className="font-headline text-[8px] font-black uppercase tracking-[0.8em] text-primary">Status: Scanning...</span>
            <div className="flex items-center gap-4">
               <div className="w-12 h-px bg-primary/40" />
               <span className="font-mono text-[10px] text-white">12.9247° N</span>
            </div>
         </div>
         <div className="flex flex-col gap-2 rotate-90 origin-left translate-y-48">
            <span className="font-headline text-[8px] font-black uppercase tracking-[0.8em] text-primary">Depth Profile</span>
            <div className="flex items-center gap-4">
               <div className="w-24 h-px bg-primary/40" />
               <span className="font-mono text-[10px] text-white">420m / 1378ft</span>
            </div>
         </div>
      </div>

      <div className="absolute right-12 bottom-1/4 flex flex-col gap-32 opacity-10 text-right items-end">
         <div className="flex flex-col gap-2">
            <span className="font-headline text-[8px] font-black uppercase tracking-[0.8em] text-primary">Ambient Temp</span>
            <div className="flex items-center gap-4 text-right">
               <span className="font-mono text-[10px] text-white">4.2°C | 39.5°F</span>
               <div className="w-12 h-px bg-primary/40" />
            </div>
         </div>
         <div className="flex flex-col gap-2 -rotate-90 origin-right -translate-y-48">
            <span className="font-headline text-[8px] font-black uppercase tracking-[0.8em] text-primary">Logistics Hub</span>
            <div className="flex items-center gap-4">
               <span className="font-mono text-[10px] text-white">Node: CHN-IX</span>
               <div className="w-24 h-px bg-primary/40" />
            </div>
         </div>
      </div>

      {/* Subtle Rising Bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
           key={i}
           className="absolute w-1 h-1 bg-primary/20 rounded-full"
           initial={{ 
             x: Math.random() * 100 + '%', 
             y: '110%', 
             opacity: 0 
           }}
           animate={{ 
             y: '-10%', 
             opacity: [0, 0.4, 0],
             scale: [1, 2, 1]
           }}
           transition={{ 
             duration: 10 + Math.random() * 10, 
             repeat: Infinity, 
             delay: Math.random() * 10,
             ease: "linear"
           }}
        />
      ))}

      {/* Edge Gradient Vinette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
