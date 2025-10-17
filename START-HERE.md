# 🚀 НАЧНИТЕ ЗДЕСЬ

## Получите ВСЕ товары из YML каталога за 30 секунд

### Выберите ОДИН способ:

---

## ⭐ Способ 1: Node.js (Самый быстрый)

### Запустите:

```bash
node scripts/run-parser.mjs
```

### Готово!

Файл `src/data/products.ts` создан с ~100-200 товарами.

---

## ⭐ Способ 2: Браузер (100% работает)

### Шаги:

1. Откройте в браузере: `public/parse-yml.html`
2. Нажмите: **"Fetch & Parse YML"**
3. Подождите 5 секунд
4. Нажмите: **"Download products.ts"**
5. Сохраните файл в: `src/data/products.ts`

### Готово!

---

## Что дальше?

### Используйте в коде:

```typescript
import { products, type Product } from '@/data';

// Все товары готовы!
console.log(products.length); // ~100-200

// Пример: товары для девушек
const girlProducts = products.filter(p => p.category === 'girl');

// Пример: недорогие товары
const cheap = products.filter(p => p.price < 3000);

// Пример: розовые шары
const pink = products.filter(p => p.colors?.includes('розовый'));
```

---

## 📚 Нужна помощь?

### Быстрая справка:
- **[CHEATSHEET.md](CHEATSHEET.md)** - Команды и примеры

### Подробные гайды:
- **[QUICKSTART.md](QUICKSTART.md)** - Старт за 3 шага
- **[YML-PARSER-README.md](YML-PARSER-README.md)** - Полный README
- **[YML-PARSER-INDEX.md](YML-PARSER-INDEX.md)** - Навигация по всем документам

---

## ✅ Всё работает?

Теперь у вас есть:

- ✅ Файл `src/data/products.ts` с ~100-200 товарами
- ✅ TypeScript типы для Product
- ✅ Категории (girl, man, discharge, etc.)
- ✅ Автоматически извлеченные цвета
- ✅ Цены, изображения, описания

**Начните создавать компоненты!** 🎉

---

**Вопросы?** Читайте документацию в [YML-PARSER-INDEX.md](YML-PARSER-INDEX.md)
