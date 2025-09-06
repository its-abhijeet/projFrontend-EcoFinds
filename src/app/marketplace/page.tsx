"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { SearchIcon, FilterIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { BACKEND_API_URL } from "@/constants/apiConstants";

export interface ImageObject {
  id: number;
  url: string;
}

export interface Product {
  product_id: number; // ← maps from `id`
  seller_id: string; // ← maps from `sellerUserId`
  product_name: string; // ← maps from `name`
  product_price: number; // ← maps from `price`
  product_currency: string; // ← maps from `currency`
  product_qty: number; // ← maps from `quantity`
  product_unit: string; // ← maps from `unit`
  product_category: string; // ← maps from `category`
  product_desc: string; // ← maps from `description`
  product_additional_notes: string | null; // ← maps from `additionalNotes`
  product_images: ImageObject[]; // ← maps from `images`
  is_approved: number; // ← maps from `isApproved`
}

export default function MarketplacePage() {
  // State for products and filters
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinQty, setFilterMinQty] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCards, setVisibleCards] = useState(9);

  const { user } = useAuth();
  const SELLER_USER_ID = user?.id || ""; // if user.id is nullish, use empty string

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res;
        if (!SELLER_USER_ID) {
          const url = `${BACKEND_API_URL}/products`;
          res = await fetch(url);
          console.log("Fetched products:", res);
        }
        if (SELLER_USER_ID) {
          const url = `${BACKEND_API_URL}/products/except/${SELLER_USER_ID}`;
          res = await fetch(url);
          console.log("Fetched products (except seller):", res);
        }
        if (!res.ok) {
          console.error("Failed to fetch products:", res.statusText);
          return;
        }

        // Raw response from your backend (array of objects like { id, sellerUserId, name, ... , images: [...] })
        const rawData = await res.json();

        // Map each raw item → our frontend `Product` shape
        const mapped: Product[] = rawData.map((raw) => ({
          product_id: raw.id,
          seller_id: raw.sellerUserId,
          product_name: raw.name,
          product_price: raw.price,
          product_currency: raw.currency,
          product_qty: raw.quantity,
          product_unit: raw.unit,
          product_category: raw.category,
          product_desc: raw.description,
          product_additional_notes: raw.additionalNotes ?? null,
          // Backend `images` is presumably an array like: [{ id, url, productId, createdAt }, …]
          product_images: Array.isArray(raw.images)
            ? raw.images.map((img) => ({
                id: img.id,
                url: img.url,
              }))
            : [],
          is_approved: raw.isApproved,
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

  // Filtering logic
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.product_name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesName = filterCategory
        ? p.product_category === filterCategory
        : true;
      const matchesMinQty = filterMinQty
        ? p.product_qty >= Number(filterMinQty)
        : true;
      const matchesMaxPrice = filterMaxPrice
        ? p.product_price <= Number(filterMaxPrice)
        : true;

      return matchesSearch && matchesName && matchesMinQty && matchesMaxPrice;
    });
  }, [products, search, filterCategory, filterMinQty, filterMaxPrice]);

  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.product_category))
  );

  const handleShowMore = () => {
    setVisibleCards((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 -mt-2 pt-0">
      {/* Formal, Professional Banner */}
      <div className="relative bg-[#1B442E] overflow-hidden">
        {/* Clean gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B442E] via-[#2C5A3F] to-[#1B442E]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                <span className="text-white">Sustainable </span>
                <span className="text-green-300">Marketplace</span>
              </h1>
              <p className="text-green-100/90 text-sm max-w-xl mx-auto">
                Premium quality recycled materials from certified suppliers
              </p>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-green-800" />
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="bg-white rounded-md sm:rounded-lg lg:rounded-xl shadow sm:shadow-md lg:shadow-lg p-3 sm:p-5 lg:p-8 border border-gray-100">
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 items-stretch xs:items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full relative">
              <input
                type="text"
                placeholder="Search plastics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-md sm:rounded-lg lg:rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700 placeholder-gray-400 text-xs sm:text-sm lg:text-base"
              />
              <SearchIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-400 absolute right-3 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-[#1B442E] to-[#2C5A3F] text-white rounded-md sm:rounded-lg lg:rounded-xl hover:from-[#153420] hover:to-[#254A33] transition-all duration-300 shadow-sm sm:shadow-md text-xs sm:text-sm lg:text-base whitespace-nowrap"
            >
              <FilterIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-3 sm:mt-5 lg:mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 pt-3 sm:pt-5 border-t border-gray-100">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg lg:rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700 bg-gray-50 text-xs sm:text-sm lg:text-base"
              >
                <option value="">All Types</option>
                {uniqueCategories.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Min Quantity (MT)"
                value={filterMinQty}
                onChange={(e) => setFilterMinQty(e.target.value)}
                className="px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg lg:rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700 bg-gray-50 text-xs sm:text-sm lg:text-base"
              />

              <input
                type="number"
                placeholder="Max Price (USD/T)"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
                className="px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg lg:rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1B442E] focus:border-transparent outline-none text-gray-700 bg-gray-50 text-xs sm:text-sm lg:text-base"
              />
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
          {filtered.slice(0, visibleCards).map((p) => (
            <Link
              key={p.product_id}
              href={`/marketplace/${p.product_id}`}
              className="group bg-white rounded-md sm:rounded-lg lg:rounded-xl shadow hover:shadow-md lg:hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {p.product_images.length > 0 ? (
                  <Image
                    src={p.product_images[0].url}
                    alt={p.product_name}
                    width={450}
                    height={300}
                    className="h-40 sm:h-48 lg:h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-t-md sm:rounded-t-lg lg:rounded-t-xl group-hover:rounded-b-none group-hover:rounded-bl-md group-hover:rounded-br-md"
                  />
                ) : (
                  // fallback placeholder if no images
                  <div className="h-40 sm:h-48 lg:h-56 w-full rounded-md sm:rounded-lg lg:rounded-xl bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
                <PriceTag price={p.product_price} />
              </div>
              <div className="p-3 sm:p-5 lg:p-8 bg-gradient-to-br from-white to-gray-50 rounded-md sm:rounded-lg lg:rounded-xl group-hover:bg-white transition-colors duration-300">
                <h3 className="text-base sm:text-lg lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 lg:mb-4 group-hover:text-[#1B442E] transition-colors line-clamp-2">
                  {p.product_name}
                </h3>
                <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm">
                    <span className="text-gray-500 font-medium">
                      Quantity Available:
                    </span>
                    <span className="font-semibold text-[#1B442E]">
                      {p.product_qty} {p.product_unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm">
                    <span className="text-gray-500 font-medium">Category:</span>
                    <span className="font-semibold text-[#1B442E]">
                      {p.product_category}
                    </span>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 lg:mt-6 pt-3 sm:pt-4 lg:pt-6 border-t border-gray-100">
                  <button className="w-full text-center py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-[#1B442E] to-[#2C5A3F] text-white rounded-md sm:rounded-lg font-medium hover:from-[#153420] hover:to-[#254A33] transform transition-all duration-300 shadow-sm group-hover:shadow text-[10px] sm:text-xs lg:text-base">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 sm:py-12 lg:py-16 bg-white rounded-md sm:rounded-lg lg:rounded-xl shadow border border-gray-100">
            <p className="text-gray-600 text-xs sm:text-sm lg:text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}

        {/* Show More Button */}
        {filtered.length > visibleCards && (
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 bg-gradient-to-r from-[#1B442E] to-[#2C5A3F] text-white rounded-lg font-medium hover:from-[#153420] hover:to-[#254A33] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Add this new component to display the price with the correct currency
function PriceTag({ price }: { price: number }) {
  const { convertPrice } = useCurrency();

  return (
    <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-white/95 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-semibold text-[#1B442E] shadow border border-[#1B442E]/10">
      {convertPrice(price)}/T
    </div>
  );
}
