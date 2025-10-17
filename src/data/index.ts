// Main data exports
// Auto-import products from the generated file

export type { Product } from './products.example';
export { products } from './products.example';

// After running the parser script, change the import to:
// export { products, type Product } from './products';

// Usage:
// import { products, type Product } from '@/data';
