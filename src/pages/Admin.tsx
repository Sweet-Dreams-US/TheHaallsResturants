import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurants } from '../data/restaurants';

type SectionKey =
  | 'orders'
  | 'menu'
  | 'analytics'
  | 'accounting'
  | 'events'
  | 'staff'
  | 'settings';

type Scope = 'all' | string; // 'all' or restaurant slug

const navItems: { key: SectionKey; icon: string; label: string }[] = [
  { key: 'orders', icon: '🛎', label: 'Orders' },
  { key: 'menu', icon: '📋', label: 'Menu' },
  { key: 'analytics', icon: '📈', label: 'Analytics' },
  { key: 'accounting', icon: '💰', label: 'Accounting' },
  { key: 'events', icon: '🌸', label: 'Events' },
  { key: 'staff', icon: '🪪', label: 'Staff' },
  { key: 'settings', icon: '⚙', label: 'Settings' },
];

// ──────────────────────────────────────────────────────────────────────
// MOCK DATA — would be replaced by API calls in production
// ──────────────────────────────────────────────────────────────────────

type Order = {
  id: string;
  time: string;
  channel: 'Dine-in' | 'Online' | 'Phone' | 'DoorDash';
  ref: string;
  customer: string;
  items: { name: string; qty: number; price: number }[];
  status: 'New' | 'Preparing' | 'Ready' | 'Out for delivery' | 'Completed';
  restaurant: string;
};

const orders: Order[] = [
  {
    id: 'GH-4471',
    time: '6:42 PM',
    channel: 'Dine-in',
    ref: 'Booth 4',
    customer: 'Mitchell, party of 4',
    items: [
      { name: 'Bone-In Ribeye 16oz', qty: 2, price: 54 },
      { name: 'Oyster Tower', qty: 1, price: 38 },
      { name: 'Wedge Salad', qty: 2, price: 14 },
    ],
    status: 'Preparing',
    restaurant: 'the-gas-house',
  },
  {
    id: 'GH-4472',
    time: '6:48 PM',
    channel: 'Online',
    ref: 'Pickup · 7:30 PM',
    customer: 'D. Reed',
    items: [
      { name: 'Pan-Seared Walleye', qty: 1, price: 32 },
      { name: 'Crème Brûlée', qty: 1, price: 11 },
    ],
    status: 'New',
    restaurant: 'the-gas-house',
  },
  {
    id: 'TV-2218',
    time: '6:35 PM',
    channel: 'Dine-in',
    ref: 'Bar seat 7',
    customer: 'Walk-in',
    items: [
      { name: 'Old Fashioned', qty: 2, price: 13 },
      { name: 'Steakhouse Burger', qty: 1, price: 19 },
    ],
    status: 'Ready',
    restaurant: 'the-tavern',
  },
  {
    id: 'HW-1102',
    time: '6:51 PM',
    channel: 'DoorDash',
    ref: 'Driver · ETA 12m',
    customer: 'A. Patel',
    items: [
      { name: 'Hollywood Cheeseburger', qty: 2, price: 16 },
      { name: 'Vanilla Shake', qty: 2, price: 7 },
    ],
    status: 'Out for delivery',
    restaurant: 'halls-hollywood',
  },
  {
    id: 'DK-0904',
    time: '6:20 PM',
    channel: 'Dine-in',
    ref: 'Patio 3',
    customer: 'Hahn, party of 6',
    items: [
      { name: 'Riverbank Walleye Tacos', qty: 3, price: 18 },
      { name: 'Summer Spritz', qty: 4, price: 12 },
    ],
    status: 'Completed',
    restaurant: 'the-deck',
  },
  {
    id: 'FC-3360',
    time: '6:55 PM',
    channel: 'Phone',
    ref: 'Pickup · 7:15 PM',
    customer: 'J. Steinberg',
    items: [
      { name: 'Factory Pan Pizza · 14"', qty: 1, price: 22 },
      { name: 'Garlic Knots', qty: 1, price: 8 },
    ],
    status: 'Preparing',
    restaurant: 'the-factory',
  },
  {
    id: 'TK-0556',
    time: '7:01 PM',
    channel: 'Dine-in',
    ref: 'Hibachi 2',
    customer: 'Garcia, party of 8',
    items: [
      { name: 'Filet & Lobster Combo', qty: 4, price: 48 },
      { name: 'Saké Flight', qty: 2, price: 22 },
    ],
    status: 'New',
    restaurant: 'takaoka-of-japan',
  },
];

type Staff = {
  id: number;
  name: string;
  role: string;
  restaurant: string;
  status: 'on' | 'off' | 'break';
  shift: string;
  yearsWith: number;
};

