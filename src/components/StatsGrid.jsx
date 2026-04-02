import { useApp } from '../context/AppContext';
import { fmtShort, fmt } from '../utils/helpers';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function StatCard({ label, value, icon: Icon, type, change, changeLabel }) {
  const isPositive = type === 'income' || type === 'balance';
  return (
    <div className={`stat-card stat-card--${type}`}>
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        <div className={`stat-icon-wrap stat-icon--${type}`}>
          <Icon size={16} strokeWidth={2} />
        </div>
      </div>
      <div className="stat-value">{fmtShort(value)}</div>
      <div className="stat-full-value">{fmt(value)}</div>
      {change !== undefined && (
        <div className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          <span>{Math.abs(change).toFixed(1)}% {changeLabel}</span>
        </div>
      )}
    </div>
  );
}

export default function StatsGrid() {
  const { stats, state } = useApp();
  const txns = state.transactions;

  // Calculate current month vs last month
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const thisMonthIncome = txns.filter(t => new Date(t.date).getMonth() === currentMonth && t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const lastMonthIncome = txns.filter(t => new Date(t.date).getMonth() === lastMonth && t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const thisMonthExp = txns.filter(t => new Date(t.date).getMonth() === currentMonth && t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const lastMonthExp = txns.filter(t => new Date(t.date).getMonth() === lastMonth && t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const incomeChange = lastMonthIncome ? ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100 : 0;
  const expChange = lastMonthExp ? ((thisMonthExp - lastMonthExp) / lastMonthExp) * 100 : 0;

  return (
    <div className="stats-grid">
      <StatCard
        label="Net Balance"
        value={stats.balance}
        icon={Wallet}
        type="balance"
        change={12.4}
        changeLabel="vs last month"
      />
      <StatCard
        label="Total Income"
        value={stats.income}
        icon={TrendingUp}
        type="income"
        change={incomeChange}
        changeLabel="vs last month"
      />
      <StatCard
        label="Total Expenses"
        value={stats.expenses}
        icon={TrendingDown}
        type="expense"
        change={expChange}
        changeLabel="vs last month"
      />
      <div className="stat-card stat-card--meta">
        <div className="stat-card-header">
          <span className="stat-label">Savings Rate</span>
        </div>
        <div className="stat-value">{((stats.balance / stats.income) * 100).toFixed(1)}%</div>
        <div className="stat-full-value">of total income saved</div>
        <div className="savings-bar">
          <div className="savings-bar-fill" style={{ width: `${Math.min((stats.balance / stats.income) * 100, 100)}%` }} />
        </div>
      </div>
    </div>
  );
}
