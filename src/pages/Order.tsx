import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurants, getRestaurant, type Restaurant } from '../data/restaurants';
import HeroImage from '../components/HeroImage';
import PageTransition from '../components/PageTransition';
import { useCart, type CartItem } from '../lib/cart';

type Step = 'menu' | 'cart' | 'confirm' | 'done';

export default function Order() {
  const { slug } = useParams<{ slug?: string }>();
  const r = slug ? getRestaurant(slug) : undefined;
  const [step, setStep] = useState<Step>('menu');

  if (!r) return <ChooseRestaurant />;

  return (
    <PageTransition>
      <OrderHero r={r} step={step} setStep={setStep} />
      <AnimatePresence mode="wait">
        {step === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FullMenu r={r} onCheckout={() => setStep('cart')} />
          </motion.div>
        )}
        {step === 'cart' && (
          <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CartReview r={r} onBack={() => setStep('menu')} onNext={() => setStep('confirm')} />
          </motion.div>
        )}
        {step === 'confirm' && (
          <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Checkout r={r} onBack={() => setStep('cart')} onComplete={() => setStep('done')} />
          </motion.div>
        )}
        {step === 'done' && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OrderConfirmed r={r} />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

function ChooseRestaurant() {
  return (
    <PageTransition>
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            Online Ordering
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tight text-cream-100 mt-4">
            Pick a kitchen.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream-100/75">
            Choose the restaurant you want to order from — each kitchen has its own menu, prep
            time, and pickup window.
          </p>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => r.status !== 'refurbishing')
              .map((r) => (
                <Link
                  key={r.slug}
                  to={`/order/${r.slug}`}
                  className="group relative block aspect-[4/3] rounded-2xl overflow-hidden border border-cream-100/10 hover:border-cream-100/30 transition"
                >
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <HeroImage slug={r.slug} fallbackAccent={r.accent} alt={r.name} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-500/90 to-transparent" />
                  <div className="relative h-full p-5 flex flex-col justify-end">
                    <div className="font-display text-2xl text-cream-100">{r.name}</div>
                    <div className="text-sm text-cream-100/70 mt-1">{r.cuisine}</div>
                    <div className="mt-3 font-mono text-xs uppercase tracking-wider text-gold-400 group-hover:text-cream-100 transition">
                      Start order →
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function OrderHero({ r, step, setStep }: { r: Restaurant; step: Step; setStep: (s: Step) => void }) {
  const { count, total } = useCart();
  const steps: { id: Step; label: string }[] = [
    { id: 'menu', label: 'Menu' },
    { id: 'cart', label: 'Cart' },
    { id: 'confirm', label: 'Checkout' },
    { id: 'done', label: 'Done' },
  ];
  return (
    <section className="relative pt-32 pb-10 border-b border-cream-100/10 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <HeroImage slug={r.slug} fallbackAccent={r.accent} alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-500/60 to-ink-500" />
      </div>

      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <Link to="/restaurants" className="font-mono text-[10px] uppercase tracking-[0.32em] text-cream-100/60 hover:text-cream-100">
          ← All Restaurants
        </Link>
        <div className="mt-4 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400">
              Ordering from
            </div>
            <h1 className="font-display text-5xl lg:text-7xl leading-[0.95] text-cream-100 mt-1">
              {r.name}
            </h1>
            <div className="font-script text-2xl mt-2" style={{ color: r.accent }}>
              {r.tagline}
            </div>
          </div>
          {count > 0 && step === 'menu' && (
            <button
              onClick={() => setStep('cart')}
              className="btn-primary"
            >
              View cart · {count} item{count > 1 ? 's' : ''} · ${total.toFixed(2)}
            </button>
          )}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm">
          {steps.map((s, i) => {
            const active = s.id === step;
            const done = steps.findIndex((x) => x.id === step) > i;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <span
                  className={`h-7 w-7 grid place-items-center rounded-full font-mono text-xs ${
                    active
                      ? 'bg-ember-600 text-cream-100'
                      : done
                      ? 'bg-gold-400 text-ink-300'
                      : 'bg-cream-100/10 text-cream-100/50'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-widest ${active ? 'text-cream-100' : 'text-cream-100/50'}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <span className="w-8 h-px bg-cream-100/20" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FullMenu({ r, onCheckout }: { r: Restaurant; onCheckout: () => void }) {
  const { add, count, total } = useCart();
  return (
    <section className="relative py-12 lg:py-20">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <h2 className="font-display text-3xl lg:text-5xl text-cream-100">The Menu</h2>
          <p className="text-cream-100/65 mt-2">
            Add items to your cart, then move to checkout. This is a demo of the ordering flow —
            no charges are processed.
          </p>

          <div className="mt-10 space-y-3">
            {r.menuHighlights.map((m) => (
              <div
                key={m.name}
                className="group flex items-start gap-4 p-5 rounded-xl bg-ink-200/40 border border-cream-100/10 hover:border-cream-100/30 transition"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl text-cream-100">{m.name}</h3>
                    {m.tag && (
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
                        style={{ borderColor: `${r.accent}88`, color: r.accent }}
                      >
                        {m.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-cream-100/65 mt-1.5 leading-relaxed">{m.description}</p>
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <div className="font-display text-2xl text-gold-400">${m.price}</div>
                  <button
                    onClick={() =>
                      add({
                        id: `${r.slug}__${m.name}`,
                        restaurantSlug: r.slug,
                        restaurantName: r.name,
                        name: m.name,
                        price: m.price,
                      })
                    }
                    className="rounded-full bg-ember-600 hover:bg-ember-500 transition px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-cream-100"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:h-fit">
          <CartPanel onCheckout={onCheckout} accent={r.accent} />
          {count === 0 && (
            <p className="mt-4 text-center text-sm text-cream-100/50">
              Cart is empty. Add an item to begin.
            </p>
          )}
          {count > 0 && (
            <button
              onClick={onCheckout}
              className="mt-4 w-full btn-primary justify-center"
            >
              Checkout · ${total.toFixed(2)}
            </button>
          )}
        </aside>
      </div>
    </section>
  );
}

function CartPanel({ onCheckout, accent }: { onCheckout?: () => void; accent: string }) {
  const { state, inc, dec, remove, total } = useCart();
  return (
    <div className="rounded-2xl bg-ink-300/60 border border-cream-100/10 p-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/60">
          Your Cart
        </div>
        <div className="font-display text-2xl text-gold-400">${total.toFixed(2)}</div>
      </div>
      <div className="mt-4 space-y-3 max-h-[420px] overflow-auto pr-1">
        {state.items.length === 0 && (
          <div className="text-sm text-cream-100/50">Your cart is empty.</div>
        )}
        {state.items.map((i) => (
          <CartLine key={i.id} item={i} accent={accent} onInc={() => inc(i.id)} onDec={() => dec(i.id)} onRemove={() => remove(i.id)} />
        ))}
      </div>
      {state.items.length > 0 && (
        <div className="mt-5 pt-4 border-t border-cream-100/10 space-y-1 text-sm">
          <Row label="Subtotal" value={`$${total.toFixed(2)}`} />
          <Row label="Tax (7%)" value={`$${(total * 0.07).toFixed(2)}`} />
          <Row label="Delivery" value="Free" muted />
          <div className="pt-2 mt-2 border-t border-cream-100/10 flex justify-between font-display text-xl text-cream-100">
            <span>Total</span>
            <span>${(total * 1.07).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`flex justify-between ${muted ? 'text-cream-100/50' : 'text-cream-100/80'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function CartLine({
  item,
  accent,
  onInc,
  onDec,
  onRemove,
}: {
  item: CartItem;
  accent: string;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-3 group">
      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-cream-100">{item.name}</div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-cream-100/40">
          ${item.price} ea
        </div>
      </div>
      <div className="flex items-center gap-2 text-cream-100/80">
        <button onClick={onDec} className="h-6 w-6 rounded-full border border-cream-100/20 hover:border-cream-100/60 leading-none">−</button>
        <span className="font-mono text-sm w-5 text-center">{item.qty}</span>
        <button onClick={onInc} className="h-6 w-6 rounded-full border border-cream-100/20 hover:border-cream-100/60 leading-none">+</button>
      </div>
      <button onClick={onRemove} aria-label="Remove" className="text-cream-100/30 hover:text-ember-400">×</button>
    </div>
  );
}

function CartReview({ r, onBack, onNext }: { r: Restaurant; onBack: () => void; onNext: () => void }) {
  const { state, total, count } = useCart();
  if (count === 0) {
    return (
      <section className="py-20 text-center">
        <div className="mx-auto max-w-md px-6">
          <h2 className="font-display text-4xl text-cream-100">Your cart is empty.</h2>
          <p className="text-cream-100/60 mt-4">Add some items to begin.</p>
          <button onClick={onBack} className="btn-primary mt-8">Back to menu</button>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl lg:text-5xl text-cream-100">Review your order</h2>
        <p className="text-cream-100/65 mt-2">From {r.name} · {r.address}</p>

        <div className="mt-10 rounded-2xl bg-ink-300/60 border border-cream-100/10">
          {state.items.map((i, idx) => (
            <div
              key={i.id}
              className={`flex items-center gap-4 p-5 ${idx > 0 ? 'border-t border-cream-100/10' : ''}`}
            >
              <span className="font-display italic text-2xl text-gold-400/80">{i.qty}×</span>
              <div className="flex-1">
                <div className="font-display text-lg text-cream-100">{i.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-cream-100/40">
                  ${i.price.toFixed(2)} ea
                </div>
              </div>
              <div className="font-display text-xl text-gold-400">${(i.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
          <div className="border-t border-cream-100/10 p-5 space-y-1 text-sm">
            <Row label="Subtotal" value={`$${total.toFixed(2)}`} />
            <Row label="Tax (7%)" value={`$${(total * 0.07).toFixed(2)}`} />
            <Row label="Delivery" value="Free" muted />
            <div className="pt-2 mt-2 border-t border-cream-100/10 flex justify-between font-display text-2xl text-cream-100">
              <span>Total</span>
              <span>${(total * 1.07).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={onBack} className="btn-ghost">← Edit menu</button>
          <button onClick={onNext} className="btn-primary">Continue to checkout →</button>
        </div>
      </div>
    </section>
  );
}

function Checkout({ r, onBack, onComplete }: { r: Restaurant; onBack: () => void; onComplete: () => void }) {
  const { total } = useCart();
  const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup');
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 space-y-10">
        <div>
          <h2 className="font-display text-4xl lg:text-5xl text-cream-100">Checkout</h2>
          <p className="text-cream-100/60 mt-2 text-sm">
            Demo only — no payment is processed.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80 mb-3">
            How are we sending it
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(['pickup', 'delivery'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`text-left p-5 rounded-xl border transition ${
                  method === m
                    ? 'border-gold-400 bg-gold-400/5 ring-2 ring-gold-400/20'
                    : 'border-cream-100/10 hover:border-cream-100/30 bg-ink-300/40'
                }`}
              >
                <div className="font-display text-2xl text-cream-100 capitalize">{m}</div>
                <div className="text-sm text-cream-100/60 mt-1">
                  {m === 'pickup' ? `Ready in ~22 min · ${r.address}` : '30-45 min · 4 mile radius'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Form />

        <div className="rounded-2xl bg-ink-300/60 border border-cream-100/10 p-5">
          <div className="flex justify-between font-display text-2xl text-cream-100">
            <span>Total</span>
            <span>${(total * 1.07).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={onBack} className="btn-ghost">← Back</button>
          <button onClick={onComplete} className="btn-primary">Place order</button>
        </div>
      </div>
    </section>
  );
}

function Form() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Name" placeholder="Cole Hall" />
      <Field label="Phone" placeholder="(260) 426-3411" />
      <Field label="Email" placeholder="cole@example.com" className="sm:col-span-2" />
      <Field label="Address" placeholder="305 E Superior St" className="sm:col-span-2" />
      <Field label="City" placeholder="Fort Wayne" />
      <Field label="ZIP" placeholder="46802" />
    </div>
  );
}

function Field({ label, placeholder, className = '' }: { label: string; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
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

function OrderConfirmed({ r }: { r: Restaurant }) {
  const { state, total, clear } = useCart();
  const orderNumber = `${r.shortName.replace(/\s/g, '').slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="mx-auto h-24 w-24 rounded-full grid place-items-center text-4xl"
            style={{ background: `${r.accent}22`, color: r.accent }}
          >
            ✓
          </div>
          <h2 className="font-display text-5xl lg:text-7xl text-cream-100 mt-6">Order placed.</h2>
          <p className="text-cream-100/70 mt-4 text-lg">
            Thanks. {r.name} is firing up your ticket now.
          </p>

          <div className="mt-10 rounded-2xl bg-ink-300/60 border border-cream-100/10 p-6 text-left">
            <div className="flex justify-between text-sm font-mono uppercase tracking-wider text-cream-100/60">
              <span>Order #</span>
              <span className="text-gold-400">{orderNumber}</span>
            </div>
            <div className="flex justify-between mt-2 text-sm font-mono uppercase tracking-wider text-cream-100/60">
              <span>Pickup ETA</span>
              <span className="text-cream-100">~22 minutes</span>
            </div>
            <div className="mt-4 pt-4 border-t border-cream-100/10 space-y-1.5 text-sm text-cream-100/85">
              {state.items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>{i.qty}× {i.name}</span>
                  <span className="text-cream-100/60">${(i.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-cream-100/10 flex justify-between font-display text-xl text-cream-100">
              <span>Paid</span>
              <span className="text-gold-400">${(total * 1.07).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <Link to="/" onClick={clear} className="btn-ghost">Back home</Link>
            <Link to="/restaurants" onClick={clear} className="btn-primary">Order again</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
