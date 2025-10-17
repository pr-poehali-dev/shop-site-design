// Simple script to download and parse YML catalog
const fs = require('fs');
const path = require('path');

const YML_URL = 'https://xn--80aqga1abihi8b9a.xn--p1ai/tstore/yml/6b06c1ebf3dc86f07bfa1c2120e387d4.yml';

// Category mapping
const categoryMap = {
  '418454360332': 'mother-day', // Для мамы
  '903544273382': 'girl', // 8 марта
  '938185508832': 'girl', // Девушкам
  '677890623652': 'man', // Мужчинам
  '647172376882': 'man', // 23 февраля
  '480949580162': 'father-day', // День отца
  '363431731972': 'girl-kid', // Девочкам
  '804474588952': 'boy-kid', // Мальчикам
  '551418870082': 'discharge', // Выписка
  '859134485432': 'gender-party', // Гендер-пати
  '388216421102': 'one-year', // Шары на годик
  '486770416472': 'girl', // Девичник
  '669122245592': 'other', // 14 февраля
  '715576008962': 'other', // Популярные на главной
  '271055827892': 'other', // Большие шары
  '346524345142': 'other', // Коробка - сюрприз
  '649091827462': 'other', // Боксы
  '620575166392': 'other', // Цифры
  '363354784102': 'other', // Фольгированные фигуры
  '501977884172': 'other', // Новые 2025
  '344791042122': 'other', // All
  '146241468622': 'other', // Подростковый 2025
  '487288603682': 'other', // Фотобанк 6.0
};

// Parse XML manually
function parseYML(xml) {
  const products = [];
  
  // Extract offers section
  const offersMatch = xml.match(/<offers>([\s\S]*)<\/offers>/);
  if (!offersMatch) return products;
  
  const offersSection = offersMatch[1];
  
  // Extract individual offers
  const offerRegex = /<offer id="(\d+)">([\s\S]*?)<\/offer>/g;
  let match;
  
  while ((match = offerRegex.exec(offersSection)) !== null) {
    const offerId = match[1];
    const offerContent = match[2];
    
    // Extract fields
    const nameMatch = offerContent.match(/<name>(.*?)<\/name>/);
    const priceMatch = offerContent.match(/<price>([\d.]+)<\/price>/);
    const categoryMatch = offerContent.match(/<categoryId>(\d+)<\/categoryId>/);
    const pictureMatch = offerContent.match(/<picture>(.*?)<\/picture>/);
    const descMatch = offerContent.match(/<description>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/description>/);
    
    if (!nameMatch || !priceMatch) continue;
    
    const name = nameMatch[1];
    const price = parseFloat(priceMatch[1]);
    const categoryId = categoryMatch ? categoryMatch[1] : '';
    const picture = pictureMatch ? pictureMatch[1] : '';
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    
    // Map category
    const category = categoryMap[categoryId] || 'other';
    
    // Extract colors from description or name
    const colors = extractColors(name + ' ' + description);
    
    const product = {
      id: offerId,
      name,
      price,
      image: picture,
      category,
    };
    
    if (colors.length > 0) product.colors = colors;
    if (description) product.description = description;
    
    products.push(product);
  }
  
  return products;
}

// Extract colors from text
function extractColors(text) {
  const colorMap = {
    'розовый': ['розовый', 'розовая', 'розовые', 'розовом'],
    'синий': ['синий', 'синяя', 'синие', 'синем'],
    'красный': ['красный', 'красная', 'красные', 'красном'],
    'белый': ['белый', 'белая', 'белые', 'белом'],
    'черный': ['черный', 'черная', 'черные', 'черном'],
    'золотой': ['золотой', 'золотая', 'золотые', 'золотом', 'золото'],
    'серебряный': ['серебряный', 'серебряная', 'серебряные', 'серебро'],
    'зеленый': ['зеленый', 'зеленая', 'зеленые', 'зеленом'],
    'желтый': ['желтый', 'желтая', 'желтые', 'желтом'],
    'фиолетовый': ['фиолетовый', 'фиолетовая', 'фиолетовые', 'фиолетовом'],
    'голубой': ['голубой', 'голубая', 'голубые', 'голубом'],
    'оранжевый': ['оранжевый', 'оранжевая', 'оранжевые', 'оранжевом'],
    'коричневый': ['коричневый', 'коричневая', 'коричневые', 'коричневом'],
    'персиковый': ['персиковый', 'персиковая', 'персиковые', 'персиковом', 'персик'],
    'мятный': ['мятный', 'мятная', 'мятные', 'мятном', 'мята'],
  };
  
  const lowerText = text.toLowerCase();
  const foundColors = [];
  
  for (const [baseColor, variants] of Object.entries(colorMap)) {
    for (const variant of variants) {
      if (lowerText.includes(variant)) {
        if (!foundColors.includes(baseColor)) {
          foundColors.push(baseColor);
        }
        break;
      }
    }
  }
  
  return foundColors;
}

// Main function
async function main() {
  console.log('Downloading YML catalog...');
  const response = await fetch(YML_URL);
  const xml = await response.text();
  
  console.log('Parsing products...');
  const products = parseYML(xml);
  
  console.log(`Found ${products.length} products`);
  
  // Generate TypeScript code
  const tsCode = `// Auto-generated from YML catalog
// Date: ${new Date().toISOString()}
// Source: Baloo balloon shop

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors?: string[];
  description?: string;
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;
  
  // Create directory if not exists
  const outputPath = path.join(process.cwd(), 'src', 'data', 'products.ts');
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Save to file
  fs.writeFileSync(outputPath, tsCode);
  console.log(`✓ Products saved to ${outputPath}`);
  console.log(`✓ Total products: ${products.length}`);
  
  // Print some stats
  const categories = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\nProducts by category:');
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });
}

main().catch(console.error);
