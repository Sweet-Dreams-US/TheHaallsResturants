import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RestaurantMenu } from '../data/menus';
import MenuItemRow from './MenuItemRow';

type Props = {
  menu: RestaurantMenu;
  restaurantName: string;
  accent: string;
  /** When set, only render the first N items per section (used on the restaurant detail page) */
  truncatePerSection?: number;
  /** Hide add-to-cart buttons */
  disabled?: boolean;
  /** Show category nav (chips that scroll to sections) */
  showCategoryNav?: boolean;
};

export default function MenuRenderer({
  menu,
  restaurantName,
  accent,
  truncatePerSection,
  disabled,
  showCategoryNav,
}: Props) {
  const [activeSection, setActiveSection] = useState(menu.sections[0]?.title);

  const scrollToSection = (title: string) => {
    setActiveSection(title);
    const el = document.getElementById(`menu-section-${slugify(title)}`);
    if (el) {
      const headerOffset = 110;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {showCategoryNav && menu.sections.length > 1 && (
        <div className="sticky top-20 z-30 -mx-2 mb-8 px-2 py-3 bg-ink-300/85 backdrop-blur-xl border-y border-cream-100/10 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {menu.sections.map((s) => {
              const active = s.title === activeSection;
              return (
                <button
                  key={s.title}
                  onClick={() => scrollToSection(s.title)}
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] px-3.5 py-2 rounded-full border whitespace-nowrap transition ${
                    active
                      ? 'border-cream-100 text-cream-100 bg-cream-100/5'
                      : 'border-cream-100/15 text-cream-100/60 hover:text-cream-100 hover:border-cream-100/35'
                  }`}
                  style={active ? { borderColor: accent, color: accent } : undefined}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-12">
        {menu.sections.map((section, idx) => {
          const items = truncatePerSection
            ? section.items.slice(0, truncatePerSection)
            : section.items;
          return (
            <motion.section
              key={section.title}
              id={`menu-section-${slugify(section.title)}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
              className="scroll-mt-32"
            >
              <header className="mb-6">
                <h3
                  className="font-display text-3xl lg:text-4xl text-cream-100"
                  style={{ borderBottom: `1px solid ${accent}33`, paddingBottom: '0.5rem' }}
                >
                  {section.title}
                </h3>
                {section.subtitle && (
                  <div className="font-script text-xl mt-1.5" style={{ color: accent }}>
                    {section.subtitle}
                  </div>
                )}
                {section.note && (
                  <p className="text-sm text-cream-100/55 mt-2 max-w-3xl italic">{section.note}</p>
                )}
              </header>

              <div className="grid md:grid-cols-2 gap-x-10 gap-y-0">
                <AnimatePresence>
                  {items.map((item) => (
                    <MenuItemRow
                      key={item.id}
                      item={item}
                      restaurantSlug={menu.slug}
                      restaurantName={restaurantName}
                      accent={accent}
                      disabled={disabled}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {truncatePerSection && section.items.length > truncatePerSection && (
                <div className="mt-4 text-sm text-cream-100/50">
                  + {section.items.length - truncatePerSection} more on the full menu
                </div>
              )}
            </motion.section>
          );
        })}
      </div>

      {menu.source === 'pdf' && menu.pdfUrl && (
        <div className="mt-16 text-center">
          <a
            href={menu.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream-100/50 hover:text-cream-100"
          >
            View original PDF menu →
          </a>
        </div>
      )}
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
