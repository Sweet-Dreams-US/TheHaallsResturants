import type { RestaurantMenu } from '../menus';

const id = (n: string) => `tap-haus__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const tapHaus: RestaurantMenu = {
  slug: 'tap-haus',
  source: 'pdf',
  pdfUrl: 'https://www.donhalls.com/s/Halls-Commisary-Menu-Spring-2024.pdf',
  sections: [
    {
      title: 'Tap Haus Starters',
      subtitle: 'Shared kitchen with Commissary',
      items: [
        { id: id('Wings 8'), name: 'Wings — Eight', description: 'Choose BBQ, garlic butter, teriyaki, spicy Asian, buffalo, sweaty buffalo or boom boom', price: 12.5 },
        { id: id('Wings 12'), name: 'Wings — Twelve', price: 17.95 },
        { id: id('Buster Sliders'), name: 'Buster Sliders', description: 'Three for $8.75', price: 8.75 },
        { id: id('Fried Mushrooms'), name: 'Fried Mushrooms', description: 'Served with horsey sauce', price: 8.25 },
        { id: id('Mozzarella'), name: 'Mozzarella Sticks', description: 'Served with marinara', price: 6 },
        { id: id('Onion Rings'), name: 'Homemade Onion Rings', description: 'Hand-breaded and fried — New Haven famous', price: 6.25 },
        { id: id('Spinach Dip'), name: 'Spinach Dip', description: 'With pita chips', price: 12.25 },
        { id: id('Chips Dip'), name: 'Chips & Dip', description: 'Refried beans covered in melted cheddar, served with salsa', price: 9.75 },
        { id: id('Nachos'), name: 'Nachos Supreme', description: 'Topped with beef, beans, cheddar, lettuce, tomato, sour cream, jalapeños, salsa', price: 12.25 },
        { id: id('Cheese Fries'), name: 'Cheese Fries', description: 'Crispy wedges with cheddar cheese, green onion, bacon, Slick Willie Sauce', price: 8.25 },
        { id: id('Chicken Tenders'), name: 'Chicken Tenders', description: 'Four large tenders, plain or with any wing sauce', price: 10.75 },
        { id: id('Reuben Egg'), name: 'Reuben Eggrolls', price: 9 },
        { id: id('Southwest Egg'), name: 'Southwest Eggrolls', price: 9 },
      ],
    },
    {
      title: 'Burgers & Pub Food',
      items: [
        { id: id('Beer Cheese Burger'), name: 'Beer-Cheese Burger', description: 'Half-pound chuck, sharp cheddar-IPA queso, frizzled onions', price: 16, tags: ['Tap Haus'] },
        { id: id('Bavarian'), name: 'Giant Bavarian Pretzel', description: 'Beer-cheese fondue, whole-grain mustard, sea salt', price: 12 },
        { id: id('Brat Plate'), name: 'Brat & Kraut Plate', description: 'House sausage, sauerkraut, pretzel roll, stone-ground mustard', price: 17 },
        { id: id('House Tap Burger'), name: 'House Tap Burger', description: 'Half-pound smashed double, lettuce, tomato, American', price: 14 },
        { id: id('Patty Melt'), name: 'Patty Melt', description: 'Rye, swiss, caramelized onions, thousand island', price: 13 },
      ],
    },
    {
      title: 'Beer Flights',
      subtitle: '40 rotating taps — ask your server',
      items: [
        { id: id('Tap Flight'), name: 'Tap Flight (4)', description: 'Choose any four 5oz pours, tasting card included', price: 12, tags: ['Best Value'] },
        { id: id('IPA Flight'), name: 'IPA Flight', description: 'Four featured IPAs, light to heavy hops', price: 14 },
        { id: id('Sour Flight'), name: 'Sour Flight', description: 'Four featured sours, fruit-forward', price: 14 },
        { id: id('Stout Flight'), name: 'Dark Flight', description: 'Four stouts and porters — chocolate, coffee, oatmeal, imperial', price: 14 },
      ],
    },
  ],
};
