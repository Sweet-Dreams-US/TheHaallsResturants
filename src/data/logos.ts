// Restaurant logos sourced directly from donhalls.com — these are the real
// brand marks. The master "Don Hall's" script lives at /logos/halls-master.png
// and is used in nav, footer, and as a wordmark on every restaurant page.
//
// 9 of 10 restaurants have their own real logo; halls-state-street uses the
// master script as a wordmark fallback.

const base = import.meta.env.BASE_URL;

export const masterLogo = `${base}logos/halls-master.png`;

export const restaurantLogo: Record<string, string | undefined> = {
  'the-gas-house': `${base}logos/the-gas-house.png`,
  'the-tavern': `${base}logos/the-tavern.png`,
  'the-deck': `${base}logos/the-deck.png`,
  'takaoka-of-japan': `${base}logos/takaoka-of-japan.png`,
  'the-factory': `${base}logos/the-factory.png`,
  'halls-commissary': `${base}logos/halls-commissary.png`,
  'halls-hollywood': `${base}logos/halls-hollywood.png`,
  'halls-state-street': undefined, // falls back to master wordmark
  'tap-haus': `${base}logos/tap-haus.png`,
  'triangle-park': `${base}logos/triangle-park.png`,
};
