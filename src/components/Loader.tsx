import { useEffect, useState } from 'react';
import nexusLoaderAnimation from '../assets/logos/Nexus_Main_Loader_Animation.gif';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const messages = [
      'מכינים את הפוליסה שלך...',
      'טוענים את פרטי הביטוח...',
      'מעדכנים את הנתונים...',
      'כמעט מוכן...',
    ];

    // Animate progress from 0 to 100 over 4 seconds
    const duration = 4000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      // Update message based on progress
      if (newProgress < 25) {
        setCurrentMessage(messages[0]);
      } else if (newProgress < 50) {
        setCurrentMessage(messages[1]);
      } else if (newProgress < 75) {
        setCurrentMessage(messages[2]);
      } else if (newProgress < 100) {
        setCurrentMessage(messages[3]);
      }

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Start exit animation
        setIsExiting(true);
        // Call onComplete callback after exit animation
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 600);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-background-light dark:bg-background-dark relative overflow-hidden">
          <div
            className={`flex flex-col items-center justify-start min-h-screen select-none transition-all duration-500 ease-in-out px-6 pt-32 ${
              isExiting ? 'opacity-0 -translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {/* Loader Animation */}
            <div className="relative pointer-events-none w-[280px] h-[238px] overflow-hidden">
              <img
                src={nexusLoaderAnimation}
                alt="Loading..."
                className="w-[280px] h-[280px] object-contain absolute top-0 left-0"
                draggable="false"
              />
            </div>

            {/* Loading Message */}
            <div className="-mt-4 mb-6 text-center text-slate-600 dark:text-slate-400 font-medium text-sm min-h-[20px] transition-all duration-300">
              {currentMessage}
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full max-w-[300px] pointer-events-none">
              <div className="h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-lg relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 shimmer"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
