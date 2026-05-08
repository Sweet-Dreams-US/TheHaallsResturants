import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MenuItem } from '../data/menus';
import { useCart } from '../lib/cart';

type Props = {
  item: MenuItem;
  restaurantSlug: string;
  restaurantName: string;
  accent: string;
  /** Disable add-to-cart (e.g. for refurbishing restaurants) */
  disabled?: boolean;
  variant?: 'list' | 'card';
};

export default function MenuItemRow({
  item,
  restaurantSlug,
  restaurantName,
  accent,
  disabled,
  variant = 'list',
}: Props) {
  const { add, state } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [selectedTier, setSelectedTier] = useState(0);

  const inCart = state.items.find((i) => i.id === item.id);
  const tier = item.priceTiers?.[selectedTier];
  const price = tier?.price ?? item.price ?? 0;
  const displayId = tier ? `${item.id}__${tier.label}` : item.id;
  const displayName = tier ? `${item.name} (${tier.label})` : item.name;

  const handleAdd = () => {
    add({
      id: displayId,
      restaurantSlug,
      restaurantName,
      name: displayName,
      price,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1100);
  };

  const isCard = variant === 'card';

  return (
    <div
      className={
        isCard
          ? 'group rounded-xl border border-cream-100/10 bg-ink-300/40 p-5 hover:border-cream-100/30 transition'
          : // Mobile: stack vertically so price+Add land below description
            // (was getting clipped to the right of viewport on narrow screens).
            // sm+: revert to horizontal flex with right-aligned price/CTA.
            'group flex flex-col sm:flex-row sm:items-start sm:gap-4 py-5 border-b border-cream-100/10'
      }
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="font-display text-lg lg:text-xl text-cream-100 leading-tight">
            {item.name}
          </h3>
          {item.tags?.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${accent}aa`, color: accent }}
            >
              {t}
            </span>
          ))}
        </div>
        {item.description && (
          <p className="text-sm text-cream-100/65 mt-1.5 leading-relaxed">{item.description}</p>
        )}
        {item.priceTiers && item.priceTiers.length > 1 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {item.priceTiers.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setSelectedTier(i)}
                className={`font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border transition ${
                  selectedTier === i
                    ? 'border-cream-100 text-cream-100 bg-cream-100/5'
                    : 'border-cream-100/15 text-cream-100/55 hover:text-cream-100 hover:border-cream-100/35'
                }`}
                style={selectedTier === i ? { borderColor: accent, color: accent } : undefined}
              >
                {t.label} · ${t.price}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price + Add button.
          - Mobile: full-width row below the description, price left, button right.
          - sm+: right-aligned column matching original layout. */}
      <div className="flex items-center justify-between gap-3 mt-3 sm:mt-0 sm:flex-col sm:items-end sm:justify-start sm:text-right sm:shrink-0 sm:w-auto">
        {!item.priceTiers || item.priceTiers.length <= 1 ? (
          <div className="font-display text-xl lg:text-2xl text-gold-400">${price}</div>
        ) : (
          <div className="font-display text-xl text-gold-400">${price}</div>
        )}
        {!disabled && price > 0 && (
          <button
            onClick={handleAdd}
            className="relative rounded-full px-4 py-2 sm:py-1.5 text-xs font-mono uppercase tracking-wider transition border border-cream-100/20 hover:border-cream-100/60 text-cream-100/70 hover:text-cream-100 active:scale-95"
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="block"
                  style={{ color: accent }}
                >
                  ✓ Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="block"
                >
                  + Add{inCart ? ` (${inCart.qty})` : ''}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </div>
  );
}
