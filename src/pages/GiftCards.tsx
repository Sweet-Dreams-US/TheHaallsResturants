import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal';
import PageTransition from '../components/PageTransition';

const amounts = [25, 50, 75, 100, 150, 250];

export default function GiftCards() {
  const [amount, setAmount] = useState(50);
  const [delivery, setDelivery] = useState<'email' | 'mail'>('email');
  const [purchased, setPurchased] = useState(false);

  return (
    <PageTransition>
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            Good at all 10 restaurants
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tight text-cream-100 mt-4">
            Gift Cards.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream-100/75">
            One card. Every kitchen. Send digitally or mail a physical card. Never expires.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <GiftCardArt amount={amount} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80 mb-3">
                  Amount
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {amounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`p-5 rounded-xl border font-display text-2xl transition ${
                        amount === a
                          ? 'border-gold-400 bg-gold-400/5 text-gold-400 ring-2 ring-gold-400/20'
                          : 'border-cream-100/10 text-cream-100 hover:border-cream-100/30'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80 mb-3">
                  Delivery
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(['email', 'mail'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDelivery(d)}
                      className={`p-5 rounded-xl border text-left transition ${
                        delivery === d
                          ? 'border-gold-400 bg-gold-400/5 ring-2 ring-gold-400/20'
                          : 'border-cream-100/10 hover:border-cream-100/30'
                      }`}
                    >
                      <div className="font-display text-xl text-cream-100 capitalize">{d}</div>
                      <div className="text-sm text-cream-100/60">
                        {d === 'email' ? 'Sent within an hour' : 'Mailed in 2-4 days'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Recipient name" placeholder="Pat Hall" />
                <Field label={delivery === 'email' ? 'Email' : 'Address'} placeholder={delivery === 'email' ? 'pat@hall.com' : '305 E Superior St'} />
                <Field label="Your name" placeholder="From: Cole" />
                <Field label="Note" placeholder="Happy birthday!" />
              </div>

              <div className="pt-4 border-t border-cream-100/10 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/50">
                    Total
                  </div>
                  <div className="font-display text-3xl text-cream-100">${amount.toFixed(2)}</div>
                </div>
                <button
                  onClick={() => setPurchased(true)}
                  className="btn-primary"
                >
                  Send gift card
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {purchased && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-ink-500/85 backdrop-blur-md p-6"
            onClick={() => setPurchased(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="rounded-2xl bg-ink-300 border border-cream-100/10 p-10 text-center max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-5xl text-gold-400 font-display">✓</div>
              <h3 className="font-display text-3xl text-cream-100 mt-4">Gift on its way.</h3>
              <p className="text-cream-100/70 mt-3">
                Demo only — your gift card would arrive shortly via {delivery}.
              </p>
              <button onClick={() => setPurchased(false)} className="btn-ghost mt-8">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

function GiftCardArt({ amount }: { amount: number }) {
  return (
    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-ember-700 via-ember-800 to-ink-300 border border-gold-400/30 shadow-2xl">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(212,162,76,0.35),transparent)]" />
      <div className="relative h-full p-8 flex flex-col justify-between text-cream-100">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/90">
              Don Hall's
            </div>
            <div className="font-display italic text-4xl mt-1">Gift Card</div>
          </div>
          <span className="stamp text-gold-400">Est. 1946</span>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/60">
            Value
          </div>
          <div className="font-display text-7xl mt-1 leading-none text-gold-400">${amount}</div>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-cream-100/60">
            Good at all ten restaurants · Never expires
          </div>
        </div>
      </div>
    </div>
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
