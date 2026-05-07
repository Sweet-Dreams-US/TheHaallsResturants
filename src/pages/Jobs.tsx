import { useState } from 'react';
import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';

const openings = [
  { title: 'Line Cook', where: 'the-factory', type: 'Full-time', pay: '$18-22/hr', detail: 'Sauté, grill, broil. Steakhouse veterans encouraged.' },
  { title: 'Sushi Chef', where: 'takaoka-of-japan', type: 'Full-time', pay: '$22-28/hr', detail: 'Two years sushi-bar experience minimum.' },
  { title: 'Server', where: 'the-gas-house', type: 'Part-time', pay: '$15/hr + tips', detail: 'Evenings and weekends. Wine knowledge a plus.' },
  { title: 'Carhop', where: 'halls-hollywood', type: 'Part/Full', pay: '$13/hr + tips', detail: 'Roller skates on us. Friendly attitude required.' },
  { title: 'Bartender', where: 'tap-haus', type: 'Full-time', pay: '$16/hr + tips', detail: 'Beer Cicerone level 1+ preferred.' },
  { title: 'Host / Hostess', where: 'halls-state-street', type: 'Part-time', pay: '$14/hr', detail: 'Mornings and weekends. Customer service first.' },
  { title: 'Prep Cook', where: 'halls-commissary', type: 'Full-time', pay: '$15-18/hr', detail: 'Mornings. Strong knife skills required.' },
  { title: 'Bar Manager', where: 'the-tavern', type: 'Full-time', pay: 'Salary + bonus', detail: 'Five years bar management. Inventory + scheduling.' },
];

export default function Jobs() {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? openings : openings.filter((o) => o.where === filter);

  return (
    <PageTransition>
      <section className="relative pt-40 pb-12">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            Now Hiring · Fort Wayne
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tight text-cream-100 mt-4">
            Work with the family.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream-100/75">
            We've been on the same payroll books since 1946. Generous tips, real benefits,
            schedules that work around school and family. Start anytime.
          </p>
        </div>
      </section>

      <section className="py-8 border-y border-cream-100/10">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 flex flex-wrap gap-2">
          <Pill active={filter === 'all'} onClick={() => setFilter('all')}>All Openings</Pill>
          {restaurants.map((r) => (
            <Pill key={r.slug} active={filter === r.slug} onClick={() => setFilter(r.slug)} accent={r.accent}>
              {r.shortName}
            </Pill>
          ))}
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 space-y-3">
          {filtered.map((o, i) => {
            const r = restaurants.find((x) => x.slug === o.where)!;
            return (
              <Reveal key={o.title + o.where} delay={i * 0.04}>
                <article className="group flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-ink-300/40 border border-cream-100/10 hover:border-cream-100/30 transition">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-cream-100/50">
                      <span className="h-2 w-2 rounded-full" style={{ background: r.accent }} />
                      {r.name} · {o.type}
                    </div>
                    <h3 className="font-display text-3xl text-cream-100 mt-1.5">{o.title}</h3>
                    <p className="text-sm text-cream-100/65 mt-2">{o.detail}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl text-gold-400">{o.pay}</div>
                    <Link to="/contact" className="mt-2 inline-block font-mono text-xs uppercase tracking-wider text-cream-100/60 group-hover:text-cream-100 transition">
                      Apply →
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-cream-100/50 py-12">No openings here right now.</p>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

function Pill({
  active,
  onClick,
  accent,
  children,
}: {
  active: boolean;
  onClick: () => void;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border transition ${
        active
          ? 'border-cream-100 text-cream-100 bg-cream-100/10'
          : 'border-cream-100/15 text-cream-100/60 hover:text-cream-100 hover:border-cream-100/40'
      }`}
      style={active && accent ? { borderColor: accent, color: accent } : undefined}
    >
      {children}
    </button>
  );
}
