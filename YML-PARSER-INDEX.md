# YML Parser - Навигация по документации

## 🚀 Начните здесь

### Для быстрого старта

1. **[CHEATSHEET.md](CHEATSHEET.md)** - Шпаргалка: команды и примеры кода (1 страница)
2. **[QUICKSTART.md](QUICKSTART.md)** - Быстрый старт за 3 шага (2-3 минуты)

### Для понимания процесса

3. **[WORKFLOW.md](WORKFLOW.md)** - Визуальная схема работы парсера
4. **[YML-PARSER-README.md](YML-PARSER-README.md)** - Главный README с примерами

## 📚 Полная документация

### Основные гайды

| Файл | Размер | Для кого | Описание |
|------|--------|----------|----------|
| [CHEATSHEET.md](CHEATSHEET.md) | 1 стр | Все | Команды и быстрые примеры |
| [QUICKSTART.md](QUICKSTART.md) | 2 стр | Новички | Старт за 3 шага |
| [YML-PARSER-README.md](YML-PARSER-README.md) | 5 стр | Все | Главный README |
| [YML-PARSER-SUMMARY.md](YML-PARSER-SUMMARY.md) | 8 стр | Подробно | Полный обзор функционала |
| [PARSE-YML-INSTRUCTIONS.md](PARSE-YML-INSTRUCTIONS.md) | 12 стр | Детали | Максимально подробный гайд |

### Технические документы

| Файл | Описание |
|------|----------|
| [WORKFLOW.md](WORKFLOW.md) | Схемы и процессы |
| [FILES-CREATED.md](FILES-CREATED.md) | Список всех созданных файлов |
| [scripts/README.md](scripts/README.md) | Документация скриптов |
| [src/data/README.md](src/data/README.md) | Использование данных |

## 🛠️ Инструменты

### Скрипты парсинга

| Файл | Runtime | Команда запуска |
|------|---------|-----------------|
| `scripts/run-parser.mjs` | Node.js | `node scripts/run-parser.mjs` ⭐ |
| `scripts/fetch-products.ts` | Bun | `bun run scripts/fetch-products.ts` |
| `scripts/download-yml.js` | Node.js | `node scripts/download-yml.js` |
| `scripts/parse-yml.ts` | TSX | `tsx scripts/parse-yml.ts` |
| `public/parse-yml.html` | Browser | Открыть в браузере ⭐ |
| `scripts/quick-parse.html` | Browser | Открыть в браузере |
| `scripts/run.sh` | Auto | `./scripts/run.sh` |

⭐ = Рекомендуется

### Файлы данных

| Файл | Статус | Описание |
|------|--------|----------|
| `src/data/products.ts` | Создается | **Главный файл** - все товары |
| `src/data/products.example.ts` | Готов | Пример с 12 товарами |
| `src/data/index.ts` | Готов | Точка входа для импорта |

## 📖 Как читать документацию

### Сценарий 1: Совсем новичок

```
1. Прочитайте QUICKSTART.md (3 минуты)
2. Запустите парсер (5 минут)
3. Используйте CHEATSHEET.md при работе
```

### Сценарий 2: Нужны подробности

```
1. Прочитайте YML-PARSER-README.md (10 минут)
2. Изучите WORKFLOW.md для понимания процесса
3. Используйте YML-PARSER-SUMMARY.md как справочник
```

### Сценарий 3: Технические детали

```
1. PARSE-YML-INSTRUCTIONS.md (полный гайд)
2. scripts/README.md (документация скриптов)
3. WORKFLOW.md (схемы процессов)
```

### Сценарий 4: Быстрая справка

```
CHEATSHEET.md - всегда под рукой!
```

## 🎯 Частые вопросы → Документы

| Вопрос | Читайте |
|--------|---------|
| Как быстро начать? | QUICKSTART.md |
| Какой скрипт использовать? | YML-PARSER-README.md → "Скрипты парсинга" |
| Как фильтровать товары? | CHEATSHEET.md → "Фильтры" |
| Как работает парсинг? | WORKFLOW.md |
| Что внутри Product? | CHEATSHEET.md → "Структура" |
| Как обновить данные? | CHEATSHEET.md → "Обновить данные" |
| Список всех файлов? | FILES-CREATED.md |
| Технические детали? | PARSE-YML-INSTRUCTIONS.md |

## 🗂️ Структура проекта

