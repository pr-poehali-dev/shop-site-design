# YML Parser - Workflow (Схема работы)

## 📋 Общая схема

```
┌─────────────────────────────────────────────────────────────┐
│                      YML CATALOG                             │
│  https://xn--80aqga1abihi8b9a.xn--p1ai/.../yml/...          │
│                                                               │
│  <offers>                                                     │
│    <offer id="123">                                          │
│      <name>Вау сюрприз</name>                               │
│      <price>5690</price>                                     │
│      <categoryId>938185508832</categoryId>                  │
│      <picture>https://...</picture>                         │
│    </offer>                                                  │
│  </offers>                                                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    [Парсер выбирается]
                           ↓
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Node.js    │   │     Bun      │   │   Browser    │
│              │   │              │   │              │
│ run-parser   │   │ fetch-       │   │ parse-yml    │
│    .mjs      │   │ products.ts  │   │    .html     │
└──────────────┘   └──────────────┘   └──────────────┘
        ↓                  ↓                  ↓
        └──────────────────┼──────────────────┘
                           ↓
                    [Обработка данных]
                           ↓
        ┌──────────────────────────────────────┐
        │ 1. Download YML                       │
        │ 2. Parse XML                          │
        │ 3. Extract offers                     │
        │ 4. Map categories                     │
        │ 5. Extract colors                     │
        │ 6. Generate TypeScript                │
        └──────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              src/data/products.ts                            │
│                                                               │
│  export interface Product { ... }                           │
│                                                               │
│  export const products: Product[] = [                       │
│    {                                                         │
│      id: "123",                                             │
│      name: "Вау сюрприз",                                  │
│      price: 5690,                                           │
│      category: "girl",                                      │
│      colors: ["розовый"],                                  │
│      image: "https://...",                                  │
│    },                                                        │
│    // ... 100-200 товаров                                  │
│  ]                                                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
                   [Импорт в код]
                           ↓
┌─────────────────────────────────────────────────────────────┐
│               Ваше React приложение                          │
│                                                               │
│  import { products } from '@/data';                         │
│                                                               │
│  function ProductList() {                                   │
│    return products.map(p =>                                 │
│      <ProductCard product={p} />                            │
│    );                                                        │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Детальный процесс парсинга

### Шаг 1: Загрузка YML

```
YML URL
   ↓
[fetch/https.get]
   ↓
XML String (~150-300 KB)
```

### Шаг 2: Парсинг XML

```
XML String
   ↓
[Regex / DOM Parser]
   ↓
Extracted offers
```

### Шаг 3: Обработка каждого товара

```
<offer id="123">
  <name>Вау сюрприз</name>
  <price>5690</price>
  <categoryId>938185508832</categoryId>
  <picture>https://...</picture>
  <description>Текст</description>
</offer>
   ↓
[Extract fields]
   ↓
{
  id: "123",
  name: "Вау сюрприз",
  price: 5690,
  categoryId: "938185508832",
  picture: "https://...",
  description: "Текст"
}
```

### Шаг 4: Маппинг категории

```
categoryId: "938185508832"
   ↓
[categoryMap lookup]
   ↓
category: "girl"
```

**Правила маппинга:**

```typescript
const categoryMap = {
  '938185508832': 'girl',      // Девушкам
  '903544273382': 'girl',      // 8 марта
  '486770416472': 'girl',      // Девичник
  '677890623652': 'man',       // Мужчинам
  '647172376882': 'man',       // 23 февраля
  '363431731972': 'girl-kid',  // Девочкам
  '804474588952': 'boy-kid',   // Мальчикам
  '551418870082': 'discharge', // Выписка
  '859134485432': 'gender-party', // Гендер-пати
  '388216421102': 'one-year',  // Шары на годик
  '480949580162': 'father-day', // День отца
  '418454360332': 'mother-day', // Для мамы
  // остальные => 'other'
};
```

### Шаг 5: Извлечение цветов

```
name + description:
"Вау сюрприз для нее. Розовые шары с белыми сердцами"
   ↓
[extractColors(text)]
   ↓
