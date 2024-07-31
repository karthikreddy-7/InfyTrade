import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../api/auth"; // Assume this is your API function
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { stringAvatar } from "../../utilities/AvatarIcon";
import { getRandomTimeout } from "../../utilities/getRandomTimeout";

function AccountSettings() {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    isPublic: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        isPublic: user.visibility === "public",
      });
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
      setLoading(false);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        visibility: formData.isPublic ? "public" : "private",
      };

      const response = await updateUser(user.id, updatedUser, dispatch);
      console.log("User updated:", response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form data to original values when canceling
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        isPublic: user.visibility === "public",
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      {loading || !loadingMinTimeElapsed ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto p-2 rounded-lg">
          <header className="text-center mb-6 mt-4">
            <h1 className="text-3xl font-semibold">Welcome, {formData.name}</h1>
          </header>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="avatar m-2">
                  <Stack direction="row" spacing={6}>
                    <Avatar {...stringAvatar(user?.name)} />
                  </Stack>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{formData.name}</h2>
                  <p className="text-gray-600">{formData.email}</p>
                </div>
              </div>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600`}
                onClick={handleEditToggle}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group flex items-center ml-4 justify-around w-[25vw]">
                <label className="block text-sm m-10 font-medium text-gray-700">
                  Privacy
                </label>
                <div
                  className={`relative w-16 h-8 flex items-center cursor-pointer ${
                    formData.isPublic ? "bg-blue-500" : "bg-gray-300"
                  } rounded-full`}
                  onClick={() => {
                    if (isEditing) {
                      setFormData((prev) => ({
                        ...prev,
                        isPublic: !prev.isPublic,
                      }));
                    }
                  }}
                >
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      formData.isPublic ? "transform translate-x-full" : ""
                    }`}
                  ></div>
                  <span className="ml-28 text-sm font-medium text-gray-700">
                    {formData.isPublic ? "Public" : "Private"}
                  </span>
                </div>
              </div>
              {isEditing && (
                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountSettings;
