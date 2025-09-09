import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiUser, FiFileText, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <FiHome className="w-5 h-5" />, label: 'Dashboard', path: '/superadmin/dashboard' },
    { icon: <FiUsers className="w-5 h-5" />, label: 'Users', path: '/superadmin/users' },
    { icon: <FiUser className="w-5 h-5" />, label: 'Admins', path: '/superadmin/admins' },
    { icon: <FiFileText className="w-5 h-5" />, label: 'Reports', path: '/superadmin/reports' },
    { icon: <FiSettings className="w-5 h-5" />, label: 'Settings', path: '/superadmin/settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Fast Hire Admin</h2>
      </div>
      <nav className="mt-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t">
        <button className="flex items-center w-full text-left text-red-600 hover:text-red-800">
          <FiLogOut className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
