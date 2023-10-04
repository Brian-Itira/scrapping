"use client";

import React, { useState, FormEvent } from "react";
import { scrapeJumiaProduct } from "@/lib/scraper";
import Image from "next/image";

const isValidJumiaProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("jumia.com") ||
      hostname.includes("jumia.") ||
      hostname.endsWith("jumia")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedProduct, setScrapedProduct] = useState({
    productImages: [],
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidJumiaProductURL(searchPrompt);

    if (!isValidLink) {
      return alert("Provide a valid link for the Jumia marketplace");
    }

    try {
      setIsLoading(true);

      const product = await scrapeJumiaProduct(searchPrompt);

      setScrapedProduct(product);
    } catch (error) {
      console.error("Scraping Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Put your Jumia product link here"
            className="searchbar-input"
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="searchbar-btn"
            disabled={searchPrompt === ""}
          >
            {isLoading ? "Scraping..." : "Scrape"}
          </button>
        </form>

        {scrapedProduct && (
          <div>
            <h1>{scrapedProduct.title}</h1>
            <p>Current Price: {scrapedProduct.currentPrice}</p>

            <p>Original Price: {scrapedProduct.originalPrice}</p>

            <Image
              src={scrapedProduct.imageUrl}
              alt="image-url"
              height={500}
              width={500}
            />

            <p>Delivery Fees: {scrapedProduct.deliveryFees}</p>

            <p>Product Details: {scrapedProduct.productDetails}</p>

            <div>
              {scrapedProduct.productImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  height={60}
                  width={60}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
