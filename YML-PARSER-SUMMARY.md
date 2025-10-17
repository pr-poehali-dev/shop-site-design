# YML Catalog Parser - Summary

## Что было создано

Полный набор инструментов для загрузки и парсинга YML каталога товаров из интернет-магазина воздушных шаров.

## Созданные файлы

### 1. Основные скрипты парсинга

| Файл | Описание | Использование |
|------|----------|---------------|
| `scripts/run-parser.mjs` | Node.js парсер (ES modules) | `node scripts/run-parser.mjs` |
| `scripts/fetch-products.ts` | TypeScript парсер для Bun | `bun run scripts/fetch-products.ts` |
| `scripts/download-yml.js` | CommonJS парсер | `node scripts/download-yml.js` |
| `scripts/parse-yml.ts` | TypeScript парсер | `tsx scripts/parse-yml.ts` |

### 2. Браузерные инструменты

| Файл | Описание |
|------|----------|
| `public/parse-yml.html` | Полнофункциональный UI парсер с кнопками и статистикой |
| `scripts/quick-parse.html` | Минимальный парсер для быстрого тестирования |

### 3. Вспомогательные файлы

| Файл | Описание |
|------|----------|
| `scripts/run.sh` | Bash-скрипт для автоматического выбора runtime |
| `scripts/README.md` | Техническая документация скриптов |
| `PARSE-YML-INSTRUCTIONS.md` | Подробные инструкции для пользователя |
| `YML-PARSER-SUMMARY.md` | Этот файл (краткий обзор) |

### 4. Файлы данных

| Файл | Описание |
|------|----------|
| `src/data/products.example.ts` | Пример файла с 12 товарами для разработки |
| `src/data/products.ts` | **Главный файл** - создается скриптом, содержит ВСЕ товары |
| `src/data/README.md` | Документация по использованию данных |

## Быстрый старт

### Вариант 1: Node.js (Самый простой)

```bash
node scripts/run-parser.mjs
```

### Вариант 2: Браузер (100% работает)

1. Откройте `public/parse-yml.html`
2. Нажмите "Fetch & Parse YML"
3. Нажмите "Download products.ts"
4. Сохраните в `src/data/products.ts`

### Вариант 3: Автоматический выбор

```bash
chmod +x scripts/run.sh
./scripts/run.sh
```

## Результат

После выполнения любого из скриптов вы получите файл `src/data/products.ts`:

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
  // 100-200 товаров из каталога
];
```

## Функциональность

### Автоматическое извлечение

Каждый скрипт автоматически:

- ✅ Загружает YML файл по URL
- ✅ Парсит XML и извлекает все товары
- ✅ Сопоставляет categoryId с нужными slug'ами
- ✅ Извлекает цвета из названий и описаний
- ✅ Генерирует TypeScript код с типами
- ✅ Сохраняет в `src/data/products.ts`
- ✅ Показывает статистику (товары по категориям)

### Маппинг категорий

```typescript
const categoryMap = {
  'Для мамы'      => 'mother-day',
  '8 марта'       => 'girl',
  'Девушкам'      => 'girl',
  'Девичник'      => 'girl',
  'Мужчинам'      => 'man',
  '23 февраля'    => 'man',
  'День отца'     => 'father-day',
  'Девочкам'      => 'girl-kid',
  'Мальчикам'     => 'boy-kid',
  'Выписка'       => 'discharge',
  'Гендер-пати'   => 'gender-party',
  'Шары на годик' => 'one-year',
  // Остальные    => 'other'
};
```

### Извлечение цветов

Автоматически находит в текстах:
- розовый, синий, красный, белый, черный
- золотой, серебряный
- зеленый, желтый, фиолетовый, голубой
- оранжевый, персиковый, мятный, коричневый

## Использование в коде

```typescript
import { products, type Product } from '@/data/products';

// Все товары
console.log(products.length);

// Фильтрация
const girlProducts = products.filter(p => p.category === 'girl');
const pinkBalloons = products.filter(p => p.colors?.includes('розовый'));
const cheap = products.filter(p => p.price < 3000);

// Поиск
const search = products.filter(p => 
  p.name.toLowerCase().includes('сюрприз')
);

// Сортировка
const sorted = [...products].sort((a, b) => a.price - b.price);
```

## Компоненты (примеры)

### ProductCard

```typescript
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} ₽</p>
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
```

### ProductList with Filters

```typescript
function ProductList() {
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  
  const filtered = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (p.price > maxPrice) return false;
    return true;
  });
  
  return (
    <div>
      <Filters onCategoryChange={setCategory} onPriceChange={setMaxPrice} />
      <div className="grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
```

## Технические детали

### Источник данных
- **URL**: https://xn--80aqga1abihi8b9a.xn--p1ai/tstore/yml/6b06c1ebf3dc86f07bfa1c2120e387d4.yml
- **Формат**: Yandex Market Language (YML/XML)
- **Кодировка**: UTF-8

### Методы парсинга
- **Node.js/Bun**: Regex-based (быстро, без зависимостей)
- **Browser**: DOM Parser API (надежно)

### Размер данных
- Товаров: ~100-200 (зависит от каталога)
- Размер файла: ~50-150 KB
- Время парсинга: 1-5 секунд

## Обновление данных

Чтобы получить свежие данные:

```bash
# Запустить любой скрипт заново
node scripts/run-parser.mjs
```

Файл `src/data/products.ts` будет обновлен.

## Решение проблем

### "Cannot find module"

```bash
# Убедитесь что вы в корне проекта
pwd
ls scripts/
```

### "Permission denied"

```bash
chmod +x scripts/run.sh
```

### "CORS error"

Используйте `public/parse-yml.html` - он корректно обрабатывает CORS.

### Файл не создается

```bash
# Создайте директорию вручную
mkdir -p src/data
node scripts/run-parser.mjs
```

## Что дальше?

1. **Запустите парсер** любым удобным способом
2. **Проверьте результат** в `src/data/products.ts`
3. **Используйте в коде**: `import { products } from '@/data/products'`
4. **Создайте компоненты** для отображения товаров
5. **Добавьте фильтры** по категориям, ценам, цветам

## Статистика (примерная)

После парсинга вы увидите примерно такую статистику:

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

## Готово!

Все инструменты готовы к использованию. Выберите любой способ и получите данные всех товаров из YML каталога.

---

**Документация:**
- Подробные инструкции: `PARSE-YML-INSTRUCTIONS.md`
- Техническая документация: `scripts/README.md`
- Использование данных: `src/data/README.md`

**Инструменты:**
- Node.js скрипт: `scripts/run-parser.mjs`
- Браузерный парсер: `public/parse-yml.html`
- Автоскрипт: `scripts/run.sh`
