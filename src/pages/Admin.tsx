import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { restaurants } from '../data/restaurants';
import { storyTimeline } from '../data/story';
import { useCart } from '../lib/cart';
import HeroImage from '../components/HeroImage';
import PageTransition from '../components/PageTransition';
import Reveal from '../components/Reveal';

type SectionKey = 'overview' | 'pages' | 'restaurants' | 'story' | 'cart' | 'system';

const sections: { key: SectionKey; label: string; hint: string }[] = [
  { key: 'overview', label: 'Overview', hint: 'Demo snapshot · health' },
  { key: 'pages', label: 'Pages', hint: 'Every route in the build' },
  { key: 'restaurants', label: 'Restaurants', hint: '10 concepts · menus' },
  { key: 'story', label: 'Story', hint: 'Timeline · milestones' },
  { key: 'cart', label: 'Cart', hint: 'Live order state' },
  { key: 'system', label: 'System', hint: 'Build · environment' },
];

const sitePages = [
  { to: '/', label: 'Home', blurb: 'Cinematic landing — hero, portfolio, story teaser, press, closer.' },
  { to: '/story', label: 'Our Story', blurb: 'The Hall family timeline from 1918 meat market to 2026.' },
  { to: '/restaurants', label: 'Restaurants', blurb: 'Editorial grid of all ten concepts in the portfolio.' },
  { to: '/order', label: 'Order Online', blurb: 'Cart-driven ordering flow with restaurant picker.' },
  { to: '/specials', label: 'Specials', blurb: 'Rotating seasonal events, holiday menus, weekly features.' },
  { to: '/gift-cards', label: 'Gift Cards', blurb: 'Branded gift card purchasing with multi-restaurant redemption.' },
  { to: '/jobs', label: 'Jobs', blurb: 'Open positions across all locations, with quick apply.' },
  { to: '/contact', label: 'Contact', blurb: 'Reservations, private events, press inquiries.' },
];

export default function Admin() {
  const [active, setActive] = useState<SectionKey>('overview');
  const { state, total, count, clear } = useCart();

  const stats = useMemo(() => {
    const items = restaurants.flatMap((r) => r.menuHighlights);
    const avg = items.reduce((s, i) => s + i.price, 0) / Math.max(items.length, 1);
    const max = items.reduce((m, i) => Math.max(m, i.price), 0);
    const open = restaurants.filter((r) => !r.status || r.status === 'open').length;
    return {
      restaurantCount: restaurants.length,
      openCount: open,
      seasonalCount: restaurants.filter((r) => r.status === 'seasonal').length,
      refurbishingCount: restaurants.filter((r) => r.status === 'refurbishing').length,
      timelineCount: storyTimeline.length,
      pageCount: sitePages.length,
      menuItems: items.length,
      avgPrice: avg,
      maxPrice: max,
    };
  }, []);

  return (
    <PageTransition>
      <section className="relative pt-32 lg:pt-36 pb-16">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
                Internal · Demo Console
              </div>
              <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] tracking-tight text-cream-100 mt-3">
                Don Hall's <span className="italic font-normal text-gold-400">Admin Panel</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-cream-100/70">
                A read-only walkthrough of every page, restaurant, and data
                source powering this demo. Use the tabs below to navigate the
                build — every link opens the live site.
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <PillStatus dot="#22C55E" label="Demo · Live" />
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream-100/40">
                Build · v1.0 · Static
              </div>
            </div>
          </div>

          <nav className="mt-10 flex flex-wrap gap-2">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`group rounded-full border px-4 py-2 text-sm transition ${
                  active === s.key
                    ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                    : 'border-cream-100/15 text-cream-100/80 hover:border-cream-100/40 hover:text-cream-100'
                }`}
              >
                <span className="font-medium">{s.label}</span>
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                  {s.hint}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          {active === 'overview' && <Overview stats={stats} cartCount={count} cartTotal={total} />}
          {active === 'pages' && <Pages />}
          {active === 'restaurants' && <RestaurantsTab />}
          {active === 'story' && <StoryTab />}
          {active === 'cart' && (
            <CartTab state={state} total={total} count={count} clear={clear} />
          )}
          {active === 'system' && <SystemTab />}
        </div>
      </section>
    </PageTransition>
  );
}

function PillStatus({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cream-100/15 bg-ink-300/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-cream-100/80">
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: dot }}
      />
      {label}
    </span>
  );
}

type StatGridStats = {
  restaurantCount: number;
  openCount: number;
  seasonalCount: number;
  refurbishingCount: number;
  timelineCount: number;
  pageCount: number;
  menuItems: number;
  avgPrice: number;
  maxPrice: number;
};

