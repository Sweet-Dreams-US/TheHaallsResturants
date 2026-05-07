import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-cream-100/10 bg-ink-400/60">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="font-display text-3xl text-cream-100">Don Hall's</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80 mt-1">
              Serving it hot since 1946
            </div>
            <p className="mt-6 text-sm leading-relaxed text-cream-100/70 max-w-xs">
              Ten Fort Wayne dining concepts, run by three generations of the Hall family.
              From a 1946 drive-in to today.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/order" className="btn-primary text-sm">Order Online</Link>
              <Link to="/gift-cards" className="btn-ghost text-sm">Gift Cards</Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80 mb-4">
              Restaurants
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {restaurants.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/restaurants/${r.slug}`}
                    className="group inline-flex items-center gap-2 text-sm text-cream-100/80 hover:text-cream-100 transition"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full opacity-60 group-hover:opacity-100 transition"
                      style={{ background: r.accent }}
                    />
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/80 mb-4">
              Visit
            </div>
            <ul className="space-y-2 text-sm text-cream-100/80">
              <li><Link to="/story" className="hover:text-cream-100">Our Story</Link></li>
              <li><Link to="/specials" className="hover:text-cream-100">Specials</Link></li>
              <li><Link to="/jobs" className="hover:text-cream-100">Jobs</Link></li>
              <li><Link to="/contact" className="hover:text-cream-100">Contact</Link></li>
            </ul>
            <div className="mt-6 flex gap-3 text-cream-100/60">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-cream-100">FB</a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-cream-100">IG</a>
              <a href="https://maps.google.com" aria-label="Google Maps" className="hover:text-cream-100">MAP</a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream-100/10 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-cream-100/50">
          <div>© {new Date().getFullYear()} Don Hall's Restaurants · Fort Wayne, Indiana</div>
          <div className="font-mono uppercase tracking-[0.25em]">
            Quality · Service · Value
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
    </footer>
  );
}
