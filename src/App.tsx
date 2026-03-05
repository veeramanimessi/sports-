/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Trophy,
  Target,
  Dribbble,
  Wind,
  Dumbbell,
  Plus,
  Minus,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

const IconMap: Record<string, React.ElementType> = {
  Trophy,
  Target,
  Dribbble,
  Wind,
  Dumbbell
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${!scrolled ? 'text-white' : 'text-stone-900'}`}>
                PRO SPORTS HUB
              </span>
            </div>

            {/* Desktop Nav */}
            <div className={`hidden md:flex items-center gap-8 font-medium ${!scrolled ? 'text-white/90' : 'text-stone-600'}`}>
              <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
              <a href="#products" className="hover:text-emerald-600 transition-colors">Products</a>
              <a href="#categories" className="hover:text-emerald-600 transition-colors">Categories</a>
              <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-emerald-600 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <button className={`p-2 rounded-full hover:bg-black/5 transition-colors ${!scrolled ? 'text-white' : 'text-stone-900'}`}>
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-black/5 transition-colors group"
              >
                <ShoppingBag className={`w-5 h-5 ${!scrolled ? 'text-white' : 'text-stone-900'}`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-full hover:bg-black/5 transition-colors ${!scrolled ? 'text-white' : 'text-stone-900'}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
              <a href="#categories" onClick={() => setIsMenuOpen(false)}>Categories</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1920" 
            alt="Sports Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-600 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              New Season 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              All Sports Kits <br />
              <span className="text-emerald-400 italic">In One Place</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg">
              Elevate your performance with professional-grade equipment and apparel designed for champions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all transform hover:scale-105">
                Shop Now
              </a>
              <a href="#categories" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-xl border border-white/20 transition-all">
                View Categories
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-stone-500">Find the perfect gear for your favorite sport</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${activeCategory === 'all' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                All Sports
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {CATEGORIES.map(cat => {
              const Icon = IconMap[cat.icon];
              return (
                <motion.div 
                  key={cat.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cursor-pointer p-8 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all border-2 ${activeCategory === cat.id ? 'border-emerald-600 bg-emerald-50' : 'border-stone-100 bg-stone-50 hover:border-emerald-200'}`}
                >
                  <div className={`p-4 rounded-full ${activeCategory === cat.id ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600 shadow-sm'}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-center">{cat.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase text-emerald-600 shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-emerald-600">${product.price}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-3 h-3 rounded-full bg-emerald-600/20"></div>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full py-3.5 bg-stone-900 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000" 
                  alt="About Us" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-600 rounded-3xl -z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-emerald-600 rounded-full -z-0"></div>
            </div>
            <div className="flex-1">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">We Believe in the Power of Sports</h2>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                Pro Sports Hub was founded with a simple mission: to provide athletes of all levels with the highest quality gear. Whether you're a weekend warrior or a professional competitor, we have everything you need to succeed.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="text-3xl font-black text-emerald-600 mb-1">10k+</h4>
                  <p className="text-stone-500 font-medium">Happy Customers</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-emerald-600 mb-1">500+</h4>
                  <p className="text-stone-500 font-medium">Premium Products</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all">
                Learn More About Us <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-stone-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 p-1.5 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">PRO SPORTS HUB</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                Your ultimate destination for professional sports equipment and apparel. Quality gear for every athlete.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-stone-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Home</a></li>
                <li><a href="#products" className="hover:text-emerald-400 transition-colors">Products</a></li>
                <li><a href="#categories" className="hover:text-emerald-400 transition-colors">Categories</a></li>
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-stone-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4 text-stone-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>123 Sports Avenue, Champion City, SC 54321</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>support@prosportshub.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-stone-500 text-sm">
            <p>© 2024 Pro Sports Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-stone-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Your cart is empty</h3>
                      <p className="text-stone-500">Looks like you haven't added anything yet.</p>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-stone-900 truncate">{item.name}</h4>
                        <p className="text-emerald-600 font-bold mb-3">${item.price}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-stone-100 rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:text-emerald-600 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:text-emerald-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t bg-stone-50 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-stone-500">Subtotal</span>
                    <span className="font-bold text-2xl">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all">
                    Checkout Now
                  </button>
                  <p className="text-center text-xs text-stone-400">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
