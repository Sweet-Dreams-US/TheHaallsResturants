import { useEffect, useState } from 'react';
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

  useEffect(() => { setLoaded(false); }, [url]);

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
          src={url}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </>
  );
}
