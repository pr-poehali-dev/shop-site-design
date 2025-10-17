import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
}

interface CartItem extends Product {
  quantity: number;
}

const categories = [
  { id: 1, name: 'Для девушки', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/7d3bba3b-423d-4a41-88f6-ed6182054012.jpg', slug: 'girl' },
  { id: 2, name: 'Для мужчины', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/e59f0351-6c78-4c6e-baea-5a5639b79c35.jpg', slug: 'man' },
  { id: 3, name: 'Для девочки', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/7d3bba3b-423d-4a41-88f6-ed6182054012.jpg', slug: 'girl-kid' },
  { id: 4, name: 'Для мальчика', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/e59f0351-6c78-4c6e-baea-5a5639b79c35.jpg', slug: 'boy-kid' },
  { id: 5, name: 'На выписку', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/47a1e1e4-8b78-4bae-b4f0-74af0b94cade.jpg', slug: 'discharge' },
  { id: 6, name: 'Гендер пати', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/c675a8a0-5fd0-419a-9eec-7a3295ddf9e6.jpg', slug: 'gender-party' },
  { id: 7, name: 'Годик', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/6f4a9701-19d8-487d-b3b7-9e9c18f0160c.jpg', slug: 'one-year' },
  { id: 8, name: 'День отца', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/e59f0351-6c78-4c6e-baea-5a5639b79c35.jpg', slug: 'father-day' },
  { id: 9, name: 'День матери', image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/7d3bba3b-423d-4a41-88f6-ed6182054012.jpg', slug: 'mother-day' },
];

const products: Product[] = [
  { id: 1, name: 'Набор разноцветных шариков', price: 1200, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/1f1eaa4e-da84-4a32-bc06-a18ddb783dff.jpg', category: 'girl', colors: ['Микс'] },
  { id: 2, name: 'Сердце розовое', price: 450, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/3b206e54-64de-40a3-8f33-e603b90ee324.jpg', category: 'girl', colors: ['Розовый', 'Красный'] },
  { id: 3, name: 'Цифры золотые', price: 890, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/6f4a9701-19d8-487d-b3b7-9e9c18f0160c.jpg', category: 'one-year', colors: ['Золотой', 'Серебро'] },
  { id: 4, name: 'Фольгированные звезды', price: 350, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/1f1eaa4e-da84-4a32-bc06-a18ddb783dff.jpg', category: 'girl-kid', colors: ['Разные'] },
  { id: 5, name: 'День рождения набор', price: 1500, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/6f4a9701-19d8-487d-b3b7-9e9c18f0160c.jpg', category: 'one-year', colors: ['Микс'] },
  { id: 6, name: 'Романтический набор', price: 980, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/3b206e54-64de-40a3-8f33-e603b90ee324.jpg', category: 'girl', colors: ['Розовый'] },
  { id: 7, name: 'Шары для мужчины', price: 750, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/e59f0351-6c78-4c6e-baea-5a5639b79c35.jpg', category: 'man', colors: ['Синий', 'Черный'] },
  { id: 8, name: 'Набор для мальчика', price: 950, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/e59f0351-6c78-4c6e-baea-5a5639b79c35.jpg', category: 'boy-kid', colors: ['Голубой'] },
  { id: 9, name: 'Шары на выписку', price: 1100, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/47a1e1e4-8b78-4bae-b4f0-74af0b94cade.jpg', category: 'discharge', colors: ['Пастель'] },
  { id: 10, name: 'Гендер пати набор', price: 1300, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/c675a8a0-5fd0-419a-9eec-7a3295ddf9e6.jpg', category: 'gender-party', colors: ['Розовый', 'Голубой'] },
  { id: 11, name: 'Шары для папы', price: 850, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/e59f0351-6c78-4c6e-baea-5a5639b79c35.jpg', category: 'father-day', colors: ['Синий'] },
  { id: 12, name: 'Шары для мамы', price: 850, image: 'https://cdn.poehali.dev/projects/2691d1e3-27d4-4edb-882a-3be584c18195/files/7d3bba3b-423d-4a41-88f6-ed6182054012.jpg', category: 'mother-day', colors: ['Розовый'] },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');

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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveSection('home')}>
              <img 
                src="https://cdn.poehali.dev/files/54b03bb9-7b82-4b02-b094-ee45df7a5c43.png" 
                alt="Baloo" 
                className="h-12 w-auto"
              />
            </div>

            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'catalog', label: 'Каталог' },
                { id: 'delivery', label: 'Доставка' },
                { id: 'payment', label: 'Оплата' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    if (item.id !== 'catalog') setSelectedCategory(null);
                  }}
                  className={`font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="relative bg-gradient-to-r from-[#D93A6A] to-[#E85B83] hover:from-[#C82D5D] hover:to-[#D93A6A]">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-accent animate-scale-in">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle className="font-heading text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm animate-fade-in">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-primary font-bold">{item.price} ₽</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-heading font-bold">Итого:</span>
                          <span className="text-2xl font-heading font-bold text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-[#D93A6A] to-[#E85B83] hover:from-[#C82D5D] hover:to-[#D93A6A] text-lg py-6">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeSection === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="text-center py-20 bg-gradient-to-r from-[#D93A6A] via-[#E85B83] to-[#F47B9C] rounded-3xl shadow-2xl">
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
                Воздушные шары и сувениры<br />для любого праздника! 🎉
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Создайте незабываемую атмосферу на вашем празднике с BALOO
              </p>
              <Button
                size="lg"
                onClick={() => setActiveSection('catalog')}
                className="bg-white text-[#D93A6A] hover:bg-gray-100 text-lg px-8 py-6 shadow-xl hover-scale"
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </section>

            <section>
              <h3 className="text-3xl font-heading font-bold mb-8 text-center">Каталог</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6">
                {categories.map(category => (
                  <div 
                    key={category.id} 
                    className="text-center group cursor-pointer"
                    onClick={() => setActiveSection('catalog')}
                  >
                    <div className="relative w-24 h-24 mx-auto mb-3 overflow-hidden rounded-full border-4 border-white shadow-lg hover:shadow-xl transition-all hover-scale">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{category.name}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-heading font-bold mb-8 text-center">Популярные наборы</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <Card key={product.id} className="overflow-hidden hover-scale transition-all duration-300 shadow-lg hover:shadow-2xl">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                        <Button onClick={() => addToCart(product)} className="bg-gradient-to-r from-[#D93A6A] to-[#E85B83] hover:from-[#C82D5D] hover:to-[#D93A6A]">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8">
              {[
                { icon: 'Truck', title: 'Быстрая доставка', desc: 'Доставим за 2 часа по Москве' },
                { icon: 'Shield', title: 'Гарантия качества', desc: 'Только сертифицированные шары' },
                { icon: 'Heart', title: 'С любовью', desc: 'Каждый заказ упаковываем с заботой' }
              ].map((feature, idx) => (
                <Card key={idx} className="text-center p-8 hover-scale transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#D93A6A] to-[#E85B83] mb-4">
                    <Icon name={feature.icon as any} size={32} className="text-white" />
                  </div>
                  <h4 className="font-heading font-bold text-xl mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </Card>
              ))}
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-8">Каталог товаров</h2>
            
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Поиск по товарам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Цена" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все цены</SelectItem>
                    <SelectItem value="low">До 500 ₽</SelectItem>
                    <SelectItem value="medium">500 - 1000 ₽</SelectItem>
                    <SelectItem value="high">Более 1000 ₽</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={colorFilter} onValueChange={setColorFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Цвет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все цвета</SelectItem>
                    <SelectItem value="pink">Розовый</SelectItem>
                    <SelectItem value="gold">Золотой</SelectItem>
                    <SelectItem value="mix">Микс</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 h-auto mb-8">
                <TabsTrigger value="all">Все товары</TabsTrigger>
                <TabsTrigger value="girl">Для девушки</TabsTrigger>
                <TabsTrigger value="man">Для мужчины</TabsTrigger>
                <TabsTrigger value="girl-kid">Для девочки</TabsTrigger>
                <TabsTrigger value="boy-kid">Для мальчика</TabsTrigger>
                <TabsTrigger value="discharge">На выписку</TabsTrigger>
                <TabsTrigger value="gender-party">Гендер пати</TabsTrigger>
                <TabsTrigger value="one-year">Годик</TabsTrigger>
                <TabsTrigger value="father-day">День отца</TabsTrigger>
                <TabsTrigger value="mother-day">День матери</TabsTrigger>
              </TabsList>

              {['all', 'girl', 'man', 'girl-kid', 'boy-kid', 'discharge', 'gender-party', 'one-year', 'father-day', 'mother-day'].map(tabValue => {
                const filteredProducts = products
                  .filter(p => tabValue === 'all' || p.category === tabValue)
                  .filter(p => {
                    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesPrice = 
                      priceFilter === 'all' || 
                      (priceFilter === 'low' && p.price < 500) ||
                      (priceFilter === 'medium' && p.price >= 500 && p.price <= 1000) ||
                      (priceFilter === 'high' && p.price > 1000);
                    const matchesColor = 
                      colorFilter === 'all' ||
                      (colorFilter === 'pink' && p.colors.some(c => c.toLowerCase().includes('роз'))) ||
                      (colorFilter === 'gold' && p.colors.some(c => c.toLowerCase().includes('золот'))) ||
                      (colorFilter === 'mix' && p.colors.some(c => c.toLowerCase().includes('микс')));
                    
                    return matchesSearch && matchesPrice && matchesColor;
                  });

                return (
                  <TabsContent key={tabValue} value={tabValue}>
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Товары не найдены</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                          <Card key={product.id} className="overflow-hidden hover-scale transition-all shadow-lg hover:shadow-2xl">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                            <CardContent className="p-4">
                              <h3 className="font-heading font-bold mb-2">{product.name}</h3>
                              <p className="text-sm text-gray-600 mb-3">{product.colors.join(', ')}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                                <Button size="sm" onClick={() => addToCart(product)} className="bg-gradient-to-r from-[#D93A6A] to-[#E85B83] hover:from-[#C82D5D] hover:to-[#D93A6A]">
                                  <Icon name="Plus" size={16} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-8">Доставка</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">По Москве</h3>
                    <p className="text-gray-600">Бесплатная доставка при заказе от 3000 ₽. Стандартная доставка - 300 ₽. Доставим за 2-4 часа.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Icon name="Clock" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Экспресс доставка</h3>
                    <p className="text-gray-600">Доставим за 1 час! Стоимость - 600 ₽. Доступно в пределах МКАД с 9:00 до 21:00.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Icon name="Package" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Самовывоз</h3>
                    <p className="text-gray-600">Бесплатно! Адрес: г. Москва, ул. Праздничная, д. 1. Время работы: 9:00 - 21:00 ежедневно.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'payment' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-8">Оплата</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Банковские карты</h3>
                    <p className="text-gray-600">Принимаем Visa, MasterCard, МИР. Оплата через защищенное соединение.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Icon name="Wallet" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Наличные курьеру</h3>
                    <p className="text-gray-600">Оплатите заказ наличными при получении. Курьер выдаст чек.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Icon name="Smartphone" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Электронные кошельки</h3>
                    <p className="text-gray-600">ЮMoney, QIWI, WebMoney - все популярные способы оплаты доступны.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/54b03bb9-7b82-4b02-b094-ee45df7a5c43.png" 
                alt="Baloo" 
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-600">Воздушные шары и сувениры</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <p className="text-gray-600">+7 (495) 123-45-67</p>
              <p className="text-gray-600">info@sharikmarket.ru</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">График работы</h4>
              <p className="text-gray-600">Ежедневно</p>
              <p className="text-gray-600">9:00 - 21:00</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white transition-colors">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white transition-colors">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>© 2024 ШарикМаркет. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}