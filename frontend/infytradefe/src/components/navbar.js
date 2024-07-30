import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FaChevronLeft,
  FaStore,
  FaChartLine,
  FaUserFriends,
  FaChartPie,
  FaRobot,
  FaWallet,
  FaTrophy,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { FiPackage, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/action";
import "tailwindcss/tailwind.css";
import logo from "../assests/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState("Market Place");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin");
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
    { name: "Wallet Money", icon: FaWallet, path: "/wallet" },
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
            <div className="flex items-center p-4">
              <img src={logo} alt="logo" className="h-8 w-8" />
              {isOpen && (
                <span className="ml-2 text-xl font-bold text-blue-600">
                  InfyTrade
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-2 px-5 text-base">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className={`flex items-center space-x-1 py-2 cursor-pointer font-semibold ${
                      activePage === item.name
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleMenuItemClick(item.path, item.name)}
                  >
                    <Icon size={18} />
                    <span className={`text-sm ${isOpen ? "block" : "hidden"}`}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-5 py-2">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center space-x-2 py-2 focus:outline-none"
            >
              {isOpen ? (
                <FaChevronLeft size={18} />
              ) : (
                <FaChevronRight size={18} />
              )}
            </button>
            <div
              className="flex items-center space-x-2 py-2 cursor-pointer text-red-500"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={18} />
              <span
                className={`text-sm ${
                  isOpen ? "block" : "hidden"
                } font-semibold`}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
