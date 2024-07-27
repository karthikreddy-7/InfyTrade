import React, { useState } from 'react';
import { FaBars, FaChevronLeft, FaStore, FaChartLine, FaUserFriends, FaChartPie, FaRobot, FaWallet, FaTrophy } from 'react-icons/fa';
import { FiPackage, FiSettings } from 'react-icons/fi';
import 'tailwindcss/tailwind.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState('Market Place');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Market Place', icon: FaStore },
    { name: 'Dashboard', icon: FaChartLine },
    { name: 'Portfolio', icon: FiPackage },
    { name: 'Analysis', icon: FaChartPie },
    { name: 'Automated Trading System', icon: FaRobot },
    { name: 'Ranking', icon: FaTrophy },  // Updated icon for Rankings
    { name: 'Community', icon: FaUserFriends },
    { name: 'Account & Settings', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`flex flex-col h-full ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 bg-white shadow-lg`}>
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
                  <a
                    key={item.name}
                    href="#"
                    className={`flex items-center space-x-2 py-2 ${activePage === item.name ? 'text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActivePage(item.name)}
                  >
                    <Icon size={20} />
                    <span className={isOpen ? 'block' : 'hidden'}>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="px-4 py-2">
            <a
              href="#"
              className={`flex items-center space-x-2 py-2 ${activePage === 'Wallet and Money' ? 'text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActivePage('Wallet and Money')}
            >
              <FaWallet size={20} />
              <span className={isOpen ? 'block' : 'hidden'}>Wallet Money</span>
            </a>
            {isOpen && (
              <div className="mt-2 text-sm text-gray-500">
                <p>Balance: 0.000244 ETH</p>
                <p>Address: 0xGD63...6DS9</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default App;
