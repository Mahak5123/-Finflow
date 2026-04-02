import { createContext, useContext, useReducer, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  transactions: JSON.parse(localStorage.getItem('zv_transactions') || 'null') || initialTransactions,
  role: localStorage.getItem('zv_role') || 'viewer',
  darkMode: localStorage.getItem('zv_dark') !== 'false',
  filters: { search: '', type: 'all', category: 'all', sortBy: 'date', sortDir: 'desc' },
  activeTab: 'dashboard',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      localStorage.setItem('zv_role', action.payload);
      return { ...state, role: action.payload };
    case 'TOGGLE_DARK':
      localStorage.setItem('zv_dark', !state.darkMode);
      return { ...state, darkMode: !state.darkMode };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'ADD_TRANSACTION': {
      const updated = [action.payload, ...state.transactions];
      localStorage.setItem('zv_transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case 'EDIT_TRANSACTION': {
      const updated = state.transactions.map(t => t.id === action.payload.id ? action.payload : t);
      localStorage.setItem('zv_transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case 'DELETE_TRANSACTION': {
      const updated = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('zv_transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case 'RESET_DATA':
      localStorage.removeItem('zv_transactions');
      return { ...state, transactions: initialTransactions };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredTransactions = useMemo(() => {
    let result = [...state.transactions];
    const { search, type, category, sortBy, sortDir } = state.filters;
    if (search) result = result.filter(t =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.merchant.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    );
    if (type !== 'all') result = result.filter(t => t.type === type);
    if (category !== 'all') result = result.filter(t => t.category === category);
    result.sort((a, b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (sortBy === 'date') { va = new Date(va); vb = new Date(vb); }
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return result;
  }, [state.transactions, state.filters]);

  const stats = useMemo(() => {
    const income = state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [state.transactions]);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions, stats }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
