// Real menu data extracted from donhalls.com PDFs (May 2026 / Spring 2024 / Winter 2025).
// Source-of-truth for restaurant pages and the online ordering flow.

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  priceTiers?: { label: string; price: number }[];
  options?: { label: string; price?: number }[];
  tags?: string[];
  /** Path to a food photograph for this item (optional). Shown inside the
   * collapsible details dropdown. Generated via Higgsfield. */
  image?: string;
  /** Optional explicit ingredients list. If absent, the description is split
   * on commas to derive one for the dropdown view. */
  ingredients?: string[];
};

export type MenuSection = {
  title: string;
  subtitle?: string;
  note?: string;
  items: MenuItem[];
};

export type RestaurantMenu = {
  slug: string;
  source: 'pdf' | 'estimated';
  pdfUrl?: string;
  sections: MenuSection[];
};

const _ = (slug: string, n: string) =>
  `${slug}__${n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

// Per-restaurant menus are split into separate modules so each one can grow
// independently without bloating any single file.
import { gasHouse } from './menus/the-gas-house';
import { tavern } from './menus/the-tavern';
import { theDeck } from './menus/the-deck';
import { takaoka } from './menus/takaoka-of-japan';
import { factory } from './menus/the-factory';
import { commissary } from './menus/halls-commissary';
import { hollywood } from './menus/halls-hollywood';
import { stateStreet } from './menus/halls-state-street';
import { tapHaus } from './menus/tap-haus';
import { trianglePark } from './menus/triangle-park';

export { _ as makeId };

export const menusBySlug: Record<string, RestaurantMenu> = {
  'the-gas-house': gasHouse,
  'the-tavern': tavern,
  'the-deck': theDeck,
  'takaoka-of-japan': takaoka,
  'the-factory': factory,
  'halls-commissary': commissary,
  'halls-hollywood': hollywood,
  'halls-state-street': stateStreet,
  'tap-haus': tapHaus,
  'triangle-park': trianglePark,
};

export const getMenu = (slug: string): RestaurantMenu | undefined => menusBySlug[slug];
