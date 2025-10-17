#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const YML_URL = 'https://xn--80aqga1abihi8b9a.xn--p1ai/tstore/yml/6b06c1ebf3dc86f07bfa1c2120e387d4.yml';

const categoryMap = {
  '418454360332': 'mother-day',
  '903544273382': 'girl',
  '938185508832': 'girl',
  '677890623652': 'man',
  '647172376882': 'man',
  '480949580162': 'father-day',
  '363431731972': 'girl-kid',
  '804474588952': 'boy-kid',
  '551418870082': 'discharge',
  '859134485432': 'gender-party',
  '388216421102': 'one-year',
  '486770416472': 'girl',
  '669122245592': 'other',
  '715576008962': 'other',
  '271055827892': 'other',
  '346524345142': 'other',
  '649091827462': 'other',
  '620575166392': 'other',
  '363354784102': 'other',
  '501977884172': 'other',
  '344791042122': 'other',
  '146241468622': 'other',
  '487288603682': 'other',
};

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

function parseYML(xml) {
  const products = [];
  const offersMatch = xml.match(/<offers>([\s\S]*)<\/offers>/);
  
  if (!offersMatch) {
    console.error('Could not find offers section');
    return products;
  }
  
  const offersSection = offersMatch[1];
  const offerRegex = /<offer id="(\d+)">([\s\S]*?)<\/offer>/g;
  let match;
  
  while ((match = offerRegex.exec(offersSection)) !== null) {
    const offerId = match[1];
    const offerContent = match[2];
    
    const nameMatch = offerContent.match(/<name>(.*?)<\/name>/);
    const priceMatch = offerContent.match(/<price>([\d.]+)<\/price>/);
    const categoryMatch = offerContent.match(/<categoryId>(\d+)<\/categoryId>/);
    const pictureMatch = offerContent.match(/<picture>(.*?)<\/picture>/);
    const descMatch = offerContent.match(/<description>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/description>/);
    
    if (!nameMatch || !priceMatch) continue;
    
    const name = nameMatch[1].trim();
    const price = parseFloat(priceMatch[1]);
    const categoryId = categoryMatch ? categoryMatch[1] : '';
    const picture = pictureMatch ? pictureMatch[1].trim() : '';
    const description = descMatch 
      ? descMatch[1].replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() 
      : '';
    
    const category = categoryMap[categoryId] || 'other';
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

function downloadYML() {
  return new Promise((resolve, reject) => {
    https.get(YML_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log('📥 Downloading YML catalog...');
    const xml = await downloadYML();
    console.log(`✓ Downloaded ${Math.round(xml.length / 1024)}KB`);
    
    console.log('🔍 Parsing products...');
    const products = parseYML(xml);
    console.log(`✓ Found ${products.length} products`);
    
    const tsCode = `// Auto-generated from YML catalog
// Date: ${new Date().toISOString()}
// Source: Baloo balloon shop
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
    
    const outputDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'products.ts');
    fs.writeFileSync(outputPath, tsCode);
    
    console.log(`\n✅ Products saved to ${outputPath}`);
    console.log(`✅ Total products: ${products.length}`);
    
    const categories = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    
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
