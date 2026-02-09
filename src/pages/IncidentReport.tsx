import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';

const IncidentReport = () => {
  const navigate = useNavigate();

  const incidentTypes = [
    {
      icon: 'flight_takeoff',
      title: 'עיכוב בטיסה',
      description: 'הגשת תביעה ופיצוי מהיר',
      route: '/incident/flight-delay'
    },
    {
      icon: 'luggage',
      title: 'אובדן כבודה',
      description: 'דיווח על כבודה שלא הגיעה',
      route: '/incident/lost-luggage'
    },
    {
      icon: 'medical_services',
      title: 'אירוע רפואי',
      description: 'ייעוץ וסיוע רפואי דחוף',
      route: '/incident/medical'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-slate-50 relative shadow-2xl overflow-y-auto overflow-x-hidden">
        {/* iOS Status Bar */}
        <div className="sticky top-0 left-0 right-0 h-11 bg-primary z-[60] flex items-center justify-between px-6 text-white">
          <div className="font-semibold text-[15px]">9:41</div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] filled-icon">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[18px] filled-icon">wifi</span>
            <span className="material-symbols-outlined text-[18px] filled-icon">battery_full</span>
          </div>
        </div>

        {/* Header */}
        <header className="pt-5 pb-8 px-6 bg-primary text-white rounded-b-[32px] shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-white">arrow_forward_ios</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold tracking-tighter uppercase">MIGDAL</div>
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
                <div className="w-4 h-4 border-[3px] border-primary rotate-45"></div>
              </div>
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-white">notifications</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold">דיווח על אירוע</h1>
          <p className="text-white/80 text-base mt-1 font-light">אנחנו איתך בכל רגע, בכל מקום בעולם</p>
        </header>

        {/* Main Content */}
        <main className="px-6 -mt-6 space-y-4 relative z-10 pb-48">
          <div className="grid grid-cols-1 gap-4">
            {incidentTypes.map((incident, index) => (
              <button
                key={index}
                onClick={() => navigate(incident.route)}
                className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between group active:scale-[0.98] transition-all border border-slate-100 text-right"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl font-light">
                      {incident.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{incident.title}</h3>
                    <p className="text-slate-500 text-sm">{incident.description}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_left</span>
              </button>
            ))}
          </div>

          {/* Emergency Support Card */}
          <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20 mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm filled-icon">support_agent</span>
              </div>
              <h4 className="font-bold text-primary">זקוק לסיוע מיידי?</h4>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-4">
              מוקד החירום שלנו פועל 24/7 לכל שאלה או צורך רפואי דחוף. ניתן לחייג ישירות דרך האפליקציה ללא עלות.
            </p>
            <button className="w-full bg-primary text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined text-xl filled-icon">call</span>
              חיוג למוקד החירום
            </button>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default IncidentReport;
