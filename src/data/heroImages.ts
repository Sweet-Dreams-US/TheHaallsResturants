// Slug → public-path image map. Files live in public/images/restaurants/.
// Vite resolves base URL automatically so this works on GitHub Pages.
//
// 9/10 of these are nano_banana_2 image-to-image transformations of real
// reference photos provided by the client (Mode A — identity preservation).
// Tap Haus is text-to-image (Mode B) since no reference was supplied.

const base = import.meta.env.BASE_URL;

export const heroImageBySlug: Record<string, string> = {
  'the-gas-house': `${base}images/restaurants/the-gas-house.webp`,
  'the-tavern': `${base}images/restaurants/the-tavern.webp`,
  'the-deck': `${base}images/restaurants/the-deck.webp`,
  'takaoka-of-japan': `${base}images/restaurants/takaoka-of-japan.webp`,
  'the-factory': `${base}images/restaurants/the-factory.webp`,
  'halls-commissary': `${base}images/restaurants/halls-commissary.webp`,
  'halls-hollywood': `${base}images/restaurants/halls-hollywood.webp`,
  'halls-state-street': `${base}images/restaurants/halls-state-street.webp`,
  'tap-haus': `${base}images/restaurants/tap-haus.webp`,
  'triangle-park': `${base}images/restaurants/triangle-park.webp`,
};
