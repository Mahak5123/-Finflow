export const fmt = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export const fmtShort = (amount) => {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

export const fmtDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const fmtDateShort = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const getCategoryIcon = (category) => {
  const icons = {
    'Salary': '💼', 'Freelance': '💻', 'Investments': '📈', 'Dividends': '💰', 'Bonus': '🎯',
    'Housing': '🏠', 'Food & Dining': '🍽️', 'Transport': '🚗', 'Entertainment': '🎬',
    'Healthcare': '🏥', 'Shopping': '🛍️', 'Utilities': '⚡', 'Travel': '✈️',
    'Education': '📚', 'Subscriptions': '📱',
  };
  return icons[category] || '💳';
};
