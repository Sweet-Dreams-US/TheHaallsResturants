import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../lib/cart';
import { restaurants } from '../data/restaurants';

const VISIBLE_MS = 3500;

/**
 * Floating cart confirmation toast in the bottom-right.
 *
 * Pops up when an item is added to the cart, shows the item name,
 * the running cart total, and a "View cart" CTA. Auto-dismisses
 * after a few seconds. Hidden entirely on the order/checkout flow
 * since the cart panel is already visible there.
 */
export default function CartToast() {
  const { lastAdd, count, total } = useCart();
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState<number | null>(null);
  const location = useLocation();

  // Don't show on the order page — the cart panel is already on screen there
  const onOrderPage = location.pathname.startsWith('/order');

  useEffect(() => {
    if (!lastAdd || lastAdd.tick === tick) return;
    setTick(lastAdd.tick);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(t);
  }, [lastAdd, tick]);

  const accent = lastAdd
    ? restaurants.find((r) => r.slug === lastAdd.item.restaurantSlug)?.accent ?? '#D4A24C'
    : '#D4A24C';
  const slug = lastAdd?.item.restaurantSlug;

  if (onOrderPage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[70] pointer-events-none">
      <AnimatePresence>
        {visible && lastAdd && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto"
          >
            <div
              className="flex items-center gap-4 rounded-2xl border border-cream-100/15 bg-ink-300/95 backdrop-blur-xl px-4 py-3 shadow-2xl"
              style={{
                boxShadow: `0 10px 30px -10px rgba(0,0,0,0.6), 0 0 0 1px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              <div
                className="h-10 w-10 rounded-full grid place-items-center text-lg shrink-0"
                style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
              >
                ✓
              </div>
              <div className="min-w-0 max-w-[260px]">
                <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-cream-100/55">
                  Added to cart
                </div>
                <div className="font-display text-base text-cream-100 truncate">
                  {lastAdd.item.name}
                </div>
                <div className="font-mono text-[10px] text-cream-100/55 mt-0.5">
                  {count} item{count === 1 ? '' : 's'} · ${total.toFixed(2)}
                </div>
              </div>
              <Link
                to={slug ? `/order/${slug}` : '/order'}
                className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-2 rounded-full border transition hover:bg-cream-100/5"
                style={{ borderColor: accent, color: accent }}
              >
                View cart →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
