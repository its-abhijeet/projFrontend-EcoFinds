"use client";
import Link from "next/link";

export default function SettingsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Profile Settings */}
      <Link href="/profile" className="block">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
          <h3 className="text-lg font-medium text-gray-900">
            Profile Settings
          </h3>
          <p className="text-sm text-gray-500">
            Update your personal information
          </p>
        </div>
      </Link>

      {/* Security */}
      <Link href="/security-settings" className="block">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
          <h3 className="text-lg font-medium text-gray-900">Security</h3>
          <p className="text-sm text-gray-500">
            Manage your password and security preferences
          </p>
        </div>
      </Link>

      {/* Notifications (redirects to notifications) */}
      <Link href="/notifications" className="block">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <p className="text-sm text-gray-500">
            Configure your notification preferences
          </p>
        </div>
      </Link>

      {/* Preferences */}
      <Link href="/preferences" className="block">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
          <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
          <p className="text-sm text-gray-500">
            Customize your seller dashboard experience
          </p>
        </div>
      </Link>
    </div>
  );
}
