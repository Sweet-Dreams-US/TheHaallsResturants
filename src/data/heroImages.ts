// Slug → public-path image map. Files live in public/images/restaurants/.
// Vite resolves base URL automatically so this works on GitHub Pages.

const base = import.meta.env.BASE_URL;

export const heroImageBySlug: Record<string, string> = {
  'the-gas-house': `${base}images/restaurants/the-gas-house.png`,
  'the-tavern': `${base}images/restaurants/the-tavern.png`,
  'the-deck': `${base}images/restaurants/the-deck.png`,
  'takaoka-of-japan': `${base}images/restaurants/takaoka-of-japan.png`,
  'the-factory': `${base}images/restaurants/the-factory.png`,
  'halls-commissary': `${base}images/restaurants/halls-commissary.png`,
  'halls-hollywood': `${base}images/restaurants/halls-hollywood.png`,
  'halls-state-street': `${base}images/restaurants/halls-state-street.png`,
  'tap-haus': `${base}images/restaurants/tap-haus.png`,
  'triangle-park': `${base}images/restaurants/triangle-park.png`,
};
