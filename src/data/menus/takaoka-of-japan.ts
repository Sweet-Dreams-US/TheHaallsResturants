import type { RestaurantMenu } from '../menus';

const id = (n: string) => `takaoka-of-japan__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const takaoka: RestaurantMenu = {
  slug: 'takaoka-of-japan',
  source: 'pdf',
  pdfUrl: 'https://www.donhalls.com/s/Takaoka-2025_Dinner-Menu_Final.pdf',
  sections: [
    {
      title: 'Takaoka Special Dinner',
      items: [
        { id: id('Takaoka Special'), name: 'Takaoka Special Dinner', description: 'Filet mignon and lobster tail, soup à la Japanese, Takaoka salad, hibachi shrimp, hibachi vegetables, rice, hot tea, plum wine', price: 52, tags: ['Signature'] },
      ],
    },
    {
      title: 'Hibachi Entrées',
      note: 'Include soup à la Japanese, ginger salad, hibachi shrimp, vegetables, hot tea & steamed rice. Sub fried rice +$2.',
      items: [
        { id: id('Steak Hibachi'), name: 'Steak Hibachi', description: 'Prime New York cut, sizzled to perfection', price: 36 },
        { id: id('Filet Mignon Hibachi'), name: 'Filet Mignon Hibachi', description: 'Delicately seasoned heart of the tenderloin', price: 40 },
        { id: id('Shrimp Hibachi'), name: 'Shrimp Hibachi', description: 'Seared and simply seasoned', price: 36 },
        { id: id('Chicken Hibachi'), name: 'Chicken Hibachi', description: 'Grilled tender morsels with sesame', price: 26 },
        { id: id('Chilean Sea Bass'), name: 'Chilean Sea Bass', description: 'Japanese style', price: 36 },
        { id: id('Yellow Fin Tuna'), name: 'Yellow Fin Tuna Steak', description: "Johnny C's favorite — best served rare", price: 34 },
        { id: id('Teriyaki Salmon'), name: 'Teriyaki Salmon', description: 'The best around', price: 31 },
        { id: id('Mahi Mahi'), name: 'Mahi Mahi', description: 'Mild and sweet, a Pacific favorite', price: 34 },
        { id: id('Kobe Ribeye'), name: 'SRF Kobe Ribeye', description: 'Snake River Farms — rich marbling for succulent taste', price: 57, tags: ['Premium'] },
        { id: id('Japanese Stir Fry'), name: 'Japanese Stir-Fry', description: 'Variety of vegetables with chicken or shrimp', price: 28 },
        { id: id('Steak Takaoka'), name: 'Steak Takaoka', description: 'A delmonico à la Japanese', price: 37 },
        { id: id('Steak Sukiyaki'), name: 'Steak Sukiyaki', description: 'Thinly sliced beef', price: 31 },
        { id: id('Scallops Tepan'), name: 'Scallops Tepan', description: 'Freshly shipped daily', price: 36 },
        { id: id('Lobster Samurai'), name: 'Lobster Samurai', description: 'Twin cold-water lobster tails', price: 54 },
        { id: id('Teriyaki Tofu'), name: 'Teriyaki Tofu', description: 'Seared with our house teriyaki glaze', price: 28 },
      ],
    },
    {
      title: 'Combinations',
      items: [
        { id: id('Filet Shrimp'), name: 'Filet Mignon & Shrimp', description: 'By popular demand', price: 41, tags: ['Popular'] },
        { id: id('Oishi Teishoku'), name: 'Oishi Teishoku', description: 'Chicken and filet mignon', price: 34 },
        { id: id('Ebi Hotate'), name: 'Ebi Hotate Teishoku', description: 'Shrimp and scallops', price: 38 },
        { id: id('Ushi Hotate'), name: 'Ushi Hotate Teishoku', description: 'Filet mignon and scallops', price: 42 },
        { id: id('Ebi Tori'), name: 'Ebi Tori Teishoku', description: 'Shrimp and chicken', price: 35 },
        { id: id('Tori Hotate'), name: 'Tori Hotate Teishoku', description: 'Chicken and scallops', price: 36 },
      ],
    },
    {
      title: 'Sides',
      items: [
        { id: id('Hibachi Shrimp Side'), name: 'Hibachi Shrimp', price: 15 },
        { id: id('Ginger Salad'), name: 'Ginger Salad', price: 5 },
        { id: id('Soup'), name: 'Soup à la Japanese', price: 5 },
        { id: id('Fried Rice'), name: 'Fried Rice', price: 5 },
        { id: id('Steamed Rice'), name: 'Steamed Rice', price: 3 },
      ],
    },
    {
      title: 'Signature Cocktails',
      items: [
        { id: id('Cherry Blossom'), name: 'Cherry Blossom Martini', description: 'Raspberry vodka, Chambord, raspberry purée, rose syrup, lemonade', price: 12 },
        { id: id('Takaoka Special Cocktail'), name: 'Takaoka Special', description: 'Suntory Toki whiskey, sour', price: 12 },
        { id: id('White Lotus'), name: 'White Lotus', description: 'Vodka, peach schnapps, sour, Starry', price: 11 },
        { id: id('Big Wave'), name: 'The Big Wave', description: 'Malibu pineapple, blue curaçao, crème de coconut, pineapple juice', price: 12 },
        { id: id('Blue Dragon'), name: 'Blue Dragon', description: 'Blue curaçao, rum, vodka, gin, tequila, triple sec, sweet & sour, Starry', price: 12 },
        { id: id('Mai Tai'), name: 'Mai Tai', description: 'Rum, crème de banana, apricot brandy, cherry brandy', price: 11 },
        { id: id('Tokyo Tea'), name: 'Tokyo Tea', description: 'Midori, rum, vodka, gin, tequila, triple sec, sweet & sour, Starry', price: 12 },
      ],
    },
    {
      title: 'Sake',
      items: [
        { id: id('Hot Sake'), name: 'Hot Sake', description: 'One bottle (300ml)', price: 9 },
        { id: id('Sake Bomb'), name: 'Sake Bomb Combo', description: 'Serves four — house sake "bomb style" with beer', price: 14 },
        { id: id('Hakutsaru Blue'), name: 'Hakutsaru Blue Sayuri Nigori', description: 'Unfiltered, naturally sweet, refreshing aroma (300ml)', price: 20 },
        { id: id('Hakutsaru Pink'), name: 'Hakutsaru Pink Sayuri Nigori', description: 'Filtered, naturally sweet, creamy finish (300ml)', price: 18 },
      ],
    },
  ],
};
