import { motion } from 'framer-motion';
import { Ship, ShieldCheck, Snowflake, Truck } from 'lucide-react';

export default function TraceabilityTimeline() {
  const steps = [
    {
      time: '0h',
      label: 'Ocean Capture',
      desc: 'Sourced from the deep coral zones of the Indian Ocean.',
      icon: Ship,
      color: 'primary'
    },
    {
      time: '2h',
      label: 'Industrial Inspection',
      desc: 'QC check and triple-wash with RO purified water.',
      icon: ShieldCheck,
      color: 'sky-400'
    },
    {
      time: '4h',
      label: 'Sub-Zero Chilling',
      desc: 'Flash-frozen to lock in cellular nutrients & omega oils.',
      icon: Snowflake,
      color: 'blue-400'
    },
    {
      time: '12h',
      label: 'Coastal Dispatch',
      desc: 'Last-mile cold chain tracking initiated for delivery.',
      icon: Truck,
      color: 'emerald-400'
    }
  ];

  return (
    <div className="w-full py-24 border-t border-white/5 mt-20 relative overflow-hidden">
      {/* Decorative Supply Line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
      
      <div className="flex flex-col gap-16 relative z-10">
        <div className="flex flex-col items-center lg:items-start gap-4">
           <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.6em] text-primary/40">The Origin Protocol</h3>
           <h2 className="font-headline text-4xl font-black text-white uppercase tracking-tighter">Ocean-to-Door Traceability</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 bg-surface-container-low/40 p-10 rounded-[3rem] border border-white/5 hover:bg-surface-container transition-all hover:-translate-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className={`w-16 h-16 rounded-[2rem] bg-surface-container flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-colors shadow-lg`}>
                   <step.icon className={`w-8 h-8 text-primary shadow-sm`} />
                </div>
                <span className="font-headline text-2xl font-black text-primary/40">{step.time}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                 <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{step.label}</h4>
                 <p className="text-sm text-on-surface-variant leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                    {step.desc}
                 </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-white/5">
                   <div className="w-12 h-px bg-white/10" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