function Overview({
  stats,
  cartCount,
  cartTotal,
}: {
  stats: StatGridStats;
  cartCount: number;
  cartTotal: number;
}) {
  const tiles = [
    { label: 'Restaurants', value: stats.restaurantCount, sub: `${stats.openCount} open · ${stats.seasonalCount} seasonal · ${stats.refurbishingCount} reopening` },
    { label: 'Pages Routed', value: stats.pageCount, sub: 'React Router · static SSG-ready' },
    { label: 'Menu Highlights', value: stats.menuItems, sub: `Avg $${stats.avgPrice.toFixed(2)} · Top $${stats.maxPrice}` },
    { label: 'Story Milestones', value: stats.timelineCount, sub: '1918 → present' },
    { label: 'Cart Items', value: cartCount, sub: cartCount ? `$${cartTotal.toFixed(2)} pending` : 'Empty' },
    { label: 'Brand Years', value: 80, sub: 'Since 1946 · three generations' },
  ];

  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map((t, i) => (
        <Reveal key={t.label} delay={Math.min(i * 0.04, 0.2)}>
          <div className="relative h-full rounded-2xl border border-cream-100/10 bg-ink-300/60 p-6 transition hover:border-cream-100/25">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400/80">
              {t.label}
            </div>
            <div className="mt-3 font-display text-5xl leading-none text-cream-100">
              {t.value}
            </div>
            <div className="mt-3 text-sm text-cream-100/60">{t.sub}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Pages() {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {sitePages.map((p, i) => (
        <Reveal key={p.to} delay={Math.min(i * 0.04, 0.2)}>
          <Link
            to={p.to}
            className="group block h-full rounded-2xl border border-cream-100/10 bg-ink-300/60 p-6 transition hover:border-gold-400/40 hover:bg-ink-300/80"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400/80">
                Route
              </div>
              <span className="font-mono text-[10px] text-cream-100/40 group-hover:text-gold-400 transition">
                {p.to}
              </span>
            </div>
            <div className="mt-3 font-display text-3xl text-cream-100 group-hover:text-gold-400 transition">
              {p.label}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cream-100/65">{p.blurb}</p>
            <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-cream-100/50 group-hover:text-gold-400 transition">
              Open page →
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

function RestaurantsTab() {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {restaurants.map((r, i) => (
        <Reveal key={r.slug} delay={Math.min(i * 0.03, 0.2)}>
          <div className="group relative flex h-full overflow-hidden rounded-2xl border border-cream-100/10 bg-ink-300/60">
            <div className="relative w-40 shrink-0 overflow-hidden">
              <HeroImage slug={r.slug} fallbackAccent={r.accent} alt={r.name} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-300/60" />
            </div>
            <div className="flex-1 p-5">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.24em]"
                  style={{ color: r.accent }}
                >
                  {r.cuisine.split('·')[0].trim()}
                </span>
                <StatusBadge status={r.status} />
              </div>
              <div className="mt-2 font-display text-2xl text-cream-100">{r.name}</div>
              <div className="mt-1 text-xs font-mono uppercase tracking-wider text-cream-100/50">
                {r.address}
              </div>
              <p className="mt-3 text-sm text-cream-100/70 line-clamp-2">{r.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to={`/restaurants/${r.slug}`}
                  className="rounded-full border border-cream-100/15 px-3 py-1 text-xs text-cream-100/80 hover:border-gold-400 hover:text-gold-400 transition"
                >
                  View page
                </Link>
                <Link
                  to={`/order/${r.slug}`}
                  className="rounded-full border border-cream-100/15 px-3 py-1 text-xs text-cream-100/80 hover:border-gold-400 hover:text-gold-400 transition"
                >
                  Order menu
                </Link>
                <span className="rounded-full border border-cream-100/10 px-3 py-1 text-xs text-cream-100/50">
                  {r.menuHighlights.length} highlights
                </span>
                <span className="rounded-full border border-cream-100/10 px-3 py-1 text-xs text-cream-100/50">
                  {'$'.repeat(r.priceTier)}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status?: 'open' | 'seasonal' | 'refurbishing' }) {
  if (status === 'seasonal') {
    return (
      <span className="rounded-full border border-cream-100/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-cream-100/70">
        Seasonal
      </span>
    );
  }
  if (status === 'refurbishing') {
    return (
      <span className="rounded-full border border-gold-400/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-400/80">
        Reopening 2026
      </span>
    );
  }
  return (
    <span className="rounded-full border border-emerald-500/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300/80">
      Open
    </span>
  );
}

function StoryTab() {
  return (
    <div className="space-y-3">
      {storyTimeline.map((m, i) => (
        <Reveal key={m.year} delay={Math.min(i * 0.025, 0.2)}>
          <div className="flex items-start gap-5 rounded-2xl border border-cream-100/10 bg-ink-300/60 p-5">
            <div className="shrink-0 text-center w-20">
              <div className="font-display text-3xl text-gold-400">{m.year}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream-100/40 mt-1">
                {m.decade}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-display text-lg text-cream-100">{m.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-100/70 line-clamp-3">
                {m.body}
              </p>
              {m.linkSlug && (
                <Link
                  to={`/restaurants/${m.linkSlug}`}
                  className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.24em] text-gold-400/80 hover:text-gold-400"
                >
                  Linked: {m.linkSlug} →
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CartTab({
  state,
  total,
  count,
  clear,
}: {
  state: { items: { id: string; name: string; price: number; qty: number; restaurantName: string }[]; restaurantSlug: string | null };
  total: number;
  count: number;
  clear: () => void;
}) {
  if (count === 0) {
    return (
      <div className="rounded-2xl border border-cream-100/10 bg-ink-300/60 p-12 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
          Cart Empty
        </div>
        <p className="mt-4 text-cream-100/60">
          No active items. Add a menu item from any restaurant to see it appear here in real time.
        </p>
        <Link to="/order" className="btn-primary mt-6 inline-flex">
          Open order flow →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cream-100/10 bg-ink-300/60 p-6">
      <div className="flex items-center justify-between border-b border-cream-100/10 pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400/80">
            Active Cart
          </div>
          <div className="mt-1 font-display text-2xl text-cream-100">
            {count} item{count === 1 ? '' : 's'} · ${total.toFixed(2)}
          </div>
          {state.restaurantSlug && (
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-cream-100/50">
              Restaurant: {state.restaurantSlug}
            </div>
          )}
        </div>
        <button
          onClick={clear}
          className="rounded-full border border-cream-100/15 px-4 py-2 text-xs text-cream-100/70 hover:border-ember-500 hover:text-ember-300 transition"
        >
          Clear cart
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {state.items.map((i) => (
          <div
            key={i.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-cream-100/5 bg-ink-300/40 px-4 py-3"
          >
            <div className="flex-1">
              <div className="text-sm text-cream-100">{i.name}</div>
              <div className="text-xs text-cream-100/50">{i.restaurantName}</div>
            </div>
            <div className="font-mono text-xs text-cream-100/70">×{i.qty}</div>
            <div className="font-mono text-sm text-gold-400 w-20 text-right">
              ${(i.price * i.qty).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemTab() {
  const rows: { k: string; v: string }[] = [
    { k: 'Framework', v: 'React 18 · Vite · TypeScript' },
    { k: 'Styling', v: 'Tailwind CSS · Custom heritage palette' },
    { k: 'Animation', v: 'Framer Motion · scroll-linked + reveal' },
    { k: 'Routing', v: 'React Router v6 · 9 public routes + /admin' },
    { k: 'State', v: 'Cart context · localStorage persisted' },
    { k: 'Data Source', v: 'Static TS modules · menus from real PDFs' },
    { k: 'Hosting', v: 'GitHub Pages (sweet-dreams-us.github.io)' },
    { k: 'Brand Era', v: '1946 — present · 80 years' },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-cream-100/10 bg-ink-300/60 p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400/80">
          Stack
        </div>
        <dl className="mt-4 divide-y divide-cream-100/5">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-6 py-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream-100/50 shrink-0">
                {r.k}
              </dt>
              <dd className="text-right text-sm text-cream-100">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-2xl border border-cream-100/10 bg-ink-300/60 p-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400/80">
          Demo Notes
        </div>
        <ul className="mt-4 space-y-3 text-sm text-cream-100/75">
          <li className="flex gap-3">
            <span className="text-gold-400 shrink-0">·</span>
            <span>
              This admin panel is a demo console — every link below opens the
              live public site so you can preview each route end-to-end.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold-400 shrink-0">·</span>
            <span>
              All restaurant, menu, and timeline content lives in
              <code className="ml-1 font-mono text-xs text-cream-100/90">src/data/</code>
              and is fully editable without a CMS.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold-400 shrink-0">·</span>
            <span>
              Cart state persists to <code className="font-mono text-xs text-cream-100/90">localStorage</code> under
              <code className="ml-1 font-mono text-xs text-cream-100/90">donhalls.cart.v1</code> and stays in sync with the public order flow.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-gold-400 shrink-0">·</span>
            <span>
              Production deploy is a static export — drop the
              <code className="mx-1 font-mono text-xs text-cream-100/90">dist/</code> folder
              behind any CDN, no backend required.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
