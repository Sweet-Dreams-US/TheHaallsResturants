import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { storyTimeline, storyQuotes } from '../data/story';
import { restaurants } from '../data/restaurants';
import HeroImage from '../components/HeroImage';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';

export default function Story() {
  return (
    <PageTransition>
      <Opening />
      <Origins />
      <Timeline />
      <Quotes />
      <Today />
    </PageTransition>
  );
}

function Opening() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section ref={ref} className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-40">
        <HeroImage slug="halls-hollywood" fallbackAccent="#FF3B7A" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-500/60 via-ink-500/80 to-ink-500" />
      </motion.div>

      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400">
            The Hall Family · Three Generations
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.92] tracking-tight text-cream-100 mt-4 max-w-5xl">
            From a meat market to <span className="italic font-normal text-gold-400">ten kitchens.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-cream-100/80">
            The Hall family has been feeding Fort Wayne since 1918. What began as a butcher shop
            on Bluffton Road grew into a 1946 drive-in, then ten very different restaurants — each
            one its own room in the family's bigger house.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Origins() {
  return (
    <section className="relative py-20 lg:py-32 border-t border-cream-100/10">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            1918 · The Beginning
          </div>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] mt-4 text-cream-100">
            A meat market.
            <br />
            <span className="italic font-normal text-gold-400">Three generations behind one counter.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 space-y-5 text-lg leading-relaxed text-cream-100/80">
          <p>
            The Halls opened a butcher shop on Bluffton Road in 1918. The grandfather ran it
            first; when he died, the father came home from Indiana University to take over —
            caring for his three sisters and his mother, learning the trade from the inside out.
          </p>
          <p>
            By the mid-1940s the shop had passed to the next generation: a young Don Hall, raised
            on cuts of meat and the rhythm of feeding a city. The meat-market roots run through
            every kitchen in the portfolio today. We still know how to butcher a ribeye.
          </p>
          <div className="pt-3 italic font-display text-2xl text-gold-400/90">
            "Quality, service, and value. That's the whole thing."
            <div className="not-italic font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/50 mt-2">
              — House motto, framed in every kitchen
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  return (
    <section ref={ref} className="relative py-20 lg:py-32 border-t border-cream-100/10">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            Eighty Years
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] mt-4 text-cream-100">
            The whole timeline.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          {/* Center line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-cream-100/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 lg:left-1/2 top-0 -translate-x-1/2 w-px bg-gradient-to-b from-gold-400 via-ember-500 to-ember-700"
          />

          <ol className="space-y-20">
            {storyTimeline.map((event, i) => (
              <Reveal key={event.year}>
                <li
                  className={`relative grid lg:grid-cols-2 gap-10 items-start pl-12 lg:pl-0 ${
                    i % 2 ? 'lg:[&>:first-child]:order-2 lg:[&>:first-child]:text-left' : 'lg:[&>:first-child]:text-right'
                  }`}
                >
                  {/* Marker */}
                  <span className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-2 z-10 grid place-items-center h-6 w-6 rounded-full bg-ember-600 ring-4 ring-ink-300">
                    <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                  </span>

                  <div className={`lg:px-12 ${i % 2 ? '' : 'lg:text-right'}`}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-100/50">
                      {event.decade}
                    </div>
                    <div className="font-display italic text-7xl lg:text-8xl text-gold-400 mt-1 leading-none">
                      {event.year}
                    </div>
                  </div>
                  <div className="lg:px-12 space-y-4">
                    <h3 className="font-display text-3xl text-cream-100">{event.title}</h3>
                    <p className="text-cream-100/80 leading-relaxed">{event.body}</p>
                    {event.caption && (
                      <p className="font-script text-2xl text-gold-400/90">{event.caption}</p>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section className="relative py-20 lg:py-32 border-t border-cream-100/10 bg-ink-400/30">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 space-y-12 lg:space-y-20">
        {storyQuotes.map((q, i) => (
          <Reveal key={i}>
            <figure className={`grid lg:grid-cols-12 gap-8 items-center ${i % 2 ? 'lg:[&>:first-child]:order-2' : ''}`}>
              <div className="lg:col-span-2 font-display italic text-9xl text-ember-600/40">
                "
              </div>
              <blockquote className="lg:col-span-10 font-display text-3xl lg:text-5xl leading-snug text-cream-100">
                {q.quote}
                <figcaption className="block mt-4 font-sans not-italic font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80">
                  — {q.attribution}
                </figcaption>
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Today() {
  return (
    <section className="relative py-20 lg:py-32 border-t border-cream-100/10">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            Today
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.95] mt-4 text-cream-100 max-w-4xl">
            Ten kitchens, all still in <span className="italic font-normal text-gold-400">family hands.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream-100/75">
            Three generations of Halls have run this business. The grandkids work the office now.
            The recipes haven't changed. Pull up a chair.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3">
          {restaurants.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.03}>
              <Link
                to={`/restaurants/${r.slug}`}
                className="group block aspect-square rounded-2xl overflow-hidden relative border border-cream-100/10 hover:border-cream-100/30 transition"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <HeroImage slug={r.slug} fallbackAccent={r.accent} alt={r.name} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-500/90 to-transparent" />
                <div className="relative h-full flex items-end p-4">
                  <div>
                    <div className="font-display text-lg text-cream-100 leading-tight">{r.name}</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-cream-100/60">
                      {r.founded}
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
