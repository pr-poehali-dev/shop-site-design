# Product Data Directory

This directory contains product data files for the balloon shop.

## Files

### products.ts

**Main product data file** - Contains all products from the YML catalog.

This file is **auto-generated**. To create or update it, run:

```bash
node scripts/run-parser.mjs
```

Or use the browser tool:
```bash
open public/parse-yml.html
```

### products.example.ts

Example file with sample products for development and testing.

## Usage

```typescript
import { products, type Product } from '@/data/products';

// Use products array
products.forEach(product => {
  console.log(product.name, product.price);
});
```

## Data Structure

```typescript
interface Product {
  id: string;              // Unique product ID
  name: string;            // Product name
  price: number;           // Price in rubles
  image: string;           // Image URL
  category: string;        // Category slug
  colors?: string[];       // Optional colors array
  description?: string;    // Optional description
}
```

## Categories

- `girl` - For girls/women
- `man` - For men
- `girl-kid` - For girls (kids)
- `boy-kid` - For boys (kids)
- `discharge` - Hospital discharge
- `gender-party` - Gender reveal
- `one-year` - First birthday
- `father-day` - Father's Day
- `mother-day` - Mother's Day
- `other` - Other categories

## Updating Data

To refresh product data from the YML catalog:

```bash
# Option 1: Node.js
node scripts/run-parser.mjs

# Option 2: Bun
bun run scripts/fetch-products.ts

# Option 3: Browser
open public/parse-yml.html
```

See root `PARSE-YML-INSTRUCTIONS.md` for detailed instructions.
