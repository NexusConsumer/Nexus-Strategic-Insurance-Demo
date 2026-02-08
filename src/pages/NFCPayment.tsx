import { useNavigate } from 'react-router-dom';
import { MastercardLogo, MigdalLogo } from '../assets/logos';
import IOSStatusBar from '../components/layout/IOSStatusBar';

const NFCPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background-light dark:bg-background-dark relative">
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
        <main className="flex flex-col items-center pt-8 px-6">
          {/* Virtual Card */}
          <div className="w-full aspect-[1.58/1] rounded-2xl shadow-2xl relative p-8 flex flex-col justify-between transform transition-transform hover:scale-[1.02] cursor-pointer card-texture">
            {/* Card Top Section */}
            <div className="flex justify-between items-start">
              {/* Migdal Logo */}
              <img
                src={MigdalLogo}
                alt="Migdal"
                className="h-7 opacity-90 brightness-0 invert"
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
                className="h-8 opacity-90"
              />
              {/* Contactless Icon */}
              <span className="material-icons-round text-white/40 text-3xl rotate-90">
                contactless
              </span>
            </div>
          </div>

          {/* NFC Animation Section */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 mt-16">
            <div className="relative flex items-center justify-center">
              {/* Outer pulse ring */}
              <div className="absolute w-24 h-24 rounded-full border-2 border-primary/20 animate-pulse-ring"></div>
              {/* Middle pulse ring */}
              <div className="absolute w-20 h-20 rounded-full border-2 border-primary/40 animate-pulse-ring-delayed"></div>
              {/* Center NFC icon */}
              <div className="relative w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center bg-white dark:bg-zinc-900 shadow-lg">
                <div className="w-7 h-11 border-2 border-primary rounded-md relative flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 w-3 h-0.5 bg-primary rounded-b-sm"></div>
                </div>
              </div>
            </div>

            {/* Instruction Text */}
            <p className="text-slate-500 dark:text-zinc-400 text-lg font-normal tracking-tight">
              Hold Near Reader
            </p>
          </div>
        </main>

        {/* Home Indicator */}
        <footer className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        </footer>
      </div>
    </div>
  );
};

export default NFCPayment;
