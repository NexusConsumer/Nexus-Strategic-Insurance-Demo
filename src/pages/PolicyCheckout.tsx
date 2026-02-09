import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';

const PolicyCheckout = () => {
  const navigate = useNavigate();
  const [showAllCoverages, setShowAllCoverages] = useState(false);

  const coverages = [
    {
      icon: 'medical_services',
      title: 'הוצאות רפואיות',
      value: 'עד $5,000,000'
    },
    {
      icon: 'luggage',
      title: 'כבודה ומטען',
      value: 'עד $2,500'
    },
    {
      icon: 'smartphone',
      title: 'כיסוי לטלפון חכם',
      value: 'כלול'
    },
    {
      icon: 'flight',
      title: 'ביטול טיסה',
      value: 'עד $3,000'
    },
    {
      icon: 'schedule',
      title: 'עיכוב בטיסה',
      value: 'עד $500'
    }
  ];

  const visibleCoverages = showAllCoverages ? coverages : coverages.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white relative shadow-2xl pb-32 overflow-y-auto overflow-x-hidden">
      {/* iOS Status Bar */}
      <div className="sticky top-0 left-0 right-0 h-11 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="font-semibold text-sm">9:41</div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
          <span className="material-symbols-outlined text-[18px]">wifi</span>
          <span className="material-symbols-outlined text-[18px]">battery_full</span>
        </div>
      </div>

      {/* Header */}
      <header className="pt-16 pb-2 px-6 bg-white dark:bg-surface-dark border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-brand dark:text-white"
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
          <h1 className="text-lg font-bold text-brand dark:text-white">סיכום פוליסה</h1>
          <div className="w-10"></div>
        </div>

        {/* Progress Steps */}
        <div className="flex gap-2 pb-2">
          <div className="h-1 flex-1 bg-primary rounded-full"></div>
          <div className="h-1 flex-1 bg-primary rounded-full"></div>
          <div className="h-1 flex-1 bg-primary rounded-full"></div>
          <div className="h-1 flex-1 bg-slate-200 dark:bg-white/10 rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-6 pt-6 pb-48">
        {/* Destination Card */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-lg border border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <span className="material-symbols-outlined">flight_takeoff</span>
              </div>
              <div>
                <h2 className="text-xs text-slate-500 dark:text-slate-400">יעד הנסיעה</h2>
                <p className="text-xl font-bold text-brand dark:text-white">לונדון, אנגליה</p>
              </div>
            </div>
            <button className="text-primary text-sm font-semibold">עריכה</button>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-white/5">
            <div>
              <h2 className="text-xs text-slate-500 dark:text-slate-400">תאריך יציאה</h2>
              <p className="font-bold">12 אפר׳, 2024</p>
            </div>
            <div>
              <h2 className="text-xs text-slate-500 dark:text-slate-400">תאריך חזרה</h2>
              <p className="font-bold">19 אפר׳, 2024</p>
            </div>
          </div>
        </section>

        {/* Coverage Details */}
        <section className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">פירוט הכיסויים</h3>
            <button
              onClick={() => setShowAllCoverages(!showAllCoverages)}
              className="text-xs text-primary font-bold"
            >
              {showAllCoverages ? 'הצג פחות' : 'הצג הכל'}
            </button>
          </div>
          <div className="space-y-2">
            {visibleCoverages.map((coverage, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white dark:bg-surface-dark p-4 rounded-xl shadow-md border border-slate-50 dark:border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand/5 dark:bg-white/10 flex items-center justify-center text-brand dark:text-white">
                    <span className="material-symbols-outlined text-xl">{coverage.icon}</span>
                  </div>
                  <span className="font-semibold text-sm">{coverage.title}</span>
                </div>
                <span className="text-brand dark:text-primary font-bold text-sm">{coverage.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Method */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 px-1">אמצעי תשלום</h3>
          <div className="flex items-center justify-between bg-white dark:bg-surface-dark p-4 rounded-xl shadow-md border border-transparent hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-center gap-3 text-right">
              <div className="w-12 h-8 bg-slate-50 dark:bg-white/5 rounded border border-slate-100 dark:border-white/10 flex items-center justify-center">
                <span className="font-bold text-[10px] italic text-brand dark:text-white">VISA</span>
              </div>
              <div>
                <p className="font-bold text-sm leading-none">כרטיס המסתיים ב-4092</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Expires 09/26</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300">arrow_back_ios</span>
          </div>
        </section>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 py-4 opacity-40">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="text-[10px] font-bold uppercase tracking-tight">Secured by PCI-DSS Standard</span>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
      </div>
    </div>
  );
};

export default PolicyCheckout;