const staff: Staff[] = [
  { id: 1, name: 'Marcus Reed', role: 'Executive Chef', restaurant: 'the-gas-house', status: 'on', shift: '4p — 12a', yearsWith: 11 },
  { id: 2, name: 'Linda Park', role: 'GM', restaurant: 'the-gas-house', status: 'on', shift: '3p — 11p', yearsWith: 7 },
  { id: 3, name: 'Devon Hartwell', role: 'Sous Chef', restaurant: 'the-tavern', status: 'on', shift: '2p — 10p', yearsWith: 4 },
  { id: 4, name: 'Ana Velasquez', role: 'Bar Manager', restaurant: 'the-tavern', status: 'break', shift: '4p — 12a', yearsWith: 9 },
  { id: 5, name: 'Roy Tanaka', role: 'Hibachi Lead', restaurant: 'takaoka-of-japan', status: 'on', shift: '4p — 11p', yearsWith: 14 },
  { id: 6, name: 'Marie Bouchard', role: 'Pastry Chef', restaurant: 'the-factory', status: 'on', shift: '6a — 2p', yearsWith: 5 },
  { id: 7, name: 'Jordan Wells', role: 'GM', restaurant: 'halls-hollywood', status: 'on', shift: '11a — 9p', yearsWith: 6 },
  { id: 8, name: 'Kim Holloway', role: 'Server Lead', restaurant: 'halls-hollywood', status: 'off', shift: '— off today', yearsWith: 3 },
  { id: 9, name: 'Brian O\'Connell', role: 'Catering Mgr', restaurant: 'halls-commissary', status: 'on', shift: '7a — 5p', yearsWith: 12 },
  { id: 10, name: 'Sofia Castellano', role: 'Patio Lead', restaurant: 'the-deck', status: 'on', shift: '12p — 10p', yearsWith: 2 },
  { id: 11, name: 'Wayne Drummond', role: 'Pit Master', restaurant: 'halls-state-street', status: 'on', shift: '8a — 6p', yearsWith: 18 },
  { id: 12, name: 'Toni Albers', role: 'GM', restaurant: 'tap-haus', status: 'on', shift: '3p — 11p', yearsWith: 5 },
];

type EventBooking = {
  id: number;
  date: string;
  time: string;
  name: string;
  type: 'Private Dining' | 'Wedding' | 'Corporate' | 'Holiday';
  restaurant: string;
  guests: number;
  status: 'Confirmed' | 'Tentative' | 'Deposit Paid';
};

const events: EventBooking[] = [
  { id: 1, date: '2026-05-12', time: '6:30 PM', name: 'Mitchell Wedding Rehearsal', type: 'Wedding', restaurant: 'the-gas-house', guests: 24, status: 'Confirmed' },
  { id: 2, date: '2026-05-14', time: '12:00 PM', name: 'PNC Bank Quarterly Lunch', type: 'Corporate', restaurant: 'the-tavern', guests: 18, status: 'Confirmed' },
  { id: 3, date: '2026-05-16', time: '7:00 PM', name: 'Hartwell 50th Anniversary', type: 'Private Dining', restaurant: 'the-gas-house', guests: 32, status: 'Deposit Paid' },
  { id: 4, date: '2026-05-18', time: '5:00 PM', name: 'Steinberg Bar Mitzvah', type: 'Private Dining', restaurant: 'takaoka-of-japan', guests: 45, status: 'Confirmed' },
  { id: 5, date: '2026-05-25', time: '4:00 PM', name: 'Memorial Day Cookout', type: 'Holiday', restaurant: 'the-deck', guests: 120, status: 'Tentative' },
  { id: 6, date: '2026-06-01', time: '6:00 PM', name: 'Fort Wayne Chamber Mixer', type: 'Corporate', restaurant: 'tap-haus', guests: 60, status: 'Confirmed' },
];

const dailyRevenue = [
  { day: 'Mon', value: 14250 },
  { day: 'Tue', value: 12480 },
  { day: 'Wed', value: 13950 },
  { day: 'Thu', value: 18720 },
  { day: 'Fri', value: 28640 },
  { day: 'Sat', value: 31240 },
  { day: 'Sun', value: 21330 },
];

// ──────────────────────────────────────────────────────────────────────
// SHELL
// ──────────────────────────────────────────────────────────────────────

