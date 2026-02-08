import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MastercardLogo, MigdalLogo, GooglePayLogo, ApplePayLogo } from '../assets/logos';
import IOSStatusBar from '../components/layout/IOSStatusBar';
import BenefitsModal from '../components/BenefitsModal';

const PolicyCardIssuance = () => {
  const navigate = useNavigate();

  // Drag to scroll state
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Additional actions state
  const [isActionsExpanded, setIsActionsExpanded] = useState(false);

  // Benefits modal state
  const [isBenefitsModalOpen, setIsBenefitsModalOpen] = useState(false);

  // Loan animation state
  const [loanAmount, setLoanAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [animationStage, setAnimationStage] = useState<'idle' | 'pulse' | 'jump' | 'counting' | 'confirmation' | 'returning'>('idle');
  const [hasCardRevealed, setHasCardRevealed] = useState(false);

  // Card reveal animation on mount
  useEffect(() => {
    // Keep animation class for full duration (2.2s reveal + 1.5s barcode = 3.7s)
    const timer = setTimeout(() => {
      setHasCardRevealed(true);
    }, 3700);
    return () => clearTimeout(timer);
  }, []);

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

  // Handle loan animation - 5 stages
  const handleLoanClick = () => {
    // Stage 1: Gentle Pulse (800ms)
    setAnimationStage('pulse');

    setTimeout(() => {
      // Stage 2 & 3: Jump movement AND Counter start together
      setAnimationStage('jump');
      setLoanAmount(0);

      // Counter from 0 to 30,000 with smooth color transition
      const duration = 2500;
      const steps = 60;
      const increment = 30000 / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= 30000) {
          setLoanAmount(30000);
          clearInterval(counter);

          // Small pulse at 30,000 then move to confirmation
          setTimeout(() => {
            // Stage 4: Confirmation message (2000ms)
            setAnimationStage('confirmation');
            setShowConfirmation(true);

            setTimeout(() => {
              // Hide confirmation and stay in locked position
              setShowConfirmation(false);
            }, 2000);
          }, 300);
        } else {
          setLoanAmount(Math.floor(current));
        }
      }, duration / steps);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center" dir="rtl">
      <div className={`w-full max-w-[430px] min-h-screen bg-background-light dark:bg-background-dark relative ${isBenefitsModalOpen ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <IOSStatusBar />

        {/* Success Header */}
        <header className="pt-14 pb-8 px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="material-icons-round text-green-600 text-4xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-bold text-primary leading-tight" style={{ fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif' }}>
            מזל טוב!<br />הביטוח שלך הופעל
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-2 text-lg">
            הכרטיס הווירטואלי שלך מוכן לשימוש
          </p>
        </header>

        {/* Main Content */}
        <main className={`px-6 flex flex-col items-center pb-32 relative ${isBenefitsModalOpen ? 'z-0' : 'z-10'}`}>
          {/* Virtual Card Container */}
          <div className={`w-full max-w-sm relative flex items-center justify-center ${isBenefitsModalOpen ? 'z-0' : 'z-10'}`} style={{ minHeight: '220px' }}>
            {/* Virtual Card */}
            <div
              className={`w-[340px] aspect-[1.7/1] rounded-2xl shadow-2xl relative p-6 flex flex-col justify-between bg-black transition-all duration-300 ${
                !hasCardRevealed ? 'animate-card-reveal' :
                animationStage === 'pulse' ? 'animate-loan-pulse' :
                animationStage === 'jump' ? 'animate-loan-jump' : ''
              }`}
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

              {/* Counter Overlay - Center of Card */}
              {(animationStage === 'jump') && loanAmount >= 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className={`text-5xl font-semibold text-center transition-all duration-300 ${
                      loanAmount === 0 ? 'text-slate-400' :
                      loanAmount < 10000 ? 'text-green-300' :
                      loanAmount < 20000 ? 'text-green-400' :
                      loanAmount < 30000 ? 'text-green-500' :
                      'text-green-600'
                    } ${loanAmount === 30000 ? 'animate-amount-pulse' : ''}`}
                    style={{
                      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {loanAmount.toLocaleString('he-IL')} ₪
                  </div>
                </div>
              )}

              {/* Confirmation Message Overlay */}
              {showConfirmation && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-in">
                  <div className="bg-white/95 dark:bg-zinc-900/95 px-6 py-4 rounded-2xl shadow-2xl">
                    <div className="text-lg font-semibold text-green-600 text-center">
                      ההלוואה שלך ניתנה לכרטיס
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Wallet Buttons Slider */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            className={`mt-12 w-full overflow-x-auto no-scrollbar px-6 relative ${isBenefitsModalOpen ? 'z-0' : 'z-10'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ userSelect: 'none' }}
          >
            <div className="flex gap-3">
              {/* Add to Google Pay Button */}
              <button className="flex-shrink-0 bg-black text-white rounded-lg h-14 px-4 flex items-center justify-center gap-2 hover:opacity-80 transition-opacity active:scale-98" style={{ minWidth: '252px' }}>
                <img
                  src={GooglePayLogo}
                  alt="Google Pay"
                  className="h-8 w-auto"
                />
                <span className="text-lg font-bold whitespace-nowrap">Add to</span>
              </button>

              {/* Add to Migdal Wallet Button */}
              <button className="flex-shrink-0 bg-black text-white rounded-lg h-14 px-4 flex items-center justify-center gap-2 hover:opacity-80 transition-opacity active:scale-98" style={{ minWidth: '252px' }}>
                <img
                  src={MigdalLogo}
                  alt="Migdal"
                  className="h-10 w-auto brightness-0 invert"
                />
                <span className="text-lg font-bold whitespace-nowrap">Add to</span>
              </button>

              {/* Add to Apple Pay Button - Rightmost, navigates to wallet */}
              <button
                onClick={() => navigate('/nfc-payment')}
                className="flex-shrink-0 bg-black text-white rounded-lg h-14 px-4 flex items-center justify-center gap-2 hover:opacity-80 transition-opacity active:scale-98"
                style={{ minWidth: '252px' }}
              >
                <img
                  src={ApplePayLogo}
                  alt="Apple Pay"
                  className="h-8 w-auto"
                />
                <span className="text-lg font-bold whitespace-nowrap">Add to</span>
              </button>
            </div>
          </div>

          {/* Additional Actions Section */}
          <div className="mt-8 w-full max-w-sm">
            {/* Toggle Button */}
            <button
              onClick={() => setIsActionsExpanded(!isActionsExpanded)}
              className="w-full bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-lg flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className={`material-icons-round text-primary transition-transform duration-300 ${isActionsExpanded ? 'rotate-45' : ''}`}>
                    add
                  </span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">פעולות נוספות</span>
              </div>
              <span className={`material-icons-round text-slate-400 transition-transform duration-300 ${isActionsExpanded ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Expanded Options */}
            <div
              className={`mt-3 space-y-2 overflow-hidden transition-all duration-300 ${
                isActionsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {/* Loan for Card Option */}
              <button
                onClick={handleLoanClick}
                className="w-full bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                  <span className="material-icons-round text-green-600">payments</span>
                </div>
                <div className="flex-1 text-right">
                  <div className="font-semibold text-slate-800 dark:text-white">הלוואה לכרטיס</div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">קבל הלוואה מהירה</div>
                </div>
                <span className="material-icons-round text-slate-400">chevron_left</span>
              </button>

              {/* Balance Transfer Option */}
              <button
                onClick={() => {/* Add functionality */}}
                className="w-full bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                  <span className="material-icons-round text-purple-600">account_balance</span>
                </div>
                <div className="flex-1 text-right">
                  <div className="font-semibold text-slate-800 dark:text-white">העברת יתרה</div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">העבר יתרה מכרטיס אחר</div>
                </div>
                <span className="material-icons-round text-slate-400">chevron_left</span>
              </button>

              {/* Benefits & Points Option */}
              <button
                onClick={() => setIsBenefitsModalOpen(true)}
                className="w-full bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                  <span className="material-icons-round text-amber-600">stars</span>
                </div>
                <div className="flex-1 text-right">
                  <div className="font-semibold text-slate-800 dark:text-white">הטבות</div>
                  <div className="text-xs text-slate-500 dark:text-zinc-400">צבירת נקודות על שימוש במוצרים שלנו</div>
                </div>
                <span className="material-icons-round text-slate-400">chevron_left</span>
              </button>
            </div>
          </div>

          {/* Information Sections */}
          <div className="mt-10 w-full max-w-sm space-y-4">
            {/* How to Use Card */}
            <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-lg flex items-start gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg flex-shrink-0">
                <span className="material-icons-round text-primary">info</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">איך משתמשים בכרטיס?</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  הכרטיס הווירטואלי מאפשר לך לשלם עבור שירותים רפואיים בחו"ל ישירות מהנייד, ללא צורך בהוצאת כסף מהכיס.
                </p>
              </div>
            </div>

            {/* Policy Documents Link */}
            <button
              onClick={() => {/* Add navigation to policy documents */}}
              className="w-full bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-lg flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
                  <span className="material-icons-round text-orange-600">description</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">מסמכי הפוליסה</span>
              </div>
              <span className="material-icons-round text-slate-400">chevron_left</span>
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 pb-8 flex flex-col items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-primary font-bold py-3 px-8 rounded-full border-2 border-primary/20 w-full max-w-sm active:bg-blue-50 dark:active:bg-blue-900/20 transition-colors"
          >
            סיום וחזרה למסך הבית
          </button>
          <div className="flex items-center gap-2 opacity-50">
            <span className="material-icons-round text-sm">lock</span>
            <span className="text-xs text-slate-600 dark:text-zinc-400">מידע מוצפן ומאובטח בתקן מחמיר</span>
          </div>
        </footer>

        {/* iOS Home Indicator */}
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 dark:bg-white/20 rounded-full z-50"></div>

        {/* Benefits Modal - Inside Phone Screen */}
        <BenefitsModal
          isOpen={isBenefitsModalOpen}
          onClose={() => setIsBenefitsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default PolicyCardIssuance;
