import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';
import { MastercardLogo, MigdalLogo } from '../assets/logos';
import ApplePayAnimation from '../assets/animations/Apple Pay Face ID Checkout.lottie';
import UnsuccessfulAnimation from '../assets/animations/Card Payment Unsuccessful.lottie';
import IOSStatusBar from '../components/layout/IOSStatusBar';
import BottomNav from '../components/layout/BottomNav';

const NFCPayment = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const animationRef = useRef<DotLottie | null>(null);
  const unsuccessfulRef = useRef<DotLottie | null>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Stop unsuccessful animation if running
    if (isUnsuccessful) {
      setIsUnsuccessful(false);
      unsuccessfulRef.current?.stop();
    }

    if (animationRef.current) {
      setIsAnimating(true);
      animationRef.current.stop();
      animationRef.current.play();

      // Reset animation 1.5 seconds before full completion for snappier feel
      setTimeout(() => {
        setIsAnimating(false);
        animationRef.current?.stop();
      }, 4500);
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Stop successful animation if running
    if (isAnimating) {
      setIsAnimating(false);
      animationRef.current?.stop();
    }

    if (unsuccessfulRef.current) {
      setIsUnsuccessful(true);
      unsuccessfulRef.current.stop();
      unsuccessfulRef.current.play();

      // Reset after animation completes
      setTimeout(() => {
        setIsUnsuccessful(false);
        unsuccessfulRef.current?.stop();
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-8">
      <div className="w-full max-w-[430px] min-h-[900px] bg-background-light dark:bg-background-dark relative shadow-2xl overflow-y-auto">
        <IOSStatusBar />

        {/* Header */}
        <header className="pt-14 px-6 flex justify-between items-center">
          <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center hover:opacity-80 transition-opacity">
            <span className="material-icons-round text-lg">more_horiz</span>
          </button>
          <h1 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif' }}>
            Wallet
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center pt-8 px-6 pb-32 min-h-[750px]">
          {/* Virtual Card */}
          <div
            onClick={handleCardClick}
            className="w-full aspect-[1.58/1] rounded-2xl shadow-2xl relative p-6 flex flex-col justify-between transform transition-transform active:scale-[0.98] cursor-pointer card-texture"
          >
            {/* Card Top Section */}
            <div className="flex justify-between items-start">
              {/* Migdal Logo */}
              <div className="-ml-2 h-20 flex items-center">
                <img
                  src={MigdalLogo}
                  alt="Migdal"
                  className="h-20 brightness-0 invert mix-blend-screen"
                  style={{ filter: 'brightness(0) invert(1)', mixBlendMode: 'screen' }}
                />
              </div>
              {/* Card Last 4 Digits */}
              <span className="text-white text-xl font-medium tracking-widest opacity-90">
                822V
              </span>
            </div>

            {/* Card Bottom Section */}
            <div className="flex justify-between items-end">
              {/* Mastercard Logo */}
              <div className="relative ml-16">
                <img
                  src={MastercardLogo}
                  alt="Mastercard"
                  className="h-28 opacity-90"
                  style={{ transform: 'translate(20px, 20px)' }}
                />
              </div>
              {/* Contactless Icon */}
              <span className="material-icons-round text-white/40 text-3xl rotate-90 -mr-1">
                contactless
              </span>
            </div>
          </div>

          {/* Apple Pay Animation Section */}
          <div className="flex flex-col items-center justify-center mt-12">
            {/* Animation Container - Positioned exactly where icon is */}
            <div className="relative w-16 h-16 mx-auto">
              {/* Successful Payment Animation */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <DotLottieReact
                  src={ApplePayAnimation}
                  loop={false}
                  autoplay={false}
                  speed={1}
                  dotLottieRefCallback={(dotLottie) => {
                    animationRef.current = dotLottie;
                  }}
                  style={{ width: '64px', height: '64px' }}
                />
              </div>

              {/* Unsuccessful Payment Animation */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isUnsuccessful ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <DotLottieReact
                  src={UnsuccessfulAnimation}
                  loop={false}
                  autoplay={false}
                  speed={1}
                  dotLottieRefCallback={(dotLottie) => {
                    unsuccessfulRef.current = dotLottie;
                  }}
                  style={{ width: '64px', height: '64px' }}
                />
              </div>

              {/* Initial State - Contactless Icon */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating || isUnsuccessful ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div
                  onClick={handleIconClick}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors active:scale-95"
                >
                  <span className="material-icons-round text-primary text-3xl">
                    contactless
                  </span>
                </div>
              </div>
            </div>

            {/* Text Below Animations/Icon */}
            <div className="mt-3 text-center">
              {isAnimating && (
                <p className="text-slate-500 dark:text-zinc-400 text-sm font-normal tracking-tight">
                  Hold Near Reader
                </p>
              )}
              {isUnsuccessful && (
                <p className="text-red-500 text-sm font-semibold tracking-tight">
                  Payment Declined
                </p>
              )}
              {!isAnimating && !isUnsuccessful && (
                <p className="text-slate-500 dark:text-zinc-400 text-base font-normal tracking-tight">
                  Tap card to pay
                </p>
              )}
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
