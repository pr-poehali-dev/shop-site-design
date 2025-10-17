# YML Parser - Шпаргалка

## Получить данные

```bash
node scripts/run-parser.mjs
```

или

```
Открыть public/parse-yml.html в браузере
```

## Использовать в коде

```typescript
import { products, type Product } from '@/data';
```

## Фильтры

```typescript
// По категории
products.filter(p => p.category === 'girl')

// По цене
products.filter(p => p.price < 3000)

// По цвету
products.filter(p => p.colors?.includes('розовый'))

// По названию
products.filter(p => p.name.toLowerCase().includes('сюрприз'))
```

## Сортировка

```typescript
// По цене (дешевые первые)
[...products].sort((a, b) => a.price - b.price)

// По цене (дорогие первые)
[...products].sort((a, b) => b.price - a.price)

// По названию
[...products].sort((a, b) => a.name.localeCompare(b.name))
```

## Категории

| Slug | Описание |
|------|----------|
| `girl` | Для девушек |
| `man` | Для мужчин |
| `girl-kid` | Для девочек |
| `boy-kid` | Для мальчиков |
| `discharge` | Выписка |
| `gender-party` | Гендер-пати |
| `one-year` | На годик |
| `father-day` | День отца |
| `mother-day` | Для мамы |
| `other` | Остальное |

## Структура

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors?: string[];
  description?: string;
}
```

## Примеры компонентов

### Card

```typescript
<div>
  <img src={product.image} alt={product.name} />
  <h3>{product.name}</h3>
  <p>{product.price} ₽</p>
</div>
```

### List

```typescript
{products.map(p => (
  <ProductCard key={p.id} product={p} />
))}
```

### Filter

```typescript
const [category, setCategory] = useState('all');
const filtered = products.filter(p => 
  category === 'all' || p.category === category
);
```

## Обновить данные

```bash
node scripts/run-parser.mjs
```

## Файлы

| Файл | Назначение |
|------|------------|
| `src/data/products.ts` | Главный файл с данными |
| `src/data/index.ts` | Точка входа |
| `scripts/run-parser.mjs` | Скрипт парсинга |
| `public/parse-yml.html` | Браузерный парсер |

## Документация

| Файл | Для кого |
|------|----------|
| `QUICKSTART.md` | Начинающих |
| `PARSE-YML-INSTRUCTIONS.md` | Подробная |
| `YML-PARSER-SUMMARY.md` | Обзор |

---

**Готово!** Запусти скрипт и используй данные.
