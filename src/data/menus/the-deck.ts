import type { RestaurantMenu } from '../menus';

const id = (n: string) => `the-deck__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const theDeck: RestaurantMenu = {
  slug: 'the-deck',
  source: 'pdf',
  pdfUrl: 'https://www.donhalls.com/s/Deck-Menu-2025.pdf',
  sections: [
    {
      title: 'Big Salads',
      note: 'Add to any salad: chicken +4, grilled tofu +6, shrimp or salmon +9, filet mignon +12.',
      items: [
        { id: id('Beef Tenderloin'), name: 'Beef Tenderloin Salad', description: 'Sliced grilled filet mignon, potato wedges, crumbled bleu cheese, tomato, boiled egg, fried onions', price: 18, tags: ['Signature'] },
        { id: id('Banh Mi'), name: 'Banh Mi Salad', description: 'Cucumber, carrot, green onion, cilantro, cabbage, toasted sesame seeds, sesame-ginger vinaigrette, cubed yellowfin tuna', price: 16 },
        { id: id('Pecan Crusted Chicken'), name: 'Pecan Crusted Chicken', description: 'Bleu, candied pecans, tomato, red onion, dried cherries, pecan crusted chicken breast, red raspberry vinaigrette', price: 15.5 },
        { id: id('Fried Chicken Cobb'), name: 'Fried Chicken Cobb', description: 'Bleu, bacon, toasted almonds, egg, tomato, red onion, buttermilk fried chicken', price: 15 },
        { id: id('Heathers'), name: "Heather's Salad", description: 'Roasted corn, black beans, pico de gallo, feta, avocado, tortilla fries, cilantro-lime vinaigrette', price: 13 },
        { id: id('Big Spring'), name: 'Big Spring Salad', description: 'Greens, dried cherries, strawberries, goat cheese, walnuts, black currant vinaigrette', price: 13.5 },
        { id: id('Meatless Antipasto'), name: 'Meatless Antipasto', description: 'Marinated peppers, tomato, olives, artichokes, asparagus, cucumber, provolone', price: 12.5 },
      ],
    },
    {
      title: 'Snacks & Whatnot',
      items: [
        { id: id('Crab Cakes'), name: 'Crab Cakes', description: 'Andouille-corn hash, jalapeño tartar', price: 17 },
        { id: id('Filet Mignon Sliders'), name: 'Filet Mignon Sliders', description: 'Fried onions, bleu, red chili mayonnaise', price: 17 },
        { id: id('Spinach Artichoke Dip'), name: 'Spinach-Artichoke Dip', description: 'Corn tortillas', price: 12 },
        { id: id('Mexican Shrimp Cocktail'), name: 'Mexican Shrimp Cocktail', description: 'Tomato-cucumber salsa, avocado, water crackers', price: 16 },
        { id: id('Sixth Best Tacos'), name: 'The 6th Best Tacos in Ft. Wayne', description: 'Fish, brisket, or pork — pico, feta, green sauce', price: 12, tags: ['Local Favorite'] },
        { id: id('Sesame Crusted Tuna'), name: 'Sesame Crusted Tuna', description: 'Rare seared, ginger noodle salad, wasabi', price: 17 },
        { id: id('Fried Brussels Sprouts'), name: 'Fried Brussels Sprouts', description: 'Chile-maple glaze, bacon', price: 9.5 },
        { id: id('Tots Deluxe'), name: 'Tots Deluxe', description: 'On a pile of mac & cheese with andouille, green onion, real tomato ketchup eddie', price: 9.5 },
        { id: id('Blackened Shrimp'), name: 'Blackened Shrimp', description: 'Five shrimp, greens, mango salsa, pickled okra', price: 15 },
      ],
    },
    {
      title: 'Samiches',
      note: "Include your choice of tots, slaw, pit beans, mac & cheese, fruit, or cottage cheese. Sub gluten-free bun for $2.",
      items: [
        { id: id('Cod Po Boy'), name: 'Cod Po-Boy', description: 'Toasted hoagie, lettuce, tomato, tartar sauce', price: 15 },
        { id: id('Tuna Steak'), name: 'Tuna Steak', description: 'Grilled Ahi tuna, lettuce, tomato, red onion, wasabi mayo', price: 17 },
        { id: id('Chicago Burger'), name: 'Chicago Burger', description: 'Onion roll, choice of 3 toppings. Beyond Burger swap +3', price: 17, tags: ['Customizable'] },
        { id: id('Urban Cowboy'), name: 'The Urban Cowboy', description: 'Smoked brisket, bacon, BBQ, ginger-cilantro cabbage, pickled onion', price: 15.5 },
        { id: id('Fried Chicken Samich'), name: 'Fried Chicken', description: 'Buttermilk fried chicken, lettuce, tomato, mayo', price: 16 },
        { id: id('Phat Panda'), name: 'The Phat Panda', description: 'Double burger, grilled onion, bacon, pimiento cheese', price: 16 },
        { id: id('BBQ Pulled Pork'), name: 'BBQ Pulled Pork', description: 'Bleu cheese slaw on a toasted onion roll', price: 14 },
        { id: id('Uptown Buster'), name: 'The Uptown Buster', description: 'Ditch the middle chip, add bacon & extra cheese', price: 16 },
        { id: id('JT Chicken Salad'), name: "J.T.'s Chicken Salad", description: 'Lettuce, tomato, house-made brioche', price: 16 },
        { id: id('Portabella Sandwich'), name: 'Portabella Sandwich', description: 'Lettuce, tomato, roasted red peppers, artichokes, feta, garlic mayo', price: 15 },
        { id: id('Philly Steak'), name: 'Philly Steak', description: 'Grilled onions, roasted red peppers, white cheddar', price: 15.5 },
        { id: id('Grilled Cheese'), name: 'Grilled Cheese', description: 'Tomato on parmesan-crusted French', price: 12 },
        { id: id('Burrito Americano'), name: 'Burrito Americano', description: 'Roasted chicken, lettuce, roasted corn, black beans, pico, feta, avocado, spicy mayo', price: 12.5 },
        { id: id('Reuben'), name: 'Reuben', description: 'Marble rye, kraut, swiss, house-made 1000 island', price: 16.5 },
        { id: id('Roasted Chicken Club'), name: 'Roasted Chicken Club', description: 'Garlic mayo, parmesan-crusted French bread', price: 15 },
        { id: id('Damwich'), name: 'The Damwich', description: 'Hard fried eggs, bacon, queso americano', price: 13 },
      ],
    },
    {
      title: 'Dinner Plates',
      note: 'Include choice of two sides.',
      items: [
        { id: id('Filet Mignon'), name: 'Filet Mignon', description: 'Eight-ounce filet broiled at 1800°, garlic-herb steak butter', price: 45 },
        { id: id('Twin Lobster Tails'), name: 'Twin Lobster Tails', description: 'Two five-ounce tails with drawn butter', price: 55 },
      ],
    },
    {
      title: 'Dessert',
      items: [
        { id: id('German Choc'), name: 'German Chocolate Cake', price: 5 },
        { id: id('Carrot Cake'), name: 'Carrot Cake', price: 5 },
        { id: id('Creme Brulee'), name: 'Orange-Vanilla Crème Brûlée', price: 5 },
        { id: id('Cheesecake'), name: "Cheesecake o' the Day", price: 7 },
      ],
    },
  ],
};
