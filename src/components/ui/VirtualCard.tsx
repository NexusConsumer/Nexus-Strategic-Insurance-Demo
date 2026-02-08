import { motion } from 'framer-motion';

interface VirtualCardProps {
  cardNumber?: string;
  balance?: number;
  holderName?: string;
  expiryDate?: string;
  className?: string;
  animate?: boolean;
}

const VirtualCard = ({
  cardNumber = '•••• •••• •••• 8842',
  balance,
  holderName = 'Alex Cohen',
  expiryDate = '08/27',
  className = '',
  animate = false,
}: VirtualCardProps) => {
  const cardContent = (
    <div className={`relative w-full aspect-[1.58/1] rounded-3xl card-gradient p-8 text-white shadow-2xl shadow-blue-500/20 overflow-hidden ${className}`}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect opacity-30" />

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div className="text-2xl font-black italic tracking-tighter">TaPay</div>
          <span className="material-icons-round text-4xl opacity-80">contactless</span>
        </div>

        {balance !== undefined && (
          <div className="mb-6">
            <p className="text-sm opacity-70 mb-1">יתרה נוכחית</p>
            <p className="text-3xl font-bold">₪{balance.toLocaleString('he-IL', { minimumFractionDigits: 2 })}</p>
          </div>
        )}

        <div className="mb-8">
          <p className="text-sm opacity-70 mb-1">מספר כרטיס</p>
          <p className="text-2xl font-medium tracking-[0.2em] dir-ltr">{cardNumber}</p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase opacity-60">בעל הכרטיס</p>
            <p className="font-semibold text-lg">{holderName}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase opacity-60">תוקף</p>
            <p className="font-semibold">{expiryDate}</p>
          </div>
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.8
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default VirtualCard;
