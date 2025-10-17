import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Category } from '@/types/product';

interface HomeSectionProps {
  categories: Category[];
  setActiveSection: (section: string) => void;
}

export default function HomeSection({ categories, setActiveSection }: HomeSectionProps) {
  return (
    <div className="animate-fade-in">
      <section className="relative h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 opacity-50" />
        <div className="relative z-10 space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary animate-float">
            Воздушные шары в Иркутске
          </h1>
          <p className="text-xl md:text-2xl text-gray-700">
            Доставим радость за 2-4 часа! 🎈
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#D93A6A] to-[#E85B83] hover:from-[#C82D5D] hover:to-[#D93A6A] text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all animate-scale-in"
            onClick={() => setActiveSection('catalog')}
          >
            Выбрать шары
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
        <div className="absolute top-10 left-10 text-6xl animate-float-delayed">🎈</div>
        <div className="absolute bottom-20 right-20 text-6xl animate-float">🎉</div>
        <div className="absolute top-40 right-10 text-5xl animate-float-delayed">✨</div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
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

        <section className="text-center space-y-6">
          <h3 className="text-3xl font-heading font-bold">Почему выбирают нас?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'Truck', title: 'Быстрая доставка', desc: 'От 2 до 4 часов по Иркутску' },
              { icon: 'Heart', title: 'Качество', desc: 'Только сертифицированные шары' },
              { icon: 'Gift', title: 'Уникальность', desc: 'Индивидуальный подход к каждому' }
            ].map((feature, idx) => (
              <Card key={idx} className="text-center p-8 hover-scale transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#D93A6A] to-[#E85B83] mb-4">
                  <Icon name={feature.icon as any} size={32} className="text-white" />
                </div>
                <h4 className="font-heading font-bold text-xl mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-heading font-bold mb-4">Не нашли что искали?</h3>
          <p className="text-gray-700 mb-6">Свяжитесь с нами, и мы создадим идеальную композицию специально для вас!</p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#D93A6A] to-[#E85B83] hover:from-[#C82D5D] hover:to-[#D93A6A]"
          >
            Связаться с нами
          </Button>
        </section>
      </div>
    </div>
  );
}
