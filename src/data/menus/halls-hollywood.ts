import type { RestaurantMenu } from '../menus';

const id = (n: string) => `halls-hollywood__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const hollywood: RestaurantMenu = {
  slug: 'halls-hollywood',
  source: 'estimated',
  sections: [
    {
      title: 'Drive-In Classics',
      items: [
        { id: id('Double Hollywood'), name: 'Double Hollywood Burger', description: 'Two smashed patties, American, secret sauce, sesame bun', price: 12, tags: ['Classic'] },
        { id: id('Single Hollywood'), name: 'Single Hollywood Burger', description: 'One smash patty, American, secret sauce, sesame bun', price: 8 },
        { id: id('Bacon Cheeseburger'), name: 'Bacon Cheeseburger', description: 'Half-pound, American, applewood bacon, lettuce, tomato', price: 13 },
        { id: id('Patty Melt'), name: 'Patty Melt', description: 'Rye, swiss, caramelized onions, thousand island', price: 11 },
        { id: id('Hot Dog'), name: 'Hot Dog Hollywood', description: 'All-beef frank, brown mustard, kraut, sweet relish', price: 6 },
        { id: id('Chicago Dog'), name: 'Chicago Dog', description: 'Yellow mustard, neon relish, tomato, onion, pickle, sport peppers, celery salt', price: 7 },
      ],
    },
    {
      title: 'Sides & Snacks',
      items: [
        { id: id('Onion Rings'), name: 'Hand-Battered Onion Rings', description: 'Beer batter, ranch dust, comeback sauce', price: 8 },
        { id: id('Cottage Fries'), name: 'Cottage Fries', description: 'Hand-cut wedges, sea salt', price: 5 },
        { id: id('Tater Tots'), name: 'Tater Tots', description: 'Crispy, salted, ketchup', price: 4 },
        { id: id('Cheese Curds'), name: 'Beer-Battered Cheese Curds', description: 'House-made zesty ranch', price: 7 },
        { id: id('Chili Cheese Fries'), name: 'Chili Cheese Fries', description: 'Beanless chili, cheddar, scallions', price: 8 },
      ],
    },
    {
      title: 'Malts & Floats',
      subtitle: 'Real ice cream — like the old days',
      items: [
        { id: id('Strawberry Malt'), name: 'Strawberry Malt', description: 'Real ice cream, malted, whipped cream, cherry', price: 7 },
        { id: id('Chocolate Malt'), name: 'Chocolate Malt', description: "Hershey's syrup, malted, whipped cream", price: 7 },
        { id: id('Vanilla Malt'), name: 'Vanilla Malt', description: 'Madagascar vanilla, malted', price: 7 },
        { id: id('Cherry Coke'), name: 'Cherry Coke Float', description: 'Vanilla ice cream, cherry syrup, fountain Coke', price: 6 },
        { id: id('Root Beer'), name: 'Root Beer Float', description: 'Vanilla ice cream, A&W root beer', price: 6 },
      ],
    },
    {
      title: 'Carhop Specials',
      items: [
        { id: id('Triple'), name: "Buster's Original Triple Decker", description: "American, shredded lettuce, secret sauce — the way it's been since '57", price: 9 },
        { id: id('Hollywood Special'), name: 'Hollywood Special', description: 'Double burger, fries, malt of choice', price: 18, tags: ['Combo'] },
        { id: id('Kid Combo'), name: 'Kid Combo', description: 'Junior burger, fries, drink', price: 7 },
      ],
    },
  ],
};
