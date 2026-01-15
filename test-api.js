// Test the API directly
async function testAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/products?page=1&per_page=5');
        const data = await response.json();

        console.log('API Response Status:', response.status);
        console.log('\nNumber of products returned:', data.data?.length);

        if (data.data && data.data.length > 0) {
            console.log('\nFirst product:');
            const firstProduct = data.data[0];
            console.log({
                id: firstProduct.id,
                title: firstProduct.title,
                images_count: firstProduct.images?.length || 0,
                has_images: !!firstProduct.images,
                first_image_length: firstProduct.images?.[0]?.image?.length || 0
            });

            // Check if we have product 461
            const product461 = data.data.find(p => p.id === 461);
            if (product461) {
                console.log('\nProduct 461 found:');
                console.log({
                    id: product461.id,
                    title: product461.title,
                    images_count: product461.images?.length || 0,
                    first_image_length: product461.images?.[0]?.image?.length || 0
                });
            } else {
                console.log('\nProduct 461 NOT found in API response');
                console.log('Product IDs in response:', data.data.map(p => p.id));
            }
        }
    } catch (error) {
        console.error('API Test Error:', error.message);
    }
}

testAPI();
