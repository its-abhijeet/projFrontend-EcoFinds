"use client";

import { FormEvent, ChangeEvent, useState } from "react";
import { Product } from "./ProductsDisplay";
import {
  Package,
  DollarSign,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";

export type FormDataType = {
  name: string;
  description: string;
  category: string;
  price: string;
  currency: string;
  quantity: string;
  unit: string;
  country: string;
  color: string;
  source_material: string;
  batch_size: string;
  minimum_order_quantity: string;
  application: string;
  notes: string;
  files: File[];
};

interface Props {
  editingProduct: Product | null;
  formData: FormDataType;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  cancelEdit: () => void;
}

const currencyOptions = [
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "INR", label: "INR (₹)", symbol: "₹" },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "GBP", label: "GBP (£)", symbol: "£" },
];

export const countryOptions = [
  { value: "Select Country", label: "Select Country" },
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Brazil", label: "Brazil" },
  { value: "Brunei", label: "Brunei" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cabo Verde", label: "Cabo Verde" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Central African Republic", label: "Central African Republic" },
  { value: "Chad", label: "Chad" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  { value: "Congo (Rep.)", label: "Congo (Rep.)" },
  { value: "Congo (DRC)", label: "Congo (DRC)" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Côte d’Ivoire", label: "Côte d’Ivoire" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Denmark", label: "Denmark" },
  { value: "Djibouti", label: "Djibouti" },
  { value: "Dominica", label: "Dominica" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { value: "Eritrea", label: "Eritrea" },
  { value: "Estonia", label: "Estonia" },
  { value: "Eswatini", label: "Eswatini" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "Fiji", label: "Fiji" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Gabon", label: "Gabon" },
  { value: "Gambia", label: "Gambia" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Greece", label: "Greece" },
  { value: "Grenada", label: "Grenada" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Guinea", label: "Guinea" },
  { value: "Guinea-Bissau", label: "Guinea-Bissau" },
  { value: "Guyana", label: "Guyana" },
  { value: "Haiti", label: "Haiti" },
  { value: "Honduras", label: "Honduras" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kiribati", label: "Kiribati" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan" },
  { value: "Laos", label: "Laos" },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Lesotho", label: "Lesotho" },
  { value: "Liberia", label: "Liberia" },
  { value: "Libya", label: "Libya" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Madagascar", label: "Madagascar" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Maldives", label: "Maldives" },
  { value: "Mali", label: "Mali" },
  { value: "Malta", label: "Malta" },
  { value: "Marshall Islands", label: "Marshall Islands" },
  { value: "Mauritania", label: "Mauritania" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mexico", label: "Mexico" },
  { value: "Micronesia", label: "Micronesia" },
  { value: "Moldova", label: "Moldova" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Myanmar", label: "Myanmar" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nauru", label: "Nauru" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Niger", label: "Niger" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "North Korea", label: "North Korea" },
  { value: "North Macedonia", label: "North Macedonia" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palau", label: "Palau" },
  { value: "Panama", label: "Panama" },
  { value: "Papua New Guinea", label: "Papua New Guinea" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Qatar", label: "Qatar" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
  { value: "Saint Lucia", label: "Saint Lucia" },
  {
    value: "Saint Vincent and the Grenadines",
    label: "Saint Vincent and the Grenadines",
  },
  { value: "Samoa", label: "Samoa" },
  { value: "San Marino", label: "San Marino" },
  { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Seychelles", label: "Seychelles" },
  { value: "Sierra Leone", label: "Sierra Leone" },
  { value: "Singapore", label: "Singapore" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Solomon Islands", label: "Solomon Islands" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Korea", label: "South Korea" },
  { value: "South Sudan", label: "South Sudan" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sudan", label: "Sudan" },
  { value: "Suriname", label: "Suriname" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syria", label: "Syria" },
  { value: "Taiwan", label: "Taiwan" },
  { value: "Tajikistan", label: "Tajikistan" },
  { value: "Tanzania", label: "Tanzania" },
  { value: "Thailand", label: "Thailand" },
  { value: "Timor-Leste", label: "Timor-Leste" },
  { value: "Togo", label: "Togo" },
  { value: "Tonga", label: "Tonga" },
  { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
  { value: "Tunisia", label: "Tunisia" },
  { value: "Turkey", label: "Turkey" },
  { value: "Turkmenistan", label: "Turkmenistan" },
  { value: "Tuvalu", label: "Tuvalu" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Vanuatu", label: "Vanuatu" },
  { value: "Vatican City", label: "Vatican City" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Yemen", label: "Yemen" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
];

export default function AddProductForm({
  editingProduct,
  formData,
  handleSubmit,
  handleInputChange,
  handleFileChange,
  cancelEdit,
}: Props) {
  const [dragActive, setDragActive] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    try {
      console.log(
        "Form Data:",
        JSON.stringify(
          {
            ...formData,
            files: formData.files.map((file) => ({
              name: file.name,
              size: file.size,
              type: file.type,
            })),
            status: editingProduct ? "updating" : "new_submission",
          },
          null,
          2
        )
      );

      await handleSubmit(e);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) {
        const newFiles = Array.from(e.dataTransfer.files);
        const dataTransfer = new DataTransfer();
        newFiles.forEach((file) => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;

        const event = new Event("change", { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-gray-50/50 rounded-xl p-6 space-y-6 border border-gray-100 shadow-sm hover:bg-gray-50/80 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-200">
              <Package className="w-5 h-5 text-green-600" />
              Basic Information
            </h3>

            <div className="bg-gray-50/50 rounded-xl p-6 space-y-6 border border-gray-100 shadow-sm hover:bg-gray-50/80 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-200">
                <Package className="w-5 h-5 text-green-600" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                  />
                </div>

                {/* Price & Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price and Currency
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                      />
                    </div>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                    >
                      {currencyOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quantity & Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Available quantity"
                      min="0"
                      step="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      className="w-2/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                    />
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                    >
                      <option value="MT">MT</option>
                      <option value="KT">KT</option>
                      <option value="ton">ton</option>
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="HDPE">HDPE</option>
                    <option value="LDPE">LDPE</option>
                    <option value="PP">PP</option>
                    <option value="PET">PET</option>
                    <option value="PS">PS</option>
                    <option value="PVC">PVC</option>
                    <option value="ABS">ABS</option>
                    <option value="PA">PA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-50/50 rounded-xl p-6 space-y-6 border border-gray-100 shadow-sm hover:bg-gray-50/80 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-200">
              <FileText className="w-5 h-5 text-green-600" />
              Product Details
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {/* Product Name */}

              {/* Country */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                >
                  <option value="">Select Country</option>
                  {countryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  placeholder="e.g. Red, Blue..."
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                />
              </div>

              {/* Source Material */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Material
                </label>
                <input
                  type="text"
                  name="source_material"
                  placeholder="e.g. Recycled PET"
                  value={formData.source_material}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                />
              </div>

              {/* Batch Size */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Size
                </label>
                <input
                  type="number"
                  name="batch_size"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.batch_size}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                />
              </div>

              {/* Minimum Order Quantity */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Quantity
                </label>
                <input
                  type="number"
                  name="minimum_order_quantity"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.minimum_order_quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                />
              </div>

              {/* Application */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application
                </label>
                <input
                  type="text"
                  name="application"
                  placeholder="e.g. Packaging, Automotive..."
                  value={formData.application}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Provide a detailed description of your product..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400 resize-y"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  placeholder="Any additional information or special requirements..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white shadow-sm hover:border-gray-400 resize-y"
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-gray-50/50 rounded-xl p-6 space-y-6 border border-gray-100 shadow-sm hover:bg-gray-50/80 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-200">
              <ImageIcon className="w-5 h-5 text-green-600" />
              Product Images
            </h3>

            <div
              className={`relative border-2 ${
                dragActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-white"
              } border-dashed rounded-lg transition-colors`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center p-8 cursor-pointer group"
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <ImageIcon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 text-center mb-1">
                  <span className="font-medium text-green-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>
            </div>

            {/* Selected Files Preview */}
            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Selected files:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Array.from(formData.files).map((file, idx) => (
                    <div key={idx} className="relative group">
                      <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = Array.from(formData.files);
                          newFiles.splice(idx, 1);
                          const dataTransfer = new DataTransfer();
                          newFiles.forEach((file) =>
                            dataTransfer.items.add(file)
                          );
                          const fileInput = document.getElementById(
                            "file-upload"
                          ) as HTMLInputElement;
                          if (fileInput) {
                            fileInput.files = dataTransfer.files;
                            const event = new Event("change", {
                              bubbles: true,
                            });
                            fileInput.dispatchEvent(event);
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm hover:shadow-md active:transform active:scale-[0.98]"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium active:transform active:scale-[0.98]"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
