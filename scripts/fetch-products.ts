#!/usr/bin/env bun

// Simple script to fetch and parse YML catalog
const YML_URL = 'https://xn--80aqga1abihi8b9a.xn--p1ai/tstore/yml/6b06c1ebf3dc86f07bfa1c2120e387d4.yml';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  colors?: string[];
  description?: string;
}

// Category mapping according to requirements
const categoryMap: Record<string, string> = {
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

// Extract colors from text
function extractColors(text: string): string[] {
  const colorMap: Record<string, string[]> = {
    'розовый': ['розовый', 'розовая', 'розовые', 'розовом', 'pink'],
    'синий': ['синий', 'синяя', 'синие', 'синем', 'blue'],
    'красный': ['красный', 'красная', 'красные', 'красном', 'red'],
    'белый': ['белый', 'белая', 'белые', 'белом', 'white'],
    'черный': ['черный', 'черная', 'черные', 'черном', 'black'],
    'золотой': ['золотой', 'золотая', 'золотые', 'золотом', 'золото', 'gold'],
    'серебряный': ['серебряный', 'серебряная', 'серебряные', 'серебро', 'silver'],
    'зеленый': ['зеленый', 'зеленая', 'зеленые', 'зеленом', 'green'],
    'желтый': ['желтый', 'желтая', 'желтые', 'желтом', 'yellow'],
    'фиолетовый': ['фиолетовый', 'фиолетовая', 'фиолетовые', 'фиолетовом', 'purple'],
    'голубой': ['голубой', 'голубая', 'голубые', 'голубом', 'light blue'],
    'оранжевый': ['оранжевый', 'оранжевая', 'оранжевые', 'оранжевом', 'orange'],
    'коричневый': ['коричневый', 'коричневая', 'коричневые', 'коричневом', 'brown'],
    'персиковый': ['персиковый', 'персиковая', 'персиковые', 'персиковом', 'персик', 'peach'],
    'мятный': ['мятный', 'мятная', 'мятные', 'мятном', 'мята', 'mint'],
  };
  
  const lowerText = text.toLowerCase();
  const foundColors: string[] = [];
  
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

// Parse YML XML
function parseYML(xml: string): Product[] {
  const products: Product[] = [];
  
  // Extract offers section
  const offersMatch = xml.match(/<offers>([\s\S]*)<\/offers>/);
  if (!offersMatch) {
    console.error('Could not find offers section');
    return products;
  }
  
  const offersSection = offersMatch[1];
  
  // Extract individual offers using regex
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
    
    if (!nameMatch || !priceMatch) {
      console.warn(`Skipping offer ${offerId}: missing name or price`);
      continue;
    }
    
    const name = nameMatch[1].trim();
    const price = parseFloat(priceMatch[1]);
    const categoryId = categoryMatch ? categoryMatch[1] : '';
    const picture = pictureMatch ? pictureMatch[1].trim() : '';
    const description = descMatch 
      ? descMatch[1].replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() 
      : '';
    
    // Map category
    const category = categoryMap[categoryId] || 'other';
    
    // Extract colors from name and description
    const colors = extractColors(name + ' ' + description);
    
    const product: Product = {
      id: offerId,
      name,
      price,
      image: picture,
      category,
    };
    
    if (colors.length > 0) {
      product.colors = colors;
    }
    
    if (description) {
      product.description = description;
    }
    
    products.push(product);
  }
  
  return products;
}

// Main function
async function main() {
  try {
    console.log('📥 Downloading YML catalog...');
    const response = await fetch(YML_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xml = await response.text();
    console.log(`✓ Downloaded ${Math.round(xml.length / 1024)}KB`);
    
    console.log('🔍 Parsing products...');
    const products = parseYML(xml);
    
    console.log(`✓ Found ${products.length} products`);
    
    // Create output directory
    const outputDir = 'src/data';
    await Bun.write(
      `${outputDir}/.gitkeep`,
      ''
    );
    
    // Generate TypeScript code
    const tsCode = `// Auto-generated from YML catalog
// Date: ${new Date().toISOString()}
// Source: Baloo balloon shop (https://xn--80aqga1abihi8b9a.xn--p1ai)
// Total products: ${products.length}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'girl' | 'man' | 'girl-kid' | 'boy-kid' | 'discharge' | 'gender-party' | 'one-year' | 'father-day' | 'mother-day' | 'other';
  colors?: string[];
  description?: string;
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;
    
    // Save to file
    const outputPath = `${outputDir}/products.ts`;
    await Bun.write(outputPath, tsCode);
    
    console.log(`\n✅ Products saved to ${outputPath}`);
    console.log(`✅ Total products: ${products.length}`);
    
    // Print statistics
    const categories = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\n📊 Products by category:');
    Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`   ${cat.padEnd(15)} : ${count}`);
      });
    
    const withColors = products.filter(p => p.colors && p.colors.length > 0).length;
    const withDescriptions = products.filter(p => p.description).length;
    
    console.log('\n📈 Additional stats:');
    console.log(`   With colors      : ${withColors} (${Math.round(withColors / products.length * 100)}%)`);
    console.log(`   With description : ${withDescriptions} (${Math.round(withDescriptions / products.length * 100)}%)`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
