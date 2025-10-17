# Инструкция по получению товаров из YML каталога

## Быстрый старт (3 способа)

### Способ 1: Node.js (Рекомендуется - самый быстрый)

```bash
node scripts/run-parser.mjs
```

**Результат:** Файл `src/data/products.ts` будет создан автоматически

### Способ 2: Bun

```bash
bun run scripts/fetch-products.ts
```

### Способ 3: Браузер (Гарантированно работает)

1. Откройте файл `public/parse-yml.html` в браузере
2. Нажмите кнопку "Fetch & Parse YML"
3. Подождите ~5 секунд
4. Нажмите кнопку "Download products.ts"
5. Сохраните скачанный файл в `src/data/products.ts`

### Способ 4: Автоматический скрипт

```bash
chmod +x scripts/run.sh
./scripts/run.sh
```

## Что вы получите

### Файл: `src/data/products.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'girl' | 'man' | 'girl-kid' | 'boy-kid' | 'discharge' | 
            'gender-party' | 'one-year' | 'father-day' | 'mother-day' | 'other';
  colors?: string[];
  description?: string;
}

export const products: Product[] = [
  {
    "id": "349786904162",
    "name": "Вау сюрприз для нее",
    "price": 5690,
    "image": "https://static.tildacdn.com/stor3433-3861-4737-b431-323035653532/57084564.jpg",
    "category": "girl",
    "description": "4 связки по 10 сердец 12 сердец с фото"
  },
  // ... еще ~100-200 товаров
];
```

## Структура данных

### Поля товара

- **id** - Уникальный идентификатор товара
- **name** - Название товара
- **price** - Цена в рублях
- **image** - URL первой фотографии товара
- **category** - Категория товара (slug)
- **colors** (опционально) - Массив цветов, найденных в названии/описании
- **description** (опционально) - Описание товара

### Категории (category slug)

| Исходная категория | Slug |
|-------------------|------|
| Для мамы | `mother-day` |
| 8 марта, Девушкам, Девичник | `girl` |
| Мужчинам, 23 февраля | `man` |
| Девочкам | `girl-kid` |
| Мальчикам | `boy-kid` |
| Выписка | `discharge` |
| Гендер-пати | `gender-party` |
| Шары на годик | `one-year` |
| День отца | `father-day` |
| Остальные | `other` |

### Извлекаемые цвета

Скрипт автоматически находит в названиях и описаниях следующие цвета:
- розовый, синий, красный, белый, черный
- золотой, серебряный
- зеленый, желтый, фиолетовый, голубой
- оранжевый, персиковый, мятный, коричневый

## Использование в коде

```typescript
import { products, type Product } from '@/data/products';

// Получить все товары
console.log(products.length); // ~100-200

// Фильтрация по категории
const girlProducts = products.filter(p => p.category === 'girl');

// Поиск по названию
const searchResults = products.filter(p => 
  p.name.toLowerCase().includes('сюрприз')
);

// Товары с розовыми шарами
const pinkBalloons = products.filter(p => 
  p.colors?.includes('розовый')
);

// Сортировка по цене
const cheapFirst = [...products].sort((a, b) => a.price - b.price);

// Диапазон цен
const inRange = products.filter(p => 
  p.price >= 1000 && p.price <= 5000
);

// Категория + цена
const affordableForGirls = products.filter(p => 
  p.category === 'girl' && p.price < 3000
);
```

## Примеры компонентов

### ProductCard Component

```typescript
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} ₽</p>
      {product.colors && (
        <div className="colors">
          {product.colors.map(color => (
            <span key={color} className={`color-badge ${color}`}>
              {color}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

### ProductList with Filters

```typescript
function ProductList() {
  const [category, setCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const filtered = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  return (
    <div>
      <div className="filters">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Все категории</option>
          <option value="girl">Для девушек</option>
          <option value="man">Для мужчин</option>
          {/* ... */}
        </select>
        <input 
          type="range" 
          min="0" 
          max="10000" 
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
      <div className="grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

## Обновление данных

Чтобы получить свежие данные из каталога:

```bash
# Любым из способов выше
node scripts/run-parser.mjs

# Или через браузер
open public/parse-yml.html
```

Файл `src/data/products.ts` будет обновлен.

## Технические детали

### Источник данных

- **URL**: `https://xn--80aqga1abihi8b9a.xn--p1ai/tstore/yml/6b06c1ebf3dc86f07bfa1c2120e387d4.yml`
- **Формат**: Yandex Market Language (YML/XML)
- **Кодировка**: UTF-8
- **Обновление**: По требованию (запуск скрипта)

### Методы парсинга

- **Node.js**: Regex-based XML parsing (быстро, не требует зависимостей)
- **Browser**: DOM Parser API (надежно, работает везде)
- **Bun**: Native fetch API + regex parsing

### Размер результата

- Количество товаров: ~100-200 (зависит от каталога)
- Размер файла: ~50-150 KB
- Время парсинга: 1-5 секунд

## Решение проблем

### "Cannot find module"

Убедитесь, что вы в корне проекта:

```bash
pwd  # должно показать путь к проекту
ls scripts/  # должны быть файлы run-parser.mjs и др.
```

### "CORS error" в браузере

Используйте `public/parse-yml.html` - он корректно обрабатывает CORS.

### "Permission denied"

```bash
chmod +x scripts/run.sh
```

### Файл не создается

Проверьте, что директория `src/data` существует:

```bash
mkdir -p src/data
node scripts/run-parser.mjs
```

## Дополнительные файлы

### Доступные скрипты

- `scripts/run-parser.mjs` - Node.js парсер (ES modules)
- `scripts/fetch-products.ts` - TypeScript парсер для Bun
- `scripts/download-yml.js` - CommonJS парсер
- `scripts/run.sh` - Автоматический выбор runtime
- `public/parse-yml.html` - Браузерный парсер с UI
- `scripts/quick-parse.html` - Минимальный браузерный парсер

### Документация

- `scripts/README.md` - Подробная техническая документация
- `PARSE-YML-INSTRUCTIONS.md` - Этот файл (инструкции пользователя)

## Поддержка

Все скрипты полностью автономны и не требуют дополнительных зависимостей (кроме Node.js или Bun).

Разрешение на парсинг получено от владельца сайта.

---

**Готово к использованию!** Выберите любой из способов выше и получите готовый TypeScript файл с данными всех товаров.
