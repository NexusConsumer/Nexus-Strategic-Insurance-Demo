const IOSStatusBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-surface-light/80 dark:bg-surface-dark/80 ios-blur z-50 flex items-center justify-between px-6">
      <div className="font-semibold text-sm">9:41</div>
      <div className="flex items-center gap-1.5">
        <span className="material-icons-round text-[16px]">signal_cellular_alt</span>
        <span className="material-icons-round text-[16px]">wifi</span>
        <span className="material-icons-round text-[16px]">battery_full</span>
      </div>
    </div>
  );
};

export default IOSStatusBar;
