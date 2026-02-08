import { useNavigate } from 'react-router-dom';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="pt-14 px-6 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif' }}>
              Menu
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <span className="material-icons-round text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          <button
            onClick={() => handleNavigate('/policy-card-issuance')}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors text-left"
          >
            <span className="material-icons-round text-primary text-2xl">credit_card</span>
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Policy Card Issuance</div>
              <div className="text-sm text-slate-500 dark:text-zinc-400">Issue a new policy card</div>
            </div>
          </button>

          <button
            onClick={() => handleNavigate('/')}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors text-left"
          >
            <span className="material-icons-round text-primary text-2xl">home</span>
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Home</div>
              <div className="text-sm text-slate-500 dark:text-zinc-400">Return to home page</div>
            </div>
          </button>

          <button
            onClick={() => handleNavigate('/nfc-payment')}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors text-left"
          >
            <span className="material-icons-round text-primary text-2xl">account_balance_wallet</span>
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Wallet</div>
              <div className="text-sm text-slate-500 dark:text-zinc-400">View your digital wallet</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
