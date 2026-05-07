import { restaurantLogo, masterLogo } from '../data/logos';

type Props = {
  slug: string;
  name: string;
  /** Short name to render under the master wordmark when there's no per-restaurant mark */
  shortName?: string;
  className?: string;
  /** When true, applies a CSS filter that converts dark-on-white logos to cream-on-dark */
  invert?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const sizeClasses = {
  sm: 'h-8 max-w-[120px]',
  md: 'h-12 max-w-[180px]',
  lg: 'h-20 max-w-[280px]',
  xl: 'h-28 max-w-[440px]',
};

export default function RestaurantLogo({
  slug,
  name,
  shortName,
  className = '',
  invert = false,
  size = 'md',
}: Props) {
  const url = restaurantLogo[slug];

  // Most logos are black-on-white. To display them on dark backgrounds,
  // we apply CSS filter: invert + slight warm tint to match the cream palette.
  const filterStyle = invert
    ? { filter: 'invert(0.96) sepia(0.15) saturate(1.1) hue-rotate(345deg) brightness(1.04)' }
    : undefined;

  if (!url) {
    // Fallback: master "Don Hall's" wordmark with the restaurant name underneath
    return (
      <div className={`flex flex-col items-center gap-1 ${sizeClasses[size]} ${className}`}>
        <img
          src={masterLogo}
          alt={`Don Hall's ${name}`}
          className="w-full object-contain"
          style={filterStyle}
        />
        {shortName && (
          <span
            className="font-mono text-[9px] uppercase tracking-[0.32em] opacity-80"
            style={{ color: invert ? '#F5EFE2' : '#1A1410' }}
          >
            {shortName}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      className={`object-contain ${sizeClasses[size]} ${className}`}
      style={filterStyle}
    />
  );
}
