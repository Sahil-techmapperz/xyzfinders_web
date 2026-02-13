
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const propertyId = "147"; // ID from the user's URL
        console.log(`Fetching property with ID: ${propertyId}`);

        const property = await prisma.products.findUnique({
            where: {
                id: propertyId
            },
            include: {
                images: true
            }
        });

        if (!property) {
            console.log("Property not found!");
            return;
        }

        console.log("Property Data:");
        console.dir(property, { depth: null });

        if (property.product_attributes) {
            console.log("\nParsed Attributes:");
            try {
                const attrs = typeof property.product_attributes === 'string'
                    ? JSON.parse(property.product_attributes)
                    : property.product_attributes;
                console.dir(attrs, { depth: null });
            } catch (e) {
                console.error("Error parsing attributes:", e);
            }
        } else {
            console.log("\nNo product_attributes found.");
        }

        if (property.location) {
            console.log("\nLocation Field:");
            // Location might be a string or JSON, let's see
            console.log(property.location);
        } else {
            console.log("\nNo location field found (or empty).");
        }

    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
