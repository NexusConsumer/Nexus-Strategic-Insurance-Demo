import RisingBubbles from './RisingBubbles';

interface BenefitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BenefitsModal = ({ isOpen, onClose }: BenefitsModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-16 right-6 z-[200] w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-zinc-700 transition-colors shadow-lg"
      >
        <span className="material-icons-round text-slate-700 dark:text-slate-300 text-xl">close</span>
      </button>

      {/* Rising Bubbles Animation - Fixed positioning */}
      <div className="fixed inset-0 z-[150] pointer-events-none">
        <div className="w-full max-w-[430px] h-full mx-auto relative">
          <RisingBubbles />
        </div>
      </div>
    </>
  );
};

export default BenefitsModal;
