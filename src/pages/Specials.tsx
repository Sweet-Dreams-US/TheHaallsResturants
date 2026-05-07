import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import HeroImage from '../components/HeroImage';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';

const specials = [
  { day: 'Monday', dish: 'Half-Off Bottles of Wine', where: 'the-gas-house', meta: 'All night, all reds.' },
  { day: 'Tuesday', dish: 'Two-For-Tuesday Tacos', where: 'the-deck', meta: 'House fish + carnitas.' },
  { day: 'Wednesday', dish: 'Prime Rib Special', where: 'the-factory', meta: '10oz cut, $24, sides included.' },
  { day: 'Thursday', dish: 'Sushi Happy Hour', where: 'takaoka-of-japan', meta: 'Half-price rolls 4–6 pm.' },
  { day: 'Friday', dish: 'Fish Fry', where: 'halls-commissary', meta: 'Beer-battered cod, slaw, fries.' },
  { day: 'Saturday', dish: 'Tap Takeover', where: 'tap-haus', meta: 'Featured brewery. Exclusive pours.' },
  { day: 'Sunday', dish: 'Country Breakfast Buffet', where: 'halls-state-street', meta: '8 am – 11 am · $14 / person.' },
];

const events = [
  { date: 'May 12', title: 'The Deck Opens for the Season', detail: 'Live music. First Painkiller is on us.' },
  { date: 'May 18', title: "Hollywood's Muddy River Run Cruise-In", detail: 'Vintage cars, malts, neon all night.' },
  { date: 'June 8', title: 'Father\'s Day Prime Rib at The Factory', detail: 'Reservations going fast. Book now.' },
  { date: 'June 21', title: 'Summer Solstice Riverside Dinner', detail: 'Five courses on The Deck. Sunset seating.' },
];

export default function Specials() {
  return (
    <PageTransition>
      <section className="relative pt-40 pb-12">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            What's Hot This Week
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tight text-cream-100 mt-4">
            Specials & <span className="italic font-normal text-gold-400">Events.</span>
          </h1>
        </div>
      </section>

      <section className="py-12 border-t border-cream-100/10">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80 mb-8">
            Daily Specials — Across the Portfolio
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specials.map((s, i) => {
              const r = restaurants.find((x) => x.slug === s.where)!;
              return (
                <Reveal key={s.day} delay={i * 0.04}>
                  <Link
                    to={`/restaurants/${r.slug}`}
                    className="group relative block aspect-[4/3] rounded-2xl overflow-hidden border border-cream-100/10 hover:border-cream-100/30 transition"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <HeroImage slug={r.slug} fallbackAccent={r.accent} alt={r.name} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-500 via-ink-500/60 to-transparent" />
                    <div className="relative h-full p-5 flex flex-col justify-between">
                      <div className="font-display italic text-4xl" style={{ color: r.accent }}>
                        {s.day}
                      </div>
                      <div>
                        <div className="font-display text-2xl text-cream-100 leading-tight">
                          {s.dish}
                        </div>
                        <div className="text-sm text-cream-100/65 mt-1.5">{s.meta}</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-cream-100/50 mt-3">
                          @ {r.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-cream-100/10">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80 mb-4">
            Upcoming Events
          </div>
          <h2 className="font-display text-4xl lg:text-6xl leading-tight text-cream-100">
            Mark your calendar.
          </h2>
          <ol className="mt-12 divide-y divide-cream-100/10">
            {events.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <li className="py-6 grid md:grid-cols-12 gap-6 items-baseline">
                  <div className="md:col-span-2 font-display italic text-3xl text-gold-400">
                    {e.date}
                  </div>
                  <div className="md:col-span-7">
                    <div className="font-display text-2xl text-cream-100">{e.title}</div>
                    <div className="text-cream-100/65 mt-1">{e.detail}</div>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <Link to="/contact" className="font-mono text-xs uppercase tracking-wider text-cream-100/70 hover:text-gold-400">
                      RSVP →
                    </Link>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </PageTransition>
  );
}
