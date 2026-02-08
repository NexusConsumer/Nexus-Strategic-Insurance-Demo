import { useState, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';
import { MastercardLogo, MigdalLogo } from '../assets/logos';
// @ts-ignore
import ApplePayAnimation from '../assets/animations/Apple Pay Face ID Checkout.lottie';
// @ts-ignore
import UnsuccessfulAnimation from '../assets/animations/Card Payment Unsuccessful.lottie';
import nexusWideLogoAnimated from '../assets/logos/Nexus_Wide_Logo_Animation_Black_Whithout_Slogan.gif';
import IOSStatusBar from '../components/layout/IOSStatusBar';
import BottomNav from '../components/layout/BottomNav';
import SideMenu from '../components/layout/SideMenu';

const NFCPayment = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const animationRef = useRef<DotLottie | null>(null);
  const unsuccessfulRef = useRef<DotLottie | null>(null);

  // Drag to scroll state
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Side menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);

    // Attach global handlers for continuous dragging
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!scrollContainerRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if user was dragging
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

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

      // Reset animation after 6.5 seconds
      setTimeout(() => {
        setIsAnimating(false);
        animationRef.current?.stop();
      }, 6500);
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background-light dark:bg-background-dark relative overflow-y-auto">
        <IOSStatusBar />

        {/* Header */}
        <header className="pt-14 px-6 flex justify-start items-center min-h-[60px] relative z-20">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <span className="material-icons-round text-lg">menu</span>
          </button>
        </header>

        {/* Animated Logo - Below menu button */}
        <div className="absolute top-[68px] left-6 z-10">
          <img
            src={nexusWideLogoAnimated}
            alt="Nexus"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Main Content */}
        <main className="flex flex-col items-center pt-8 pb-32 min-h-[750px]">
          {/* Scrollable Card Gallery */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            className={`w-full overflow-x-auto px-6 no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ userSelect: 'none' }}
          >
            <div className="flex gap-4 pb-2">
              {/* First Card - Black */}
              <div
                onClick={handleCardClick}
                className="flex-shrink-0 w-[340px] aspect-[1.7/1] rounded-2xl shadow-2xl relative p-6 flex flex-col justify-between transform transition-transform active:scale-[0.98] cursor-pointer bg-black"
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

          {/* Second Card - Blue */}
          <div className="flex-shrink-0 w-[340px] aspect-[1.7/1] rounded-2xl shadow-2xl relative p-6 flex flex-col justify-between transform transition-transform active:scale-[0.98] cursor-pointer"
               style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)' }}>
            <div className="flex justify-between items-start">
              <div className="-ml-2 h-20 flex items-center">
                <img src={MigdalLogo} alt="Migdal" className="h-20 brightness-0 invert mix-blend-screen" style={{ filter: 'brightness(0) invert(1)', mixBlendMode: 'screen' }} />
              </div>
              <span className="text-white text-xl font-medium tracking-widest opacity-90">823V</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="relative ml-16">
                <img src={MastercardLogo} alt="Mastercard" className="h-28 opacity-90" style={{ transform: 'translate(20px, 20px)' }} />
              </div>
              <span className="material-icons-round text-white/40 text-3xl rotate-90 -mr-1">contactless</span>
            </div>
          </div>

          {/* Third Card - White */}
          <div className="flex-shrink-0 w-[340px] aspect-[1.7/1] rounded-2xl shadow-2xl relative p-6 flex flex-col justify-between transform transition-transform active:scale-[0.98] cursor-pointer bg-white">
            <div className="flex justify-between items-start">
              <div className="-ml-2 h-20 flex items-center">
                <img src={MigdalLogo} alt="Migdal" className="h-20" />
              </div>
              <span className="text-gray-800 text-xl font-medium tracking-widest opacity-90">824V</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="relative ml-16">
                <img src={MastercardLogo} alt="Mastercard" className="h-28 opacity-90" style={{ transform: 'translate(20px, 20px)' }} />
              </div>
              <span className="material-icons-round text-gray-400 text-3xl rotate-90 -mr-1">contactless</span>
            </div>
          </div>
        </div>
      </div>

          {/* Apple Pay Animation Section */}
          <div className="flex flex-col items-center justify-center mt-12">
            {/* Animation Container */}
            <div className="relative mx-auto flex items-center justify-center min-h-[200px]">
              {/* Successful Payment Animation */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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

              {/* Unsuccessful Payment Animation */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isUnsuccessful ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <DotLottieReact
                  src={UnsuccessfulAnimation}
                  loop={false}
                  autoplay={false}
                  speed={1}
                  dotLottieRefCallback={(dotLottie) => {
                    unsuccessfulRef.current = dotLottie;
                  }}
                />
              </div>

              {/* Initial State - Contactless Icon */}
              <div className={`transition-opacity duration-500 ${isAnimating || isUnsuccessful ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
            <div className="mt-1 text-center">
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

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default NFCPayment;
