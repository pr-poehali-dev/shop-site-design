# Быстрый старт - YML Parser

## 1. Получить данные (выбери один способ)

### Способ A: Node.js (1 команда)

```bash
node scripts/run-parser.mjs
```

### Способ B: Браузер (3 клика)

1. Открой `public/parse-yml.html`
2. Кликни "Fetch & Parse YML"
3. Кликни "Download products.ts"
4. Сохрани в `src/data/products.ts`

### Способ C: Автоматически

```bash
chmod +x scripts/run.sh && ./scripts/run.sh
```

## 2. Обновить импорт

Открой `src/data/index.ts` и замени:

```typescript
// Было:
export { products } from './products.example';

// Стало:
export { products } from './products';
```

## 3. Используй в коде

```typescript
import { products, type Product } from '@/data';

// Готово! Все товары доступны
console.log(products.length); // ~100-200 товаров
```

## Примеры использования

### Вывести все товары

```typescript
products.forEach(p => {
  console.log(p.name, p.price);
});
```

### Фильтр по категории

```typescript
const girlProducts = products.filter(p => p.category === 'girl');
```

### Фильтр по цене

```typescript
const affordable = products.filter(p => p.price < 3000);
```

### Поиск

```typescript
const search = (query: string) => 
  products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
```

### Сортировка

```typescript
const byPrice = [...products].sort((a, b) => a.price - b.price);
```

## Структура Product

```typescript
{
  id: string;              // "349786904162"
  name: string;            // "Вау сюрприз для нее"
  price: number;           // 5690
  image: string;           // "https://..."
  category: string;        // "girl"
  colors?: string[];       // ["розовый", "белый"]
  description?: string;    // "4 связки по 10 сердец..."
}
```

## Категории

- `girl` - Для девушек
- `man` - Для мужчин
- `girl-kid` - Для девочек
- `boy-kid` - Для мальчиков
- `discharge` - Выписка
- `gender-party` - Гендер-пати
- `one-year` - На годик
- `father-day` - День отца
- `mother-day` - Для мамы
- `other` - Остальное

## Что дальше?

1. ✅ Запусти парсер (шаг 1)
2. ✅ Обнови импорт (шаг 2)
3. ✅ Используй данные (шаг 3)
4. 🚀 Создавай компоненты!

---

**Документация:**
- Подробно: `PARSE-YML-INSTRUCTIONS.md`
- Кратко: `YML-PARSER-SUMMARY.md`
- Техническая: `scripts/README.md`
