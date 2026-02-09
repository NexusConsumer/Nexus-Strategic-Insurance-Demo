import { useEffect, useState } from 'react';

export type NotificationType = 'success' | 'declined';

interface IOSNotificationProps {
  type: NotificationType;
  merchantName: string;
  isVisible: boolean;
  onClose: () => void;
}

const IOSNotification = ({ type, merchantName, isVisible, onClose }: IOSNotificationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Trigger slide-in animation
      setTimeout(() => setIsAnimating(true), 50);

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for slide-out animation
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleClick = () => {
    if (type === 'success') {
      // Navigate to forms page or show forms
      console.log('Navigate to forms');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <div
        onClick={handleClick}
        className={`w-full max-w-[390px] mt-14 transition-all duration-300 ease-out pointer-events-auto ${
          isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${type === 'success' ? 'cursor-pointer active:scale-95' : ''}`}
        style={{
          transform: isAnimating ? 'translateY(0)' : 'translateY(-120%)',
        }}
      >
        <div
          className="rounded-[28px] p-4 shadow-2xl flex flex-col gap-2 ring-1 ring-white/20"
          style={{
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            background: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.35)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                <span className="material-symbols-outlined text-white text-[18px]">domain</span>
              </div>
              <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">
                MIGDAL
              </span>
            </div>
            <span className="text-[10px] text-gray-500 font-medium">עכשיו</span>
          </div>

          {/* Content */}
          <div>
            {type === 'success' ? (
              <>
                <h3 className="font-bold text-[16px] text-gray-900">התשלום אושר!</h3>
                <p className="text-[14px] text-gray-800 leading-snug">
                  התשלום שלך בבית עסק "{merchantName}" אושר. לחץ כאן למילוי הטפסים הנדרשים.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-bold text-[16px] text-gray-900">תשלום נדחה</h3>
                <p className="text-[14px] text-gray-800 leading-snug">
                  היי ראינו ששילמת בבית עסק "{merchantName}" - הפוליסה שלך לא מכסה תשלום מסוג זה.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSNotification;
