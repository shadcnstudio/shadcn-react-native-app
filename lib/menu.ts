export type CartItem = {
  id: string;
  name: string;
  detail: string;
  size?: 'Small' | 'Medium' | 'Large';
  emoji: string;
  /** Cents. Money in floats is how you end up charging someone $4.7499999. */
  unitPrice: number;
  qty: number;
};

export const INITIAL_CART: CartItem[] = [
  {
    id: 'flat-white',
    name: 'Flat white',
    detail: 'Oat milk, extra shot',
    size: 'Medium',
    emoji: '☕️',
    unitPrice: 475,
    qty: 2,
  },
  {
    id: 'cold-brew',
    name: 'Cold brew',
    detail: 'Hold the ice',
    size: 'Large',
    emoji: '🧋',
    unitPrice: 525,
    qty: 1,
  },
  {
    id: 'croissant',
    name: 'Almond croissant',
    detail: 'Warmed',
    emoji: '🥐',
    unitPrice: 390,
    qty: 1,
  },
];

export const PICKUP_TIMES = [
  { value: 'asap', label: 'As soon as it is ready' },
  { value: '15', label: 'In 15 minutes' },
  { value: '30', label: 'In 30 minutes' },
  { value: '60', label: 'In an hour' },
];

export const CUP_DISCOUNT = 25;
export const TAX_RATE = 0.0825;

export function money(cents: number) {
  const sign = cents < 0 ? '-' : '';
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}

export function billFor(items: CartItem[], ownCup: boolean) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const discount = ownCup && subtotal > 0 ? CUP_DISCOUNT : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);

  return { subtotal, discount, tax, total: subtotal - discount + tax };
}
