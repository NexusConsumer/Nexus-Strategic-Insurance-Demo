import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

interface NavItem {
  path: string;
  icon: string;
  labelHe: string;
  labelEn: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: 'home', labelHe: 'ראשי', labelEn: 'Home' },
  { path: '/report', icon: 'report_problem', labelHe: 'דיווח', labelEn: 'Report' },
  { path: '/wallet', icon: 'account_balance_wallet', labelHe: 'ארנק', labelEn: 'Wallet' },
  { path: '/profile', icon: 'person_outline', labelHe: 'פרופיל', labelEn: 'Profile' },
];

const BottomNav = () => {
  const location = useLocation();
  const { language } = useApp();

  return (
    <>
      <nav className="absolute bottom-0 left-0 right-0 bg-surface-light/80 dark:bg-surface-dark/80 ios-blur border-t border-slate-100 dark:border-slate-800 px-8 py-4 pb-10 flex justify-between items-center z-40">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                isActive ? 'text-primary' : 'text-slate-400'
              }`}
            >
              <span className="material-icons-round">{item.icon}</span>
              <span className="text-[10px] font-bold">
                {language === 'he' ? item.labelHe : item.labelEn}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full z-50" />
    </>
  );
};

export default BottomNav;
