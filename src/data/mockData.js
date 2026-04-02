export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Dividends', 'Bonus'],
  expense: ['Housing', 'Food & Dining', 'Transport', 'Entertainment', 'Healthcare', 'Shopping', 'Utilities', 'Travel', 'Education', 'Subscriptions'],
};

export const CATEGORY_COLORS = {
  'Salary': '#F59E0B',
  'Freelance': '#10B981',
  'Investments': '#3B82F6',
  'Dividends': '#8B5CF6',
  'Bonus': '#EC4899',
  'Housing': '#EF4444',
  'Food & Dining': '#F97316',
  'Transport': '#14B8A6',
  'Entertainment': '#A855F7',
  'Healthcare': '#06B6D4',
  'Shopping': '#F43F5E',
  'Utilities': '#84CC16',
  'Travel': '#FB923C',
  'Education': '#6366F1',
  'Subscriptions': '#64748B',
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialTransactions = [
  // January
  { id: generateId(), date: '2026-01-02', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000, merchant: 'Zorvyn Inc.' },
  { id: generateId(), date: '2026-01-03', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 22000, merchant: 'Green Valley Apartments' },
  { id: generateId(), date: '2026-01-05', description: 'Zomato Order', category: 'Food & Dining', type: 'expense', amount: 450, merchant: 'Zomato' },
  { id: generateId(), date: '2026-01-06', description: 'Uber Ride', category: 'Transport', type: 'expense', amount: 280, merchant: 'Uber' },
  { id: generateId(), date: '2026-01-08', description: 'Netflix Subscription', category: 'Subscriptions', type: 'expense', amount: 649, merchant: 'Netflix' },
  { id: generateId(), date: '2026-01-10', description: 'Freelance Project - Web App', category: 'Freelance', type: 'income', amount: 35000, merchant: 'Startup Labs' },
  { id: generateId(), date: '2026-01-12', description: 'Grocery Shopping', category: 'Food & Dining', type: 'expense', amount: 3200, merchant: 'BigBasket' },
  { id: generateId(), date: '2026-01-14', description: 'SIP Investment', category: 'Investments', type: 'expense', amount: 10000, merchant: 'Zerodha' },
  { id: generateId(), date: '2026-01-15', description: 'Medical Checkup', category: 'Healthcare', type: 'expense', amount: 1800, merchant: 'Apollo Clinics' },
  { id: generateId(), date: '2026-01-18', description: 'Amazon Shopping', category: 'Shopping', type: 'expense', amount: 4500, merchant: 'Amazon' },
  { id: generateId(), date: '2026-01-20', description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 2100, merchant: 'BESCOM' },
  { id: generateId(), date: '2026-01-22', description: 'Dividend Credit', category: 'Dividends', type: 'income', amount: 4200, merchant: 'HDFC Mutual Fund' },
  { id: generateId(), date: '2026-01-25', description: 'Weekend Trip to Goa', category: 'Travel', type: 'expense', amount: 18000, merchant: 'MakeMyTrip' },
  { id: generateId(), date: '2026-01-28', description: 'Spotify + YouTube Premium', category: 'Subscriptions', type: 'expense', amount: 459, merchant: 'Various' },
  { id: generateId(), date: '2026-01-30', description: 'Restaurant Dinner', category: 'Food & Dining', type: 'expense', amount: 2800, merchant: 'The Black Pearl' },

  // February
  { id: generateId(), date: '2026-02-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000, merchant: 'Zorvyn Inc.' },
  { id: generateId(), date: '2026-02-02', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 22000, merchant: 'Green Valley Apartments' },
  { id: generateId(), date: '2026-02-04', description: 'Swiggy Orders', category: 'Food & Dining', type: 'expense', amount: 1200, merchant: 'Swiggy' },
  { id: generateId(), date: '2026-02-06', description: 'Metro Pass', category: 'Transport', type: 'expense', amount: 500, merchant: 'BMRCL' },
  { id: generateId(), date: '2026-02-08', description: 'Coursera Subscription', category: 'Education', type: 'expense', amount: 2999, merchant: 'Coursera' },
  { id: generateId(), date: '2026-02-10', description: 'Freelance UI Design', category: 'Freelance', type: 'income', amount: 28000, merchant: 'DesignCo' },
  { id: generateId(), date: '2026-02-12', description: 'Valentines Dinner', category: 'Food & Dining', type: 'expense', amount: 5500, merchant: 'Taj Hotel Restaurant' },
  { id: generateId(), date: '2026-02-14', description: 'Gift Purchase', category: 'Shopping', type: 'expense', amount: 3200, merchant: 'Myntra' },
  { id: generateId(), date: '2026-02-16', description: 'SIP Investment', category: 'Investments', type: 'expense', amount: 10000, merchant: 'Zerodha' },
  { id: generateId(), date: '2026-02-18', description: 'PharmEasy Order', category: 'Healthcare', type: 'expense', amount: 890, merchant: 'PharmEasy' },
  { id: generateId(), date: '2026-02-20', description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 999, merchant: 'Airtel' },
  { id: generateId(), date: '2026-02-22', description: 'Movie Tickets', category: 'Entertainment', type: 'expense', amount: 800, merchant: 'BookMyShow' },
  { id: generateId(), date: '2026-02-25', description: 'Annual Bonus', category: 'Bonus', type: 'income', amount: 50000, merchant: 'Zorvyn Inc.' },
  { id: generateId(), date: '2026-02-27', description: 'Dividend Credit', category: 'Dividends', type: 'income', amount: 3800, merchant: 'SBI Mutual Fund' },

  // March
  { id: generateId(), date: '2026-03-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000, merchant: 'Zorvyn Inc.' },
  { id: generateId(), date: '2026-03-02', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 22000, merchant: 'Green Valley Apartments' },
  { id: generateId(), date: '2026-03-04', description: 'Grocery - Big Basket', category: 'Food & Dining', type: 'expense', amount: 4100, merchant: 'BigBasket' },
  { id: generateId(), date: '2026-03-06', description: 'Ola Cab', category: 'Transport', type: 'expense', amount: 650, merchant: 'Ola' },
  { id: generateId(), date: '2026-03-08', description: 'Holi Shopping', category: 'Shopping', type: 'expense', amount: 2800, merchant: 'Local Market' },
  { id: generateId(), date: '2026-03-10', description: 'Freelance Backend Dev', category: 'Freelance', type: 'income', amount: 42000, merchant: 'TechVenture' },
  { id: generateId(), date: '2026-03-12', description: 'SIP Investment', category: 'Investments', type: 'expense', amount: 10000, merchant: 'Zerodha' },
  { id: generateId(), date: '2026-03-14', description: 'Doctor Visit', category: 'Healthcare', type: 'expense', amount: 1200, merchant: 'Manipal Hospital' },
  { id: generateId(), date: '2026-03-16', description: 'Weekend Coorg Trip', category: 'Travel', type: 'expense', amount: 12000, merchant: 'Airbnb' },
  { id: generateId(), date: '2026-03-18', description: 'Water & Gas Bill', category: 'Utilities', type: 'expense', amount: 1400, merchant: 'BWSSB' },
  { id: generateId(), date: '2026-03-20', description: 'Concert Tickets', category: 'Entertainment', type: 'expense', amount: 2500, merchant: 'Paytm Insider' },
  { id: generateId(), date: '2026-03-22', description: 'Electronics Purchase', category: 'Shopping', type: 'expense', amount: 8900, merchant: 'Croma' },
  { id: generateId(), date: '2026-03-25', description: 'Stock Dividend', category: 'Dividends', type: 'income', amount: 5100, merchant: 'Groww' },
  { id: generateId(), date: '2026-03-27', description: 'Udemy Courses', category: 'Education', type: 'expense', amount: 1800, merchant: 'Udemy' },
  { id: generateId(), date: '2026-03-30', description: 'Fine Dining', category: 'Food & Dining', type: 'expense', amount: 3600, merchant: 'Social Offline' },

  // Current month - April (partial)
  { id: generateId(), date: '2026-04-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000, merchant: 'Zorvyn Inc.' },
  { id: generateId(), date: '2026-04-02', description: 'Apartment Rent', category: 'Housing', type: 'expense', amount: 22000, merchant: 'Green Valley Apartments' },
  { id: generateId(), date: '2026-04-02', description: 'Swiggy Lunch', category: 'Food & Dining', type: 'expense', amount: 380, merchant: 'Swiggy' },
];

export const generateMonthlyData = (transactions) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = {};

  transactions.forEach(t => {
    const date = new Date(t.date);
    const key = months[date.getMonth()];
    if (!data[key]) data[key] = { month: key, income: 0, expenses: 0, balance: 0 };
    if (t.type === 'income') data[key].income += t.amount;
    else data[key].expenses += t.amount;
  });

  return Object.values(data).map(d => ({
    ...d,
    balance: d.income - d.expenses,
  }));
};
