import type { ReactNode } from 'react';
import IOSStatusBar from './IOSStatusBar';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const AppLayout = ({ children, showBottomNav = true }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-background-light dark:bg-background-dark relative shadow-2xl">
        <IOSStatusBar />
        <main className="pb-32 pt-12">
          {children}
        </main>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default AppLayout;
