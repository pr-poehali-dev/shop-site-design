# YML Catalog Parser

Этот набор скриптов позволяет загрузить и распарсить YML каталог товаров из интернет-магазина воздушных шаров.

## Доступные скрипты

### 1. Node.js скрипт (Рекомендуется)

```bash
node scripts/run-parser.mjs
```

Этот скрипт:
- Загружает YML файл из указанного URL
- Парсит все товары с полями: id, name, price, image, category, colors, description
- Сопоставляет категории согласно маппингу
- Извлекает цвета из названий и описаний
- Генерирует TypeScript файл `src/data/products.ts`
- Выводит статистику по категориям и данным

### 2. Bun/TypeScript скрипт

```bash
bun run scripts/fetch-products.ts
```

Альтернативный скрипт с использованием Bun runtime.

### 3. HTML-парсер (Браузер)

Откройте в браузере: `public/parse-yml.html`

Этот инструмент:
- Работает полностью в браузере
- Загружает и парсит YML файл
- Показывает подробную статистику
- Позволяет скачать готовый файл `products.ts`

## Структура данных

### Product Interface

\`\`\`typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'girl' | 'man' | 'girl-kid' | 'boy-kid' | 'discharge' | 'gender-party' | 'one-year' | 'father-day' | 'mother-day' | 'other';
  colors?: string[];
  description?: string;
}
\`\`\`

### Маппинг категорий

- `girl` - Для девушек (8 марта, Девушкам, Девичник)
- `man` - Для мужчин (23 февраля, Мужчинам)
- `girl-kid` - Девочкам
- `boy-kid` - Мальчикам
- `discharge` - Выписка из роддома
- `gender-party` - Гендер-пати
- `one-year` - Шары на годик
- `father-day` - День отца
- `mother-day` - Для мамы
- `other` - Остальные категории

### Извлечение цветов

Скрипт автоматически извлекает цвета из названий и описаний товаров:
- розовый, синий, красный, белый, черный
- золотой, серебряный
- зеленый, желтый, фиолетовый, голубой
- оранжевый, персиковый, мятный, коричневый

## Быстрый старт

### Способ 1: Node.js (самый простой)

\`\`\`bash
# Запустить парсер
node scripts/run-parser.mjs

# Файл будет создан автоматически
# src/data/products.ts
\`\`\`

### Способ 2: Браузер

1. Откройте `public/parse-yml.html` в браузере
2. Нажмите кнопку "Fetch & Parse YML"
3. Дождитесь завершения парсинга
4. Нажмите "Download products.ts"
5. Сохраните файл в `src/data/products.ts`

## Использование в проекте

После генерации файла products.ts, импортируйте его в своем коде:

\`\`\`typescript
import { products, type Product } from '@/data/products';

// Все товары
console.log(products.length);

// Фильтрация по категории
const girlProducts = products.filter(p => p.category === 'girl');

// Поиск по цвету
const pinkProducts = products.filter(p => 
  p.colors?.includes('розовый')
);

// Сортировка по цене
const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
\`\`\`

## Обновление данных

Чтобы обновить данные из YML каталога, просто запустите скрипт снова:

\`\`\`bash
node scripts/run-parser.mjs
\`\`\`

Файл `src/data/products.ts` будет перезаписан с актуальными данными.

## Технические детали

- YML URL: `https://xn--80aqga1abihi8b9a.xn--p1ai/tstore/yml/6b06c1ebf3dc86f07bfa1c2120e387d4.yml`
- Формат: Yandex Market Language (YML)
- Кодировка: UTF-8
- Парсинг: Regex-based (для Node.js) и DOM-based (для браузера)
