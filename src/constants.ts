import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'football', name: 'Football', icon: 'Trophy' },
  { id: 'cricket', name: 'Cricket', icon: 'Target' },
  { id: 'basketball', name: 'Basketball', icon: 'Dribbble' },
  { id: 'badminton', name: 'Badminton', icon: 'Wind' },
  { id: 'gym', name: 'Gym', icon: 'Dumbbell' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elite Football Kit',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800',
    category: 'football',
  },
  {
    id: '2',
    name: 'Pro Cricket Bat & Pads',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
    category: 'cricket',
  },
  {
    id: '3',
    name: 'Performance Basketball',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=800',
    category: 'basketball',
  },
  {
    id: '4',
    name: 'Carbon Badminton Racket',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1626225967045-9410dd993e4b?auto=format&fit=crop&q=80&w=800',
    category: 'badminton',
  },
  {
    id: '5',
    name: 'Adjustable Dumbbell Set',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800',
    category: 'gym',
  },
  {
    id: '6',
    name: 'Training Football',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=800',
    category: 'football',
  },
];
