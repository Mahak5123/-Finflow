import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import './styles.css';

function AppContent() {
  const { state } = useApp();
  const { activeTab, darkMode } = state;

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <main className="main-content">
        <div className="content-inner">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'transactions' && <Transactions />}
          {activeTab === 'insights' && <Insights />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
