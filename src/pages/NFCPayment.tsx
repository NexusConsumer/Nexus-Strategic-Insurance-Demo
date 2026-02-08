import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';
import { MastercardLogo, MigdalLogo } from '../assets/logos';
import ApplePayAnimation from '../assets/animations/Apple Pay Face ID Checkout.lottie';
import IOSStatusBar from '../components/layout/IOSStatusBar';
import BottomNav from '../components/layout/BottomNav';

const NFCPayment = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<DotLottie | null>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (animationRef.current) {
      setIsAnimating(true);
      animationRef.current.stop();
      animationRef.current.play();

      // Reset animation after it completes (6 seconds to ensure full animation)
      setTimeout(() => {
        setIsAnimating(false);
        animationRef.current?.stop();
      }, 6000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-8">
      <div className="w-full max-w-[430px] min-h-[900px] bg-background-light dark:bg-background-dark relative shadow-2xl overflow-y-auto">
        <IOSStatusBar />

        {/* Header */}
        <header className="pt-14 px-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-primary text-lg font-medium hover:opacity-70 transition-opacity"
          >
            Done
          </button>
          <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center hover:opacity-80 transition-opacity">
            <span className="material-icons-round text-lg">more_horiz</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-between pt-8 px-6 pb-32 min-h-[750px]">
          {/* Virtual Card */}
          <div
            onClick={handleCardClick}
            className="w-full aspect-[1.58/1] rounded-2xl shadow-2xl relative p-8 flex flex-col justify-between transform transition-transform active:scale-[0.98] cursor-pointer card-texture"
          >
            {/* Card Top Section */}
            <div className="flex justify-between items-start">
              {/* Migdal Logo */}
              <img
                src={MigdalLogo}
                alt="Migdal"
                className="h-12 opacity-90 brightness-0 invert"
              />
              {/* Card Last 4 Digits */}
              <span className="text-white text-xl font-medium tracking-widest opacity-90">
                822V
              </span>
            </div>

            {/* Card Bottom Section */}
            <div className="flex justify-between items-end">
              {/* Mastercard Logo */}
              <img
                src={MastercardLogo}
                alt="Mastercard"
                className="h-12 opacity-90"
              />
              {/* Contactless Icon */}
              <span className="material-icons-round text-white/40 text-3xl rotate-90">
                contactless
              </span>
            </div>
          </div>

          {/* Apple Pay Animation Section */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Animation - Always rendered, shown/hidden with CSS */}
            <div className={`${isAnimating ? 'block' : 'hidden'}`}>
              <div className="relative flex items-center justify-center">
                <DotLottieReact
                  src={ApplePayAnimation}
                  loop={false}
                  autoplay={false}
                  speed={1}
                  dotLottieRefCallback={(dotLottie) => {
                    animationRef.current = dotLottie;
                  }}
                />
              </div>
              <p className="text-slate-500 dark:text-zinc-400 text-lg font-normal tracking-tight text-center">
                Hold Near Reader
              </p>
            </div>

            {/* Initial State - Contactless Icon */}
            <div className={`text-center space-y-3 ${isAnimating ? 'hidden' : 'block'}`}>
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-icons-round text-primary text-3xl">
                  contactless
                </span>
              </div>
              <p className="text-slate-500 dark:text-zinc-400 text-base font-normal tracking-tight">
                Tap card to pay
              </p>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default NFCPayment;
