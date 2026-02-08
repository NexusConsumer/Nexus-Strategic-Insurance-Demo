import { ReactNode } from 'react';
import IOSStatusBar from './IOSStatusBar';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const AppLayout = ({ children, showBottomNav = true }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <IOSStatusBar />
      <main className="pb-32 pt-12">
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
