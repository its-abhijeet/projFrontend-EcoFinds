// app/ProductsDisplay.tsx
"use client";

import { useState, useEffect } from "react";
import { BACKEND_API_URL } from "@/constants/apiConstants";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const backend_url = BACKEND_API_URL;

// This must match exactly the shape your backend returns for each product:
export interface ImageObject {
  id: number;
  url: string;
  // (We ignore productId/createdAt fields since they’re not needed for display here)
}

export interface Product {
  product_id: number; // will correspond to `id` from the backend
  seller_id: string; // corresponds to `sellerUserId`
  product_name: string; // corresponds to `name`
  product_price: number; // corresponds to `price`
  product_currency: string; // corresponds to `currency`
  product_qty: number; // corresponds to `quantity`
  product_unit: string; // corresponds to `unit`
  product_category: string; // corresponds to `category`
  product_country: string; // corresponds to `country`
  product_color: string; // corresponds to `color`
  product_source_material: string; // corresponds to `sourceMaterial`
  product_batch_size: number; // corresponds to `batchSize`
  product_minimum_order_quantity: number; // corresponds to `minimumOrderQuantity`
  product_application: string; // corresponds to `application`
  product_desc: string; // corresponds to `description`
  product_additional_notes: string | null; // corresponds to `additionalNotes`
  product_images: ImageObject[]; // corresponds to `images`
  is_approved: number; // corresponds to `isApproved`
}

export interface ProductsDisplayProps {
  sellerId?: string;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  onAddNew: () => void;
  onView: (p: Product) => void;
}

export default function ProductsDisplay({
  sellerId,
  setEditingProduct,
  onAddNew,
  onView,
}: ProductsDisplayProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Now we keep a flat array of products, no longer wrapped in SellerData
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const { authFetch } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalSuccess, setDeleteModalSuccess] = useState(true);
  const [deleteModalMessage, setDeleteModalMessage] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (!sellerId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    setLoading(true);
    authFetch(`${backend_url}/products/seller/${sellerId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((result) => {
        // At this point, `result` *IS* an array of Product‐shaped objects
        // (matching the JSON you pasted)
        // We simply store it directly into our `products` state:
        setProducts(
          result.map((p) => ({
            product_id: p.id, // remap `id` → `product_id`
            seller_id: p.sellerUserId, // remap `sellerUserId` → `seller_id`
            product_name: p.name,
            product_price: p.price,
            product_currency: p.currency,
            product_qty: p.quantity,
            product_unit: p.unit,
            product_category: p.category,
            product_country: p.country,
            product_color: p.color,
            product_source_material: p.sourceMaterial,
            product_batch_size: p.batchSize,
            product_minimum_order_quantity: p.minimumOrderQuantity,
            product_application: p.application,
            product_desc: p.description,
            product_additional_notes: p.additionalNotes,
            product_images: p.images.map((img) => ({
              id: img.id,
              url: img.url,
            })),
            is_approved: p.isApproved,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, [sellerId]);

  // Build a list of unique categories for filtering:
  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((p) => p.product_category.replace("_", " ")))
    ),
  ];

  const filteredProducts =
    categoryFilter === "All"
      ? products
      : products.filter(
          (p) => p.product_category.replace("_", " ") === categoryFilter
        );

  const handleDeleteProduct = async () => {
    if (productToDelete === null) return;
    try {
      const response = await authFetch(
        `${backend_url}/products/${productToDelete}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts((prev) =>
        prev.filter((p) => p.product_id !== productToDelete)
      );
      setDeleteModalSuccess(true);
      setDeleteModalMessage("Product deleted successfully!");
      setShowDeleteModal(true);
    } catch (err) {
      console.error("Error deleting product:", err);
      setDeleteModalSuccess(false);
      setDeleteModalMessage("Failed to delete the product. Please try again.");
      setShowDeleteModal(true);
    } finally {
      setShowConfirmModal(false);
      setProductToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-64">
        <div className="text-green-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-red-500 text-center">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="block mx-auto mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Submitted Products ({products.length})
        </h2>

        <div className="flex items-center">
          <label className="mr-2 text-gray-700 text-sm font-medium">
            Filter by:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.product_id}
              className={`border rounded-lg overflow-hidden transition-shadow ${
                product.is_approved === 1
                  ? "border-green-300 hover:shadow-lg"
                  : product.is_approved === 0
                  ? "border-yellow-300 hover:shadow-lg"
                  : "border-red-300 hover:shadow-lg"
              }`}
            >
              <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                {/* STATUS BADGE */}

                {product.product_images.length > 0 &&
                product.product_images[0].url ? (
                  <Image
                    src={product.product_images[0].url}
                    alt={product.product_name}
                    className="h-full w-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/api/placeholder/150/100";
                    }}
                  />
                ) : (
                  <div className="text-green-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4" onClick={() => onView(product)}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-gray-800 truncate">
                    {product.product_name}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {product.product_category.replace("_", " ")}
                  </span>
                </div>

                <div className="text-xl font-semibold text-green-600 mb-1">
                  {product.product_currency} {product.product_price}
                </div>

                <div className="text-sm text-gray-500 mb-3">
                  Quantity available: {product.product_qty}{" "}
                  {product.product_unit}
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.product_desc}
                </p>

                <div className="flex justify-end space-x-2 mt-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-md transition ${
                      product.is_approved === 1
                        ? "border-green-100 text-green-800"
                        : product.is_approved === 0
                        ? "border-yellow-100 text-yellow-800"
                        : product.is_approved === -1
                        ? "border-red-100 text-red-800"
                        : ""
                    }`}
                  >
                    {product.is_approved === 1
                      ? "Approved"
                      : product.is_approved === 0
                      ? "Pending"
                      : "Rejected"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProduct(product);
                    }}
                    className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 text-sm rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProductToDelete(product.product_id);
                      setShowConfirmModal(true);
                    }}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-sm rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={onAddNew}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
        >
          + Add New Product
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
            <div
              className={`text-2xl font-bold mb-2 ${
                deleteModalSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {deleteModalSuccess ? "Success!" : "Error"}
            </div>
            <div className="mb-4">{deleteModalMessage}</div>
            <button
              className={`w-full ${
                deleteModalSuccess
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white py-2 rounded-lg font-semibold transition`}
              onClick={() => setShowDeleteModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
            <div className="text-red-600 text-2xl font-bold mb-2">
              Confirm Delete
            </div>
            <div className="mb-4">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </div>
            <div className="flex gap-4">
              <button
                className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition"
                onClick={() => {
                  setShowConfirmModal(false);
                  setProductToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
