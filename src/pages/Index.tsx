import { useState } from 'react';
import { CartItem, Product } from '@/types/product';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import Header from '@/components/Header';
import HomeSection from '@/components/HomeSection';
import CatalogSection from '@/components/CatalogSection';
import DeliverySection from '@/components/DeliverySection';
import PaymentSection from '@/components/PaymentSection';

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setSelectedCategory={setSelectedCategory}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'home' && (
          <HomeSection 
            categories={categories} 
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'catalog' && (
          <CatalogSection 
            products={products}
            addToCart={addToCart}
          />
        )}

        {activeSection === 'delivery' && <DeliverySection />}

        {activeSection === 'payment' && <PaymentSection />}
      </main>

      <footer className="bg-white/50 border-t border-pink-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-bold text-xl mb-4">Baloo</h3>
              <p className="text-gray-600">Воздушные шары с доставкой в Иркутске</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl mb-4">Контакты</h3>
              <p className="text-gray-600">Телефон: +7 (XXX) XXX-XX-XX</p>
              <p className="text-gray-600">Email: info@baloo.ru</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl mb-4">Режим работы</h3>
              <p className="text-gray-600">Ежедневно: 9:00 - 21:00</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-pink-100 text-center text-gray-600">
            <p>© 2024 Baloo. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
