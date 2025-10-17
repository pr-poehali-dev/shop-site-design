import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function DeliverySection() {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <h2 className="text-4xl font-heading font-bold mb-8">Доставка</h2>
      <Card className="p-8">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Icon name="MapPin" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl mb-2">По Иркутску</h3>
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
              <p className="text-gray-600">Бесплатно! Адрес: г. Иркутск, ул. Праздничная, д. 1. Время работы: 9:00 - 21:00 ежедневно.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
