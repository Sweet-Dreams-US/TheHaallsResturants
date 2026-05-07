// Per-restaurant gallery images. Real photos sourced from donhalls.com and the
// client's own provided assets. Served from public/gallery/<slug>/.
//
// Captions are written to feel like an editor wrote them, not a marketing
// auto-tagger — short, evocative, location-specific.

const base = import.meta.env.BASE_URL;

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export const galleryBySlug: Record<string, GalleryImage[]> = {
  'the-gas-house': [
    { src: `${base}gallery/the-gas-house/1.png`, alt: 'Gas House exterior', caption: 'The historic restored 1910 gas plant on Superior Street.' },
    { src: `${base}gallery/the-gas-house/2.png`, alt: 'Main entrance', caption: 'The main entrance — riveted iron meets warm tungsten light.' },
    { src: `${base}gallery/the-gas-house/3.jpg`, alt: 'Original interior', caption: 'A vintage shot of the dining room — the bones of the old gas plant.' },
    { src: `${base}gallery/the-gas-house/4.jpg`, alt: 'Bar service', caption: 'Cocktails poured at the bar.' },
    { src: `${base}gallery/the-gas-house/5.jpg`, alt: 'Plated dish', caption: 'A plate from the kitchen.' },
    { src: `${base}gallery/the-gas-house/6.jpg`, alt: 'Steakhouse moment', caption: 'A night at the Gas House.' },
    { src: `${base}gallery/the-gas-house/7.jpg`, alt: 'Tableside', caption: 'Dinner service in the main room.' },
  ],
  'the-tavern': [
    { src: `${base}gallery/the-tavern/1.png`, alt: 'Tavern front', caption: 'The Coventry Lane front — a neighborhood landmark since 1997.' },
    { src: `${base}gallery/the-tavern/2.png`, alt: 'Tavern interior', caption: 'Stained glass and supper-club warmth inside.' },
    { src: `${base}gallery/the-tavern/3.jpg`, alt: 'Tavern detail', caption: 'A booth on a quiet weeknight.' },
  ],
  'the-deck': [
    { src: `${base}gallery/the-deck/1.jpg`, alt: 'The Deck on the water', caption: 'Two stories of cedar plank built right on the St Marys River.' },
    { src: `${base}gallery/the-deck/2.jpg`, alt: 'Deck summer crowd', caption: 'Summer at the Deck — when Fort Wayne shows up.' },
    { src: `${base}gallery/the-deck/3.jpg`, alt: 'Riverside view', caption: 'The river view from the upper deck.' },
  ],
  'takaoka-of-japan': [
    { src: `${base}gallery/takaoka-of-japan/1.jpg`, alt: 'Takaoka interior', caption: 'The hibachi room — flames, paper lanterns, sake bottles backlit on the wall.' },
    { src: `${base}gallery/takaoka-of-japan/2.png`, alt: 'Takaoka exterior', caption: 'The downtown entrance.' },
    { src: `${base}gallery/takaoka-of-japan/3.jpg`, alt: 'Hibachi flame', caption: 'Showtime at the teppan grill.' },
    { src: `${base}gallery/takaoka-of-japan/4.jpg`, alt: 'Sushi bar', caption: 'Fresh-cut nigiri at the sushi counter.' },
    { src: `${base}gallery/takaoka-of-japan/5.jpg`, alt: 'Plated entree', caption: 'Filet & shrimp, hot off the teppan.' },
  ],
  'the-factory': [
    { src: `${base}gallery/the-factory/1.jpg`, alt: 'Factory front with torch', caption: 'Look for the torch on Coldwater Road.' },
    { src: `${base}gallery/the-factory/2.jpg`, alt: 'Factory exterior at dusk', caption: 'Warm lamps, sandstone, and the unmistakable factory marquee.' },
    { src: `${base}gallery/the-factory/3.jpg`, alt: 'Factory interior', caption: 'The dining room — polished walnut and white napkins.' },
    { src: `${base}gallery/the-factory/4.jpg`, alt: 'Prime rib carved', caption: 'Slow-roasted prime rib, carved tableside.' },
    { src: `${base}gallery/the-factory/5.jpg`, alt: 'Plated steak', caption: 'A plate from the kitchen, cooked to order.' },
    { src: `${base}gallery/the-factory/6.jpg`, alt: 'Cocktail moment', caption: 'A signature pour at the Factory bar.' },
  ],
  'halls-commissary': [
    { src: `${base}gallery/halls-commissary/1.png`, alt: 'Commissary front', caption: 'Where 14 meets 930 in New Haven.' },
    { src: `${base}gallery/halls-commissary/2.jpg`, alt: 'Commissary inside', caption: 'The dining room — built for big plates and bigger groups.' },
    { src: `${base}gallery/halls-commissary/3.jpg`, alt: 'Plate detail', caption: 'A heaping plate, the Commissary way.' },
    { src: `${base}gallery/halls-commissary/4.jpg`, alt: 'Comfort food', caption: 'Comfort food, generously plated.' },
    { src: `${base}gallery/halls-commissary/5.jpg`, alt: 'Counter service', caption: 'Friendly faces at the counter.' },
  ],
  'halls-hollywood': [
    { src: `${base}gallery/halls-hollywood/1.jpg`, alt: 'Hollywood drive-in', caption: 'The canopy on Lima Road. Flash your headlights.' },
    { src: `${base}gallery/halls-hollywood/2.jpg`, alt: 'Bacon Cheese Fries', caption: 'Bacon cheese fries — a Hollywood classic.' },
    { src: `${base}gallery/halls-hollywood/3.jpg`, alt: 'Buffalo Mac', caption: "Buffalo mac & cheese — what we're known for." },
    { src: `${base}gallery/halls-hollywood/4.jpg`, alt: 'NY Strip', caption: 'New York strip, drive-in style.' },
    { src: `${base}gallery/halls-hollywood/5.jpg`, alt: 'Drive-in moment', caption: "Hollywood at night — neon, malts, and headlights." },
  ],
  'halls-state-street': [
    { src: `${base}gallery/halls-state-street/1.webp`, alt: 'State Street front', caption: 'The East State Village staple.' },
    { src: `${base}gallery/halls-state-street/2.jpg`, alt: 'State Street interior', caption: 'Booths and counter — the way it looked when you grew up.' },
    { src: `${base}gallery/halls-state-street/3.jpg`, alt: 'State Street plate', caption: 'A plate from breakfast service.' },
  ],
  'tap-haus': [
    { src: `${base}gallery/tap-haus/1.jpg`, alt: 'Tap Haus interior', caption: "Inside Tap Haus — New Haven's craft-beer destination." },
    { src: `${base}gallery/tap-haus/2.jpg`, alt: 'The 40 taps', caption: 'Forty rotating taps. Bear jersey optional.' },
  ],
  'triangle-park': [
    { src: `${base}gallery/triangle-park/1.png`, alt: 'Triangle Park front', caption: 'The Trier Road entrance, hidden in the trees.' },
    { src: `${base}gallery/triangle-park/2.jpg`, alt: 'Triangle Park interior', caption: 'The waterfront dining room — flooded with afternoon light.' },
    { src: `${base}gallery/triangle-park/3.jpg`, alt: 'Triangle Park interior 2', caption: 'A second look at the dining room.' },
    { src: `${base}gallery/triangle-park/4.jpg`, alt: 'Triangle Park 4', caption: 'The room remembers everyone who came through.' },
    { src: `${base}gallery/triangle-park/5.jpg`, alt: 'Triangle Park 5', caption: 'Returning Spring 2026.' },
  ],
};

export const getGallery = (slug: string): GalleryImage[] => galleryBySlug[slug] ?? [];
