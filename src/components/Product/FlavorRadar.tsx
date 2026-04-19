import { motion } from 'framer-motion';

interface FlavorRadarProps {
  stats?: {
    intensity: number;
    flaky: number;
    richness: number;
    versatility: number;
    delicacy: number;
  };
}

export default function FlavorRadar({ stats }: FlavorRadarProps) {
  // Mock data if stats not provided
  const data = stats || {
    intensity: 75,
    flaky: 40,
    richness: 85,
    versatility: 90,
    delicacy: 60
  };

  const points = [
    { label: 'INTENSITY', value: data.intensity, angle: 0 },
    { label: 'FLAKY', value: data.flaky, angle: 72 },
    { label: 'RICHNESS', value: data.richness, angle: 144 },
    { label: 'VERSATILITY', value: data.versatility, angle: 216 },
    { label: 'DELICACY', value: data.delicacy, angle: 288 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;

  const getCoordinatesForPercent = (percent: number, angle: number) => {
    const r = (percent / 100) * radius;
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const pathData = points
    .map((p) => {
      const { x, y } = getCoordinatesForPercent(p.value, p.angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full bg-surface-container-low rounded-[3.5rem] p-12 border border-white/5 shadow-2xl flex flex-col items-center gap-10 relative overflow-hidden group">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="flex flex-col items-center text-center gap-3 relative z-10">
        <h3 className="font-headline text-[10px] font-black uppercase tracking-[0.4em] text-primary">Flavor Blueprint</h3>
        <p className="text-xl font-black text-white leading-tight">Culinary Profile</p>
      </div>

      <div className="relative w-[300px] h-[300px] flex items-center justify-center z-10">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Background Pentagons */}
          {[20, 40, 60, 80, 100].map((ring) => (
            <polygon
              key={ring}
              points={points.map(p => {
                const { x, y } = getCoordinatesForPercent(ring, p.angle);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="white"
              strokeOpacity={0.05}
              strokeWidth="1"
            />
          ))}

          {/* Axis Lines */}
          {points.map((p) => {
            const { x, y } = getCoordinatesForPercent(100, p.angle);
            return (
              <line
                key={p.label}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="white"
                strokeOpacity={0.05}
                strokeWidth="1"
              />
            );
          })}

          {/* Animated Data Shape */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            points={pathData}
            fill="var(--color-primary)"
            stroke="var(--color-primary)"
            strokeWidth="3"
            className="drop-shadow-[0_0_15px_rgba(0,218,243,0.3)]"
          />

          {/* Labels */}
          {points.map((p) => {
            const { x, y } = getCoordinatesForPercent(115, p.angle);
            return (
              <text
                key={p.label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[8px] font-black fill-on-surface-variant/40 tracking-widest uppercase"
              >
                {p.label}
              </text>
            );
          })}
        </svg>
        
        {/* Center Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/20 blur-sm shadow-xl shadow-primary/40 border border-primary/20" />
      </div>

      <div className="w-full pt-6 border-t border-white/5 flex justify-between items-center relative z-10 px-4">
         <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Complexity</span>
            <span className="text-lg font-black text-white leading-none">High Grade</span>
         </div>
         <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="text-primary font-black text-xs">A+</span>
         </div>
      </div>
    </div>
  );
}
