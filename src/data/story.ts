const base = import.meta.env.BASE_URL;

export type StoryEvent = {
  year: number;
  decade: string;
  title: string;
  body: string;
  caption?: string;
  /** Path to image illustrating this milestone */
  image?: string;
  imageAlt?: string;
  /** Restaurant slug if this milestone is "linked" to a specific restaurant */
  linkSlug?: string;
};

export const storyTimeline: StoryEvent[] = [
  {
    year: 1918,
    decade: '1910s',
    title: 'A Meat Market on Bluffton Road',
    body: `The Hall family lays the cornerstone — a butcher shop on Bluffton Road, Fort Wayne. Three generations of the family will stand behind that counter, learning what it means to feed a city.`,
    caption: 'The grandfather opens the doors.',
    image: `${base}timeline/1918-meat-market.jpg`,
    imageAlt: 'A 1918 Hall family meat market — sepia archival photograph',
  },
  {
    year: 1946,
    decade: '1940s',
    title: 'Forty Acres and a Dream',
    body: `Don Hall — fresh from the meat business — buys forty acres of swamp land south of Fort Wayne and builds a drive-in restaurant. Hall's Original opens the day after Thanksgiving, 1946.`,
    caption: `The first carhop. The first cheeseburger. The first "Don Hall's."`,
    image: `${base}timeline/1946-drive-in.jpg`,
    imageAlt: "Hall's Original Drive-In opening day, 1946 — archival photograph",
  },
  {
    year: 1957,
    decade: '1950s',
    title: 'Hollywood Comes to Lima Road',
    body: `A second drive-in opens on Lima Road and never goes out of style. Hall's Hollywood — flashing headlights for service, carhops on roller skates, malts in fountain glasses — operates the same way today.`,
    caption: `Some classics don't get touched.`,
    image: `${base}timeline/1957-hollywood.jpg`,
    imageAlt: "Hall's Hollywood Drive-In, 1957 — vintage Kodachrome",
    linkSlug: 'halls-hollywood',
  },
  {
    year: 1968,
    decade: '1960s',
    title: 'The Tavern Lights Its Lamps',
    body: `On Coventry Lane, The Tavern opens with stained-glass windows shipped in from Chicago, mahogany booths, and a kitchen built around steakhouse classics. It would become the supper club regulars set their week by.`,
    image: `${base}gallery/the-tavern/2.png`,
    imageAlt: 'The Tavern interior — stained glass and supper club warmth',
    linkSlug: 'the-tavern',
  },
  {
    year: 1979,
    decade: '1970s',
    title: 'Two Marquees in One Year',
    body: `The Factory's monumental torch is lit on Coldwater Road; Takaoka of Japan throws its first hibachi flame downtown. Don Hall's pivots from drive-ins toward concept restaurants — each one a different room in a single, bigger house.`,
    caption: 'The chain becomes a portfolio.',
    image: `${base}gallery/the-factory/2.jpg`,
    imageAlt: 'The Factory at dusk — the iconic torch on Coldwater Road',
    linkSlug: 'the-factory',
  },
  {
    year: 1985,
    decade: '1980s',
    title: 'Bud, Sam & Jeff Take the Reins',
    body: `Don's three sons step into operations. Hall's Commissary opens at the New Haven crossroads. The Gas House moves into the restored 1910 gas plant downtown. Fourteen locations, more than a thousand employees on payroll.`,
    caption: 'A family business, run by family.',
    image: `${base}timeline/1985-commissary-opens.jpg`,
    imageAlt: 'Commissary opens, 1985 — three brothers, new building',
    linkSlug: 'halls-commissary',
  },
  {
    year: 2003,
    decade: '2000s',
    title: 'The Deck Opens Over the Water',
    body: `Two stories of cedar plank built directly onto the St Marys River. The Deck becomes the city's seasonal living room — the place Fort Wayne goes the moment the air feels like summer.`,
    image: `${base}gallery/the-deck/1.jpg`,
    imageAlt: 'The Deck — riverside summer dining',
    linkSlug: 'the-deck',
  },
  {
    year: 2011,
    decade: '2010s',
    title: 'Forty Taps in New Haven',
    body: `Tap Haus opens beside the Commissary — forty rotating drafts, a kitchen open until one in the morning on Fridays. The portfolio adds its loudest room.`,
    image: `${base}gallery/tap-haus/2.jpg`,
    imageAlt: "Tap Haus's forty rotating taps",
    linkSlug: 'tap-haus',
  },
  {
    year: 2021,
    decade: '2020s',
    title: '75 Years, Still Hot',
    body: `Don Hall's marks 75 years of Fort Wayne hospitality. Don has passed; Bud Hall, the steady hand at the wheel for decades, soon will too. The grandkids are in the office now — third generation, same recipes.`,
    caption: `"We've been serving it hot for 75 years."`,
    image: `${base}gallery/the-gas-house/3.jpg`,
    imageAlt: 'The Hall family legacy — vintage interior',
  },
  {
    year: 2026,
    decade: '2020s',
    title: 'Triangle Park Returns',
    body: `The Trier Road waterfront retreat reopens after a two-year refurbishment. Ten kitchens, one family — eighty years and counting.`,
    caption: 'The next chapter.',
    image: `${base}gallery/triangle-park/2.jpg`,
    imageAlt: 'Triangle Park — reopening Spring 2026',
    linkSlug: 'triangle-park',
  },
];

export const storyQuotes: { quote: string; attribution: string }[] = [
  {
    quote: `"Forty acres of swamp land, and a dream."`,
    attribution: `Don Hall, on opening Hall's Original Drive-In, 1946`,
  },
  {
    quote: `"Quality, service, and value. That's the whole thing."`,
    attribution: 'House motto, framed in every kitchen',
  },
  {
    quote: `"The fanciest restaurant in town has a drive-in for a grandfather."`,
    attribution: `Visit Fort Wayne, on the Don Hall's portfolio`,
  },
];