colors: ["розовый", "белый"]
```

**Алгоритм:**

```typescript
function extractColors(text: string): string[] {
  const lowerText = text.toLowerCase();
  const found = [];
  
  // Проверяем каждый цвет и его варианты
  if (lowerText.includes('розовый') || 
      lowerText.includes('розовая') || 
      lowerText.includes('розовые')) {
    found.push('розовый');
  }
  
  // ... для всех цветов
  
  return found;
}
```

### Шаг 6: Формирование финального объекта

```
{
  id: "123",
  name: "Вау сюрприз",
  price: 5690,
  image: "https://...",
  category: "girl",
  colors: ["розовый", "белый"],
  description: "Текст"
}
```

### Шаг 7: Генерация TypeScript кода

```
Array of products
   ↓
[JSON.stringify(products, null, 2)]
   ↓
TypeScript template
   ↓
File: src/data/products.ts
```

## 🎯 Использование в приложении

### Простой список

```
products array
   ↓
.map(p => <ProductCard />)
   ↓
Rendered cards
```

### С фильтрацией

```
products array
   ↓
.filter(p => p.category === 'girl')
   ↓
Filtered array
   ↓
.map(p => <ProductCard />)
   ↓
Rendered filtered cards
```

### С поиском и фильтрами

```
products array
   ↓
[Filter by search query]
   ↓
[Filter by category]
   ↓
[Filter by price range]
   ↓
[Filter by colors]
   ↓
[Sort by price/name]
   ↓
Final filtered & sorted array
   ↓
.map(p => <ProductCard />)
   ↓
Rendered results
```

## 📁 Файловая структура процесса

```
┌─────────────────────────────────────┐
│  scripts/run-parser.mjs             │  ← Запуск
│  (или другой скрипт)                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Загрузка YML из интернета           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Парсинг и обработка                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  src/data/products.ts  ← Результат  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  src/data/index.ts  ← Re-export     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Ваши компоненты: import from '@/data'│
└─────────────────────────────────────┘
```

## 🔧 Выбор метода парсинга

```
Есть Node.js? ─── Да ──→ run-parser.mjs ✓ (Быстро)
     │
     Нет
     ↓
Есть Bun? ─── Да ──→ fetch-products.ts ✓ (Быстро)
     │
     Нет
     ↓
Есть браузер? ─── Да ──→ parse-yml.html ✓ (100% работает)
     │
     Нет
     ↓
Установи Node.js/Bun
```

## ⏱️ Временная шкала

```
0s  ─ Запуск скрипта
      │
1s  ─ Загрузка YML (~300 KB)
      │
2s  ─ Парсинг XML
      │
3s  ─ Обработка ~200 товаров
      │
4s  ─ Генерация TypeScript
      │
5s  ─ Сохранение файла
      │
✓   ─ Готово!
```

## 📊 Объем данных

```
YML Catalog
   ├─ Size: ~150-300 KB
   ├─ Offers: ~100-200
   └─ Categories: 23
          ↓
products.ts
   ├─ Size: ~50-150 KB
   ├─ Products: ~100-200
   ├─ With colors: ~60% (auto-detected)
   └─ With descriptions: ~90%
```

## 🔄 Обновление данных

```
┌────────────────────────────┐
│  YML catalog updated       │
│  (на сервере магазина)     │
└────────────────────────────┘
          ↓
┌────────────────────────────┐
│  Run parser again          │
│  node scripts/run-parser.mjs│
└────────────────────────────┘
          ↓
┌────────────────────────────┐
│  products.ts updated       │
│  (в вашем проекте)         │
└────────────────────────────┘
          ↓
┌────────────────────────────┐
│  Rebuild app (if needed)   │
└────────────────────────────┘
```

## 🎨 Пример полного цикла использования

```
1. Парсинг
   node scripts/run-parser.mjs
   ↓
2. Получение данных
   src/data/products.ts (156 товаров)
   ↓
3. Импорт в компонент
   import { products } from '@/data';
   ↓
4. Фильтрация
   const girls = products.filter(p => p.category === 'girl'); // 38 шт
   ↓
5. Отображение
   {girls.map(p => <ProductCard key={p.id} product={p} />)}
   ↓
6. Результат
   38 карточек товаров на странице
```

---

**Готово!** Схема показывает полный цикл от YML до отображения на странице.
