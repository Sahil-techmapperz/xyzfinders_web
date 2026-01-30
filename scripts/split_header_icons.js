const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = 'C:/Users/USER/.gemini/antigravity/brain/0e104647-b631-475e-ad7e-458e1aa68c5b/category_icons_sprite_1769751657151.png';
const outputDir = 'd:/xyzfinders-nextjs/public/categories';
const tileSize = 256; // 1024 / 4

const categories = [
    'cars', 'bikes', 'properties', 'electronics',
    'mobiles', 'commercial', 'jobs', 'furniture',
    'fashion', 'pets', 'hobbies', 'services'
];

async function splitImages() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        const image = sharp(sourceImage);
        const metadata = await image.metadata();

        console.log(`Processing image: ${metadata.width}x${metadata.height}`);

        for (let i = 0; i < categories.length; i++) {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const left = col * tileSize;
            const top = row * tileSize;

            const fileName = `${categories[i]}.png`;
            const outputPath = path.join(outputDir, fileName);

            console.log(`Extracting ${categories[i]} from ${left},${top} to ${outputPath}`);

            await image
                .clone()
                .extract({ left, top, width: tileSize, height: tileSize })
                .toFile(outputPath);
        }
        console.log('Done!');
    } catch (error) {
        console.error('Error processing images:', error);
    }
}

splitImages();
