import fs from 'fs';
import path from 'path';

const PHOTOS_DIR = './public/Photos';
const OUTPUT_FILE = './src/data/fishData.json';

function parseFishMetadata() {
  const registry = {};

  if (!fs.existsSync(PHOTOS_DIR)) return registry;

  const categories = fs.readdirSync(PHOTOS_DIR).filter(f => 
    fs.statSync(path.join(PHOTOS_DIR, f)).isDirectory()
  );

  categories.forEach(category => {
    const categoryPath = path.join(PHOTOS_DIR, category);
    const entries = fs.readdirSync(categoryPath);

    entries.forEach(entry => {
      const entryPath = path.join(categoryPath, entry);
      if (fs.statSync(entryPath).isDirectory()) {
         const subFiles = fs.readdirSync(entryPath);
         subFiles.forEach(subFile => {
            processFile(category, path.join(entry, subFile), registry);
         });
      } else {
        processFile(category, entry, registry);
      }
    });
  });

  return registry;
}

function processFile(category, relativeFilePath, registry) {
  const fullPath = `/Photos/${category}/${relativeFilePath}`.replace(/\\/g, '/');
  const filename = path.basename(relativeFilePath);
  
  // More flexible regex:
  // Group 1: Name
  // Group 2: Index (1 or 2)
  // Handles: "Name (1).jpg", "Name 1.jpg", "Name 1", "Name(1)"
  const match = filename.match(/^(.+?)\s*\(?(\d+)\)?(?:\.[^.]*)?$/);

  if (match) {
    const fishName = match[1].trim();
    const index = parseInt(match[2], 10);

    if (!registry[category]) registry[category] = {};
    if (!registry[category][fishName]) {
      registry[category][fishName] = {
        name: fishName,
        category: category,
        price: Math.floor(Math.random() * (800 - 300) + 300),
        primary: null,
        secondary: null,
      };
    }

    const fishEntry = registry[category][fishName];
    if (index === 1) fishEntry.primary = fullPath;
    else if (index === 2) fishEntry.secondary = fullPath;
  }
}

const rawData = parseFishMetadata();
const formattedData = {};

Object.keys(rawData).forEach(category => {
  formattedData[category] = Object.values(rawData[category]);
  // Add some fallback fields that the UI expects
  formattedData[category].forEach((item, index) => {
    item.id = `${category.replace(/\s+/g,'').toLowerCase()}-${index}`;
    item.pricePerKg = item.price;
    item.image1 = item.primary;
    item.image2 = item.secondary;
    item.rating = 4.5;
    item.reviewsCount = Math.floor(Math.random() * 200) + 10;
  });
});

fs.writeFileSync('./src/data/seafoodProducts.json', JSON.stringify(formattedData, null, 2));
console.log(`Done.`);
