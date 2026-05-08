import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { restaurants } from '../data/restaurants';
import HeroImage from '../components/HeroImage';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import PageTransition from '../components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Ribbon />
      <Portfolio />
      <StoryTeaser />
      <CrowdNoise />
      <Closer />
    </PageTransition>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden">
      {/* layered hero — gas house tones with crossfaded restaurant moods */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <HeroImage
          slug={restaurants[0].slug}
          fallbackAccent={restaurants[0].accent}
          alt="The Gas House — Don Hall's Fort Wayne flagship"
          priority
        />
      </motion.div>

      {/* gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-300/60 via-ink-300/30 to-ink-300" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,transparent,rgba(10,7,5,0.7))]" />

      <motion.div style={{ opacity }} className="relative z-10 flex h-full items-end pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/90"
            >
              <span className="h-px w-8 bg-gold-400/60" />
              Don Hall's Restaurants · Since 1946
            </motion.div>

            <h1 className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-tight text-cream-100 mt-4">
              <SplitLine delay={0.15}>Ten kitchens.</SplitLine>
              <SplitLine delay={0.3}>One family.</SplitLine>
              <SplitLine delay={0.45}>
                <span className="italic font-normal text-gold-400">Eighty years</span> of Fort Wayne.
              </SplitLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-cream-100/80"
            >
              From a 1946 drive-in on Bluffton Road to ten distinct restaurants across the city —
              the Hall family has been serving Fort Wayne dinner for three generations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link to="/restaurants" className="btn-primary">
                Explore the Restaurants
                <span aria-hidden>→</span>
              </Link>
              <Link to="/story" className="btn-ghost">Read the Hall family story</Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

function SplitLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-2">
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-100/60 z-10">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <motion.span
        initial={{ y: 0, opacity: 0.4 }}
        animate={{ y: 8, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.4, ease: 'easeInOut' }}
        className="block h-6 w-px bg-current"
      />
    </div>
  );
}

function Ribbon() {
  const items = [
    'Since 1946',
    'Ten Restaurants',
    'Family-Owned',
    'Fort Wayne, Indiana',
    'Quality · Service · Value',
    'Three Generations',
    'Drive-In to Steakhouse',
  ];
  return (
    <section className="border-y border-cream-100/10 bg-ink-300/40 py-5">
      <Marquee speed={45}>
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display italic text-cream-100/60 text-2xl whitespace-nowrap"
          >
            {t}
            <span className="text-gold-400/60 font-sans not-italic">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
              The Portfolio
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] mt-4 text-cream-100">
              Ten different rooms in <span className="italic font-normal text-gold-400">one family's house.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-cream-100/70 max-w-2xl">
              Each restaurant has its own kitchen, its own crowd, its own way of doing things.
              Pick the room that suits your night.
            </p>
          </Reveal>
        </div>

        {/* 10 restaurants → 2 cols on mobile (5 rows of 2), 5 cols on desktop
            (2 rows of 5). Grid sizes that divide evenly into 10 are 1, 2, 5, 10
            — anything else creates an orphan card on the last row. */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {restaurants.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.04}>
              <RestaurantCard r={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RestaurantCard({ r }: { r: typeof restaurants[number] }) {
  return (
    <Link
      to={`/restaurants/${r.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-ink-200 border border-cream-100/10 hover:border-cream-100/30 transition-colors aspect-[4/5]"
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <HeroImage slug={r.slug} fallbackAccent={r.accent} alt={r.name} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-500 via-ink-500/40 to-transparent" />
      <div
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(60% 80% at 50% 100%, ${r.accent}33, transparent 60%)`,
        }}
      />

      <div className="relative h-full p-4 lg:p-5 flex flex-col justify-between text-cream-100">
        <div className="flex items-start justify-between gap-2">
          <span
            className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.22em] lg:tracking-[0.28em] px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full border border-cream-100/30 truncate"
            style={{ borderColor: `${r.accent}aa`, color: r.accent }}
          >
            {r.cuisine.split('·')[0].trim()}
          </span>
          {r.status === 'seasonal' && (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-100/70 shrink-0">
              Seasonal
            </span>
          )}
          {r.status === 'refurbishing' && (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-100/70 shrink-0">
              2026
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl sm:text-2xl lg:text-2xl xl:text-3xl leading-[1.05]">
            {r.name}
          </h3>
          <p
            className="mt-1.5 font-script text-lg lg:text-xl xl:text-2xl text-cream-100/80 leading-tight"
            style={{ color: r.accent }}
          >
            {r.tagline}
          </p>
          {/* Blurb: 2 lines on big mobile + xl, hidden in the dense 5-up grid */}
          <div className="mt-2 text-xs sm:text-sm text-cream-100/70 line-clamp-2 hidden sm:block lg:hidden xl:block">
            {r.blurb}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] lg:text-xs text-cream-100/50 font-mono uppercase tracking-wider">
            <span className="truncate">{r.address}</span>
            <span className="shrink-0">·</span>
            <span className="shrink-0 group-hover:text-gold-400 transition">View →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function StoryTeaser() {
  return (
    <section className="relative py-24 lg:py-36 border-t border-cream-100/10 bg-gradient-to-b from-transparent to-ink-400/40">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
              The Hall Family
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] text-cream-100">
              "Forty acres of swamp land, <span className="italic font-normal text-gold-400">and a dream.</span>"
            </h2>
            <p className="text-lg leading-relaxed text-cream-100/75 max-w-xl">
              Don Hall opened his first drive-in the day after Thanksgiving, 1946. Three generations
              later, the meat-market roots run through every kitchen in the portfolio.
            </p>
            <div className="flex gap-3">
              <Link to="/story" className="btn-primary">Read the full story</Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ink-200 border border-cream-100/10">
            <HeroImage
              slug="halls-hollywood"
              fallbackAccent="#FF3B7A"
              alt="Hall's Hollywood at dusk"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-500/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream-100/80">
              <div>
                <div className="font-display text-2xl">1946 — Today</div>
                <div className="font-mono text-[11px] uppercase tracking-widest">Three generations · One family</div>
              </div>
              <div className="font-display italic text-5xl text-gold-400">80 yrs.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CrowdNoise() {
  // Pull-quote style press band
  const quotes = [
    { q: 'The fanciest restaurant in town has a drive-in for a grandfather.', a: 'Visit Fort Wayne' },
    { q: 'Some classics don\'t get touched.', a: 'Fort Wayne Magazine' },
    { q: 'Eighty years and the Hall family hasn\'t blinked.', a: 'Indiana Dining Review' },
  ];
  return (
    <section className="relative py-20 border-t border-cream-100/10">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid md:grid-cols-3 gap-8">
        {quotes.map((q, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <figure className="space-y-4">
              <blockquote className="font-display italic text-2xl lg:text-3xl text-cream-100 leading-snug">
                "{q.q}"
              </blockquote>
              <figcaption className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80">
                — {q.a}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroImage
          slug="the-deck"
          fallbackAccent="#22A6B3"
          alt="The Deck — riverside summer"
        />
        <div className="absolute inset-0 bg-ink-500/70" />
      </div>
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 text-center">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400">
            Tonight's table
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1] mt-4 text-cream-100 max-w-4xl mx-auto">
            Pick a kitchen. <span className="italic text-gold-400">We'll have the booth ready.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/order" className="btn-primary">Order Online</Link>
            <Link to="/restaurants" className="btn-ghost">Browse All Restaurants</Link>
            <Link to="/gift-cards" className="btn-ghost">Gift Cards</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
