"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { TrashIcon, SaveIcon } from "@heroicons/react/outline";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { BACKEND_API_URL } from "@/constants/apiConstants";

interface UpdateProfileData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  profileImage?: string;
  verification_doc_url?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Only the fields we edit in the form:
type ProfileFormData = Pick<
  UpdateProfileData,
  "name" | "email" | "countryCode" | "phoneNumber" | "address"
>;

export default function ProfilePage() {
  const { user, setUser, isAuthenticated, authFetch, logout } = useAuth();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [verificationDoc, setVerificationDoc] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name,
      email: user.email,
      countryCode: user.countryCode || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
    });
    setProfilePic(user.profileImage || null);
    setVerificationDoc(null);
    setError(null);
  }, [user]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessModalMessage("");
    if (successModalMessage.includes("Password")) {
      setShowChangePassword(false);
    }
    setError(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof ProfileFormData;
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setError(null);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof ChangePasswordData;
    setPasswordData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setError(null);
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { name, email, countryCode, phoneNumber, address } = formData;
    if (!name || !email) {
      setError("Name and email are required");
      setIsLoading(false);
      return;
    }

    const payload: UpdateProfileData = {
      name,
      email,
      countryCode,
      phoneNumber,
      address,
    };
    if (profilePic && profilePic !== user?.profileImage)
      payload.profileImage = profilePic;
    if (user?.role === "SELLER" && verificationDoc) {
      payload.verification_doc_url = await fileToBase64(verificationDoc);
    }

    try {
      const res = await authFetch(`${BACKEND_API_URL}/auth/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Update failed");
      } else {
        const updatedUser = data.user;
        setUser(updatedUser);
        const existing = localStorage.getItem("auth");
        if (existing) {
          const { token } = JSON.parse(existing);
          localStorage.setItem(
            "auth",
            JSON.stringify({ token, user: updatedUser })
          );
        }
        setSuccessModalMessage("Profile updated successfully");
        setShowSuccessModal(true);
        setEditMode(false);
        setFormData({
          name: updatedUser.name,
          email: updatedUser.email,
          countryCode: updatedUser.countryCode || "",
          phoneNumber: updatedUser.phoneNumber || "",
          address: updatedUser.address || "",
        });
        setProfilePic(updatedUser.profileImage || null);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All password fields are required");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const res = await authFetch(`${BACKEND_API_URL}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Password change failed");
      } else {
        setSuccessModalMessage("Password changed successfully");
        setShowSuccessModal(true);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      return;
    }
    setIsDeleting(true);
    setError(null);

    try {
      const res = await authFetch(`${BACKEND_API_URL}/auth`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to delete account");
      }
      logout();
      router.push("/login");
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";
      setError(errorMessage || "Error deleting account");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
    setError(null);
  };

  const handleCancelPasswordChange = () => {
    setShowChangePassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError(null);
  };

  if (!isAuthenticated) return null;

  // define editable fields with proper keyof typing
  const fields: {
    label: string;
    name: keyof ProfileFormData;
    type: string;
    required?: boolean;
  }[] = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Country Code", name: "countryCode", type: "text" },
    { label: "Phone Number", name: "phoneNumber", type: "text" },
    { label: "Address", name: "address", type: "text" },
  ];

  const passwordFields: {
    label: string;
    name: keyof ChangePasswordData;
    type: string;
    required: boolean;
  }[] = [
    {
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      required: true,
    },
    {
      label: "New Password",
      name: "newPassword",
      type: "password",
      required: true,
    },
    {
      label: "Confirm New Password",
      name: "confirmPassword",
      type: "password",
      required: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 -mt-2 pt-0">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          {profilePic ? (
            <Image
              src={profilePic}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full ring-4 ring-green-500"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="mt-4 text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>

          {!editMode && !showChangePassword ? (
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700"
            >
              Edit Account
            </button>
          ) : (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-red-300 text-red-500 rounded-md hover:bg-red-50 disabled:opacity-50"
            >
              <TrashIcon className="w-5 h-5 mr-2" />
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          )}

          <button
            onClick={() =>
              router.push(
                user?.role === "USER"
                  ? "/seller/dashboard"
                  : user?.role === "SELLER"
                  ? "/seller/dashboard"
                  : "/admin/dashboard"
              )
            }
            className="mt-4 w-full bg-white text-black rounded-md py-2 hover:bg-gray-100 border-2 border-gray-200"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => router.push("/profile/verify")}
            className="mt-4 w-full bg-white text-black rounded-md py-2 hover:bg-gray-100 border-2 border-gray-200"
          >
            Verify Account
          </button>
        </div>

        {/* Profile Details / Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Your Profile Section */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel Changes
                </button>
              )}
            </div>

            {error && !showChangePassword && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && " *"}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={!!field.required}
                      className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleChangePasswordClick}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                  >
                    Change Password
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
                  >
                    <SaveIcon className="w-5 h-5 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {fields.map(({ label, name }) => (
                  <div key={name}>
                    <h3 className="text-sm font-medium text-gray-500">
                      {label}
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {user?.[name] || "—"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Change Password Section */}
          {showChangePassword && (
            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Change Password
                </h2>
                <button
                  onClick={handleCancelPasswordChange}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                {passwordFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && " *"}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={passwordData[field.name]}
                      onChange={handlePasswordChange}
                      required={field.required}
                      className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                ))}

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
                  >
                    <SaveIcon className="w-5 h-5 mr-2" />
                    {isLoading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal - Moved outside of conditional blocks */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Success!
              </h3>
              <p className="text-gray-600 mb-4">{successModalMessage}</p>
              <button
                onClick={handleCloseSuccessModal}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
