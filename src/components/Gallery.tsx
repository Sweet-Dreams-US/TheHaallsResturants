import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryImage } from '../data/galleries';
import Reveal from './Reveal';

type Props = {
  images: GalleryImage[];
  accent: string;
  /** Section title (default "The Room") */
  title?: string;
  subtitle?: string;
};

export default function Gallery({ images, accent, title = 'Inside the room', subtitle }: Props) {
  const [active, setActive] = useState<number | null>(null);

  // Lock body scroll when lightbox is open + close on Escape
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, images.length]);

  if (images.length === 0) return null;

  return (
    <section className="relative py-20 lg:py-28 border-t border-cream-100/10">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold-400/80">
            {subtitle ?? 'Photography'}
          </div>
          <h2 className="font-display text-4xl lg:text-6xl leading-tight mt-3 text-cream-100">
            {title}
          </h2>
        </Reveal>

        <div
          className={
            images.length === 1
              ? 'mt-12 max-w-3xl mx-auto'
              : images.length === 2
              ? 'mt-12 grid md:grid-cols-2 gap-4 lg:gap-6'
              : 'mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'
          }
        >
          {images.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.05}>
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-cream-100/10 hover:border-cream-100/30 transition aspect-[4/3]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-500/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                    <p className="font-script text-lg text-cream-100 leading-tight">{img.caption}</p>
                  </div>
                )}
                <div
                  className="absolute top-3 right-3 h-8 w-8 rounded-full grid place-items-center text-cream-100 opacity-0 group-hover:opacity-100 transition"
                  style={{ background: `${accent}cc` }}
                >
                  ⤢
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink-500/95 backdrop-blur-md p-4 lg:p-12"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setActive(null); }}
              className="absolute top-5 right-5 h-10 w-10 rounded-full border border-cream-100/30 text-cream-100 hover:bg-cream-100/10"
              aria-label="Close"
            >
              ×
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}
                  className="absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-cream-100/30 text-cream-100 hover:bg-cream-100/10"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length); }}
                  className="absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-cream-100/30 text-cream-100 hover:bg-cream-100/10"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
            <motion.div
              key={active}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-6xl max-h-[88vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[active].src}
                alt={images[active].alt}
                className="rounded-xl shadow-2xl object-contain max-h-[78vh] max-w-full"
              />
              {images[active].caption && (
                <p className="font-script text-2xl text-cream-100/85 text-center max-w-2xl">
                  {images[active].caption}
                </p>
              )}
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-100/40">
                {active + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
