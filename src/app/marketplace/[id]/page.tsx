"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { BACKEND_API_URL } from "@/constants/apiConstants";
import Alert from "@/components/Alert";
import {
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  User,
  Mail,
  Building,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface ImageObject {
  id: number;
  url: string;
}

interface SellerUser {
  id: string;
  email: string;
  name: string;
  address: string;
  countryCode: string;
  phoneNumber: string;
  role: string;
  isEmailVerified: boolean;
  isDocumentVerified: boolean;
  createdAt: string;
}

interface Seller {
  userId: string;
  user: SellerUser;
  businessDesc: string;
  businessType: string;
}

interface BackendProduct {
  id: number;
  sellerUserId: string;
  name: string;
  price: number;
  currency: string;
  quantity: string;
  unit: string;
  category: string;
  country: string;
  color: string;
  sourceMaterial: string;
  batchSize: string;
  minimumOrderQuantity: string;
  application: string;
  description: string;
  additionalNotes: string | null;
  isApproved: number;
  createdAt: string;
  updatedAt: string;
  images: ImageObject[];
  seller: Seller;
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const { convertPrice } = useCurrency();
  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { user, authFetch } = useAuth();
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleEnquiry = async () => {
    if (!enquiryMessage.trim()) return;
    try {
      await authFetch(`${BACKEND_API_URL}/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: Number(id),
          message: enquiryMessage.trim(),
        }),
      });

      console.log("Enquiry sent successfully");
      setEnquiryMessage("");
      setAlertMsg("Enquiry sent successfully!");
      setAlertOpen(true);
    } catch {
      setAlertMsg("Failed to send enquiry.");
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_API_URL}/products/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Product not found.");
          } else {
            setError(`Failed to load product (${res.statusText})`);
          }
          setLoading(false);
          return;
        }
        const data: BackendProduct = await res.json();
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(id)) {
      fetchProduct();
    } else {
      setError("Invalid product ID.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600 font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4 bg-white p-8 rounded-2xl shadow-lg">
          <XCircle className="h-16 w-16 text-red-400 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">{error}</p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    price,
    quantity,
    unit,
    category,
    country,
    color,
    sourceMaterial,
    batchSize,
    minimumOrderQuantity,
    application,
    description,
    additionalNotes,
    createdAt,
    images,
    seller,
  } = product!;

  const { user: sellerUser, businessType, businessDesc } = seller;

  const listedOn = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Marketplace
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImageIndex]?.url || images[0].url}
                    alt={name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <Package className="w-16 h-16 text-gray-300 mx-auto" />
                      <span className="text-gray-400 font-medium">
                        No image available
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-green-500 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {user?.isDocumentVerified && (
                <div className="mt-4 space-y-2">
                  <textarea
                    rows={3}
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    placeholder="Your message..."
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                  />

                  <div>
                    {user?.isDocumentVerified ? (
                      <button
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 group"
                        onClick={handleEnquiry}
                      >
                        <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Send Enquiry
                      </button>
                    ) : (
                      <div className="w-full">
                        <button
                          className="w-full bg-gray-300 text-gray-500 font-semibold py-4 px-8 rounded-xl cursor-not-allowed flex items-center justify-center gap-3"
                          disabled
                          title={
                            user
                              ? "Please verify your account to send an Enquiry."
                              : "Please create and verify your account to send an Enquiry."
                          }
                        >
                          <XCircle className="w-5 h-5" />
                          {user
                            ? "Verify Your Account to Send Enquiry"
                            : " Create an Account to Send Enquiry"}
                        </button>
                        <p className="text-sm text-gray-500 text-center mt-2">
                          {user
                            ? "Verify your account to start sending inquiries"
                            : "Create and verify your account to contact sellers"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Listed on {listedOn}</span>
                  {product.isApproved === 1 && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {name}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-green-600">
                    {convertPrice(price)}{" "}
                    <span className="text-lg text-gray-500">/ {unit}</span>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      {category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{description}</p>
                {additionalNotes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          Additional Notes
                        </p>
                        <p className="text-blue-800 text-sm mt-1">
                          {additionalNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-600" />
                  Product Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">
                          Available Quantity
                        </p>
                        <p className="font-semibold text-gray-900">
                          {quantity} {unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Origin Country</p>
                        <p className="font-semibold text-gray-900">{country}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Color</p>
                        <p className="font-semibold text-gray-900">{color}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Source Material</p>
                        <p className="font-semibold text-gray-900">
                          {sourceMaterial}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Batch Size</p>
                        <p className="font-semibold text-gray-900">
                          {batchSize}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">
                          Minimum Order Qty
                        </p>
                        <p className="font-semibold text-gray-900">
                          {minimumOrderQuantity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow sm:col-span-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Application</p>
                        <p className="font-semibold text-gray-900">
                          {application}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logistics Info */}
                {/* <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  Logistics Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Loads:</span>
                    <span className="font-medium text-gray-900 ml-2">{totalLoads}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Remaining Loads:</span>
                    <span className="font-medium text-gray-900 ml-2">{remainingLoads}</span>
                  </div>
                </div>
              </div> */}
              </div>

              {/* Action Button */}
            </div>
          </div>

          {/* Seller Information */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <User className="w-6 h-6 text-green-600" />
                Seller Information
              </h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seller Name</p>
                      <p className="font-semibold text-gray-900 text-lg">
                        {sellerUser.name}
                      </p>
                    </div>
                  </div>
                  {/* 
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-900">{sellerUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-semibold text-gray-900">{sellerUser.countryCode} {sellerUser.phoneNumber}</p>
                  </div>
                </div> */}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">About Seller</p>
                      <p className="font-semibold text-gray-900">
                        {businessDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Address</p>
                      <p className="font-semibold text-gray-900">
                        {sellerUser.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Type</p>
                      <p className="font-semibold text-gray-900">
                        {businessType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              {/* <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {sellerUser.isEmailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    sellerUser.isEmailVerified ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Email {sellerUser.isEmailVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {sellerUser.isDocumentVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    sellerUser.isDocumentVerified ? 'text-green-700' : 'text-red-700'
                  }`}>
                    Documents {sellerUser.isDocumentVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>

      <Alert
        isOpen={alertOpen}
        title="Success"
        message={alertMsg}
        buttonLabel="Close"
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
