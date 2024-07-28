// AccountSettings.js
import React, { useState } from "react";
import profilePic from './profilepic.png'; // Adjust the path as necessary

function AccountSettings() {
  const [isPublic, setIsPublic] = useState(true);

  const togglePrivacy = () => {
    setIsPublic(!isPublic);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-semibold">Welcome, Alexa</h1>
      </header>
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              src={profilePic}
              alt="Alexa Rawles"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">Alexa Rawles</h2>
              <p className="text-gray-600">alexarawles@gmail.com</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Edit
          </button>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" placeholder="Your First Name" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
            <input type="text" placeholder="Your Gender" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="form-group flex items-center justify-between">
            <div className="w-2/3">
              <label className="block mb-2 text-sm font-medium text-gray-700">Country</label>
              <input type="text" placeholder="Your Country" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="flex items-center ml-4">
              <label className="block text-sm font-medium text-gray-700 mr-2">Private</label>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isPublic}
                  onChange={togglePrivacy}
                />
                <div
                  className={`block w-14 h-8 rounded-full cursor-pointer ${
                    isPublic ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                    isPublic ? "transform translate-x-full" : ""
                  }`}
                ></div>
              </div>
              <label className="block text-sm font-medium text-gray-700 ml-2">Public</label>
            </div>
          </div>
        </form>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">My Email Address</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-4">
            <p className="text-gray-800">alexarawles@gmail.com</p>
            <p className="text-gray-500 text-sm">1 month ago</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add Email Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
