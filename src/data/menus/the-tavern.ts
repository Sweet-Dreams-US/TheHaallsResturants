import type { RestaurantMenu } from '../menus';

const id = (n: string) => `the-tavern__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const tavern: RestaurantMenu = {
  slug: 'the-tavern',
  source: 'estimated',
  sections: [
    {
      title: 'Tavern Starters',
      items: [
        { id: id('Tavern Onion Rings'), name: 'Tavern Onion Rings', description: 'House-battered, horsey sauce', price: 9 },
        { id: id('Cheese Curds'), name: 'Beer-Battered Cheese Curds', description: 'Wisconsin white cheddar, ranch', price: 11 },
        { id: id('French Onion Soup'), name: 'French Onion Soup', description: 'Sweet onions, beef stock, gruyère crust', price: 10 },
        { id: id('Spinach Artichoke Dip'), name: 'Spinach Artichoke Dip', description: 'Pita chips, parmesan, garlic', price: 12 },
      ],
    },
    {
      title: 'Tavern Classics',
      note: 'Served with choice of two sides.',
      items: [
        { id: id('Tavern French Dip'), name: 'Tavern French Dip', description: 'Slow-roasted prime rib, gruyère, garlic baguette, au jus', price: 19, tags: ['Most Loved'] },
        { id: id('Beef Stroganoff'), name: 'Beef Stroganoff', description: 'Tender beef tips, mushroom-cream sauce, egg noodles', price: 22 },
        { id: id('Chicken Pot Pie'), name: 'Chicken Pot Pie', description: 'Buttermilk-biscuit lid, white-wine cream, root vegetables', price: 18 },
        { id: id('Hot Roast Beef'), name: 'Hot Roast Beef Sandwich', description: 'Open-face on Texas toast, mashed potatoes, gravy', price: 16 },
        { id: id('Liver Onions'), name: 'Liver & Onions', description: 'Pan-fried, bacon, caramelized onions, mashed', price: 16 },
      ],
    },
    {
      title: 'Steaks',
      note: 'All steaks come with one side and house bread.',
      items: [
        { id: id('Tavern Sirloin 8oz'), name: 'Tavern Sirloin 8oz', description: 'Char-grilled, herb butter', price: 22 },
        { id: id('NY Strip 12oz'), name: 'New York Strip 12oz', description: 'Dry-aged, garlic butter, peppercorn crust', price: 32 },
        { id: id('Filet Mignon 8oz'), name: 'Filet Mignon 8oz', description: 'Center cut, sautéed mushrooms', price: 38 },
      ],
    },
    {
      title: 'Cocktails',
      items: [
        { id: id('House Manhattan'), name: 'House Manhattan', description: 'Buffalo Trace, sweet vermouth, Angostura, brandied cherry', price: 12, tags: ['Signature'] },
        { id: id('Old Fashioned T'), name: 'Old Fashioned', description: 'Bulleit, demerara, orange, walnut bitters', price: 12 },
        { id: id('Tavern Martini'), name: 'Tavern Martini', description: "Tito's, dry vermouth, three olives", price: 11 },
      ],
    },
  ],
};
