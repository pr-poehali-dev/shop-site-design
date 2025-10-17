# YML Catalog Parser для воздушных шаров

Полный набор инструментов для загрузки, парсинга и использования данных товаров из YML каталога интернет-магазина воздушных шаров.

## 🚀 Быстрый старт

### 1. Получите данные

```bash
node scripts/run-parser.mjs
```

или откройте в браузере `public/parse-yml.html`

### 2. Используйте в коде

```typescript
import { products, type Product } from '@/data';

// Все товары готовы к использованию!
console.log(products.length); // ~100-200 товаров
```

## 📁 Что внутри?

### Скрипты парсинга (6 вариантов)

- `scripts/run-parser.mjs` - Node.js (ES modules) **← Рекомендуется**
- `scripts/fetch-products.ts` - Bun/TypeScript
- `scripts/download-yml.js` - Node.js (CommonJS)
- `public/parse-yml.html` - Браузерный UI **← 100% работает**
- `scripts/quick-parse.html` - Минимальный браузерный
- `scripts/run.sh` - Автоматический выбор

### Документация (4 уровня)

1. `CHEATSHEET.md` - Шпаргалка (самое краткое)
2. `QUICKSTART.md` - Быстрый старт (3 шага)
3. `YML-PARSER-SUMMARY.md` - Обзор функционала
4. `PARSE-YML-INSTRUCTIONS.md` - Полный гайд

### Файлы данных

- `src/data/products.ts` - **Главный файл** (создается скриптом)
- `src/data/products.example.ts` - Пример с 12 товарами
- `src/data/index.ts` - Точка входа для импорта

## 📊 Что вы получите

### Структура данных

```typescript
interface Product {
  id: string;              // Уникальный ID
  name: string;            // Название товара
  price: number;           // Цена в рублях
  image: string;           // URL изображения
  category: string;        // Категория (slug)
  colors?: string[];       // Цвета (автоматически)
  description?: string;    // Описание
}
```

### Категории

- `girl` - Для девушек (8 марта, Девушкам, Девичник)
- `man` - Для мужчин (23 февраля, Мужчинам)
- `girl-kid` - Для девочек
- `boy-kid` - Для мальчиков
- `discharge` - Выписка из роддома
- `gender-party` - Гендер-пати
- `one-year` - Шары на годик
- `father-day` - День отца
- `mother-day` - Для мамы
- `other` - Остальные категории

### Автоматическое извлечение цветов

Скрипт находит в названиях и описаниях:
- розовый, синий, красный, белый, черный
- золотой, серебряный
- зеленый, желтый, фиолетовый, голубой
- оранжевый, персиковый, мятный, коричневый

## 💡 Примеры использования

### Фильтрация

```typescript
// По категории
const girlProducts = products.filter(p => p.category === 'girl');

// По цене
const affordable = products.filter(p => p.price < 3000);

// По цвету
const pinkBalloons = products.filter(p => p.colors?.includes('розовый'));

// Комбинированный фильтр
const results = products.filter(p => 
  p.category === 'girl' && 
  p.price < 5000 && 
  p.colors?.includes('розовый')
);
```

### Поиск

```typescript
const search = (query: string) => 
  products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

const results = search('сюрприз');
```

### Сортировка

```typescript
// По цене (дешевые первые)
const byPrice = [...products].sort((a, b) => a.price - b.price);

// По названию
const byName = [...products].sort((a, b) => 
  a.name.localeCompare(b.name)
);
```

### React компоненты

```typescript
// ProductCard
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} ₽</p>
      {product.colors && (
        <div className="colors">
          {product.colors.map(color => (
            <span key={color}>{color}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ProductList with filters
function ProductList() {
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  
  const filtered = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (p.price > maxPrice) return false;
    return true;
  });
  
  return (
    <div className="grid">
      {filtered.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

## 🛠️ Технические детали

### Источник данных

- **URL**: https://xn--80aqga1abihi8b9a.xn--p1ai/tstore/yml/6b06c1ebf3dc86f07bfa1c2120e387d4.yml
- **Формат**: Yandex Market Language (YML/XML)
- **Кодировка**: UTF-8
- **Размер**: ~150-300 KB

### Парсинг

- **Метод**: Regex для Node.js, DOM Parser для браузера
- **Время**: 1-5 секунд
- **Зависимости**: Нет (работает из коробки)

### Результат

- **Товаров**: ~100-200 (зависит от каталога)
- **Размер файла**: ~50-150 KB
- **Формат**: TypeScript с типами

## 📚 Документация

| Файл | Описание | Для кого |
|------|----------|----------|
| `CHEATSHEET.md` | Команды и примеры | Опытные |
| `QUICKSTART.md` | Старт в 3 шага | Новички |
| `YML-PARSER-SUMMARY.md` | Полный обзор | Все |
| `PARSE-YML-INSTRUCTIONS.md` | Детальный гайд | Подробности |
| `scripts/README.md` | Техническая документация | Разработчики |
| `src/data/README.md` | Использование данных | Все |
| `FILES-CREATED.md` | Список всех файлов | Справка |

## 🔄 Обновление данных

Чтобы получить свежие данные из каталога:

```bash
node scripts/run-parser.mjs
```

Файл `src/data/products.ts` будет обновлен автоматически.

## ✅ Требования

### Один из (для скриптов):

- Node.js v14+ **← Рекомендуется**
- Bun
- Современный браузер (Chrome, Firefox, Safari, Edge)

### НЕ требуется:

- ❌ npm packages
- ❌ Build tools
- ❌ Конфигурация

## 🎯 Что дальше?

1. ✅ Запустите парсер: `node scripts/run-parser.mjs`
2. ✅ Проверьте результат: `src/data/products.ts`
3. ✅ Импортируйте в код: `import { products } from '@/data'`
4. 🚀 Создавайте компоненты и фильтры!

## 📝 Примерная статистика после парсинга

```
✅ Products saved to src/data/products.ts
✅ Total products: 156

📊 Products by category:
   other           : 52
   girl            : 38
   discharge       : 24
   boy-kid         : 12
   girl-kid        : 11
   man             : 8
   gender-party    : 5
   one-year        : 4
   mother-day      : 2

📈 Additional stats:
   With colors      : 89 (57%)
   With description : 143 (92%)
```

## 🤝 Поддержка

Все инструменты полностью готовы к использованию. Никаких дополнительных настроек не требуется.

Разрешение на парсинг получено от владельца сайта.

---

**Версия**: 1.0  
**Дата**: 2025-10-18  
**Статус**: ✅ Готово к использованию

