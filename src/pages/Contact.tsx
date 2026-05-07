import { useState } from 'react';
import { motion } from 'framer-motion';
import { restaurants } from '../data/restaurants';
import HeroImage from '../components/HeroImage';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState<'general' | 'reservation' | 'private-event' | 'feedback' | 'press'>('general');

  return (
    <PageTransition>
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Faint Gas House mood backdrop */}
        <div className="absolute inset-0 -z-10 opacity-25">
          <HeroImage slug="the-gas-house" fallbackAccent="#C77B49" alt="" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-500/60 via-ink-500/85 to-ink-500" />

        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 pt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400">
            Get in Touch
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tight text-cream-100 mt-4">
            Say <span className="italic font-normal text-gold-400">hello.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream-100/80">
            Reservations, private events, press, feedback — pick a topic and we'll get back to
            you within a business day.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-5 rounded-2xl bg-ink-300/40 border border-cream-100/10 p-6 lg:p-10"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80 mb-3">
                  What's it about
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['general', 'reservation', 'private-event', 'feedback', 'press'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-full border transition ${
                        topic === t
                          ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                          : 'border-cream-100/15 text-cream-100/60 hover:text-cream-100'
                      }`}
                    >
                      {t.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" placeholder="Cole Hall" />
                <Field label="Email" placeholder="cole@example.com" />
                <Field label="Phone" placeholder="(260) 555-0146" />
                <Field label="Restaurant" placeholder="Any of the 10" />
              </div>

              <Textarea
                label="Message"
                placeholder={
                  topic === 'private-event'
                    ? 'Date, headcount, any preferences for room…'
                    : topic === 'reservation'
                    ? 'Date, time, party size, any seating wishes…'
                    : 'How can we help?'
                }
              />

              <div className="flex justify-end">
                <button type="submit" className="btn-primary">Send message</button>
              </div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-gold-400/40 bg-gold-400/5 p-4 text-sm text-gold-400"
                >
                  Got it — we'll be in touch within one business day.
                </motion.div>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 space-y-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80">
                Direct Lines
              </div>
              <ul className="mt-4 space-y-3">
                {restaurants.map((r) =>
                  r.phone ? (
                    <li key={r.slug} className="flex items-center justify-between gap-4 py-2 border-b border-cream-100/10">
                      <span className="text-cream-100/85">{r.name}</span>
                      <a href={`tel:${r.phone}`} className="font-display text-lg text-gold-400 hover:text-cream-100">
                        {r.phone}
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80">
                Corporate
              </div>
              <div className="mt-3 text-cream-100/80 leading-relaxed">
                Don Hall's Restaurants
                <br />
                305 E Superior Street
                <br />
                Fort Wayne, IN 46802
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-cream-100/50 mb-1.5">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg bg-ink-300/60 border border-cream-100/10 focus:border-gold-400/60 outline-none px-4 py-3 text-cream-100 placeholder-cream-100/30 transition"
      />
    </label>
  );
}

function Textarea({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-cream-100/50 mb-1.5">
        {label}
      </span>
      <textarea
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-lg bg-ink-300/60 border border-cream-100/10 focus:border-gold-400/60 outline-none px-4 py-3 text-cream-100 placeholder-cream-100/30 transition resize-y"
      />
    </label>
  );
}
