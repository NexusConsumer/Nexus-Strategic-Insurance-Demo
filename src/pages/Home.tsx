import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import VirtualCard from '../components/ui/VirtualCard';

const Home = () => {
  const { language } = useApp();
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      icon: 'flight_takeoff',
      titleHe: 'ביטוח נסיעות לחו"ל',
      titleEn: 'Travel Insurance',
      timeHe: 'לפני שעה',
      timeEn: '1 hour ago',
      amount: -369.94,
      type: 'העברה',
    },
    {
      id: 2,
      icon: 'medical_services',
      titleHe: 'תביעת ביטוח - אושר',
      titleEn: 'Claim Approved',
      timeHe: 'לפני 3 שעות',
      timeEn: '3 hours ago',
      amount: 850.00,
      type: 'זיכוי',
    },
    {
      id: 3,
      icon: 'shopping_bag',
      titleHe: 'Apple Store',
      titleEn: 'Apple Store',
      timeHe: 'אתמול',
      timeEn: 'Yesterday',
      amount: -1200.00,
      type: 'רכישה',
    },
  ];

  return (
    <AppLayout>
      <div className="px-6 space-y-6">
        {/* Header */}
        <header className="pt-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="material-icons-round text-primary">person</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'he' ? 'בוקר טוב 👋' : 'Good morning 👋'}
              </p>
              <h2 className="font-bold text-lg leading-tight">
                {language === 'he' ? 'אלכס כהן' : 'Alex Cohen'}
              </h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
              <span className="material-icons-round">notifications</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
              <span className="material-icons-round">add</span>
            </button>
          </div>
        </header>

        {/* Balance */}
        <section>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
            {language === 'he' ? 'יתרה נוכחית' : 'Current Balance'}
          </p>
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight">₪12,788.56</h1>
            <span className="text-emerald-500 text-sm font-bold dir-ltr">+7.05%</span>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 font-semibold hover:opacity-80 transition-opacity">
            <span className="material-icons-round text-primary text-lg">call_made</span>
            {language === 'he' ? 'העברה' : 'Transfer'}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 font-semibold hover:opacity-80 transition-opacity">
            <span className="material-icons-round text-[#06B6D4] text-lg">call_received</span>
            {language === 'he' ? 'קבלת כסף' : 'Receive'}
          </button>
        </section>

        {/* Virtual Card */}
        <section className="relative cursor-pointer" onClick={() => navigate('/nfc-payment')}>
          <VirtualCard balance={12788.56} />
          <div className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
            {language === 'he' ? 'לחץ לתשלום ב-NFC' : 'Tap to pay with NFC'}
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">
              {language === 'he' ? 'פעולות אחרונות' : 'Recent Transactions'}
            </h3>
            <button className="text-primary text-sm font-semibold">
              {language === 'he' ? 'הצג הכל' : 'See All'}
            </button>
          </div>
          <div className="space-y-4 pb-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <span className="material-icons-round text-slate-600 dark:text-slate-300">
                      {transaction.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">
                      {language === 'he' ? transaction.titleHe : transaction.titleEn}
                    </p>
                    <p className="text-xs text-slate-500">
                      {language === 'he' ? transaction.timeHe : transaction.timeEn}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p
                    className={`font-bold dir-ltr ${
                      transaction.amount > 0 ? 'text-emerald-500' : 'text-red-500'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}₪{Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-500">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;
