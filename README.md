# FinFlow — Finance Dashboard

> A modern, feature-rich finance dashboard that helps 
> users track income, expenses and spending patterns 
> through interactive charts, smart insights and a 
> clean intuitive interface built with React.

## 🚀 Live Demo
👉 **https://finflow-alpha-lime.vercel.app**

![FinFlow Dashboard](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react) ![Recharts](https://img.shields.io/badge/Recharts-2.10-green?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square)

---

## ✨ Features

### Core Requirements (All Met)
| Feature | Status | Details |
|---|---|---|
| Dashboard Overview | ✅ | Summary cards, trend chart, spending pie, savings bar |
| Transactions Section | ✅ | Full table with search, filter, sort by date/amount |
| Role-Based UI (RBAC) | ✅ | Viewer (read-only) / Admin (add, edit, delete) |
| Insights Section | ✅ | 6 insight cards + category bar chart + monthly table |
| State Management | ✅ | React Context + useReducer, all state centralized |
| Responsive Design | ✅ | Works on mobile, tablet, desktop |

### Optional Enhancements (Implemented)
| Feature | Status |
|---|---|
| Dark / Light Mode | ✅ Toggleable, persists via localStorage |
| Data Persistence | ✅ Transactions saved to localStorage |
| Export Functionality | ✅ CSV export of filtered transactions |
| Animations & Transitions | ✅ Page fade-in, card hover lifts, modal slide-up |

---

## 🏗 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tooling
- **Recharts** — Area, Pie, Bar charts
- **Lucide React** — Icon system
- **React Context + useReducer** — State management
- **Custom CSS** — No UI library, fully hand-crafted design system
- **Google Fonts** — Syne (headings), DM Mono (numbers), DM Sans (body)

---

## 📦 Setup & Installation

```bash
# Clone or unzip the project
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx        # Navigation, role switcher, theme toggle
│   ├── Dashboard.jsx      # Overview tab with recent transactions
│   ├── StatsGrid.jsx      # KPI summary cards
│   ├── Charts.jsx         # TrendChart, SpendingBreakdown, MonthlyBarChart
│   ├── Transactions.jsx   # Full transactions table + add/edit/delete modal
│   └── Insights.jsx       # Insight cards + category bars + monthly summary
├── context/
│   └── AppContext.jsx     # Global state: transactions, filters, role, theme
├── data/
│   └── mockData.js        # 40+ realistic Indian finance transactions
├── utils/
│   └── helpers.js         # Formatting, date utils, category icons
├── styles.css             # Full custom design system with CSS variables
├── App.jsx
└── main.jsx
```

---

## 🎨 Design Decisions

- **Dark-first design** inspired by Bloomberg Terminal, Linear, and Stripe
- **Syne** for headings (geometric, authoritative), **DM Mono** for financial numbers (clarity), **DM Sans** for body text (readability)
- **Amber/gold accent** (`#F59E0B`) — premium fintech feel without the cliché purple
- **CSS variables** for full light/dark theming with zero JS
- **Color-coded** categories using `color-mix()` for dynamic badge colors

---

## 🔐 RBAC Simulation

Switch roles using the dropdown in the sidebar:

| Role | Capabilities |
|---|---|
| **Viewer** | View dashboard, transactions, insights. No modifications. |
| **Admin** | All Viewer capabilities + Add, Edit, Delete transactions + Reset data |

Role selection persists across sessions via `localStorage`.

---

## 📊 Data & State

- **40+ mock transactions** across Jan–Apr 2026 with realistic Indian rupee amounts
- Filters (search, type, category), sort (date, amount), and role are all managed in a single `useReducer` store
- All transaction mutations update `localStorage` immediately for persistence
- `useMemo` used for expensive computations (filtered list, stats, monthly aggregates)

---

## 👩‍💻 Author

**Mahak Salecha** — Frontend Developer Intern Candidate  
mahaksalecha61@gmail.com
