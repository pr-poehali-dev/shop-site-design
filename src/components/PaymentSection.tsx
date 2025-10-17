import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function PaymentSection() {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <h2 className="text-4xl font-heading font-bold mb-8">Оплата</h2>
      <Card className="p-8">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Icon name="CreditCard" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl mb-2">Картой онлайн</h3>
              <p className="text-gray-600">Принимаем все банковские карты: Visa, MasterCard, Мир. Безопасная оплата через защищенное соединение.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <Icon name="Banknote" size={24} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl mb-2">Наличными курьеру</h3>
              <p className="text-gray-600">Оплатите заказ наличными при получении. Курьер выдаст чек.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-accent/10 p-3 rounded-full">
              <Icon name="Smartphone" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl mb-2">СБП (Система быстрых платежей)</h3>
              <p className="text-gray-600">Мгновенный перевод через приложение вашего банка. Без комиссии.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
