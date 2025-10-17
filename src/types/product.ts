export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}
