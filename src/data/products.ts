import { Product } from '../store/cartStore';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Bananas',
    price: 2.99,
    category: 'Fruits',
    image: '🍌',
    description: 'Organic bananas, perfect for snacking',
    inStock: true
  },
  {
    id: '2',
    name: 'Whole Milk',
    price: 3.49,
    category: 'Dairy',
    image: '🥛',
    description: 'Fresh whole milk, 2L',
    inStock: true
  },
  {
    id: '3',
    name: 'Bread Loaf',
    price: 2.19,
    category: 'Bakery',
    image: '🍞',
    description: 'Fresh baked whole wheat bread',
    inStock: true
  },
  {
    id: '4',
    name: 'Eggs (Dozen)',
    price: 4.99,
    category: 'Dairy',
    image: '🥚',
    description: 'Farm fresh eggs, free range',
    inStock: true
  },
  {
    id: '5',
    name: 'Apples',
    price: 3.99,
    category: 'Fruits',
    image: '🍎',
    description: 'Crisp red apples, 1kg bag',
    inStock: true
  },
  {
    id: '6',
    name: 'Chicken Breast',
    price: 8.99,
    category: 'Meat',
    image: '🍗',
    description: 'Boneless skinless chicken breast, 1kg',
    inStock: true
  },
  {
    id: '7',
    name: 'Rice (2.27kg)',
    price: 6.49,
    category: 'Grains',
    image: '🍚',
    description: 'Long grain white rice, 2kg bag',
    inStock: true
  },
  {
    id: '8',
    name: 'Tomatoes',
    price: 4.49,
    category: 'Vegetables',
    image: '🍅',
    description: 'Fresh vine-ripened tomatoes, 1kg',
    inStock: true
  },
  {
    id: '9',
    name: 'Cheese Block',
    price: 5.99,
    category: 'Dairy',
    image: '🧀',
    description: 'Sharp cheddar cheese, 250g',
    inStock: true
  },
  {
    id: '10',
    name: 'Potatoes',
    price: 3.29,
    category: 'Vegetables',
    image: '🥔',
    description: 'Russet potatoes, 2kg bag',
    inStock: true
  },
  {
    id: '11',
    name: 'Ground Beef',
    price: 7.99,
    category: 'Meat',
    image: '🥩',
    description: 'Lean ground beef, 500g',
    inStock: true
  },
  {
    id: '12',
    name: 'Orange Juice',
    price: 4.79,
    category: 'Beverages',
    image: '🍊',
    description: 'Fresh squeezed orange juice, 2L',
    inStock: true
  }
];

export const categories = [
  'All',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Meat',
  'Bakery',
  'Grains',
  'Beverages'
];
