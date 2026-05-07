import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { restaurants, getRestaurant } from '../data/restaurants';
import { getMenu } from '../data/menus';
import { getGallery } from '../data/galleries';
import HeroImage from '../components/HeroImage';
import RestaurantLogo from '../components/RestaurantLogo';
import MenuRenderer from '../components/MenuRenderer';
import Gallery from '../components/Gallery';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';

export default function RestaurantPage() {
  const { slug } = useParams<{ slug: string }>();
  const r = slug ? getRestaurant(slug) : undefined;
  if (!r) return <Navigate to="/restaurants" replace />;

  const menu = getMenu(r.slug);
  const gallery = getGallery(r.slug);
  const idx = restaurants.findIndex((x) => x.slug === r.slug);
  const prev = restaurants[(idx + restaurants.length - 1) % restaurants.length];
  const next = restaurants[(idx + 1) % restaurants.length];

  return (
    <PageTransition>
      <Hero r={r} />
      <Intro r={r} />
      <SignatureStrip r={r} />
      {gallery.length > 0 && <Gallery images={gallery} accent={r.accent} />}
      {menu && (
        <section className="relative py-16 lg:py-24">
          <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
            <Reveal>
              <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
                    {menu.source === 'pdf' ? 'Real menu — Spring 2025' : 'Menu — Sample'}
                  </div>
                  <h2 className="font-display text-4xl lg:text-6xl leading-tight mt-3 text-cream-100">
                    On the menu.
                  </h2>
                </div>
                {r.status !== 'refurbishing' && (
                  <Link to={`/order/${r.slug}`} className="btn-primary">
                    Order online →
                  </Link>
                )}
              </div>
            </Reveal>
            <MenuRenderer
              menu={menu}
              restaurantName={r.name}
              accent={r.accent}
              disabled={r.status === 'refurbishing'}
            />
          </div>
        </section>
      )}
      <Visit r={r} />
      <PrevNext prev={prev} next={next} />
    </PageTransition>
  );
}

function Hero({ r }: { r: ReturnType<typeof getRestaurant> & {} }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <HeroImage slug={r.slug} fallbackAccent={r.accent} alt={r.name} priority />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-500/40 via-ink-500/20 to-ink-500" />
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: `radial-gradient(80% 60% at 50% 100%, ${r.accent}55, transparent 70%)` }}
      />

      <div className="relative z-10 h-full flex items-end pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em]"
            style={{ color: r.accent }}
          >
            <span className="h-px w-8" style={{ background: r.accent }} />
            {r.cuisine} {r.founded && `· Since ${r.founded}`}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            <RestaurantLogo
              slug={r.slug}
              name={r.name}
              shortName={r.shortName}
              size="xl"
              invert
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-script text-3xl lg:text-4xl mt-6"
            style={{ color: r.accent }}
          >
            {r.tagline}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Intro({ r }: { r: ReturnType<typeof getRestaurant> & {} }) {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            The Story
          </div>
          <h2 className="font-display text-4xl lg:text-5xl leading-tight text-cream-100 mt-4">
            {r.blurb}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 space-y-6">
          <p className="text-xl leading-relaxed text-cream-100/85">{r.longCopy}</p>
          <div className="flex flex-wrap gap-2 pt-4">
            {r.vibe.map((v) => (
              <span
                key={v}
                className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${r.accent}66`, color: r.accent }}
              >
                {v}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SignatureStrip({ r }: { r: ReturnType<typeof getRestaurant> & {} }) {
  return (
    <section className="relative py-12 border-y border-cream-100/10">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
        <Reveal>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/50">Signature</div>
            <div className="mt-2 space-y-1">
              {r.signatureDishes.slice(0, 3).map((d) => (
                <div key={d} className="font-display text-lg text-cream-100">{d}</div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/50">Cuisine</div>
            <div className="font-display text-2xl text-cream-100 mt-2">{r.cuisine}</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/50">Price</div>
            <div className="font-display text-2xl text-cream-100 mt-2">
              {'$'.repeat(r.priceTier)}
              <span className="text-cream-100/30">{'$'.repeat(3 - r.priceTier)}</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/50">Features</div>
            <div className="font-display text-lg text-cream-100 mt-2 leading-tight">
              {r.features.slice(0, 3).join(' · ')}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Visit({ r }: { r: ReturnType<typeof getRestaurant> & {} }) {
  return (
    <section className="relative py-20 lg:py-32 border-t border-cream-100/10 bg-gradient-to-b from-transparent to-ink-400/40">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid lg:grid-cols-3 gap-10">
        <Reveal>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">Address</div>
            <div className="mt-3 font-display text-2xl text-cream-100 leading-tight">{r.address}</div>
            <div className="text-cream-100/60">{r.city}</div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${r.address}, ${r.city}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-sm text-gold-400 underline-offset-4 hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">Hours</div>
            <dl className="mt-3 space-y-2">
              {r.hours.map((h) => (
                <div key={h.label} className="flex justify-between text-cream-100/85">
                  <dt className="font-mono text-xs uppercase tracking-wider text-cream-100/60">{h.label}</dt>
                  <dd className="text-sm">{h.time}</dd>
                </div>
              ))}
            </dl>
            {r.seasonal && (
              <div
                className="mt-4 inline-block stamp"
                style={{ color: r.accent, borderColor: r.accent }}
              >
                {r.seasonal}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">Reach Us</div>
            <div className="mt-3 space-y-2">
              {r.phone && (
                <a href={`tel:${r.phone}`} className="block font-display text-2xl text-cream-100 hover:text-gold-400">
                  {r.phone}
                </a>
              )}
              {r.email && (
                <a href={`mailto:${r.email}`} className="block text-sm text-cream-100/70 hover:text-cream-100">
                  {r.email}
                </a>
              )}
              <div className="flex flex-wrap gap-2 pt-3">
                {r.features.map((f) => (
                  <span
                    key={f}
                    className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-cream-100/15 text-cream-100/70"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PrevNext({ prev, next }: { prev: typeof restaurants[number]; next: typeof restaurants[number] }) {
  return (
    <section className="border-t border-cream-100/10">
      <div className="mx-auto max-w-[1500px] grid md:grid-cols-2">
        <Link
          to={`/restaurants/${prev.slug}`}
          className="group relative px-8 py-12 border-b md:border-b-0 md:border-r border-cream-100/10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition">
            <HeroImage slug={prev.slug} fallbackAccent={prev.accent} alt={prev.name} />
          </div>
          <div className="relative">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-100/50">← Previous</div>
            <div className="font-display text-3xl lg:text-4xl mt-2 text-cream-100">{prev.name}</div>
            <div className="text-sm font-script mt-1" style={{ color: prev.accent }}>{prev.tagline}</div>
          </div>
        </Link>
        <Link
          to={`/restaurants/${next.slug}`}
          className="group relative px-8 py-12 text-right overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition">
            <HeroImage slug={next.slug} fallbackAccent={next.accent} alt={next.name} />
          </div>
          <div className="relative">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-100/50">Next →</div>
            <div className="font-display text-3xl lg:text-4xl mt-2 text-cream-100">{next.name}</div>
            <div className="text-sm font-script mt-1" style={{ color: next.accent }}>{next.tagline}</div>
          </div>
        </Link>
      </div>
    </section>
  );
}
