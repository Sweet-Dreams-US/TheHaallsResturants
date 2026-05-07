import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurants } from '../data/restaurants';
import { useCart } from '../lib/cart';

const primary = [
  { to: '/', label: 'Home' },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/story', label: 'Our Story' },
  { to: '/specials', label: 'Specials' },
  { to: '/gift-cards', label: 'Gift Cards' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [restaurantsOpen, setRestaurantsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setRestaurantsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'backdrop-blur-xl bg-ink-300/80 border-b border-cream-100/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="group flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <div className="font-display text-xl tracking-tight text-cream-100">Don Hall's</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-gold-400/80">
                Est. 1946 · Fort Wayne
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {primary.map((item) => {
              if (item.to === '/restaurants') {
                return (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={() => setRestaurantsOpen(true)}
                    onMouseLeave={() => setRestaurantsOpen(false)}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium tracking-wide transition ${
                          isActive ? 'text-gold-400' : 'text-cream-100 hover:text-gold-400'
                        }`
                      }
                    >
                      {item.label}
                      <span className="ml-1 text-xs">▾</span>
                    </NavLink>
                    <AnimatePresence>
                      {restaurantsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 pt-3"
                        >
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1 min-w-[480px] rounded-2xl border border-cream-100/10 bg-ink-300/95 backdrop-blur-2xl p-4 shadow-2xl">
                            {restaurants.map((r) => (
                              <Link
                                key={r.slug}
                                to={`/restaurants/${r.slug}`}
                                className="group flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-cream-100/5"
                              >
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ background: r.accent }}
                                />
                                <div className="flex-1">
                                  <div className="font-display text-sm text-cream-100 group-hover:text-gold-400 transition">
                                    {r.name}
                                  </div>
                                  <div className="font-mono text-[10px] uppercase tracking-wider text-cream-100/40">
                                    {r.cuisine}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium tracking-wide transition ${
                      isActive ? 'text-gold-400' : 'text-cream-100 hover:text-gold-400'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/order"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-ember-600 px-5 py-2.5 text-sm font-semibold text-cream-100 transition hover:bg-ember-500 hover:scale-[1.02] active:scale-95"
            >
              Order Online
              {count > 0 && (
                <span className="ml-1 rounded-full bg-cream-100 px-2 py-0.5 text-xs font-bold text-ember-600">
                  {count}
                </span>
              )}
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2 text-cream-100"
            >
              <span className="block w-6 h-px bg-current mb-1.5" />
              <span className="block w-6 h-px bg-current mb-1.5" />
              <span className="block w-6 h-px bg-current" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-cream-100/10 bg-ink-300/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {primary.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-display text-2xl ${
                      isActive ? 'text-gold-400' : 'text-cream-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-cream-100/10 space-y-1">
                {restaurants.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/restaurants/${r.slug}`}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-cream-100/5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.accent }} />
                    <span className="text-sm text-cream-100">{r.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative h-11 w-11 grid place-items-center rounded-full border border-gold-400/40 bg-gradient-to-br from-ember-700 to-ember-900 group-hover:border-gold-400 transition">
      <span className="font-display italic font-bold text-gold-400 text-lg leading-none">H</span>
      <span className="absolute -inset-px rounded-full border border-gold-400/20 group-hover:animate-slow-spin" />
    </div>
  );
}
