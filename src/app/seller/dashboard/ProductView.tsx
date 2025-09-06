"use client";

import Image from "next/image";
import { Product } from "./ProductsDisplay";
import { ChevronLeft } from "lucide-react";

interface Props {
  product: Product;
  onBack: () => void;
  onEdit: () => void;
}

export default function ProductView({ product, onBack, onEdit }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Products</span>
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded transition"
        >
          Edit Product
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{product.product_name}</h2>
        <p>
          {product.is_approved === 1 ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Approved
            </span>
          ) : product.is_approved === 0 ? (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              Pending Approval
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              Rejected
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {product.product_images[0]?.url ? (
            <Image
              src={product.product_images[0].url}
              alt={product.product_name}
              width={400}
              height={300}
              className="object-cover rounded"
            />
          ) : (
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              No image
            </div>
          )}
        </div>
        <div className="space-y-4">
          <p>
            <span className="font-medium">Price:</span>{" "}
            {product.product_currency} {product.product_price}
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {product.product_qty}{" "}
            <span className="text-sm text-gray-600">
              ({product.product_unit})
            </span>
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {product.product_category.replace("_", " ")}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {product.product_desc}
          </p>
          {product.product_additional_notes && (
            <p>
              <span className="font-medium">Notes:</span>{" "}
              {product.product_additional_notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
