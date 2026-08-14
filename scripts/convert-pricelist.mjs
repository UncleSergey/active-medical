import fs from 'node:fs';

const source = fs.readFileSync('/tmp/active-medical-pricelist.txt', 'utf8');
const rows = source.split(/\r?\n/).map((line) => line.split('|').map((cell) => cell.replace(/\u00a0/g, ' ').trim()).filter(Boolean));
const categories = [];
let current = null;
const ignored = new Set(['', 'ПРАЙС-ЛИСТ ПОСЛУГ', 'ПОСЛУГА', 'ЦІНА (ГРН)', '↑ До змісту']);
for (const cells of rows) {
  const name = cells[0] || '';
  const second = cells[1] || '';
  const isCategory = name && name === name.toUpperCase() && name.length > 4 && !ignored.has(name) && (second.startsWith('↑') || cells.length === 1);
  if (isCategory) {
    current = { title: name.charAt(0) + name.slice(1).toLowerCase(), items: [] };
    categories.push(current);
    continue;
  }
  if (!current || !name || ignored.has(name) || name.includes('До змісту')) continue;
  current.items.push({ name, price: second });
}
const total = categories.reduce((sum, category) => sum + category.items.length, 0);
fs.mkdirSync('/home/ubuntu/active-medical/client/src/data', { recursive: true });
fs.writeFileSync('/home/ubuntu/active-medical/client/src/data/pricelist.ts', `export const priceCategories = ${JSON.stringify(categories, null, 2)} as const;\n`);
console.log(`Converted ${categories.length} categories and ${total} items.`);
