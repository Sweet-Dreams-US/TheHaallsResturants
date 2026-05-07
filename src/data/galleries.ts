// Per-restaurant gallery images. Real photos provided by the client, served
// from public/gallery/<slug>/. Captions are optional but improve UX.

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
  ],
  'the-tavern': [
    { src: `${base}gallery/the-tavern/1.png`, alt: 'Tavern front', caption: 'The Coventry Lane front — a neighborhood landmark since 1997.' },
    { src: `${base}gallery/the-tavern/2.png`, alt: 'Tavern interior', caption: 'Stained glass and supper-club warmth inside.' },
  ],
  'the-deck': [
    { src: `${base}gallery/the-deck/1.jpg`, alt: 'The Deck on the water', caption: 'Two stories of cedar plank built right on the St Marys River.' },
  ],
  'takaoka-of-japan': [
    { src: `${base}gallery/takaoka-of-japan/1.jpg`, alt: 'Takaoka interior', caption: 'The hibachi room — flames, paper lanterns, sake bottles backlit on the wall.' },
    { src: `${base}gallery/takaoka-of-japan/2.png`, alt: 'Takaoka exterior', caption: 'The downtown entrance.' },
  ],
  'the-factory': [
    { src: `${base}gallery/the-factory/1.jpg`, alt: 'Factory front with torch', caption: 'Look for the torch on Coldwater Road.' },
  ],
  'halls-commissary': [
    { src: `${base}gallery/halls-commissary/1.png`, alt: 'Commissary front', caption: 'Where 14 meets 930 in New Haven.' },
    { src: `${base}gallery/halls-commissary/2.jpg`, alt: 'Commissary inside', caption: 'The dining room — built for big plates and bigger groups.' },
  ],
  'halls-hollywood': [
    { src: `${base}gallery/halls-hollywood/1.jpg`, alt: 'Hollywood drive-in', caption: 'The canopy on Lima Road. Flash your headlights.' },
  ],
  'halls-state-street': [
    { src: `${base}gallery/halls-state-street/1.webp`, alt: 'State Street front', caption: 'The East State Village staple.' },
  ],
  'tap-haus': [],
  'triangle-park': [
    { src: `${base}gallery/triangle-park/1.png`, alt: 'Triangle Park front', caption: 'The Trier Road entrance, hidden in the trees.' },
    { src: `${base}gallery/triangle-park/2.jpg`, alt: 'Triangle Park interior', caption: 'The waterfront dining room — flooded with afternoon light.' },
    { src: `${base}gallery/triangle-park/3.jpg`, alt: 'Triangle Park interior 2', caption: 'A second look at the dining room.' },
  ],
};

export const getGallery = (slug: string): GalleryImage[] => galleryBySlug[slug] ?? [];
