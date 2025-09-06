"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  Bell,
  Search,
  Filter,
  Clock,
  Package,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { BACKEND_API_URL } from "@/constants/apiConstants";

type NotificationType =
  | "PRODUCT_CREATED"
  | "PRODUCT_UPDATED"
  | "PRODUCT_APPROVED"
  | "PRODUCT_REJECTED"
  | "PRODUCT_DELETED";

interface Notification {
  id: number;
  productId: number | null;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  product: {
    id: number;
    name: string;
  } | null;
}

const actionLabels: Record<NotificationType, string> = {
  PRODUCT_CREATED: "Created",
  PRODUCT_UPDATED: "Updated",
  PRODUCT_APPROVED: "Approved",
  PRODUCT_REJECTED: "Rejected",
  PRODUCT_DELETED: "Deleted",
};

const actionIcons: Record<NotificationType, React.ElementType> = {
  PRODUCT_CREATED: Plus,
  PRODUCT_UPDATED: Edit,
  PRODUCT_APPROVED: CheckCircle,
  PRODUCT_REJECTED: XCircle,
  PRODUCT_DELETED: Trash2,
};

const actionColors: Record<NotificationType, string> = {
  PRODUCT_CREATED: "text-blue-600 bg-blue-50",
  PRODUCT_UPDATED: "text-amber-600 bg-amber-50",
  PRODUCT_APPROVED: "text-green-600 bg-green-50",
  PRODUCT_REJECTED: "text-red-600 bg-red-50",
  PRODUCT_DELETED: "text-gray-600 bg-gray-50",
};

function getMessage(n: Notification): string {
  const name = n.product?.name ?? "(deleted)";
  switch (n.type) {
    case "PRODUCT_CREATED":
      return `Your product "${name}" was submitted and is pending approval.`;
    case "PRODUCT_UPDATED":
      return `Your product "${name}" was updated and is pending re-approval.`;
    case "PRODUCT_APPROVED":
      return `Your product "${name}" has been approved.`;
    case "PRODUCT_REJECTED":
      return `Your product "${name}" has been rejected.`;
    case "PRODUCT_DELETED":
      return `Your product "${name}" was deleted.`;
    default:
      return "";
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse"
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-6">
        <Bell className="w-12 h-12 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No notifications yet
      </h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        When you have product updates and activities, they will appear here to
        keep you informed.
      </p>
    </div>
  );
}

export default function NotificationsPanel() {
  // Simulated data for demo
  const { authFetch } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      productId: 101,
      type: "PRODUCT_CREATED",
      isRead: false,
      createdAt: "2025-06-15T10:12:45.000Z",
      product: { id: 101, name: "Refurbished Mixer Grinder" },
    },
    {
      id: 2,
      productId: 102,
      type: "PRODUCT_APPROVED",
      isRead: true,
      createdAt: "2025-06-14T14:22:18.000Z",
      product: { id: 102, name: "Recycled Wooden Coffee Table" },
    },
    {
      id: 3,
      productId: 103,
      type: "PRODUCT_REJECTED",
      isRead: false,
      createdAt: "2025-06-13T19:05:37.000Z",
      product: { id: 103, name: "Second-hand Toaster Oven" },
    },
    {
      id: 4,
      productId: 104,
      type: "PRODUCT_CREATED",
      isRead: false,
      createdAt: "2025-06-12T08:47:29.000Z",
      product: { id: 104, name: "Upcycled Plastic Storage Box" },
    },
    {
      id: 5,
      productId: 105,
      type: "PRODUCT_APPROVED",
      isRead: true,
      createdAt: "2025-06-11T17:55:14.000Z",
      product: { id: 105, name: "Glass Crockery Set" },
    },
    {
      id: 6,
      productId: 106,
      type: "PRODUCT_CREATED",
      isRead: false,
      createdAt: "2025-06-10T11:35:42.000Z",
      product: { id: 106, name: "Reclaimed Wooden Bookshelf" },
    },
    {
      id: 7,
      productId: 107,
      type: "PRODUCT_REJECTED",
      isRead: true,
      createdAt: "2025-06-09T15:28:11.000Z",
      product: { id: 107, name: "Eco-friendly Plastic Utensil Set" },
    },
    {
      id: 8,
      productId: 108,
      type: "PRODUCT_APPROVED",
      isRead: false,
      createdAt: "2025-06-08T13:18:56.000Z",
      product: { id: 108, name: "Recycled Plastic Chair" },
    },
    {
      id: 9,
      productId: 109,
      type: "PRODUCT_CREATED",
      isRead: true,
      createdAt: "2025-06-07T09:10:22.000Z",
      product: { id: 109, name: "Second-hand Electric Kettle" },
    },
    {
      id: 10,
      productId: 110,
      type: "PRODUCT_APPROVED",
      isRead: false,
      createdAt: "2025-06-06T20:42:09.000Z",
      product: { id: 110, name: "Upcycled Plastic Water Jug" },
    },
  ]);

  const [loading, setLoading] = useState(true);

  // Filter state
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [actionFilter, setActionFilter] = useState<NotificationType | "">("");

  useEffect(() => {
    authFetch(`${BACKEND_API_URL}/notifications`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      if (!res.ok) {
        console.error("Failed to load notifications:", res.statusText);
      } else {
        const data: Notification[] = await res.json();
        // sort newest first
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setNotifications(data);
        console.log("Loaded notifications:", data);
      }
      setLoading(false);
    });
  }, []);

  const filtered = notifications.filter((n) => {
    const matchesName =
      nameFilter === "" ||
      n.product?.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesId =
      idFilter === "" ||
      (n.productId !== null && n.productId.toString().includes(idFilter));
    const matchesAction = actionFilter === "" || n.type === actionFilter;
    return matchesName && matchesId && matchesAction;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <Bell className="w-8 h-8 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>
        <p className="text-gray-600">
          Stay updated with your product activities and status changes
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name"
              value={nameFilter}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNameFilter(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product ID"
              value={idFilter}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIdFilter(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setActionFilter(e.target.value as NotificationType | "")
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
          >
            <option value="">All Actions</option>
            {Object.entries(actionLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notifications List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <EmptyState />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => {
            const IconComponent = actionIcons[n.type];
            const colorClasses = actionColors[n.type];

            return (
              <div
                key={n.id}
                className={`bg-white rounded-xl p-6 border transition-all duration-200 hover:shadow-md ${
                  n.isRead
                    ? "border-gray-100"
                    : "border-blue-200 bg-gradient-to-r from-blue-50/50 to-transparent shadow-sm"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${colorClasses}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses}`}
                        >
                          {actionLabels[n.type]}
                        </span>
                        {!n.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {n.product?.name ?? "(deleted)"}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Product ID: {n.productId ?? "-"}
                      </p>
                    </div>

                    <p
                      className={`text-sm ${
                        n.isRead ? "text-gray-600" : "text-gray-900 font-medium"
                      }`}
                    >
                      {getMessage(n)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
