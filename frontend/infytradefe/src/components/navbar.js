import React, { useState } from "react";
import {
  FaBars,
  FaChevronLeft,
  FaStore,
  FaChartLine,
  FaUserFriends,
  FaChartPie,
  FaRobot,
  FaWallet,
  FaTrophy,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiPackage, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState("Market Place");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Market Place", icon: FaStore, path: "/marketplace" },
    { name: "Dashboard", icon: FaChartLine, path: "/dashboard" },
    { name: "Portfolio", icon: FiPackage, path: "/portfolio" },
    { name: "Analysis", icon: FaChartPie, path: "/analysis" },
    {
      name: "Automated Trading System",
      icon: FaRobot,
      path: "/automated-trading",
    },
    { name: "Ranking", icon: FaTrophy, path: "/ranking" },
    { name: "Community", icon: FaUserFriends, path: "/community" },
    { name: "Account & Settings", icon: FiSettings, path: "/account-settings" },
  ];

  const handleMenuItemClick = (path, name) => {
    setActivePage(name);
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`flex flex-col h-full ${
          isOpen ? "w-64" : "w-20"
        } transition-width duration-300 bg-white shadow-lg`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center p-4 focus:outline-none"
            >
              {isOpen ? <FaChevronLeft size={24} /> : <FaBars size={24} />}
            </button>
            <div className="flex flex-col space-y-4 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className={`flex items-center space-x-2 py-2 cursor-pointer ${
                      activePage === item.name
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleMenuItemClick(item.path, item.name)}
                  >
                    <Icon size={20} />
                    <span className={isOpen ? "block" : "hidden"}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-4 py-2">
            <div
              className={`flex items-center space-x-2 py-2 cursor-pointer ${
                activePage === "Wallet and Money"
                  ? "text-blue-500"
                  : "text-gray-500"
              }`}
            >
              <FaWallet size={20} />
              <span className={isOpen ? "block" : "hidden"}>Wallet Money</span>
            </div>
            {isOpen && (
              <div className="mt-2 text-sm text-gray-500">
                <p>Balance: 0.0</p>
              </div>
            )}

            <div
              className="flex items-center space-x-2 py-2 cursor-pointer text-red-500"
              onClick={() => handleMenuItemClick("/", "Logout")}
            >
              <FaSignOutAlt size={20} />
              <span className={isOpen ? "block" : "hidden"}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
