"use client";
import { useEffect } from "react";
import ProductsDisplay, { Product } from "./ProductsDisplay";

interface Props {
  sellerId?: string;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  onAddNew: () => void;
  onView: (p: Product) => void;
}

export default function ManageProducts({
  sellerId,
  setEditingProduct,
  onAddNew,
  onView,
}: Props) {
  useEffect(() => {
    if (sellerId != null) {
      console.log("✅ sellerId:", sellerId);
    } else {
      console.log("⏳ sellerId is not yet defined");
    }
  }, [sellerId]);
  return (
    <ProductsDisplay
      sellerId={sellerId}
      setEditingProduct={setEditingProduct}
      onAddNew={onAddNew}
      onView={onView}
    />
  );
}
