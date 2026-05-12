import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { heroImageBySlug } from '../data/heroImages';

type Props = {
  slug?: string;
  fallbackAccent: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function HeroImage({ slug, fallbackAccent, alt, className = '', priority }: Props) {
  const url = slug ? heroImageBySlug[slug] : undefined;
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
  }, [url]);

  // Mobile Safari (and any cached navigation) often lands with the image
  // already complete before React attaches the onLoad handler, so the
  // event never fires and the fallback gradient gets stuck on top of a
  // fully-loaded photo. Sync state when the element is already complete.
  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  });

  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-700 ${className}`}
        style={{
          background: `radial-gradient(120% 80% at 50% 30%, ${fallbackAccent}55, transparent 60%), linear-gradient(180deg, #1A1410 0%, #0A0705 100%)`,
          opacity: loaded ? 0 : 1,
        }}
      />
      {url && (
        <img
          ref={imgRef}
          src={url}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </>
  );
}
