import { scrapeJumiaProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct: any = await scrapeJumiaProduct(productUrl);

    if (!scrapedProduct) return;

    let product: any = scrapedProduct;
  } catch (error: any) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
}
