"use client";

import { UserProfile, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { User, Edit3, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Reusable form field
const FormField = ({
  label,
  name,
  value,
  isEditing,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    ) : (
      <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
        {value || "Not set"}
      </div>
    )}
  </div>
);

const CustomEditProfile = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setErrorMsg("");
    try {
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMsg("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-gray-600">Update your personal information</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Profile Image */}
        <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-4">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Profile Photo</h3>
            <p className="text-sm text-gray-500">Displayed on your profile</p>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <FormField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
          </div>

          <FormField
            label="Username"
            name="username"
            value={formData.username}
            isEditing={isEditing}
            onChange={handleInputChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900 flex items-center justify-between">
              {user?.primaryEmailAddress?.emailAddress}
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>

        {errorMsg && <p className="text-sm text-red-600 mt-4">{errorMsg}</p>}

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    username: user?.username || "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Sidebar icon
const EditIcon = () => (
  <Image src="/updateDark.png" alt="" width={20} height={20} />
);

const UserProfilePage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-4xl mx-auto px-4">
      <UserProfile path="/user-profile" routing="path">
        <UserProfile.Page
          label="Edit Profile"
          labelIcon={<EditIcon />}
          url="edit-profile"
        >
          <CustomEditProfile />
        </UserProfile.Page>
        <UserProfile.Page label="account" />
        <UserProfile.Page label="security" />
      </UserProfile>
    </div>
  </div>
);

export default UserProfilePage;
