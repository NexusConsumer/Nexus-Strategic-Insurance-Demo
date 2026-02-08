import { useState, useEffect } from 'react';

interface Brand {
  name: string;
  logo: string;
  color: string;
}

// Brand configurations - you'll need to add brand logos to public/brands/ folder
const brands: Brand[] = [
  { name: 'Carrefour', logo: '/brands/carrefour.png', color: '#0055A5' },
  { name: 'Golf & Co', logo: '/brands/golf.png', color: '#3B5998' },
  { name: 'American Eagle', logo: '/brands/american-eagle.png', color: '#00205B' },
  { name: 'Castro Home', logo: '/brands/castro-home.png', color: '#F5F5DC' },
  { name: 'Rami Levy', logo: '/brands/rami-levy.png', color: '#B3171D' },
  { name: 'Mango', logo: '/brands/mango.png', color: '#000000' },
  { name: 'Ruby Bay', logo: '/brands/ruby-bay.png', color: '#7AB3C4' },
  { name: 'Foot Locker', logo: '/brands/foot-locker.png', color: '#D3D3D3' },
  { name: 'Hoodies', logo: '/brands/hoodis.png', color: '#8BA83F' },
  { name: 'Billabong', logo: '/brands/billabong.png', color: '#00A5A5' },
  { name: 'Meitav Trade', logo: '/brands/meitav-trade.png', color: '#E8E8E8' },
  { name: "Sack's", logo: '/brands/sacks.png', color: '#FFFFFF' },
  { name: 'Magnolia', logo: '/brands/magnolia.png', color: '#F5E6E8' },
  { name: 'Intima', logo: '/brands/intima.png', color: '#FFFFFF' },
  { name: 'Samsung', logo: '/brands/samsung.png', color: '#1428A0' },
  { name: 'Yves Rocher', logo: '/brands/yves-rocher.png', color: '#FFFFFF' },
];

interface Bubble {
  id: number;
  brand: Brand;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  createdAt: number;
}

const RisingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);

  useEffect(() => {
    let bubbleId = 0;

    // Generate initial bubbles
    const initialBubbles: Bubble[] = [];
    brands.forEach((brand, index) => {
      initialBubbles.push(createBubble(bubbleId++, index * 1.2, brand));
    });
    setBubbles(initialBubbles);

    // Continuously spawn new bubbles
    const interval = setInterval(() => {
      setBubbles(prev => {
        const now = Date.now();
        const activeBubbles = prev.filter(b => {
          const elapsed = (now - b.createdAt) / 1000;
          const totalDuration = b.duration + b.delay;
          return elapsed < totalDuration;
        });

        const activeBrandNames = activeBubbles.map(b => b.brand.name);
        const availableBrands = brands.filter(b => !activeBrandNames.includes(b.name));

        if (availableBrands.length > 0) {
          const selectedBrand = availableBrands[Math.floor(Math.random() * availableBrands.length)];
          return [...activeBubbles, createBubble(bubbleId++, 0, selectedBrand)];
        }

        return activeBubbles;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const createBubble = (id: number, initialDelay: number = 0, brand?: Brand): Bubble => {
    const selectedBrand = brand || brands[Math.floor(Math.random() * brands.length)];
    return {
      id,
      brand: selectedBrand,
      left: Math.random() * 70 + 15,
      size: Math.random() * 40 + 80,
      duration: Math.random() * 5 + 12,
      delay: initialDelay,
      drift: (Math.random() - 0.5) * 60,
      createdAt: Date.now(),
    };
  };

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none z-[100]">
      <style>{`
        @keyframes rise {
          0% {
            transform: translateY(0) translateX(0) scale(0.8);
          }
          20% {
            transform: translateY(-25vh) translateX(calc(var(--drift) * 0.2)) scale(0.85);
          }
          40% {
            transform: translateY(-50vh) translateX(calc(var(--drift) * 0.5)) scale(0.9);
          }
          60% {
            transform: translateY(-75vh) translateX(calc(var(--drift) * 0.8)) scale(0.95);
          }
          80% {
            transform: translateY(-105vh) translateX(calc(var(--drift) * 1)) scale(1);
          }
          100% {
            transform: translateY(-140vh) translateX(calc(var(--drift) * 1)) scale(1);
          }
        }
        .bubble {
          animation: rise linear forwards;
        }
      `}</style>

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${bubble.left}%`,
            bottom: '-200px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            '--drift': `${bubble.drift}px`,
          } as React.CSSProperties & { '--drift': string }}
          onMouseEnter={() => setHoveredBubble(bubble.id)}
          onMouseLeave={() => setHoveredBubble(null)}
        >
          <div
            className="relative w-full h-full rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
            style={{
              backgroundColor:
                bubble.brand.name === 'Carrefour' ||
                bubble.brand.name === 'Golf & Co' ||
                bubble.brand.name === 'Mango'
                  ? '#FFFFFF'
                  : bubble.brand.name === "Sack's"
                  ? '#F5F5DC'
                  : bubble.brand.color,
              boxShadow:
                bubble.brand.name === 'Carrefour'
                  ? '0 20px 60px rgba(0, 85, 165, 0.3)'
                  : bubble.brand.name === 'Golf & Co'
                  ? '0 20px 60px rgba(59, 89, 152, 0.3)'
                  : bubble.brand.name === 'Mango'
                  ? '0 20px 60px rgba(0, 0, 0, 0.2)'
                  : bubble.brand.name === "Sack's"
                  ? '0 20px 60px rgba(245, 245, 220, 0.5)'
                  : `0 20px 60px ${bubble.brand.color}40`,
            }}
          >
            <div className="w-3/5 h-3/5 flex items-center justify-center">
              <img
                src={bubble.brand.logo}
                alt={bubble.brand.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-white font-bold text-center text-sm">
                {bubble.brand.name}
              </span>
            </div>

            {hoveredBubble === bubble.id && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl z-50">
                {bubble.brand.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                  <div className="border-4 border-transparent border-t-slate-900"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RisingBubbles;
