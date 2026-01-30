const sharp = require('sharp');
const path = 'C:/Users/USER/.gemini/antigravity/brain/0e104647-b631-475e-ad7e-458e1aa68c5b/category_icons_sprite_1769751657151.png';

sharp(path)
    .metadata()
    .then(metadata => {
        console.log(`Width: ${metadata.width}`);
        console.log(`Height: ${metadata.height}`);
    })
    .catch(err => {
        console.error(err);
    });
