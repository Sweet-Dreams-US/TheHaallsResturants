import type { RestaurantMenu } from '../menus';

const id = (n: string) => `halls-commissary__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const commissary: RestaurantMenu = {
  slug: 'halls-commissary',
  source: 'pdf',
  pdfUrl: 'https://www.donhalls.com/s/Halls-Commisary-Menu-Spring-2024.pdf',
  sections: [
    {
      title: 'Commissary Favorites · Breakfast',
      subtitle: 'Breakfast served anytime',
      items: [
        { id: id('Steak Eggs'), name: 'Steak & Eggs', description: 'Two eggs any style and choice of a 7 oz sirloin or an 8 oz hamburger steak, hash browns or fruit, toast', price: 14.25 },
        { id: id('Buster Breakfast'), name: "Buster's Breakfast", description: 'Three eggs, corned beef hash, two sausage links, two strips and a half order of ham, toast', price: 13.5 },
        { id: id('CB Hash Eggs'), name: 'Corned Beef Hash & Eggs', description: 'Served with toast', price: 9.95 },
        { id: id('Breakfast Special'), name: 'Breakfast Special', description: 'Two eggs any style with choice of bacon, ham or sausage, hash browns or fruit, toast', price: 9.95 },
        { id: id('Two Eggs'), name: 'Two Eggs Any Style', description: 'With choice of meat and toast', price: 9.25 },
        { id: id('Hoosier Boy'), name: 'Hoosier Boy Breakfast', description: 'Two pancakes, two pieces French toast or a half-order of biscuits & gravy, two eggs and choice of ham, bacon or sausage', price: 12.5, tags: ['Hoosier'] },
      ],
    },
    {
      title: 'Three-Egg Omelettes',
      note: 'Served with hash browns or fresh fruit.',
      items: [
        { id: id('Western'), name: 'Western Omelette', description: 'Ham, onion, peppers, American cheese', price: 12.75 },
        { id: id('Meat Lovers'), name: "Meat Lover's Omelette", description: 'Bacon, ham, sausage, cheese', price: 13.25 },
        { id: id('Veggie Cheese'), name: 'Veggie & Cheese Omelette', description: 'Onion, green pepper, mushrooms, tomato, American cheese', price: 12.5 },
        { id: id('Spinach'), name: 'Spinach Omelette', description: 'Stuffed with spinach dip and cheddar cheese', price: 12.5 },
        { id: id('Mexi'), name: 'Mexi Omelette', description: 'Nacho beef, cheddar, jalapeños, salsa on the side', price: 12.5 },
        { id: id('Cheese O'), name: 'Cheese Omelette', price: 10.75 },
      ],
    },
    {
      title: 'Skillets',
      note: 'All skillets are made with hash browns and two eggs any style. Served with toast.',
      items: [
        { id: id('Chicken Skillet'), name: 'Chicken Skillet', description: 'Chicken, tomato, peppers, onion, jack cheese, salsa', price: 13.95 },
        { id: id('Veggie Skillet'), name: 'Veggie Skillet', description: 'Mushrooms, onion, tomato, peppers, creamed spinach, cheddar', price: 12.95 },
        { id: id('Cowboy Skillet'), name: 'Cowboy Skillet', description: 'Bacon, American cheese, seasonal chili', price: 13.25 },
        { id: id('Farmer Skillet'), name: "Farmer's Skillet", description: 'Choice of sausage, bacon or ham and sausage gravy', price: 12.95 },
        { id: id('Colorado Skillet'), name: 'Colorado Skillet', description: 'Ham, onion, green pepper, cheddar', price: 12.95 },
        { id: id('Meat Lovers Skillet'), name: "Meat Lover's Skillet", description: 'Ham, bacon, sausage, cheddar, sausage gravy', price: 13.95 },
      ],
    },
    {
      title: 'Hand Cut Steaks',
      note: "All steaks seasoned and char-grilled. Toppers: black 'n' bleu, sautéed mushrooms & onions — $2 each.",
      items: [
        { id: id('Ribeye'), name: 'Ribeye 11oz', price: 24.95 },
        { id: id('NY Strip'), name: 'New York Strip 12oz', price: 25.95 },
        { id: id('Sirloin'), name: 'Sirloin 7oz', price: 14.95 },
      ],
    },
    {
      title: 'Commissary Prime Rib',
      note: 'Slow-roasted USDA Choice. Served with au jus.',
      items: [
        { id: id('Prime 12oz'), name: 'Prime Rib 12oz Cut', price: 29.95, tags: ['Signature'] },
        { id: id('Prime 8oz'), name: 'Prime Rib 8oz Cut', price: 25.95 },
      ],
    },
    {
      title: 'Big City Burgers',
      note: 'All Big City Burgers are a half-pound (except The New Haven). Make it deluxe +$.50.',
      items: [
        { id: id('Houston'), name: 'The Houston', description: 'Bacon, an onion ring, BBQ sauce, American cheese', price: 13.25 },
        { id: id('Memphis'), name: 'Memphis Two-Fister', description: 'Charbroiled topped with pulled pork, cheddar, coleslaw, Appalachian Kick-Ass Sauce', price: 13.5 },
        { id: id('Detroit'), name: 'The Detroit', description: 'Grilled onions and double American cheese', price: 13 },
        { id: id('New Haven'), name: 'The New Haven', description: 'Two 8 oz patties with bacon, American cheese, lettuce and tomato', price: 17.5, tags: ['Big'] },
        { id: id('Chicago'), name: 'Chicago Burger', description: 'Grilled onion, bacon and mushrooms', price: 13.5 },
        { id: id('Geneva'), name: 'The Geneva', description: 'Double Swiss cheese, mushrooms, garlic mayo', price: 13 },
        { id: id('Big Easy'), name: 'The Big Easy', description: 'Blackened, topped with bleu cheese, grilled onion and a fried egg', price: 13.5 },
        { id: id('Uncle Sam'), name: 'The Uncle Sam Burger', description: 'Doubled smashed patty, American cheese, shredded lettuce, tomato, onion, pickle, Sammy sauce', price: 13.25 },
      ],
    },
    {
      title: 'Tap Haus Starters',
      subtitle: 'Shared kitchen with Tap Haus next door',
      items: [
        { id: id('Wings 8'), name: 'Wings — Eight', description: 'Choose BBQ, garlic butter, teriyaki, spicy Asian, buffalo, sweaty buffalo or boom boom', price: 12.5 },
        { id: id('Wings 12'), name: 'Wings — Twelve', price: 17.95 },
        { id: id('Buster Sliders'), name: 'Buster Sliders', description: '$2.95 each / Three for $8.75', price: 8.75 },
        { id: id('Onion Rings'), name: 'Homemade Onion Rings', description: 'Hand-breaded and fried — New Haven famous', price: 6.25, tags: ['Famous'] },
        { id: id('Reuben Eggrolls'), name: 'Reuben Eggrolls', price: 9 },
        { id: id('Southwest Eggrolls'), name: 'Southwest Eggrolls', price: 9 },
        { id: id('Nachos'), name: 'Nachos Supreme', description: 'Beef, beans, cheddar, lettuce, tomato, sour cream, jalapeños, salsa', price: 12.25 },
      ],
    },
    {
      title: 'Big Salads',
      items: [
        { id: id('Chef'), name: 'Chef Salad', description: 'Ham, turkey, cucumber, tomato, cheese, red onion and hard-boiled egg over crisp greens, with a bread stick', price: 12.25 },
        { id: id('Sizzlin Cobb'), name: "Sizzlin' Cobb Salad", description: 'Grilled chicken and bacon over mixed greens with tomato, bleu cheese crumbles, hard-boiled egg, toasted almonds, honey mustard dressing', price: 12.25 },
        { id: id('Southwest'), name: 'Southwest Salad', description: 'Black bean and corn salsa, avocado, jack cheese and tortilla strips with chipotle ranch over mixed greens — choice of chicken or shrimp', price: 14.95 },
        { id: id('Caesar Chicken'), name: 'Caesar Salad with Chicken', description: 'Romaine, croutons, cherry tomatoes, red onion, parmesan', price: 13.25 },
        { id: id('Caesar Salmon'), name: 'Caesar Salad with Salmon', price: 16.95 },
      ],
    },
    {
      title: 'Buster Specialty',
      items: [
        { id: id('Smoked Ribs'), name: "Buster's Smoked Ribs", description: 'A full slab of hickory-smoked, fall-off-the-bone ribs smothered in our homemade BBQ sauce', price: 28.95, tags: ['Specialty'] },
        { id: id('Half Slab'), name: "Buster's Half Slab", price: 18.95 },
        { id: id('Fried Chicken'), name: 'Farm Fresh Fried Chicken', description: 'Four golden fried pieces — always cooked to order', price: 14 },
        { id: id('Salmon'), name: 'Salmon Dinner', description: 'A generous portion — blackened or grilled', price: 17.95 },
      ],
    },
    {
      title: 'Desserts',
      note: 'Add a scoop of ice cream to any dessert +$1.50.',
      items: [
        { id: id('Sundae'), name: 'Commissary Sundae', description: 'Vanilla ice cream drizzled with chocolate syrup and caramel, topped with whipped cream and peanuts', price: 5.95 },
        { id: id('No Share Sundae'), name: 'No Share Sundae', description: 'Chocolate syrup, peanuts and whipped cream', price: 5.75 },
        { id: id('German Choc'), name: 'German Chocolate Cake', description: 'Freshly baked layered cake with caramel-pecan-coconut icing', price: 4.95 },
        { id: id('Milkshake'), name: 'Milkshakes & Malts', description: 'Vanilla, chocolate, strawberry', price: 5.75 },
        { id: id('Root Beer Float'), name: 'Root Beer Float', price: 4.95 },
        { id: id('Pecan Pie'), name: 'Pecan Pie', price: 4 },
        { id: id('Cream Pie'), name: 'Cream Pie', price: 4.25 },
      ],
    },
  ],
};
