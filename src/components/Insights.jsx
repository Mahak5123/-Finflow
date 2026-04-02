import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { fmt, fmtShort, getCategoryIcon } from '../utils/helpers';
import { CATEGORY_COLORS, generateMonthlyData } from '../data/mockData';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target, Zap } from 'lucide-react';

function InsightCard({ icon: Icon, iconColor, label, value, subtitle, accent }) {
  return (
    <div className={`insight-card ${accent ? 'insight-card--accent' : ''}`}>
      <div className="insight-icon" style={{ color: iconColor, background: iconColor + '20' }}>
        <Icon size={20} />
      </div>
      <div className="insight-content">
        <div className="insight-label">{label}</div>
        <div className="insight-value">{value}</div>
        {subtitle && <div className="insight-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}

export default function Insights() {
  const { state } = useApp();
  const txns = state.transactions;

  const analysis = useMemo(() => {
    const expenses = txns.filter(t => t.type === 'expense');
    const income = txns.filter(t => t.type === 'income');

    // Top spending category
    const catTotals = {};
    expenses.forEach(t => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount; });
    const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
    const topCat = sortedCats[0];

    // Monthly data
    const monthly = generateMonthlyData(txns);
    const lastTwo = monthly.slice(-2);
    const thisM = lastTwo[lastTwo.length - 1];
    const prevM = lastTwo[lastTwo.length - 2];
    const expChange = prevM ? ((thisM?.expenses - prevM.expenses) / prevM.expenses * 100) : 0;

    // Savings rate
    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExp = expenses.reduce((s, t) => s + t.amount, 0);
    const savingsRate = ((totalIncome - totalExp) / totalIncome * 100);

    // Biggest single expense
    const biggestExpense = expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0]);

    // Most frequent category
    const catCount = {};
    expenses.forEach(t => { catCount[t.category] = (catCount[t.category] || 0) + 1; });
    const mostFrequent = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];

    // Avg monthly spending
    const monthlyExp = {};
    expenses.forEach(t => {
      const m = new Date(t.date).getMonth();
      monthlyExp[m] = (monthlyExp[m] || 0) + t.amount;
    });
    const avgMonthly = Object.values(monthlyExp).reduce((s, v) => s + v, 0) / Object.keys(monthlyExp).length;

    return { topCat, sortedCats, expChange, thisM, prevM, savingsRate, biggestExpense, mostFrequent, avgMonthly, catTotals, monthly };
  }, [txns]);

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Financial Insights</h2>
          <p className="section-sub">AI-powered analysis of your spending patterns</p>
        </div>
      </div>

      <div className="insights-grid">
        <InsightCard
          icon={TrendingDown}
          iconColor="#EF4444"
          label="Top Spending Category"
          value={`${getCategoryIcon(analysis.topCat?.[0])} ${analysis.topCat?.[0]}`}
          subtitle={`${fmt(analysis.topCat?.[1])} total spent`}
        />
        <InsightCard
          icon={Target}
          iconColor="#F59E0B"
          label="Savings Rate"
          value={`${analysis.savingsRate.toFixed(1)}%`}
          subtitle={analysis.savingsRate > 20 ? '✅ Above 20% — excellent!' : '⚠️ Below 20% — aim higher'}
          accent={analysis.savingsRate > 20}
        />
        <InsightCard
          icon={TrendingUp}
          iconColor={analysis.expChange >= 0 ? '#EF4444' : '#10B981'}
          label="Month-over-Month Spend"
          value={`${analysis.expChange >= 0 ? '+' : ''}${analysis.expChange.toFixed(1)}%`}
          subtitle={`${analysis.thisM?.month} vs ${analysis.prevM?.month}`}
        />
        <InsightCard
          icon={Zap}
          iconColor="#8B5CF6"
          label="Avg Monthly Expense"
          value={fmtShort(analysis.avgMonthly)}
          subtitle="Based on all months"
        />
        <InsightCard
          icon={AlertCircle}
          iconColor="#FB923C"
          label="Largest Single Expense"
          value={fmtShort(analysis.biggestExpense?.amount || 0)}
          subtitle={analysis.biggestExpense?.description}
        />
        <InsightCard
          icon={CheckCircle}
          iconColor="#10B981"
          label="Most Frequent Category"
          value={`${getCategoryIcon(analysis.mostFrequent?.[0])} ${analysis.mostFrequent?.[0]}`}
          subtitle={`${analysis.mostFrequent?.[1]} transactions`}
        />
      </div>

      <div className="insights-charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Category Breakdown</h3>
              <p className="chart-subtitle">All-time spending by category</p>
            </div>
          </div>
          <div className="category-bars">
            {analysis.sortedCats.slice(0, 8).map(([cat, amount]) => {
              const max = analysis.sortedCats[0][1];
              const pct = (amount / max) * 100;
              return (
                <div key={cat} className="category-bar-row">
                  <div className="cat-bar-label">
                    <span>{getCategoryIcon(cat)}</span>
                    <span>{cat}</span>
                  </div>
                  <div className="cat-bar-track">
                    <div className="cat-bar-fill" style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat] || '#64748B' }} />
                  </div>
                  <div className="cat-bar-value">{fmtShort(amount)}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Monthly Summary</h3>
              <p className="chart-subtitle">Income vs Expense by month</p>
            </div>
          </div>
          <div className="monthly-table">
            <div className="monthly-table-header">
              <span>Month</span>
              <span>Income</span>
              <span>Expenses</span>
              <span>Saved</span>
            </div>
            {analysis.monthly.map(m => (
              <div key={m.month} className="monthly-table-row">
                <span className="month-name">{m.month}</span>
                <span className="month-income">+{fmtShort(m.income)}</span>
                <span className="month-expense">-{fmtShort(m.expenses)}</span>
                <span className={`month-saved ${m.balance >= 0 ? 'positive' : 'negative'}`}>
                  {fmtShort(m.balance)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
