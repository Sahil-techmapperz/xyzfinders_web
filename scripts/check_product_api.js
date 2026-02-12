const http = require('http');

function checkProduct() {
    http.get('http://localhost:3000/api/products/1', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                if (jsonData.success) {
                    console.log('Seller Name:', jsonData.data.seller_name);
                    console.log('Is Verified:', jsonData.data.seller_is_verified);
                    console.log('Is Verified Type:', typeof jsonData.data.seller_is_verified);
                } else {
                    console.log('Failed to fetch product:', jsonData.message);
                }
            } catch (e) {
                console.error('Error parsing JSON:', e.message);
            }
        });
    }).on('error', (err) => {
        console.error('Error: ' + err.message);
    });
}

checkProduct();
