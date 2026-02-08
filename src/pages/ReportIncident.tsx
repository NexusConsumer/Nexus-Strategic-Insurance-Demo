import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import AppLayout from '../components/layout/AppLayout';

const ReportIncident = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const incidents = [
    {
      id: 'flight-delay',
      icon: 'flight_takeoff',
      iconBg: 'bg-blue-50 dark:bg-blue-900/30',
      iconColor: 'text-primary',
      titleHe: 'עיכוב בטיסה',
      titleEn: 'Flight Delay',
      descHe: 'הטיסה התעכבה מעל ל-3 שעות? מגיע לך החזר כספי מיידי לכרטיס הדיגיטלי.',
      descEn: 'Flight delayed over 3 hours? Get instant compensation to your digital card.',
    },
    {
      id: 'lost-baggage',
      icon: 'luggage',
      iconBg: 'bg-purple-50 dark:bg-purple-900/30',
      iconColor: 'text-purple-600',
      titleHe: 'אובדן כבודה',
      titleEn: 'Lost Baggage',
      descHe: 'המזוודה לא הגיעה ליעד? דווח לנו ונפתח עבורך כרטיס תשלום לרכישות דחופות.',
      descEn: 'Luggage didn\'t arrive? Report it and we\'ll activate your payment card for urgent purchases.',
    },
  ];

  return (
    <AppLayout>
      <div className="px-6 space-y-6">
        {/* Header */}
        <header className="pt-6">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center card-shadow"
            >
              <span className="material-icons-round text-primary">arrow_forward</span>
            </button>
            <h1 className="text-xl font-bold tracking-tight">
              {language === 'he' ? 'דיווח על אירוע' : 'Report Incident'}
            </h1>
            <div className="w-10" />
          </div>
          <div className="mb-2">
            <h2 className="text-2xl font-extrabold mb-2">
              {language === 'he' ? 'מה קרה בנסיעה?' : 'What happened during your trip?'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {language === 'he'
                ? 'אנחנו כאן כדי לעזור לך לקבל פיצוי מיידי'
                : 'We\'re here to help you get instant compensation'}
            </p>
          </div>
        </header>

        {/* Incident Cards */}
        <main className="space-y-4 pt-4">
          {incidents.map((incident) => (
            <button
              key={incident.id}
              className="w-full group bg-surface-light dark:bg-surface-dark p-6 rounded-3xl flex flex-col items-start gap-4 text-right card-shadow border border-transparent active:scale-95 transition-all duration-200 hover:border-primary/20"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${incident.iconBg} flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300`}
              >
                <span className={`material-icons-round ${incident.iconColor} text-3xl group-hover:text-white`}>
                  {incident.icon}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">
                  {language === 'he' ? incident.titleHe : incident.titleEn}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {language === 'he' ? incident.descHe : incident.descEn}
                </p>
              </div>
              <div className="flex items-center text-primary font-bold text-sm mt-2">
                <span>{language === 'he' ? 'דווח עכשיו' : 'Report Now'}</span>
                <span className="material-icons-round text-lg mr-1">chevron_left</span>
              </div>
            </button>
          ))}

          <div className="pt-6 text-center">
            <button className="text-slate-400 dark:text-slate-500 text-sm font-medium underline underline-offset-4">
              {language === 'he' ? 'אירוע אחר? צור קשר עם המוקד' : 'Other incident? Contact support'}
            </button>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default ReportIncident;
