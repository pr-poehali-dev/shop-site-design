// Example products file
// Run `node scripts/run-parser.mjs` to generate full products.ts file with all items from YML catalog

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'girl' | 'man' | 'girl-kid' | 'boy-kid' | 'discharge' | 'gender-party' | 'one-year' | 'father-day' | 'mother-day' | 'other';
  colors?: string[];
  description?: string;
}

// This is an example with a few products
// To get all products from the YML catalog, run one of these commands:
//   node scripts/run-parser.mjs
//   bun run scripts/fetch-products.ts
//   or open public/parse-yml.html in browser

export const products: Product[] = [
  {
    "id": "349786904162",
    "name": "Вау сюрприз для нее",
    "price": 5690,
    "image": "https://static.tildacdn.com/stor3433-3861-4737-b431-323035653532/57084564.jpg",
    "category": "girl",
    "description": "4 связки по 10 сердец 12 сердец с фото"
  },
  {
    "id": "400623106222",
    "name": "Композиция для неё Люкс",
    "price": 5490,
    "image": "https://static.tildacdn.com/stor3834-6633-4030-a534-336462323866/12065866.jpg",
    "category": "girl",
    "colors": ["розовый"],
    "description": "Большие шары в розовой гамме"
  },
  {
    "id": "823947293532",
    "name": "Букет для мамы",
    "price": 3290,
    "image": "https://static.tildacdn.com/stor6639-3362-4965-b130-326137663361/39944055.jpg",
    "category": "mother-day",
    "colors": ["розовый", "белый"],
    "description": "Нежный букет для мамы"
  },
  {
    "id": "349280294672",
    "name": "Набор Дембель",
    "price": 4490,
    "image": "https://static.tildacdn.com/stor3461-6532-4430-b936-323636643761/29393991.jpg",
    "category": "man",
    "colors": ["зеленый"],
    "description": "23 февраля, Армия, Военные"
  },
  {
    "id": "672901832422",
    "name": "Выписка для девочки Персик",
    "price": 6490,
    "image": "https://static.tildacdn.com/stor6461-3861-4033-b735-343530396461/98273645.jpg",
    "category": "discharge",
    "colors": ["персиковый", "белый"],
    "description": "Выписка из роддома для девочки"
  },
  {
    "id": "192847562832",
    "name": "Выписка для мальчика Мята",
    "price": 6490,
    "image": "https://static.tildacdn.com/stor6130-3465-4937-a138-393663636662/72819364.jpg",
    "category": "discharge",
    "colors": ["мятный", "белый"],
    "description": "Выписка из роддома для мальчика"
  },
  {
    "id": "983726450122",
    "name": "Гендер-пати Мальчик или Девочка",
    "price": 7990,
    "image": "https://static.tildacdn.com/stor3461-6239-4632-b831-313662636564/45637281.jpg",
    "category": "gender-party",
    "colors": ["розовый", "голубой"],
    "description": "Определение пола ребенка"
  },
  {
    "id": "456789123456",
    "name": "Единичка для девочки",
    "price": 4990,
    "image": "https://static.tildacdn.com/stor6532-3864-4230-b936-326461636365/11928374.jpg",
    "category": "one-year",
    "colors": ["розовый", "золотой"],
    "description": "Шары на годик для девочки"
  },
  {
    "id": "789456123789",
    "name": "Единичка для мальчика",
    "price": 4990,
    "image": "https://static.tildacdn.com/stor3632-6461-4837-a234-396562633664/28374651.jpg",
    "category": "one-year",
    "colors": ["синий", "серебряный"],
    "description": "Шары на годик для мальчика"
  },
  {
    "id": "321654987321",
    "name": "Для папы День отца",
    "price": 3790,
    "image": "https://static.tildacdn.com/stor6330-3964-4235-b138-316562393865/55443322.jpg",
    "category": "father-day",
    "colors": ["синий", "белый"],
    "description": "Поздравление для папы"
  },
  {
    "id": "147258369147",
    "name": "Принцесса для девочки",
    "price": 4290,
    "image": "https://static.tildacdn.com/stor3365-6530-4934-a632-336564313865/66778899.jpg",
    "category": "girl-kid",
    "colors": ["розовый", "золотой"],
    "description": "Композиция для маленькой принцессы"
  },
  {
    "id": "951753852951",
    "name": "Тачки для мальчика",
    "price": 4290,
    "image": "https://static.tildacdn.com/stor6632-3461-4836-b234-343562656364/99887766.jpg",
    "category": "boy-kid",
    "colors": ["красный", "синий"],
    "description": "Шары с тачками для мальчика"
  }
];

// Stats for this example file
// Total: 12 products
// Categories:
//   girl: 2
//   mother-day: 1
//   man: 1
//   discharge: 2
//   gender-party: 1
//   one-year: 2
//   father-day: 1
//   girl-kid: 1
//   boy-kid: 1
