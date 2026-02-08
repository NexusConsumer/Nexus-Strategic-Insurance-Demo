import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Loader from './components/Loader';
import Home from './pages/Home';
import ReportIncident from './pages/ReportIncident';
import NFCPayment from './pages/NFCPayment';
import PolicyCardIssuance from './pages/PolicyCardIssuance';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIncident />} />
            <Route path="/nfc-payment" element={<NFCPayment />} />
            <Route path="/policy-card-issuance" element={<PolicyCardIssuance />} />
            <Route path="/profile" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