export default function Admin() {
  const [section, setSection] = useState<SectionKey>('orders');
  const [scope, setScope] = useState<Scope>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scopedOrders = useMemo(
    () => (scope === 'all' ? orders : orders.filter((o) => o.restaurant === scope)),
    [scope]
  );
  const liveOrderCount = scopedOrders.filter((o) => o.status !== 'Completed').length;

  return (
    <div className="fixed inset-0 z-[60] flex bg-ink-500 text-cream-100">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== 'undefined') && (
          <aside
            className={`${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-30 w-64 shrink-0 border-r border-cream-100/10 bg-ink-400 transition-transform duration-200`}
          >
            <Sidebar
              section={section}
              setSection={(s) => {
                setSection(s);
                setSidebarOpen(false);
              }}
              liveOrderCount={liveOrderCount}
            />
          </aside>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-ink-500/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          section={section}
          scope={scope}
          setScope={setScope}
          onMenu={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-ink-500">
          <div className="mx-auto max-w-[1400px] px-5 py-6 lg:px-8 lg:py-8">
            {section === 'orders' && <OrdersView orders={scopedOrders} scope={scope} />}
            {section === 'menu' && <MenuView scope={scope} />}
            {section === 'analytics' && <AnalyticsView scope={scope} />}
            {section === 'accounting' && <AccountingView scope={scope} />}
            {section === 'events' && <EventsView scope={scope} />}
            {section === 'staff' && <StaffView scope={scope} />}
            {section === 'settings' && <SettingsView scope={scope} setScope={setScope} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// SIDEBAR
// ──────────────────────────────────────────────────────────────────────

function Sidebar({
  section,
  setSection,
  liveOrderCount,
}: {
  section: SectionKey;
  setSection: (s: SectionKey) => void;
  liveOrderCount: number;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-6 pb-5 border-b border-cream-100/10">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-ember-600 grid place-items-center font-display text-cream-100 text-lg italic">
            H
          </div>
          <div className="leading-tight">
            <div className="font-display text-cream-100 text-base">Don Hall's</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-cream-100/50">
              HQ Dashboard
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = section === item.key;
          const badge = item.key === 'orders' && liveOrderCount > 0 ? liveOrderCount : null;
          return (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? 'bg-gold-400/10 text-gold-400'
                  : 'text-cream-100/70 hover:bg-cream-100/5 hover:text-cream-100'
              }`}
            >
              <span className="text-base w-5 text-center" aria-hidden>
                {item.icon}
              </span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {badge !== null && (
                <span className="rounded-full bg-ember-600 px-2 py-0.5 text-[10px] font-bold text-cream-100">
                  {badge}
                </span>
              )}
              {active && <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-cream-100/10 px-3 py-4 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-100/60 hover:bg-cream-100/5 hover:text-cream-100 transition"
        >
          <span className="text-base w-5 text-center" aria-hidden>
            ↗
          </span>
          <span>View public site</span>
        </Link>
        <div className="flex items-center gap-3 rounded-lg px-3 py-3 bg-ink-500/60">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold-400 to-ember-600 grid place-items-center text-xs font-semibold text-ink-500">
            CH
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-cream-100 truncate">Cole Hall</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-cream-100/50">
              Owner · HQ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// TOP BAR
// ──────────────────────────────────────────────────────────────────────

function TopBar({
  section,
  scope,
  setScope,
  onMenu,
}: {
  section: SectionKey;
  scope: Scope;
  setScope: (s: Scope) => void;
  onMenu: () => void;
}) {
  const title = navItems.find((n) => n.key === section)?.label ?? '';
  const scopeName =
    scope === 'all' ? 'All Restaurants · HQ' : restaurants.find((r) => r.slug === scope)?.name ?? '';

  return (
    <header className="border-b border-cream-100/10 bg-ink-400/80 backdrop-blur-md">
      <div className="flex items-center gap-3 px-5 py-3 lg:px-8">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 -ml-2 text-cream-100/70 hover:text-cream-100"
          aria-label="Menu"
        >
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream-100/40">
            {scopeName}
          </div>
          <h1 className="font-display text-xl lg:text-2xl text-cream-100 leading-tight truncate">
            {title}
          </h1>
        </div>

        <ScopePicker scope={scope} setScope={setScope} />

        <button className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg border border-cream-100/10 text-cream-100/70 hover:border-cream-100/30 hover:text-cream-100 transition">
          🔔
        </button>
      </div>
    </header>
  );
}

function ScopePicker({ scope, setScope }: { scope: Scope; setScope: (s: Scope) => void }) {
  const [open, setOpen] = useState(false);
  const current =
    scope === 'all'
      ? { name: 'All Restaurants', sub: 'HQ · Aggregated' }
      : (() => {
          const r = restaurants.find((x) => x.slug === scope);
          return { name: r?.shortName ?? r?.name ?? '', sub: r?.cuisine.split('·')[0].trim() ?? '' };
        })();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-cream-100/15 bg-ink-300/60 pl-2.5 pr-3 py-1.5 text-sm hover:border-cream-100/30 transition"
      >
        <span className="h-6 w-6 rounded-md bg-gradient-to-br from-gold-400 to-ember-600 grid place-items-center text-[10px] font-semibold text-ink-500">
          {scope === 'all' ? 'HQ' : current.name.charAt(0)}
        </span>
        <div className="text-left">
          <div className="text-cream-100 text-sm leading-none">{current.name}</div>
          <div className="text-[9px] font-mono uppercase tracking-wider text-cream-100/50 mt-0.5">
            {current.sub}
          </div>
        </div>
        <span className="text-cream-100/50 text-xs ml-1">▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-40 w-72 rounded-xl border border-cream-100/10 bg-ink-300/95 backdrop-blur-xl shadow-2xl py-1.5 max-h-[70vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  setScope('all');
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-cream-100/5 transition ${
                  scope === 'all' ? 'text-gold-400' : 'text-cream-100'
                }`}
              >
                <span className="h-7 w-7 rounded-md bg-gradient-to-br from-gold-400 to-ember-600 grid place-items-center text-[11px] font-semibold text-ink-500">
                  HQ
                </span>
                <div className="flex-1">
                  <div className="text-sm">All Restaurants</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cream-100/50">
                    Aggregated · 10 locations
                  </div>
                </div>
                {scope === 'all' && <span className="text-gold-400 text-xs">●</span>}
              </button>
              <div className="my-1 h-px bg-cream-100/10" />
              {restaurants.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => {
                    setScope(r.slug);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-cream-100/5 transition ${
                    scope === r.slug ? 'text-gold-400' : 'text-cream-100'
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-md grid place-items-center text-[11px] font-semibold text-ink-500"
                    style={{ background: r.accent }}
                  >
                    {r.shortName.charAt(0)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{r.name}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cream-100/50 truncate">
                      {r.cuisine.split('·')[0].trim()}
                    </div>
                  </div>
                  {scope === r.slug && <span className="text-gold-400 text-xs">●</span>}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// ORDERS
// ──────────────────────────────────────────────────────────────────────

function OrdersView({ orders, scope }: { orders: Order[]; scope: Scope }) {
  const [filter, setFilter] = useState<'All' | Order['status']>('All');
  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);
  const counts = {
    All: orders.length,
    New: orders.filter((o) => o.status === 'New').length,
    Preparing: orders.filter((o) => o.status === 'Preparing').length,
    Ready: orders.filter((o) => o.status === 'Ready').length,
    'Out for delivery': orders.filter((o) => o.status === 'Out for delivery').length,
    Completed: orders.filter((o) => o.status === 'Completed').length,
  };

  return (
    <div className="space-y-5">
      <KpiRow
        items={[
          { label: 'Live orders', value: counts.New + counts.Preparing + counts.Ready + counts['Out for delivery'], hint: 'Across all channels' },
          { label: 'Avg ticket', value: '$87.40', hint: 'Last 24h' },
          { label: 'Avg prep', value: '14m', hint: '↓ 2m vs. yesterday' },
          { label: 'Completed today', value: '142', hint: scope === 'all' ? '10 locations' : 'This location' },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2">
        {(['All', 'New', 'Preparing', 'Ready', 'Out for delivery', 'Completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              filter === f
                ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                : 'border-cream-100/15 text-cream-100/70 hover:border-cream-100/40 hover:text-cream-100'
            }`}
          >
            {f}
            <span className="ml-2 font-mono opacity-60">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-cream-100/10 text-[10px] font-mono uppercase tracking-[0.2em] text-cream-100/50">
          <div className="col-span-2">Order</div>
          <div className="col-span-2">Channel</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-1 text-right">Total</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-cream-100/50 text-sm">No orders in this view.</div>
        ) : (
          filtered.map((o) => <OrderRow key={o.id} order={o} />)
        )}
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const r = restaurants.find((x) => x.slug === order.restaurant);

  return (
    <div className="border-t border-cream-100/5 first:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid grid-cols-12 gap-3 px-4 py-3 w-full text-left items-center hover:bg-cream-100/5 transition"
      >
        <div className="col-span-2">
          <div className="font-mono text-sm text-cream-100">{order.id}</div>
          <div className="text-[10px] text-cream-100/50">{order.time}</div>
        </div>
        <div className="col-span-2 text-sm text-cream-100/80">
          <div>{order.channel}</div>
          <div className="text-[10px] text-cream-100/50">{order.ref}</div>
        </div>
        <div className="col-span-3 text-sm text-cream-100 truncate">{order.customer}</div>
        <div className="col-span-2 flex items-center gap-2 text-xs text-cream-100/70 truncate">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: r?.accent }} />
          <span className="truncate">{r?.shortName ?? order.restaurant}</span>
        </div>
        <div className="col-span-1 text-right font-mono text-sm text-cream-100">
          ${total.toFixed(2)}
        </div>
        <div className="col-span-2 text-right">
          <StatusPill status={order.status} />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-ink-500/40">
          <div className="rounded-lg border border-cream-100/5 bg-ink-300/40 divide-y divide-cream-100/5">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 text-sm">
                <div>
                  <span className="text-cream-100">{it.name}</span>
                  <span className="ml-2 text-cream-100/50 font-mono text-xs">×{it.qty}</span>
                </div>
                <div className="font-mono text-cream-100/80">${(it.price * it.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 justify-end">
            <button className="rounded-full border border-cream-100/15 px-3 py-1.5 text-xs text-cream-100/70 hover:text-cream-100 hover:border-cream-100/40 transition">
              Print ticket
            </button>
            <button className="rounded-full border border-cream-100/15 px-3 py-1.5 text-xs text-cream-100/70 hover:text-cream-100 hover:border-cream-100/40 transition">
              Refund
            </button>
            <button className="rounded-full bg-gold-400 px-3 py-1.5 text-xs text-ink-500 font-semibold hover:bg-gold-300 transition">
              Advance status →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: Order['status'] }) {
  const map: Record<Order['status'], string> = {
    New: 'bg-blue-500/15 text-blue-300 border-blue-400/30',
    Preparing: 'bg-gold-400/15 text-gold-300 border-gold-400/30',
    Ready: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    'Out for delivery': 'bg-purple-500/15 text-purple-300 border-purple-400/30',
    Completed: 'bg-cream-100/5 text-cream-100/50 border-cream-100/10',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] ${map[status]}`}
    >
      {status !== 'Completed' && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {status}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────
// MENU
// ──────────────────────────────────────────────────────────────────────

function MenuView({ scope }: { scope: Scope }) {
  const visible = scope === 'all' ? restaurants : restaurants.filter((r) => r.slug === scope);
  const [activeSlug, setActiveSlug] = useState<string>(
    scope === 'all' ? restaurants[0].slug : scope
  );
  const current = restaurants.find((r) => r.slug === activeSlug) ?? restaurants[0];

  return (
    <div className="space-y-5">
      <KpiRow
        items={[
          { label: 'Active items', value: visible.reduce((s, r) => s + r.menuHighlights.length, 0), hint: 'Highlights only' },
          { label: 'Avg price', value: '$26.40', hint: 'Across portfolio' },
          { label: 'Out of stock', value: 3, hint: 'Flagged by FOH' },
          { label: '86\'d today', value: 1, hint: 'Walleye · Gas House' },
        ]}
      />

      {scope === 'all' && (
        <div className="flex flex-wrap gap-2">
          {restaurants.map((r) => (
            <button
              key={r.slug}
              onClick={() => setActiveSlug(r.slug)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                activeSlug === r.slug
                  ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                  : 'border-cream-100/15 text-cream-100/70 hover:border-cream-100/40 hover:text-cream-100'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.accent }} />
              {r.shortName}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-cream-100/10 bg-ink-400/60">
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100/10">
          <div>
            <div className="font-display text-lg text-cream-100">{current.name} — Highlights</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50 mt-0.5">
              {current.menuHighlights.length} items · last published 4 days ago
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border border-cream-100/15 px-3 py-1.5 text-xs hover:border-cream-100/40 transition">
              Reorder
            </button>
            <button className="rounded-full bg-gold-400 px-3 py-1.5 text-xs text-ink-500 font-semibold hover:bg-gold-300 transition">
              + Add item
            </button>
          </div>
        </div>
        <div className="divide-y divide-cream-100/5">
          {current.menuHighlights.map((m, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-cream-100/5 transition">
              <div className="col-span-7">
                <div className="text-cream-100 text-sm font-medium">{m.name}</div>
                <div className="text-cream-100/60 text-xs mt-0.5 line-clamp-1">{m.description}</div>
              </div>
              <div className="col-span-2 text-xs">
                {m.tag ? (
                  <span className="rounded-full border border-gold-400/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-gold-400">
                    {m.tag}
                  </span>
                ) : (
                  <span className="text-cream-100/40 text-[10px] font-mono uppercase">—</span>
                )}
              </div>
              <div className="col-span-1 text-right font-mono text-sm text-cream-100">
                ${m.price}
              </div>
              <div className="col-span-2 text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300/80">
                  ● Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// ANALYTICS
// ──────────────────────────────────────────────────────────────────────

function AnalyticsView({ scope }: { scope: Scope }) {
  const weekTotal = dailyRevenue.reduce((s, d) => s + d.value, 0);
  const max = Math.max(...dailyRevenue.map((d) => d.value));
  const topItems = [
    { name: 'Bone-In Ribeye 16oz', restaurant: 'the-gas-house', units: 184, revenue: 9936 },
    { name: 'Hollywood Cheeseburger', restaurant: 'halls-hollywood', units: 412, revenue: 6592 },
    { name: 'Factory Pan Pizza · 14"', restaurant: 'the-factory', units: 256, revenue: 5632 },
    { name: 'Filet & Lobster Combo', restaurant: 'takaoka-of-japan', units: 98, revenue: 4704 },
    { name: 'Old Fashioned', restaurant: 'the-tavern', units: 320, revenue: 4160 },
  ];

  return (
    <div className="space-y-5">
      <KpiRow
        items={[
          { label: 'Revenue · 7d', value: `$${(weekTotal / 1000).toFixed(1)}k`, hint: '+12.4% vs. last week' },
          { label: 'Tickets', value: 1842, hint: 'Avg $77 / ticket' },
          { label: 'Repeat rate', value: '41%', hint: '90-day window' },
          { label: 'Booking conv.', value: '68%', hint: 'Web → seated' },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-cream-100/10 bg-ink-400/60 p-5">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="font-display text-lg text-cream-100">Daily revenue</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50 mt-0.5">
                Last 7 days · {scope === 'all' ? 'aggregated' : restaurants.find((r) => r.slug === scope)?.shortName}
              </div>
            </div>
            <div className="font-mono text-sm text-cream-100/70">
              ${weekTotal.toLocaleString()}
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {dailyRevenue.map((d) => {
              const h = (d.value / max) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-[10px] font-mono text-cream-100/50">
                    ${(d.value / 1000).toFixed(1)}k
                  </div>
                  <div className="w-full flex-1 flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full rounded-t-md bg-gradient-to-t from-ember-600 to-gold-400"
                    />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cream-100/50">
                    {d.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-5">
          <div className="font-display text-lg text-cream-100">Channel mix</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50 mt-0.5">
            How orders arrived · 7d
          </div>
          <div className="mt-5 space-y-3">
            {[
              { label: 'Dine-in', pct: 54, color: '#D4A24C' },
              { label: 'Online · web', pct: 22, color: '#7B0F1A' },
              { label: 'Phone', pct: 14, color: '#22A6B3' },
              { label: 'Delivery apps', pct: 10, color: '#C77B49' },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-cream-100/80">{r.label}</span>
                  <span className="font-mono text-cream-100/60">{r.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-cream-100/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ background: r.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-cream-100/10 bg-ink-400/60">
        <div className="px-5 py-4 border-b border-cream-100/10">
          <div className="font-display text-lg text-cream-100">Top sellers · 7d</div>
        </div>
        <div className="divide-y divide-cream-100/5">
          {topItems.map((item, i) => {
            const r = restaurants.find((x) => x.slug === item.restaurant);
            return (
              <div key={i} className="grid grid-cols-12 gap-3 px-5 py-3 items-center">
                <div className="col-span-1 font-mono text-cream-100/50 text-sm">#{i + 1}</div>
                <div className="col-span-5 text-sm text-cream-100">{item.name}</div>
                <div className="col-span-3 flex items-center gap-2 text-xs text-cream-100/60">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: r?.accent }} />
                  {r?.shortName}
                </div>
                <div className="col-span-1 text-right font-mono text-xs text-cream-100/70">{item.units}</div>
                <div className="col-span-2 text-right font-mono text-sm text-gold-400">
                  ${item.revenue.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// ACCOUNTING
// ──────────────────────────────────────────────────────────────────────

function AccountingView({ scope }: { scope: Scope }) {
  const rows = [
    { label: 'Food & beverage', value: 412480, pct: 64 },
    { label: 'Labor', value: 184230, pct: 29 },
    { label: 'Occupancy', value: 38500, pct: 6 },
    { label: 'Marketing', value: 6210, pct: 1 },
  ];
  const revenue = 824960;
  const expenses = rows.reduce((s, r) => s + r.value, 0);
  const profit = revenue - expenses;

  return (
    <div className="space-y-5">
      <KpiRow
        items={[
          { label: 'Revenue · MTD', value: `$${(revenue / 1000).toFixed(0)}k`, hint: '+8.2% YoY' },
          { label: 'Expenses', value: `$${(expenses / 1000).toFixed(0)}k`, hint: '74.5% of rev' },
          { label: 'Net profit', value: `$${(profit / 1000).toFixed(0)}k`, hint: 'Margin 25.5%' },
          { label: 'Cash on hand', value: '$248k', hint: 'Operating account' },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-5">
          <div className="font-display text-lg text-cream-100">Expense breakdown</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50 mt-0.5">
            Month-to-date · {scope === 'all' ? 'all locations' : restaurants.find((r) => r.slug === scope)?.shortName}
          </div>
          <div className="mt-5 space-y-4">
            {rows.map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-cream-100">{r.label}</span>
                  <span className="font-mono text-cream-100/70">
                    ${r.value.toLocaleString()} <span className="text-cream-100/40 text-xs">({r.pct}%)</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-cream-100/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-ember-600 to-gold-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-lg text-cream-100">Recent transactions</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50 mt-0.5">
                Last 5 days
              </div>
            </div>
            <button className="rounded-full border border-cream-100/15 px-3 py-1.5 text-xs hover:border-cream-100/40 transition">
              Export CSV
            </button>
          </div>
          <div className="mt-4 divide-y divide-cream-100/5">
            {[
              { date: 'May 10', desc: 'Sysco · weekly produce', cat: 'F&B', amount: -8420 },
              { date: 'May 10', desc: 'Payroll batch · biweekly', cat: 'Labor', amount: -52180 },
              { date: 'May 9', desc: 'Indiana ABC · liquor', cat: 'F&B', amount: -3640 },
              { date: 'May 9', desc: 'Daily settlement · all locations', cat: 'Revenue', amount: 41280 },
              { date: 'May 8', desc: 'Frontier · internet', cat: 'Utilities', amount: -890 },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                <div className="flex-1 min-w-0">
                  <div className="text-cream-100 truncate">{t.desc}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cream-100/50">
                    {t.date} · {t.cat}
                  </div>
                </div>
                <div className={`font-mono ${t.amount > 0 ? 'text-emerald-300' : 'text-cream-100/70'}`}>
                  {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// EVENTS
// ──────────────────────────────────────────────────────────────────────

function EventsView({ scope }: { scope: Scope }) {
  const visible = scope === 'all' ? events : events.filter((e) => e.restaurant === scope);

  return (
    <div className="space-y-5">
      <KpiRow
        items={[
          { label: 'Upcoming · 30d', value: visible.length, hint: 'Private + corporate' },
          { label: 'Guests booked', value: visible.reduce((s, e) => s + e.guests, 0), hint: 'Confirmed seats' },
          { label: 'Revenue forecast', value: '$58.4k', hint: 'Pre-deposits' },
          { label: 'Inquiries open', value: 7, hint: 'Awaiting response' },
        ]}
      />

      <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-cream-100/10 text-[10px] font-mono uppercase tracking-[0.2em] text-cream-100/50">
          <div className="col-span-2">Date</div>
          <div className="col-span-4">Event</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-1 text-right">Guests</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        {visible.map((e) => {
          const r = restaurants.find((x) => x.slug === e.restaurant);
          return (
            <div key={e.id} className="grid grid-cols-12 gap-3 px-5 py-3 items-center border-t border-cream-100/5 first:border-0 hover:bg-cream-100/5 transition">
              <div className="col-span-2">
                <div className="text-sm text-cream-100">{e.date}</div>
                <div className="text-[10px] text-cream-100/50">{e.time}</div>
              </div>
              <div className="col-span-4">
                <div className="text-sm text-cream-100">{e.name}</div>
              </div>
              <div className="col-span-2 text-xs text-cream-100/70">{e.type}</div>
              <div className="col-span-2 flex items-center gap-2 text-xs text-cream-100/70 min-w-0">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: r?.accent }} />
                <span className="truncate">{r?.shortName}</span>
              </div>
              <div className="col-span-1 text-right font-mono text-sm text-cream-100">{e.guests}</div>
              <div className="col-span-1 text-right">
                <span
                  className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${
                    e.status === 'Confirmed'
                      ? 'border-emerald-400/30 text-emerald-300'
                      : e.status === 'Deposit Paid'
                      ? 'border-gold-400/30 text-gold-400'
                      : 'border-cream-100/15 text-cream-100/60'
                  }`}
                >
                  {e.status}
                </span>
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-cream-100/50">
            No upcoming events at this location.
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// STAFF
// ──────────────────────────────────────────────────────────────────────

function StaffView({ scope }: { scope: Scope }) {
  const visible = scope === 'all' ? staff : staff.filter((s) => s.restaurant === scope);
  const onShift = visible.filter((s) => s.status === 'on').length;
  const onBreak = visible.filter((s) => s.status === 'break').length;

  return (
    <div className="space-y-5">
      <KpiRow
        items={[
          { label: 'Total roster', value: visible.length, hint: scope === 'all' ? 'Across portfolio' : 'This location' },
          { label: 'On shift', value: onShift, hint: 'Currently working' },
          { label: 'On break', value: onBreak, hint: 'Coverage OK' },
          { label: 'Avg tenure', value: `${(visible.reduce((s, x) => s + x.yearsWith, 0) / Math.max(visible.length, 1)).toFixed(1)} yrs`, hint: 'Long-time crew' },
        ]}
      />

      <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-100/10">
          <div className="font-display text-lg text-cream-100">Team</div>
          <div className="flex gap-2">
            <button className="rounded-full border border-cream-100/15 px-3 py-1.5 text-xs hover:border-cream-100/40 transition">
              Schedules
            </button>
            <button className="rounded-full bg-gold-400 px-3 py-1.5 text-xs text-ink-500 font-semibold hover:bg-gold-300 transition">
              + Add staff
            </button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-cream-100/10 text-[10px] font-mono uppercase tracking-[0.2em] text-cream-100/50">
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-3">Location</div>
          <div className="col-span-2">Shift today</div>
          <div className="col-span-1 text-right">Tenure</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        {visible.map((s) => {
          const r = restaurants.find((x) => x.slug === s.restaurant);
          const initials = s.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2);
          return (
            <div
              key={s.id}
              className="grid grid-cols-12 gap-3 px-5 py-3 items-center border-t border-cream-100/5 first:border-0 hover:bg-cream-100/5 transition"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-full grid place-items-center text-xs font-semibold text-ink-500"
                  style={{ background: r?.accent ?? '#D4A24C' }}
                >
                  {initials}
                </div>
                <div className="text-sm text-cream-100">{s.name}</div>
              </div>
              <div className="col-span-2 text-xs text-cream-100/70">{s.role}</div>
              <div className="col-span-3 flex items-center gap-2 text-xs text-cream-100/70 min-w-0">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: r?.accent }} />
                <span className="truncate">{r?.shortName}</span>
              </div>
              <div className="col-span-2 text-xs font-mono text-cream-100/60">{s.shift}</div>
              <div className="col-span-1 text-right text-xs font-mono text-cream-100/60">{s.yearsWith}y</div>
              <div className="col-span-1 text-right">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${
                    s.status === 'on'
                      ? 'text-emerald-300'
                      : s.status === 'break'
                      ? 'text-gold-400'
                      : 'text-cream-100/40'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {s.status === 'on' ? 'On' : s.status === 'break' ? 'Break' : 'Off'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────────────────────────────

function SettingsView({ scope, setScope }: { scope: Scope; setScope: (s: Scope) => void }) {
  if (scope === 'all') {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-6">
          <div className="font-display text-lg text-cream-100">Corporation · HQ</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50 mt-0.5">
            Don Hall's Restaurants · Fort Wayne, Indiana · Est. 1946
          </div>
          <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              { k: 'Legal name', v: 'Don Hall\'s Restaurants, Inc.' },
              { k: 'EIN', v: '••-•••7411' },
              { k: 'HQ address', v: '305 E Superior St · Fort Wayne, IN 46802' },
              { k: 'Owners', v: 'Hall family (3rd generation)' },
              { k: 'Locations', v: `${restaurants.length} restaurants` },
              { k: 'Employees', v: '~420 across portfolio' },
              { k: 'POS', v: 'Toast · multi-location' },
              { k: 'Accounting', v: 'QuickBooks Enterprise' },
            ].map((r) => (
              <div key={r.k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50">{r.k}</dt>
                <dd className="text-sm text-cream-100 mt-1">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-6">
          <div className="font-display text-lg text-cream-100">Quick settings · per location</div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {restaurants.map((r) => (
              <button
                key={r.slug}
                onClick={() => setScope(r.slug)}
                className="flex items-center gap-3 rounded-lg border border-cream-100/10 bg-ink-300/40 px-4 py-3 text-left hover:border-cream-100/30 transition"
              >
                <span
                  className="h-9 w-9 rounded-md grid place-items-center text-sm font-semibold text-ink-500"
                  style={{ background: r.accent }}
                >
                  {r.shortName.charAt(0)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-cream-100 truncate">{r.name}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cream-100/50 truncate">
                    {r.cuisine.split('·')[0].trim()} · {r.priceTier === 3 ? '$$$' : r.priceTier === 2 ? '$$' : '$'}
                  </div>
                </div>
                <span className="text-cream-100/40 text-xs">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const r = restaurants.find((x) => x.slug === scope);
  if (!r) return null;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="h-9 w-9 rounded-md grid place-items-center text-sm font-semibold text-ink-500"
                style={{ background: r.accent }}
              >
                {r.shortName.charAt(0)}
              </span>
              <div>
                <div className="font-display text-xl text-cream-100">{r.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50 mt-0.5">
                  {r.cuisine}
                </div>
              </div>
            </div>
          </div>
          <button className="rounded-full bg-gold-400 px-4 py-1.5 text-xs text-ink-500 font-semibold hover:bg-gold-300 transition">
            Edit details
          </button>
        </div>

        <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <Row k="Address" v={`${r.address}, ${r.city}`} />
          <Row k="Phone" v={r.phone ?? '—'} />
          <Row k="Email" v={r.email ?? '—'} />
          <Row k="Status" v={r.status ?? 'Open'} />
          <Row k="Founded" v={r.founded ? `${r.founded}` : '—'} />
          <Row k="Price tier" v={'$'.repeat(r.priceTier)} />
        </dl>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-6">
          <div className="font-display text-lg text-cream-100">Hours</div>
          <div className="mt-4 divide-y divide-cream-100/5">
            {r.hours.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-cream-100">{h.label}</span>
                <span className="font-mono text-cream-100/70">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-6">
          <div className="font-display text-lg text-cream-100">Features & vibe</div>
          <div className="mt-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50">Features</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {r.features.map((f) => (
                <span key={f} className="rounded-full border border-cream-100/15 px-2.5 py-1 text-xs text-cream-100/80">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50">Vibe</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {r.vibe.map((v) => (
                <span key={v} className="rounded-full px-2.5 py-1 text-xs" style={{ background: `${r.accent}22`, color: r.accent }}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50">{k}</dt>
      <dd className="text-sm text-cream-100 mt-1">{v}</dd>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// SHARED
// ──────────────────────────────────────────────────────────────────────

function KpiRow({
  items,
}: {
  items: { label: string; value: string | number; hint: string }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          className="rounded-xl border border-cream-100/10 bg-ink-400/60 p-4"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-100/50">
            {k.label}
          </div>
          <div className="mt-2 font-display text-2xl lg:text-3xl text-cream-100 leading-none">
            {k.value}
          </div>
          <div className="mt-2 text-[11px] text-cream-100/55">{k.hint}</div>
        </motion.div>
      ))}
    </div>
  );
}
