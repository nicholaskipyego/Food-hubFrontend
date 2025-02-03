import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Settings,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

const CommonDashBoardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logout = () => {
    localStorage.clear();
    navigate("/login");

    const NavItem = ({ to, icon: Icon, children }) => (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-300 group ${
            isActive
              ? "bg-indigo-50 text-indigo-600 font-semibold"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`
        }
      >
        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span>{children}</span>
      </NavLink>
    );
  };
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </h2>
        <div className="relative">
          {/* Account Dropdown */}
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Account</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50 animate-fade-in">
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 text-left px-4 py-2.5 text-gray-700 hover:bg-indigo-50 transition-colors duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Page Content */}
      <main className="p-6 flex-1 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CommonDashBoardHeader;
