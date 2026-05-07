export type StoryEvent = {
  year: number;
  decade: string;
  title: string;
  body: string;
  caption?: string;
};

export const storyTimeline: StoryEvent[] = [
  {
    year: 1918,
    decade: '1910s',
    title: 'A Meat Market on Bluffton Road',
    body: `The Hall family lays the cornerstone — a butcher shop on Bluffton Road, Fort Wayne. Three generations of the family will stand behind that counter, learning what it means to feed a city.`,
    caption: 'The grandfather opens the doors.',
  },
  {
    year: 1946,
    decade: '1940s',
    title: 'Forty Acres and a Dream',
    body: `Don Hall — fresh from the meat business — buys forty acres of swamp land south of Fort Wayne and builds a drive-in restaurant. Hall's Original opens the day after Thanksgiving, 1946.`,
    caption: `The first carhop. The first cheeseburger. The first "Don Hall's."`,
  },
  {
    year: 1957,
    decade: '1950s',
    title: 'Hollywood Comes to Lima Road',
    body: `A second drive-in opens on Lima Road and never goes out of style. Hall's Hollywood — flashing headlights for service, carhops on roller skates, malts in fountain glasses — operates the same way today.`,
    caption: `Some classics don't get touched.`,
  },
  {
    year: 1968,
    decade: '1960s',
    title: 'The Tavern Lights Its Lamps',
    body: `On Coventry Lane, The Tavern opens with stained-glass windows shipped in from Chicago, mahogany booths, and a kitchen built around steakhouse classics. It would become the supper club regulars set their week by.`,
  },
  {
    year: 1979,
    decade: '1970s',
    title: 'Two Marquees in One Year',
    body: `The Factory's monumental torch is lit on Coldwater Road; Takaoka of Japan throws its first hibachi flame downtown. Don Hall's pivots from drive-ins toward concept restaurants — each one a different room in a single, bigger house.`,
    caption: 'The chain becomes a portfolio.',
  },
  {
    year: 1985,
    decade: '1980s',
    title: 'Bud, Sam & Jeff Take the Reins',
    body: `Don's three sons step into operations. Hall's Commissary opens at the New Haven crossroads. The Gas House moves into the restored 1910 gas plant downtown. Fourteen locations, more than a thousand employees on payroll.`,
    caption: 'A family business, run by family.',
  },
  {
    year: 2003,
    decade: '2000s',
    title: 'The Deck Opens Over the Water',
    body: `Two stories of cedar plank built directly onto the St Marys River. The Deck becomes the city's seasonal living room — the place Fort Wayne goes the moment the air feels like summer.`,
  },
  {
    year: 2011,
    decade: '2010s',
    title: 'Forty Taps in New Haven',
    body: `Tap Haus opens beside the Commissary — forty rotating drafts, a kitchen open until one in the morning on Fridays. The portfolio adds its loudest room.`,
  },
  {
    year: 2021,
    decade: '2020s',
    title: '75 Years, Still Hot',
    body: `Don Hall's marks 75 years of Fort Wayne hospitality. Don has passed; Bud Hall, the steady hand at the wheel for decades, soon will too. The grandkids are in the office now — third generation, same recipes.`,
    caption: `"We've been serving it hot for 75 years."`,
  },
  {
    year: 2026,
    decade: '2020s',
    title: 'Triangle Park Returns',
    body: `The Trier Road waterfront retreat reopens after a two-year refurbishment. Ten kitchens, one family — eighty years and counting.`,
    caption: 'The next chapter.',
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
