import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { restaurants } from '../data/restaurants';
import HeroImage from '../components/HeroImage';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';

export default function Restaurants() {
  return (
    <PageTransition>
      <section className="relative pt-40 pb-12 lg:pt-48 lg:pb-16">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            The Portfolio · {restaurants.length} Concepts
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tight text-cream-100 mt-4">
            Pick your <span className="italic font-normal text-gold-400">room.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-100/75">
            Every restaurant in the Don Hall's portfolio is its own world — its own kitchen, its own
            crowd, its own way of doing things. Find the one that matches your night.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 space-y-24">
          {restaurants.map((r, i) => (
            <Reveal key={r.slug}>
              <article
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  i % 2 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Link
                  to={`/restaurants/${r.slug}`}
                  className="lg:col-span-7 group relative block aspect-[16/9] rounded-2xl overflow-hidden border border-cream-100/10"
                >
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                    <HeroImage slug={r.slug} fallbackAccent={r.accent} alt={r.name} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-500/70 via-transparent to-transparent" />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 transition-transform group-hover:scale-x-100 origin-left"
                    style={{ background: r.accent }}
                  />
                  <div className="absolute top-5 right-5 flex gap-2">
                    {r.status === 'seasonal' && (
                      <span className="stamp text-cream-100/90 bg-ink-300/40 backdrop-blur-sm">Seasonal</span>
                    )}
                    {r.status === 'refurbishing' && (
                      <span className="stamp text-cream-100/90 bg-ink-300/40 backdrop-blur-sm">Reopening 2026</span>
                    )}
                  </div>
                </Link>

                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: r.accent, boxShadow: `0 0 12px ${r.accent}` }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-100/60">
                      {r.cuisine}
                    </span>
                  </div>

                  <h2 className="font-display text-5xl lg:text-6xl leading-[0.95] text-cream-100">
                    {r.name}
                  </h2>
                  <p
                    className="font-script text-3xl leading-snug"
                    style={{ color: r.accent }}
                  >
                    {r.tagline}
                  </p>

                  <p className="text-lg leading-relaxed text-cream-100/75">{r.blurb}</p>

                  <dl className="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-cream-100/10">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-cream-100/50 mb-1">
                        Address
                      </dt>
                      <dd className="text-cream-100/90">{r.address}</dd>
                      <dd className="text-cream-100/60 text-xs">{r.city}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-cream-100/50 mb-1">
                        Phone
                      </dt>
                      <dd className="text-cream-100/90">{r.phone ?? '—'}</dd>
                      {r.founded && (
                        <dd className="text-cream-100/60 text-xs">Since {r.founded}</dd>
                      )}
                    </div>
                  </dl>

                  <div className="flex flex-wrap gap-3 pt-3">
                    <Link to={`/restaurants/${r.slug}`} className="btn-primary">
                      View {r.shortName}
                    </Link>
                    {r.status !== 'refurbishing' && (
                      <Link to={`/order/${r.slug}`} className="btn-ghost">Order</Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
