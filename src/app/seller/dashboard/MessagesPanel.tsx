"use client";

export default function MessagesPanel() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="text-center py-12">
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No Messages Yet
        </h3>
        <p className="mt-2 text-gray-600">
          When you receive messages about your products, they’ll appear here.
        </p>
      </div>
    </div>
  );
}
