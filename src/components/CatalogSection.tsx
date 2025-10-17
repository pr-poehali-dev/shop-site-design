import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Product } from '@/types/product';

interface CatalogSectionProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function CatalogSection({ products, addToCart }: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');

  const filterProducts = (category: string) => {
    return products
      .filter(p => category === 'all' || p.category === category)
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
  };

  const renderProductGrid = (filteredProducts: Product[]) => {
    if (filteredProducts.length === 0) {
      return (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Товары не найдены</p>
        </div>
      );
    }

    return (
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
    );
  };

  return (
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

        {['all', 'girl', 'man', 'girl-kid', 'boy-kid', 'discharge', 'gender-party', 'one-year', 'father-day', 'mother-day'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue}>
            {renderProductGrid(filterProducts(tabValue))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
