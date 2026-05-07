import type { RestaurantMenu } from '../menus';

const id = (n: string) => `the-factory__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

export const factory: RestaurantMenu = {
  slug: 'the-factory',
  source: 'pdf',
  pdfUrl: 'https://www.donhalls.com/s/Factory-Menu_Winter2025.pdf',
  sections: [
    {
      title: 'Dinner Plates',
      note: 'Served with a side dish and your choice of side salad. Greek salad +$2.',
      items: [
        { id: id('Factory Prime Rib'), name: 'Factory Prime Rib', description: 'House specialty — millions of pounds sold since 1972. Au jus, creamed horseradish.', priceTiers: [{ label: '8oz', price: 36 }, { label: '12oz', price: 42 }, { label: '16oz', price: 48 }], tags: ['Signature'] },
        { id: id('Filet Oscar'), name: 'Filet Oscar', description: 'Crab cake, grilled asparagus, hollandaise', priceTiers: [{ label: '8oz', price: 56 }, { label: '12oz', price: 68 }] },
        { id: id('Filet Mignon'), name: 'Filet Mignon', description: 'Center cut, USDA Choice', priceTiers: [{ label: '8oz', price: 46 }, { label: '12oz', price: 58 }] },
        { id: id('Peppercorn NY'), name: 'Peppercorn New York', description: 'Five-pepper crusted with peppercorn demi glace', price: 40 },
        { id: id('NY Strip'), name: 'New York Strip', description: 'Twelve-ounce cut', price: 38 },
        { id: id('Steak Durwood'), name: 'Steak Durwood', description: 'Cajun-blackened ribeye, bleu cheese, fried onions', price: 41 },
        { id: id('Ribeye'), name: 'Ribeye', description: 'Twelve-ounce cut, generously marbled', price: 39 },
        { id: id('Goat Cheese Filet'), name: 'Goat Cheese Stuffed Filet', description: 'Eight-ounce filet, goat cheese, wild rice, white wine butter sauce, two-piece grilled shrimp popsicle', price: 54 },
        { id: id('Sirloin'), name: 'Sirloin', description: 'Char-grilled nine-ounce with Factory herb butter', price: 26 },
        { id: id('Chopped Steak'), name: 'Chopped Steak', description: 'Wild mushrooms, peppercorn sauce', price: 21 },
        { id: id('Porterhouse Pork'), name: 'Porterhouse Pork Chop', description: 'Sixteen-ounce bone-in glazed with maple-bacon-bourbon jam', price: 24 },
        { id: id('Atlantic Cod'), name: 'Atlantic Cod', description: 'Beer-battered with house-made tartar', price: 25 },
        { id: id('Twin Lobster'), name: 'Twin Lobster Tails', description: 'Two broiled five-ounce tails with drawn butter', price: 49 },
        { id: id('Yellowfin Tuna'), name: 'Yellowfin Tuna', description: 'Sesame-crusted ahi, Asian slaw, pickled ginger, fried wonton threads, wasabi', price: 27 },
        { id: id('Almond Walleye'), name: 'Almond Crusted Walleye', description: 'Pan-fried, jalapeño tartar', price: 27 },
        { id: id('Salmon Jezebel'), name: 'Salmon Jezebel', description: 'Cream cheese stuffed salmon over baby spinach with apricot glaze', price: 26 },
        { id: id('Raspberry Chicken'), name: 'Raspberry Chicken', description: 'Panko-crusted boneless breast stuffed with cream cheese and pecans, red raspberry sauce', price: 24 },
      ],
    },
    {
      title: 'Make It Your Steak',
      items: [
        { id: id('Mushrooms Onions'), name: 'Mushrooms or Onions (or both)', price: 4 },
        { id: id('Six Shrimp'), name: 'Six Piece Shrimp', price: 18 },
        { id: id('Five oz Lobster'), name: 'Five-oz Lobster Tail', price: 23 },
        { id: id('Oscar Top'), name: 'Oscar Top', description: 'Crab cake, asparagus hollandaise', price: 10 },
        { id: id('Bleu Bacon'), name: 'Bleu & Bacon', price: 4 },
        { id: id('Maple Jam'), name: 'Maple-Bacon-Bourbon Jam', price: 3 },
        { id: id('Peppercorn'), name: 'Peppercorn Sauce', price: 3 },
      ],
    },
    {
      title: 'Snacks & Shareables',
      items: [
        { id: id('Onion Rings'), name: 'Hand-Breaded Onion Rings', description: 'House-made zesty ranch', price: 11 },
        { id: id('Crab Cakes'), name: 'Crab Cakes', description: 'Sweet corn pico, chipotle aioli', price: 18 },
        { id: id('Sesame Tuna'), name: 'Sesame Crusted Tuna', description: 'Asian slaw, ginger, wonton, wasabi', price: 13 },
        { id: id('Bloody Mary'), name: "Fort Wayne's Finest Bloody Mary", description: 'Facebook-famous signature blend, prime rib veggie skewer, cocktail shrimp', price: 13, tags: ['Famous'] },
        { id: id('William Henry'), name: 'Tidbits William Henry', description: 'Chunks of prime rib in garlic butter, crumbled bleu cheese, tiny toast', price: 17 },
        { id: id('Stuffed Mushrooms'), name: 'Five Cheese Stuffed Mushrooms', description: 'Baked white cheddar', price: 10 },
        { id: id('Cheese Curds'), name: 'Beer-Battered Cheese Curds', description: 'House-made zesty ranch', price: 11 },
        { id: id('Firecracker Shrimp'), name: 'Firecracker Shrimp', description: 'Sweet chile aioli, sweet corn pico, shaved lettuce', price: 14 },
        { id: id('Pulled Pork Poutine'), name: 'Pulled Pork Poutine', description: 'Fries, cheese curds, BBQ pork, cheddar gravy, scallions', price: 14 },
        { id: id('Potato Soup'), name: 'Loaded Baked Potato Soup', description: 'Bacon, cheddar, green onion', price: 6 },
      ],
    },
    {
      title: 'Sandwiches',
      note: 'With fries, slaw, mashed, pit beans, or pepperjack mac. GF bun or Impossible burger swap +$2.',
      items: [
        { id: id('House Burger'), name: 'House Burger', description: "Half-pound smashed double, lettuce, tomato, onion, American, Sam's sauce, brioche", price: 16.5 },
        { id: id('Fancy Burger'), name: 'Fancy Burger', description: 'Char-grilled half-pounder, goat cheese, field greens, red onion, sun-dried tomato jam, pretzel roll', price: 17.5 },
        { id: id('Big Pig'), name: 'The Big Pig', description: 'BBQ pulled pork, bacon, fried onion, white cheddar queso, brioche bun', price: 16 },
        { id: id('Logo Burger'), name: 'Logo Burger', description: 'Smashed double, bang-bang sauce, bacon, lettuce, tomato', price: 17.5 },
        { id: id('Prime Rib Manhattan'), name: 'Prime Rib Manhattan', description: 'Shaved prime rib, mashed potatoes, gravy, buttermilk bread', price: 21, tags: ['Signature'] },
        { id: id('Prime Rib Sandwich'), name: 'Prime Rib Sandwich', description: 'Six ounces open-faced on grilled sourdough or shaved on a hoagie with creamed horseradish', price: 21 },
        { id: id('Reuben Factory'), name: 'Reuben', description: 'Corned beef brisket, kraut, swiss, 1000 island on grilled rye', price: 16.5 },
      ],
    },
    {
      title: 'Sunday Saver',
      note: "Available Sunday only — until it's gone!",
      items: [
        { id: id('Sunday Chicken'), name: 'Four Piece Fried Chicken Dinner', description: 'Caesar salad, mashed potatoes, creamy corn', price: 19, tags: ['Sunday Only'] },
      ],
    },
  ],
};
