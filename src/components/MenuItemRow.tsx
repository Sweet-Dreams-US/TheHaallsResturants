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

/**
 * Splits a comma-separated description into an ingredients array.
 *
 * Most menu descriptions on this site are already comma-delimited ingredient
 * lists with prose connectors:
 *   "Andouille-corn hash, jalapeño tartar"
 *   "Bleu, candied pecans, tomato, red onion, dried cherries, ..."
 * So splitting on commas gives a clean ingredients view for free, no manual
 * data entry. Items where the description is more sentence-like ("Slow-roasted
 * USDA Choice. Served with au jus.") will produce 1-2 entries which we render
 * as a single body paragraph instead.
 */
function deriveIngredients(item: MenuItem): string[] {
  if (item.ingredients?.length) return item.ingredients;
  if (!item.description) return [];
  const parts = item.description
    .split(/,(?![^()]*\))/) // split on commas not inside parens
    .map((p) => p.trim())
    .filter(Boolean);
  return parts;
}

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
  const [expanded, setExpanded] = useState(false);

  const inCart = state.items.find((i) => i.id === item.id);
  const tier = item.priceTiers?.[selectedTier];
  const price = tier?.price ?? item.price ?? 0;
  const displayId = tier ? `${item.id}__${tier.label}` : item.id;
  const displayName = tier ? `${item.name} (${tier.label})` : item.name;
  const ingredients = deriveIngredients(item);
  // Show "ingredients list" view only when description was a comma-separated
  // list (3+ items). Otherwise descriptions read as prose and look better
  // as a paragraph.
  const useIngredientsList = ingredients.length >= 3;

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
          : 'group flex flex-col sm:flex-row sm:items-start sm:gap-4 py-5 border-b border-cream-100/10'
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

      {/* Price + Add button (and the expander toggle).
          Mobile: full-width row below the description.
          sm+: right-aligned column. */}
      <div className="flex items-center justify-between gap-3 mt-3 sm:mt-0 sm:flex-col sm:items-end sm:justify-start sm:text-right sm:shrink-0 sm:w-auto">
        <div className="font-display text-xl lg:text-2xl text-gold-400">${price}</div>
        <div className="flex items-center gap-2">
          {/* Disclosure toggle — chevron rotates 180° when expanded */}
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Hide details' : 'Show details'}
            className="h-8 w-8 grid place-items-center rounded-full border border-cream-100/15 text-cream-100/55 hover:text-cream-100 hover:border-cream-100/40 transition"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

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

      {/* Expanded details: photo + ingredients list, full-width below the row.
          Animates height + opacity in/out. The img has loading="lazy" so
          unexpanded items don't fetch their photos — important for menus
          with 50+ items. */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="basis-full overflow-hidden"
          >
            <div className="pt-4 pb-2 grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-5">
              {/* Photo (or graceful placeholder if not yet generated) */}
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ink-300/60 border border-cream-100/10"
                style={{ background: item.image ? undefined : `linear-gradient(135deg, ${accent}22, ${accent}05)` }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <div
                      className="font-display italic text-3xl"
                      style={{ color: accent }}
                    >
                      {item.name.split(' ')[0]}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-cream-100/40">
                      Photo coming soon
                    </div>
                  </div>
                )}
              </div>

              {/* Ingredients / details */}
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/55 mb-2">
                  {useIngredientsList ? 'Ingredients' : 'About'}
                </div>
                {useIngredientsList ? (
                  <ul className="space-y-1.5">
                    {ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-cream-100/85"
                      >
                        <span
                          className="mt-2 h-1 w-1 rounded-full shrink-0"
                          style={{ background: accent }}
                        />
                        <span className="capitalize first-letter:uppercase">
                          {ing.replace(/^a /i, '').replace(/^an /i, '')}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-cream-100/85 leading-relaxed">
                    {item.description ?? 'A house specialty.'}
                  </p>
                )}

                {/* Bottom Add CTA inside the expanded view (so user doesn't
                    have to scroll back up after browsing the photo). */}
                {!disabled && price > 0 && (
                  <button
                    onClick={handleAdd}
                    className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider border transition active:scale-95"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <span>+ Add to cart</span>
                    <span className="opacity-60">·</span>
                    <span>${price}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
