import { scrapeJumiaProduct, Product } from "../scraper"; // Assuming Product is the correct type

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct: Product | undefined = await scrapeJumiaProduct(productUrl);

    if (!scrapedProduct) return;

    const product: Product = scrapedProduct;

    // Now you can use 'product' with type safety.
  } catch (error: any) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
}
