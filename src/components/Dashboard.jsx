import StatsGrid from './StatsGrid';
import { TrendChart, SpendingBreakdown, MonthlyBarChart } from './Charts';
import { useApp } from '../context/AppContext';
import { fmt, fmtDate, getCategoryIcon } from '../utils/helpers';
import { CATEGORY_COLORS } from '../data/mockData';
import { ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';

function RecentTransactions() {
  const { state } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Recent Activity</h3>
          <p className="chart-subtitle">Latest 6 transactions</p>
        </div>
      </div>
      <div className="recent-list">
        {recent.map(tx => (
          <div key={tx.id} className="recent-item">
            <div className="recent-icon" style={{ background: (CATEGORY_COLORS[tx.category] || '#64748B') + '20', color: CATEGORY_COLORS[tx.category] || '#64748B' }}>
              {getCategoryIcon(tx.category)}
            </div>
            <div className="recent-details">
              <div className="recent-desc">{tx.description}</div>
              <div className="recent-meta">{tx.merchant} · {fmtDate(tx.date)}</div>
            </div>
            <div className={`recent-amount ${tx.type}`}>
              {tx.type === 'income' ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
              {fmt(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const now = new Date();

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Financial Overview</h2>
          <p className="section-sub">
            {now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}<span className={`role-pill role-pill--${state.role}`}>{state.role === 'admin' ? '⚡ Admin' : '👁 Viewer'} Mode</span>
          </p>
        </div>
        {state.role === 'admin' && (
          <button onClick={() => dispatch({ type: 'RESET_DATA' })} className="btn-ghost btn-sm" title="Reset to sample data">
            <RefreshCw size={14} /> Reset Data
          </button>
        )}
      </div>
      <StatsGrid />
      <div className="charts-row">
        <TrendChart />
        <SpendingBreakdown />
      </div>
      <div className="charts-row">
        <MonthlyBarChart />
        <RecentTransactions />
      </div>
    </div>
  );
}
