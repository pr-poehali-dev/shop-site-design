import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { CartItem } from '@/types/product';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  setSelectedCategory: (category: number | null) => void;
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalPrice: number;
  totalItems: number;
}

export default function Header({
  activeSection,
  setActiveSection,
  setSelectedCategory,
  cart,
  removeFromCart,
  updateQuantity,
  totalPrice,
  totalItems
}: HeaderProps) {
  return (
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
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 bg-pink-50 rounded-lg animate-fade-in">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-heading font-bold">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-red-500 hover:text-red-700"
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-primary">{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#D93A6A] to-[#E85B83] hover:from-[#C82D5D] hover:to-[#D93A6A] h-12">
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
  );
}
