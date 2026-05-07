import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import GrainOverlay from './GrainOverlay';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <GrainOverlay />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
