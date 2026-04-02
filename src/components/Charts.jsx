import { useApp } from '../context/AppContext';
import { generateMonthlyData, CATEGORY_COLORS } from '../data/mockData';
import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { fmtShort, fmt } from '../utils/helpers';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="chart-tooltip-row">
          <span className="chart-tooltip-dot" style={{ background: p.color }} />
          <span>{p.name}: {fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function TrendChart() {
  const { state } = useApp();
  const data = useMemo(() => generateMonthlyData(state.transactions), [state.transactions]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Cash Flow Trend</h3>
          <p className="chart-subtitle">Monthly income vs expenses overview</p>
        </div>
        <div className="chart-legend">
          <span><span className="legend-dot" style={{ background: '#F59E0B' }} />Income</span>
          <span><span className="legend-dot" style={{ background: '#EF4444' }} />Expenses</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtShort} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="income" name="Income" stroke="#F59E0B" strokeWidth={2} fill="url(#incomeGrad)" dot={{ fill: '#F59E0B', r: 3, strokeWidth: 0 }} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expGrad)" dot={{ fill: '#EF4444', r: 3, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingBreakdown() {
  const { state } = useApp();

  const data = useMemo(() => {
    const cats = {};
    state.transactions.filter(t => t.type === 'expense').forEach(t => {
      cats[t.category] = (cats[t.category] || 0) + t.amount;
    });
    return Object.entries(cats)
      .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#64748B' }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [state.transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Spending Breakdown</h3>
          <p className="chart-subtitle">By category, all time</p>
        </div>
      </div>
      <div className="breakdown-layout">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
              paddingAngle={3} dataKey="value" strokeWidth={0}>
              {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="breakdown-legend">
          {data.map((d, i) => (
            <div key={i} className="breakdown-item">
              <div className="breakdown-item-left">
                <span className="breakdown-dot" style={{ background: d.color }} />
                <span className="breakdown-cat">{d.name}</span>
              </div>
              <div className="breakdown-item-right">
                <span className="breakdown-pct">{((d.value / total) * 100).toFixed(0)}%</span>
                <span className="breakdown-amt">{fmtShort(d.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MonthlyBarChart() {
  const { state } = useApp();
  const data = useMemo(() => generateMonthlyData(state.transactions), [state.transactions]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Monthly Net Savings</h3>
          <p className="chart-subtitle">Balance after expenses each month</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtShort} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="balance" name="Net Savings" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.balance >= 0 ? '#10B981' : '#EF4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
