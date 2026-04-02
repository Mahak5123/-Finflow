import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fmt, fmtDate, getCategoryIcon, generateId } from '../utils/helpers';
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import { Search, Filter, ArrowUpDown, Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, Download } from 'lucide-react';

function TransactionModal({ tx, onClose }) {
  const { dispatch } = useApp();
  const isEdit = !!tx?.id;
  const [form, setForm] = useState(tx || { date: new Date().toISOString().split('T')[0], description: '', category: 'Food & Dining', type: 'expense', amount: '', merchant: '' });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date || !form.merchant) {
      setError('Please fill all fields.'); return;
    }
    const payload = { ...form, amount: parseFloat(form.amount), id: form.id || generateId() };
    dispatch({ type: isEdit ? 'EDIT_TRANSACTION' : 'ADD_TRANSACTION', payload });
    onClose();
  };

  const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h3>
          <button onClick={onClose} className="modal-close"><X size={18} /></button>
        </div>
        <div className="modal-body">
          {error && <div className="modal-error">{error}</div>}
          <div className="form-row">
            <label>Type</label>
            <div className="type-toggle">
              {['income', 'expense'].map(t => (
                <button key={t} className={`type-btn ${form.type === t ? 'active-' + t : ''}`}
                  onClick={() => setForm(f => ({ ...f, type: t, category: t === 'income' ? 'Salary' : 'Food & Dining' }))}>
                  {t === 'income' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label>Description</label>
            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Monthly Salary" className="form-input" />
          </div>
          <div className="form-row">
            <label>Merchant / Source</label>
            <input value={form.merchant} onChange={e => setForm(f => ({ ...f, merchant: e.target.value }))} placeholder="e.g. Zorvyn Inc." className="form-input" />
          </div>
          <div className="form-row-2">
            <div className="form-row">
              <label>Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0" className="form-input" />
            </div>
            <div className="form-row">
              <label>Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="form-input" />
            </div>
          </div>
          <div className="form-row">
            <label>Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="form-input">
              {CATEGORIES[form.type].map(c => <option key={c} value={c}>{getCategoryIcon(c)} {c}</option>)}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary">{isEdit ? 'Save Changes' : 'Add Transaction'}</button>
        </div>
      </div>
    </div>
  );
}

export default function Transactions() {
  const { state, dispatch, filteredTransactions } = useApp();
  const { filters, role } = state;
  const [modal, setModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const allCategories = [...new Set(state.transactions.map(t => t.category))];

  const handleSort = (col) => {
    if (filters.sortBy === col) {
      dispatch({ type: 'SET_FILTER', payload: { sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' } });
    } else {
      dispatch({ type: 'SET_FILTER', payload: { sortBy: col, sortDir: 'desc' } });
    }
  };

  const exportCSV = () => {
    const rows = [['Date', 'Description', 'Merchant', 'Category', 'Type', 'Amount'],
      ...filteredTransactions.map(t => [t.date, t.description, t.merchant, t.category, t.type, t.amount])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click();
  };

  const SortIcon = ({ col }) => {
    if (filters.sortBy !== col) return <ArrowUpDown size={13} className="sort-icon-inactive" />;
    return filters.sortDir === 'asc' ? <ArrowUp size={13} /> : <ArrowDown size={13} />;
  };

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Transactions</h2>
          <p className="section-sub">{filteredTransactions.length} records found</p>
        </div>
        <div className="section-actions">
          <button onClick={exportCSV} className="btn-ghost btn-sm">
            <Download size={15} /> Export CSV
          </button>
          {role === 'admin' && (
            <button onClick={() => setModal({})} className="btn-primary btn-sm">
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-wrap">
          <Search size={15} className="search-icon" />
          <input
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => dispatch({ type: 'SET_FILTER', payload: { search: e.target.value } })}
          />
        </div>
        <div className="filter-group">
          <select className="filter-select" value={filters.type} onChange={e => dispatch({ type: 'SET_FILTER', payload: { type: e.target.value } })}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="filter-select" value={filters.category} onChange={e => dispatch({ type: 'SET_FILTER', payload: { category: e.target.value } })}>
            <option value="all">All Categories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table className="tx-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('date')} className="sortable">Date <SortIcon col="date" /></th>
              <th>Description</th>
              <th>Category</th>
              <th onClick={() => handleSort('amount')} className="sortable">Amount <SortIcon col="amount" /></th>
              <th>Type</th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr><td colSpan={6} className="empty-state">
                <div className="empty-icon">🔍</div>
                <p>No transactions found</p>
                <span>Try adjusting your filters</span>
              </td></tr>
            ) : filteredTransactions.map(tx => (
              <tr key={tx.id} className="tx-row">
                <td className="tx-date">{fmtDate(tx.date)}</td>
                <td>
                  <div className="tx-desc">{tx.description}</div>
                  <div className="tx-merchant">{tx.merchant}</div>
                </td>
                <td>
                  <span className="category-badge" style={{ '--cat-color': CATEGORY_COLORS[tx.category] || '#64748B' }}>
                    {getCategoryIcon(tx.category)} {tx.category}
                  </span>
                </td>
                <td className={`tx-amount ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                </td>
                <td>
                  <span className={`type-badge type-badge--${tx.type}`}>
                    {tx.type === 'income' ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                    {tx.type}
                  </span>
                </td>
                {role === 'admin' && (
                  <td>
                    <div className="action-btns">
                      <button onClick={() => setModal(tx)} className="action-btn edit" title="Edit"><Pencil size={14} /></button>
                      <button onClick={() => setDeleteConfirm(tx.id)} className="action-btn delete" title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal !== null && <TransactionModal tx={modal.id ? modal : null} onClose={() => setModal(null)} />}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal modal--sm">
            <div className="modal-header">
              <h3>Delete Transaction</h3>
              <button onClick={() => setDeleteConfirm(null)} className="modal-close"><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)' }}>Are you sure you want to delete this transaction? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setDeleteConfirm(null)} className="btn-ghost">Cancel</button>
              <button onClick={() => { dispatch({ type: 'DELETE_TRANSACTION', payload: deleteConfirm }); setDeleteConfirm(null); }} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
