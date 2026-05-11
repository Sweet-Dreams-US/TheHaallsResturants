import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import GrainOverlay from './GrainOverlay';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  // The /admin route is a full-viewport dashboard with its own chrome —
  // suppress the public Nav, Footer, and texture overlay so they don't
  // render uselessly behind the fixed admin shell.
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <div className="relative min-h-screen flex flex-col">
      <GrainOverlay />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
