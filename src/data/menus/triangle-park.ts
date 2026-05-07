import type { RestaurantMenu } from '../menus';

const id = (n: string) => `triangle-park__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const trianglePark: RestaurantMenu = {
  slug: 'triangle-park',
  source: 'estimated',
  sections: [
    {
      title: 'Reopening Preview · Spring 2026',
      subtitle: "A preview of what's coming to the dock",
      items: [
        { id: id('Cedar Salmon'), name: 'Cedar-Plank Salmon', description: 'Maple-bourbon glaze, charred lemon, seasonal vegetables', price: 28, tags: ['Reopening'] },
        { id: id('Clam Chowder'), name: 'New England Clam Chowder', description: 'Cream-rich, smoked bacon, oyster crackers', price: 10 },
        { id: id('Lobster Mac'), name: 'Lobster Mac', description: 'Cavatappi, gruyère cream, butter-poached lobster', price: 26 },
        { id: id('Painkiller'), name: 'Painkiller', description: "Pusser's rum, pineapple, coconut, fresh nutmeg", price: 12 },
        { id: id('Steamer Bucket'), name: 'Steamer Bucket', description: 'Mussels, clams, andouille, corn, drawn butter', price: 28 },
        { id: id('Crab Cake'), name: 'Maryland Crab Cakes', description: 'Lump blue crab, remoulade, charred lemon', price: 24 },
      ],
    },
  ],
};