```
Корень проекта/
│
├── Документация (читайте здесь)
│   ├── YML-PARSER-INDEX.md          ← Вы здесь
│   ├── CHEATSHEET.md                ← Шпаргалка
│   ├── QUICKSTART.md                ← Быстрый старт
│   ├── YML-PARSER-README.md         ← Главный README
│   ├── YML-PARSER-SUMMARY.md        ← Обзор
│   ├── PARSE-YML-INSTRUCTIONS.md    ← Полный гайд
│   ├── WORKFLOW.md                  ← Схемы
│   └── FILES-CREATED.md             ← Список файлов
│
├── scripts/ (скрипты парсинга)
│   ├── README.md                    ← Документация скриптов
│   ├── run-parser.mjs               ← Node.js парсер ⭐
│   ├── fetch-products.ts            ← Bun парсер
│   ├── download-yml.js              ← Альтернативный Node.js
│   ├── parse-yml.ts                 ← TypeScript парсер
│   ├── quick-parse.html             ← Браузерный парсер
│   └── run.sh                       ← Автоскрипт
│
├── public/ (публичные файлы)
│   └── parse-yml.html               ← Браузерный UI ⭐
│
└── src/data/ (файлы данных)
    ├── README.md                    ← Использование данных
    ├── index.ts                     ← Точка входа
    ├── products.example.ts          ← Пример (12 товаров)
    └── products.ts                  ← Главный файл (создается)
```

## ⚡ Быстрые команды

### Получить данные

```bash
# Способ 1 (рекомендуется)
node scripts/run-parser.mjs

# Способ 2 (браузер)
open public/parse-yml.html

# Способ 3 (автоматически)
./scripts/run.sh
```

### Использовать в коде

```typescript
import { products, type Product } from '@/data';
```

### Обновить данные

```bash
node scripts/run-parser.mjs
```

## 📊 Что вы получите

```typescript
// src/data/products.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors?: string[];
  description?: string;
}

export const products: Product[] = [
  // 100-200 товаров из YML каталога
];
```

## 🎓 Учебные материалы

### Для начинающих

1. **QUICKSTART.md** - 3 шага для старта
2. **CHEATSHEET.md** - Примеры кода
3. **YML-PARSER-README.md** - Основы использования

### Для продвинутых

1. **YML-PARSER-SUMMARY.md** - Все возможности
2. **WORKFLOW.md** - Как это работает
3. **PARSE-YML-INSTRUCTIONS.md** - Все детали

### Для разработчиков

1. **scripts/README.md** - Технические детали скриптов
2. **src/data/README.md** - Работа с данными
3. **FILES-CREATED.md** - Структура проекта

## 🔍 Навигация по темам

### Парсинг YML

- Выбор скрипта: **YML-PARSER-README.md** → "Скрипты парсинга"
- Процесс парсинга: **WORKFLOW.md** → "Детальный процесс"
- Технические детали: **PARSE-YML-INSTRUCTIONS.md** → "Технические детали"

### Использование данных

- Быстрые примеры: **CHEATSHEET.md**
- Компоненты: **YML-PARSER-README.md** → "Примеры использования"
- Фильтрация: **CHEATSHEET.md** → "Фильтры"

### Категории и цвета

- Список категорий: **CHEATSHEET.md** → "Категории"
- Маппинг: **WORKFLOW.md** → "Маппинг категории"
- Извлечение цветов: **WORKFLOW.md** → "Извлечение цветов"

### Обновление и обслуживание

- Обновление данных: **CHEATSHEET.md** → "Обновить данные"
- Решение проблем: **PARSE-YML-INSTRUCTIONS.md** → "Решение проблем"

## 📝 Рекомендуемый порядок чтения

### Уровень 1: Минимальный (5 минут)

```
CHEATSHEET.md → Запустить скрипт → Готово!
```

### Уровень 2: Базовый (15 минут)

```
1. QUICKSTART.md
2. Запустить скрипт
3. YML-PARSER-README.md (секция "Примеры")
4. Начать работу
```

### Уровень 3: Полный (30 минут)

```
1. QUICKSTART.md
2. YML-PARSER-README.md
3. WORKFLOW.md
4. CHEATSHEET.md (для справки)
5. Запустить и использовать
```

### Уровень 4: Эксперт (60 минут)

```
1. YML-PARSER-README.md
2. YML-PARSER-SUMMARY.md
3. PARSE-YML-INSTRUCTIONS.md
4. WORKFLOW.md
5. scripts/README.md
6. Полное понимание системы
```

## ✅ Чеклист готовности

- [ ] Прочитал QUICKSTART.md или CHEATSHEET.md
- [ ] Выбрал метод парсинга (Node.js / Browser)
- [ ] Запустил скрипт парсинга
- [ ] Получил файл src/data/products.ts
- [ ] Проверил количество товаров (должно быть ~100-200)
- [ ] Импортировал в код: `import { products } from '@/data'`
- [ ] Начал использовать данные

## 🎯 Следующие шаги

После прочтения документации и запуска парсера:

1. ✅ Изучите структуру данных Product
2. ✅ Попробуйте фильтрацию и поиск
3. ✅ Создайте компонент ProductCard
4. ✅ Добавьте фильтры по категориям
5. ✅ Реализуйте поиск по названию
6. 🚀 Создайте полноценный каталог товаров!

---

**Версия**: 1.0  
**Дата**: 2025-10-18  
**Статус**: ✅ Полная документация готова

**Начните с**: [QUICKSTART.md](QUICKSTART.md) или [CHEATSHEET.md](CHEATSHEET.md)
