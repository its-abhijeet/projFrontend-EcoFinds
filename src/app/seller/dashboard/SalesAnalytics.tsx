"use client";

export default function SalesAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Sales */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Sales</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">₹0.00</h3>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">{/* icon */}</div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <span className="text-indigo-600">0%</span> vs last month
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">0</h3>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">{/* icon */}</div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <span className="text-orange-600">0%</span> vs last month
        </div>
      </div>

      {/* Active Products */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Products</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">0</h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">{/* icon */}</div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <span className="text-purple-600">0%</span> vs last month
        </div>
      </div>

      {/* Recent Activity */}
      <div className="col-span-1 md:col-span-3 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-6 text-center text-gray-500">
          <p>No recent activity to show</p>
        </div>
      </div>
    </div>
  );
}
