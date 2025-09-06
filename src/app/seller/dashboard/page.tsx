"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { BACKEND_API_URL } from "@/constants/apiConstants";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import ManageProducts from "./ManageProducts";
import SellerDashboardHome from "./Home";
import AddProductForm from "./AddProductForm";
import SalesAnalytics from "./SalesAnalytics";
import MessagesPanel from "./MessagesPanel";
import SettingsPanel from "./SettingsPanel";
import ProductView from "./ProductView";
import Popup from "@/components/Popup";

import { Product } from "./ProductsDisplay";

type TabType =
  | "dashboard"
  | "products"
  | "add"
  | "analytics"
  | "messages"
  | "settings"
  | "view";

export default function SellerDashboard() {
  const { user, authFetch, logout } = useAuth();
  console.log("SellerDashboard user:", user);
  const { convertPrice } = useCurrency();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // ← UPDATED: added "unit" to formData
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    currency: "USD",
    quantity: "",
    unit: "TON", // ← default to TON
    notes: "",
    files: [] as File[],
    country: "",
    color: "",
    source_material: "",
    batch_size: "",
    minimum_order_quantity: "",
    application: "",
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [isSuccessPopup, setIsSuccessPopup] = useState(true);

  // When editing an existing product, prefill formData (including unit)
  useEffect(() => {
    console.log(user);
    if (editingProduct) {
      setFormData({
        name: editingProduct.product_name,
        description: editingProduct.product_desc,
        category: editingProduct.product_category,
        price: editingProduct.product_price.toString(),
        currency: editingProduct.product_currency,
        quantity: editingProduct.product_qty.toString(),
        unit: editingProduct.product_unit, // ← populate existing unit
        country: editingProduct.product_country || "",
        color: editingProduct.product_color || "",
        source_material: editingProduct.product_source_material || "",
        batch_size: editingProduct.product_batch_size.toString() || "",
        minimum_order_quantity:
          editingProduct.product_minimum_order_quantity.toString() || "",
        application: editingProduct.product_application || "",
        notes: editingProduct.product_additional_notes ?? "",
        files: [],
      });
      setActiveTab("add");
    }
  }, [editingProduct]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, files: Array.from(e.target.files) }));
    }
  };

  const showPopup = (title: string, message: string, isSuccess: boolean) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setIsSuccessPopup(isSuccess);
    setIsPopupOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      showPopup("Error", "Please log in to add/edit products", false);
      return;
    }

    // Convert price to USD
    let priceInUSD = Number(formData.price);
    if (formData.currency !== "USD") {
      // reverse the convertPrice calculation
      const displayRate = convertPrice(1); // e.g. "$1 = €0.85"
      const rate = Number(displayRate.replace(/[^0-9.]/g, ""));
      priceInUSD = Number(formData.price) / rate;
    }

    // ← UPDATED: include product_unit in the payload
    const productData = {
      product_name: formData.name,
      product_price: priceInUSD,
      product_currency: "USD",
      product_qty: Number(formData.quantity),
      product_unit: formData.unit, // ← new
      product_category: formData.category,
      product_country: formData.country,
      product_color: formData.color,
      product_source_material: formData.source_material,
      product_batch_size: formData.batch_size,
      product_minimum_order_quantity: formData.minimum_order_quantity,
      product_application: formData.application,
      product_desc: formData.description,
      product_additional_notes: formData.notes,
    };

    try {
      const url = editingProduct
        ? `${BACKEND_API_URL}/products/${editingProduct.product_id}`
        : `${BACKEND_API_URL}/products`;
      const method = editingProduct ? "PUT" : "POST";

      const response = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit product");
      }

      const result = await response.json();

      // Handle image uploads
      if (formData.files.length > 0 && result.product?.id) {
        const fd = new FormData();
        fd.append("productId", result.product.id.toString());
        formData.files.forEach((file) => fd.append("images", file));

        const uploadResponse = await authFetch(
          `${BACKEND_API_URL}/files/upload-product-images`,
          {
            method: "POST",
            body: fd,
          }
        );
        if (!uploadResponse.ok) {
          showPopup(
            "Partial Success",
            "Product saved but image upload failed. Try again later.",
            true
          );
          return;
        }
      }

      // Reset form & state
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        currency: "USD",
        quantity: "",
        unit: "TON", // ← reset to default
        country: "",
        color: "",
        source_material: "",
        batch_size: "",
        minimum_order_quantity: "",
        application: "",
        notes: "",
        files: [],
      });
      setEditingProduct(null);
      setActiveTab("products");
      showPopup(
        "Success",
        editingProduct
          ? "Product updated successfully!"
          : "Product submitted successfully!",
        true
      );
    } catch (err) {
      console.error("Error submitting product:", err);
      showPopup(
        "Error",
        err instanceof Error ? err.message : "An error occurred. Try again.",
        false
      );
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      currency: "USD",
      quantity: "",
      unit: "TON",
      country: "",
      color: "",
      source_material: "",
      batch_size: "",
      minimum_order_quantity: "",
      application: "",
      notes: "",
      files: [],
    });
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {user?.isDocumentVerified ? (
        <div className="min-h-screen flex bg-gray-50">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 bg-[#1B442E] text-white fixed left-0 top-0 h-full shadow-md">
            <div className="p-6 border-b border-[#ffffff1a] flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Seller Panel</h2>
                <p className="text-sm text-gray-300">{user?.email}</p>
              </div>
            </div>

            <nav className="p-4 space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
                  activeTab === "dashboard"
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-medium">Dashboard</span>
                {activeTab === "dashboard" && (
                  <div className="ml-auto w-1 h-4 bg-white rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("add")}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
                  activeTab === "add"
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium">Add Product</span>
                {activeTab === "add" && (
                  <div className="ml-auto w-1 h-4 bg-white rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
                  activeTab === "products"
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="font-medium">Products</span>
                {activeTab === "products" && (
                  <div className="ml-auto w-1 h-4 bg-white rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
                  activeTab === "analytics"
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="font-medium">Analytics</span>
                {activeTab === "analytics" && (
                  <div className="ml-auto w-1 h-4 bg-white rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("messages")}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
                  activeTab === "messages"
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className="font-medium">Messages</span>
                {activeTab === "messages" && (
                  <div className="ml-auto w-1 h-4 bg-white rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
                  activeTab === "settings"
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">Settings</span>
              </button>

              <div className="pt-6 mt-6 border-t border-[#ffffff1a]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-md text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Mobile Navigation */}
          <div className="fixed top-[64px] left-0 right-0 z-40 lg:hidden bg-[#1B442E] shadow-md">
            <div className="flex justify-around px-4 py-2 border-t border-[#ffffff1a]">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "dashboard"
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-xs font-medium">Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "products"
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-xs font-medium">Products</span>
              </button>

              <button
                onClick={() => setActiveTab("add")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "add"
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-xs font-medium">Add</span>
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "analytics"
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-xs font-medium">Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab("messages")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "messages"
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className="text-xs font-medium">Messages</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ${
                  activeTab === "settings"
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg
                  className="w-5 h-5 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xs font-medium">Settings</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 w-full mt-28 lg:mt-0 lg:ml-72">
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {
                    {
                      dashboard: "Dashboard Overview",
                      products: "Manage Products",
                      add: "Add New Product",
                      analytics: "Sales Analytics",
                      messages: "Messages",
                      settings: "Settings",
                      view: "Product Details",
                    }[activeTab]
                  }
                </h1>
                <p className="mt-2 text-gray-600">
                  {
                    {
                      dashboard: "Welcome back! Here's your store at a glance.",
                      products: "View and manage your product inventory.",
                      add: "Create or edit your product listing.",
                      analytics: "View your sales performance.",
                      messages: "Check buyer messages and inquiries.",
                      settings: "Update your account settings.",
                      view: "See full product information.",
                    }[activeTab]
                  }
                </p>
              </div>

              {/* Tab Contents */}
              {activeTab === "dashboard" && <SellerDashboardHome />}
              {activeTab === "add" && (
                <AddProductForm
                  editingProduct={
                    editingProduct
                      ? {
                          product_id: editingProduct.product_id,
                          seller_id: editingProduct.seller_id,
                          product_name: editingProduct.product_name,
                          product_price: editingProduct.product_price,
                          product_currency: editingProduct.product_currency,
                          product_qty: editingProduct.product_qty,
                          product_unit: editingProduct.product_unit,
                          product_category: editingProduct.product_category,
                          product_country: editingProduct.product_country,
                          product_color: editingProduct.product_color,
                          product_source_material:
                            editingProduct.product_source_material,
                          product_batch_size: editingProduct.product_batch_size,
                          product_minimum_order_quantity:
                            editingProduct.product_minimum_order_quantity,
                          product_application:
                            editingProduct.product_application,
                          product_desc: editingProduct.product_desc,
                          product_additional_notes:
                            editingProduct.product_additional_notes,
                          product_images: editingProduct.product_images,
                          is_approved: editingProduct.is_approved,
                        }
                      : null
                  }
                  formData={formData}
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  cancelEdit={cancelEdit}
                />
              )}
              {activeTab === "products" && (
                <ManageProducts
                  sellerId={user?.id}
                  setEditingProduct={setEditingProduct}
                  onAddNew={() => setActiveTab("add")}
                  onView={(p: Product) => {
                    setSelectedProduct({
                      product_id: p.product_id,
                      seller_id: p.seller_id,
                      product_name: p.product_name,
                      product_price: p.product_price,
                      product_currency: p.product_currency,
                      product_qty: p.product_qty,
                      product_unit: p.product_unit,
                      product_category: p.product_category,
                      product_country: p.product_country,
                      product_color: p.product_color,
                      product_source_material: p.product_source_material,
                      product_batch_size: p.product_batch_size,
                      product_minimum_order_quantity:
                        p.product_minimum_order_quantity,
                      product_application: p.product_application,
                      product_desc: p.product_desc,
                      product_additional_notes: p.product_additional_notes,
                      product_images: p.product_images,
                      is_approved: p.is_approved,
                    });
                    setActiveTab("view");
                  }}
                />
              )}
              {activeTab === "analytics" && <SalesAnalytics />}
              {activeTab === "messages" && <MessagesPanel />}
              {activeTab === "settings" && <SettingsPanel />}
              {activeTab === "view" && selectedProduct && (
                <ProductView
                  product={selectedProduct}
                  onBack={() => {
                    setSelectedProduct(null);
                    setActiveTab("products");
                  }}
                  onEdit={() => {
                    setEditingProduct(selectedProduct);
                    setActiveTab("add");
                  }}
                />
              )}
            </div>
          </main>

          {/* Popup */}
          <Popup
            isOpen={isPopupOpen}
            title={popupTitle}
            message={popupMessage}
            onright={() => setIsPopupOpen(false)}
            rightLabel="OK"
            rightButtonColor={isSuccessPopup ? "green" : "gray"}
            type={isSuccessPopup ? "success" : "error"}
            showLeftButton={false}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              Account Verification Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please complete your account verification to access the seller
              dashboard.
            </p>
            <button
              onClick={() => router.push("/profile/verify")}
              className="w-full bg-[#027e3f] text-white py-3 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-[#026e37] hover:shadow-lg"
            >
              Go to Verification
            </button>
          </div>
        </div>
      )}
    </>
  );
}
