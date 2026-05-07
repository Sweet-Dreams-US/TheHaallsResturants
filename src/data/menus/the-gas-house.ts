import type { RestaurantMenu } from '../menus';

const id = (n: string) => `the-gas-house__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const gasHouse: RestaurantMenu = {
  slug: 'the-gas-house',
  source: 'estimated',
  sections: [
    {
      title: 'To Start',
      items: [
        { id: id('Oyster Tower'), name: 'Oyster Tower', description: 'A dozen East Coast oysters on crushed ice, three mignonettes, lemon', price: 38, tags: ['Signature'] },
        { id: id('Crab Cakes'), name: 'Crab Cakes', description: 'Sweet corn pico, chipotle aioli, watercress', price: 18 },
        { id: id('Tuna Tartare'), name: 'Tuna Tartare', description: 'Yellowfin, avocado, ginger ponzu, crispy wonton', price: 19 },
        { id: id('Beef Tartare'), name: 'Beef Tartare', description: 'Hand-cut tenderloin, capers, shallot, quail egg, brioche toast', price: 21 },
        { id: id('Bone Marrow'), name: 'Bone Marrow', description: 'Roasted beef bone, parsley salad, grilled sourdough', price: 17 },
      ],
    },
    {
      title: 'Salads',
      items: [
        { id: id('Iceberg Wedge'), name: 'Iceberg Wedge', description: 'Bacon lardons, blue cheese, tomato confit, buttermilk dressing', price: 14 },
        { id: id('Caesar'), name: 'Caesar', description: 'Romaine, shaved parmesan, sourdough croutons, white anchovy', price: 13 },
        { id: id('Roasted Beet'), name: 'Roasted Beet', description: 'Goat cheese, candied walnuts, orange supremes, white balsamic', price: 14 },
      ],
    },
    {
      title: 'From the Steakhouse',
      note: 'All steaks served with a side. Toppers: peppercorn sauce 3, mushrooms 4, oscar 10, lobster tail 23.',
      items: [
        { id: id('Bone-In Ribeye 16oz'), name: 'Bone-In Ribeye 16oz', description: 'Cast-iron seared, rosemary-thyme butter, smoked sea salt', price: 54, tags: ['Signature'] },
        { id: id('Filet Mignon 8oz'), name: 'Filet Mignon 8oz', description: 'Center cut, bone marrow butter, charred shallot', price: 48 },
        { id: id('New York Strip 12oz'), name: 'New York Strip 12oz', description: 'Dry-aged, herb compound butter', price: 42 },
        { id: id('Wagyu Sirloin 8oz'), name: 'Wagyu Sirloin 8oz', description: 'Snake River Farms, finishing salt, watercress', price: 56, tags: ['Premium'] },
      ],
    },
    {
      title: 'From the Sea',
      items: [
        { id: id('Pan-Seared Walleye'), name: 'Pan-Seared Walleye', description: 'Brown-butter caper sauce, fingerling potatoes, asparagus', price: 32 },
        { id: id('Twin Lobster Tails'), name: 'Twin Lobster Tails', description: 'Two five-ounce tails, drawn butter, lemon', price: 55 },
        { id: id('Atlantic Halibut'), name: 'Atlantic Halibut', description: 'Brown-butter risotto, fennel, charred lemon', price: 38 },
      ],
    },
    {
      title: 'Cocktails',
      items: [
        { id: id('Old Fashioned'), name: 'Old Fashioned', description: 'Bulleit Rye, demerara, orange, walnut bitters', price: 13, tags: ['Signature'] },
        { id: id('Manhattan'), name: 'Manhattan', description: 'Buffalo Trace, sweet vermouth, brandied cherry', price: 13 },
        { id: id('Negroni'), name: 'Negroni', description: 'Tanqueray, Campari, sweet vermouth, orange peel', price: 12 },
        { id: id('French 75'), name: 'French 75', description: "Hendrick's, lemon, demerara, prosecco", price: 13 },
      ],
    },
    {
      title: 'Dessert',
      items: [
        { id: id('Creme Brulee'), name: 'Crème Brûlée', description: 'Madagascar vanilla, brûléed sugar, fresh berries', price: 11 },
        { id: id('Chocolate Torte'), name: 'Chocolate Torte', description: 'Flourless, raspberry coulis, vanilla bean ice cream', price: 12 },
      ],
    },
  ],
};
