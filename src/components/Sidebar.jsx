import { useApp } from '../context/AppContext';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, TrendingUp, Shield, Sun, Moon } from 'lucide-react';

const NAV = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { activeTab, role, darkMode } = state;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <TrendingUp size={18} strokeWidth={2.5} />
        </div>
        <span className="logo-text">FinFlow</span>
        <span className="logo-badge">PRO</span>
      </div>

      <div className="role-switcher">
        <div className="role-label">
          <Shield size={12} />
          <span>Access Role</span>
        </div>
        <select
          value={role}
          onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
          className="role-select"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">⚡ Admin</option>
        </select>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">MAIN MENU</div>
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => dispatch({ type: 'SET_TAB', payload: id })}
            className={`nav-item ${activeTab === id ? 'active' : ''}`}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
            {activeTab === id && <div className="nav-active-dot" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
          className="theme-toggle"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <div className="user-card">
          <div className="user-avatar">M</div>
          <div className="user-info">
            <div className="user-name">Mahak Salecha</div>
            <div className="user-email">mahaksalecha61@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
