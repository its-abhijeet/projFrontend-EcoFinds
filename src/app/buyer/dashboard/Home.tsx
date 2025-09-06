"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

// Mock data - replace with actual data from your API/database in the future
const monthlySpendingData = [
  { month: "Jan", amount: 320, orders: 4, avgOrderValue: 80 },
  { month: "Feb", amount: 450, orders: 6, avgOrderValue: 75 },
  { month: "Mar", amount: 280, orders: 3, avgOrderValue: 93 },
  { month: "Apr", amount: 580, orders: 7, avgOrderValue: 83 },
  { month: "May", amount: 310, orders: 4, avgOrderValue: 77 },
  { month: "Jun", amount: 420, orders: 5, avgOrderValue: 84 },
];

// Mock product data
const purchasedProducts = [
  {
    id: 1,
    name: "Recycled Plastic Bottles",
    seller: "EcoSolutions Inc.",
    price: 250,
    date: "2025-05-12",
  },
  {
    id: 2,
    name: "Eco-friendly Bags",
    seller: "GreenLife Products",
    price: 180,
    date: "2025-06-22",
  },
  {
    id: 3,
    name: "Plastic Sheets",
    seller: "RecycleX",
    price: 320,
    date: "2025-06-15",
  },
  {
    id: 4,
    name: "Furniture Decor Set",
    seller: "EcoLiving",
    price: 450,
    date: "2025-06-03",
  },
];

// Mock price comparison data
const priceComparisonData = [
  { category: "Plastic Bottles", avgMarketPrice: 280, yourAvgPrice: 250 },
  { category: "Plastic Bags", avgMarketPrice: 200, yourAvgPrice: 180 },
  { category: "Recycled Pellets", avgMarketPrice: 350, yourAvgPrice: 320 },
  { category: "Furniture Decor", avgMarketPrice: 500, yourAvgPrice: 450 },
];

// Define chart colors for better visualization
const CHART_COLORS = {
  primary: "#15803d", // green-700
  secondary: "#166534", // green-800
  success: "#22c55e", // green-500
  warning: "#eab308", // yellow-500
  error: "#dc2626", // red-600
  gray: "#6b7280", // gray-500
  market: "#047857", // emerald-700
  savings: "#34d399", // emerald-400
};

const BuyerDashboardHome = () => {
  const [timeRange, setTimeRange] = useState("6months");

  // Calculate total spending - in real app, get this from API/database
  const totalSpent = purchasedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  // COLORS
  //   const COLORS = ['#004d40', '#00796b', '#009688', '#4db6ac'];
  //   const GREEN_COLORS = ['#1b5e20', '#2e7d32', '#388e3c', '#43a047'];

  return (
    <div className="space-y-3 sm:space-y-6 -mt-2 pt-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <div className="flex space-x-1 sm:space-x-2">
          <button
            onClick={() => setTimeRange("30days")}
            className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg ${
              timeRange === "30days" ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeRange("6months")}
            className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg ${
              timeRange === "6months"
                ? "bg-green-700 text-white"
                : "bg-gray-200"
            }`}
          >
            6 Months
          </button>
          <button
            onClick={() => setTimeRange("1year")}
            className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg ${
              timeRange === "1year" ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
          >
            1 Year
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-6">
        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border-l-4 border-green-600">
          <h2 className="text-gray-500 text-xs uppercase font-semibold">
            Total Products Purchased
          </h2>
          <p className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">
            {purchasedProducts.length}
          </p>
          <p className="text-green-600 text-xs mt-1 sm:mt-2">
            ↑ 12% from last month
          </p>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border-l-4 border-green-700">
          <h2 className="text-gray-500 text-xs uppercase font-semibold">
            Total Amount Spent
          </h2>
          <p className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">
            ₹{totalSpent}
          </p>
          <p className="text-green-600 text-xs mt-1 sm:mt-2">
            ↑ 8% from last month
          </p>
        </div>

        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border-l-4 border-green-800">
          <h2 className="text-gray-500 text-xs uppercase font-semibold">
            Average Price Per Item
          </h2>
          <p className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">
            ₹{Math.round(totalSpent / purchasedProducts.length)}
          </p>
          <p className="text-red-500 text-xs mt-1 sm:mt-2">
            ↓ 3% from last month
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
        {/* Monthly Spending Chart */}
        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
              Monthly Spending
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
              <span className="flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600 mr-1"></span>
                Total Spent
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-200 mr-1"></span>
                Avg Order Value
              </span>
            </div>
          </div>
          <div className="h-52 sm:h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlySpendingData}
                margin={{ top: 20, right: 15, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="spendingGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#374151", fontSize: 10 }}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#374151", fontSize: 10 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#374151", fontSize: 10 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    border: "none",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "amount"
                      ? `₹${value}`
                      : name === "orders"
                      ? `${value} orders`
                      : `₹${value} per order`,
                    name === "amount"
                      ? "Total Spent"
                      : name === "orders"
                      ? "Orders"
                      : "Avg Order Value",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="amount"
                  stroke={CHART_COLORS.primary}
                  fill="url(#spendingGradient)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "white", strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  yAxisId="left"
                />
                <Line
                  type="monotone"
                  dataKey="avgOrderValue"
                  name="avgOrderValue"
                  stroke={CHART_COLORS.success}
                  strokeWidth={2}
                  dot={{ r: 3, fill: "white", strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  yAxisId="left"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-1 sm:gap-4">
            {monthlySpendingData.slice(-3).map((month, index) => (
              <div key={index} className="p-1 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700">
                  {month.month}
                </p>
                <p className="text-xs sm:text-sm md:text-lg font-semibold text-green-700">
                  ₹{month.amount}
                </p>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{month.orders}</span>
                  <span>₹{month.avgOrderValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Comparison Chart */}
        <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
              Price Comparison
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
              <span className="flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-700 mr-1"></span>
                Market Average
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-400 mr-1"></span>
                Your Price
              </span>
            </div>
          </div>
          <div className="h-52 sm:h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priceComparisonData}
                margin={{ top: 20, right: 15, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="category"
                  tick={{ fill: "#374151", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#374151", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    border: "none",
                  }}
                  formatter={(value: number) => [`₹${value}`, ""]}
                />
                <Bar
                  dataKey="avgMarketPrice"
                  name="Market Average"
                  fill={CHART_COLORS.market}
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="yourAvgPrice"
                  name="Your Price"
                  fill={CHART_COLORS.savings}
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Recent Purchases
        </h2>
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Seller
                </th>
                <th
                  scope="col"
                  className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchasedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {product.seller}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    ₹{product.price}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {product.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboardHome;
