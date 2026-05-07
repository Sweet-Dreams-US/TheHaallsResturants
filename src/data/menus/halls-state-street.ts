import type { RestaurantMenu } from '../menus';

const id = (n: string) => `halls-state-street__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const stateStreet: RestaurantMenu = {
  slug: 'halls-state-street',
  source: 'pdf',
  pdfUrl: 'https://www.donhalls.com/s/State-Street-Menu-12-25.pdf',
  sections: [
    {
      title: 'Breakfast Anytime',
      items: [
        { id: id('Breakfast Special'), name: 'Breakfast Special', description: 'Eggs, hash browns, toast with bacon, ham, or sausage', price: 10.49 },
        { id: id('Country Skillet'), name: 'Country Skillet', description: 'Hash browns loaded with onions, peppers, mushrooms, two scrambled eggs, cheddar, sausage gravy + protein', price: 13.99 },
        { id: id('Triple Pig'), name: 'The Triple Pig', description: 'Eggs your way with ham, bacon, or sausage and pancakes, French toast, or biscuits & gravy', price: 13.49 },
        { id: id('CB Skillet'), name: 'Corned Beef Skillet', description: 'Hash, two scrambled eggs, cheddar, onions, peppers, mushrooms', price: 13.99 },
        { id: id('Pancakes'), name: 'Pancakes — Full Stack of Three', description: 'Plain, blueberry, chocolate chip, or pecan +.50', price: 7.49 },
        { id: id('French Toast'), name: 'French Toast', description: '3 slices of battered brioche', price: 7.99 },
        { id: id('Belgian Waffle'), name: 'Belgian Waffle', description: 'Fresh berries and whipped cream topping', price: 10.49 },
        { id: id('Steak Eggs'), name: 'Steak & Eggs', description: 'Eggs any style and a juicy 7oz sirloin, toast, hash browns or fruit', price: 14.99, tags: ['Hearty'] },
      ],
    },
    {
      title: 'Three Egg Omelets',
      note: 'With toast and choice of hash browns or fruit.',
      items: [
        { id: id('Western'), name: 'Western Omelet', description: 'Ham, cheese, grilled onions, bell peppers', price: 11.79 },
        { id: id('Spinach Artichoke'), name: 'Spinach Artichoke Omelet', description: 'Swiss, cheddar', price: 11.49 },
        { id: id('Veggie'), name: 'Veggie Omelet', description: 'Stuffed with melted cheese, onion, peppers, tomato, mushrooms', price: 11.29 },
        { id: id('Meat Lovers'), name: "Meat Lover's Omelet", description: 'Bacon, sausage, ham, cheese', price: 12.79 },
      ],
    },
    {
      title: "Hall's Original",
      items: [
        { id: id('Triple Decker'), name: "Hall's Original Triple Decker", description: 'American, shredded lettuce, secret sauce', price: 5.49, tags: ['1946'] },
        { id: id('Original Bacon'), name: 'The Original with Extra Cheese & Bacon', price: 7.49 },
        { id: id('Loaded Double'), name: 'The Loaded Double', description: 'Cheese, bacon, lettuce, tomato, pickle, onion, mayo', price: 7.29 },
      ],
    },
    {
      title: 'Big Burgers',
      note: "With your choice of fries, slaw, cottage fries, pit beans, tots, mac & cheese, mike's potato salad, or cottage cheese.",
      items: [
        { id: id('Toasted Onion'), name: 'Toasted Onion Roll Burger', description: 'Grilled onions, bacon, and mushrooms', price: 13.99 },
        { id: id('Eight Double'), name: 'Eight Ounce Double', description: 'American, shredded lettuce, tomato, onion, pickle, secret Sammy sauce', price: 13.99 },
        { id: id('Big Mex'), name: 'The Big Mex', description: 'Half-pound burger stuffed with spicy chorizo sausage, queso, lettuce, tomato, onion, cilantro', price: 14.79 },
        { id: id('Hungry Man'), name: 'Hungry Man Buster', description: '3/4 pound', price: 15.29 },
      ],
    },
    {
      title: 'East State Classics',
      note: 'Make it a platter with your choice of two sides for $3.79.',
      items: [
        { id: id('Stacked Meatloaf'), name: 'Stacked Meatloaf', description: 'Garlic-grilled Texas toast, mashed potatoes, brown gravy, onion ring', price: 14.49 },
        { id: id('Icelandic Cod'), name: 'Icelandic Cod', description: 'Deep fried, pan fried, or Cajun blackened', price: 15.29 },
        { id: id('Manhattan'), name: 'Prime Rib Manhattan', description: 'Eight ounces thinly sliced on grilled brioche, mashed potatoes & gravy', price: 21.49 },
        { id: id('Half Chicken'), name: 'Fried Half Chicken', description: 'Four piece dinner — fried to order, more than worth the wait', price: 14.29 },
        { id: id('Pork Chops'), name: 'Pan-Fried Pork Chops', description: 'With bacon and grilled onions', price: 13.29 },
        { id: id('Beef Liver'), name: 'Beef Liver and Onions', description: 'We recommend this selection broiled medium', price: 11.79 },
        { id: id('Ossian Ham'), name: 'Ossian Ham Steak', description: 'Imported directly from Wells County', price: 11.99 },
      ],
    },
    {
      title: 'Steaks',
      note: 'Slow roasted and carved to order with our world famous horseradish sauce.',
      items: [
        { id: id('Prime 12oz'), name: 'Prime Rib 12oz', price: 29.99, tags: ['Famous'] },
        { id: id('Prime 8oz'), name: 'Prime Rib 8oz', price: 22.99 },
        { id: id('NY Strip'), name: 'New York Strip 8oz', price: 17.99 },
        { id: id('Filet'), name: 'Filet Mignon', description: 'With garlic-buttered mushrooms', price: 18.99 },
        { id: id('Sirloin'), name: 'Sirloin Steak 7oz', price: 14.99 },
        { id: id('Hamburger Steak'), name: 'Hamburger Steak', description: 'Fresh ground daily', price: 13.79 },
      ],
    },
    {
      title: 'Big Salads',
      items: [
        { id: id('Cobb'), name: 'Cobb Salad', description: 'Chicken breast, bacon, toasted almonds, tomato, cheddar, boiled egg over fresh cut mixed greens', price: 12.79 },
        { id: id('Chef'), name: 'Chef Salad', description: 'Ham, turkey, cheddar, sliced egg, cucumber, red onion, bell pepper, tomato', price: 12.49 },
        { id: id('Caesar'), name: 'Caesar Salad', description: 'Romaine, parmesan, jack cheese, bacon, diced bell peppers, green onion, creamy Caesar, garlic croutons. +Chicken $3', price: 10.79 },
        { id: id('Asian'), name: 'Asian Chicken Salad', description: 'Romaine, toasted sesame seeds, green onion, cilantro, carrot, cucumber with chilled chopped chicken and sesame-ginger vinaigrette', price: 13.29 },
        { id: id('Pecan'), name: 'Pecan Crusted Chicken Salad', description: 'Greens, cucumber, mandarin oranges, cheddar, almonds, grilled chicken breast, honey-lemon dressing', price: 12.79 },
      ],
    },
    {
      title: 'Sides',
      items: [
        { id: id('French Fries'), name: 'French Fries', priceTiers: [{ label: 'Small', price: 2.79 }, { label: 'Large', price: 4.49 }] },
        { id: id('Tater Tots'), name: 'Tater Tots', price: 3.29 },
        { id: id('Pit Beans'), name: 'BBQ Pit Beans', price: 3.29 },
        { id: id('Mac Cheese'), name: 'Mac & Cheese', price: 3.79 },
        { id: id('Onion Rings'), name: 'Homemade Onion Rings', description: 'Hand breaded and fried to perfection', price: 5.29 },
        { id: id('Cottage Fries'), name: 'Cottage Fries', price: 3.29 },
      ],
    },
  ],
};
