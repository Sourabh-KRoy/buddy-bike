import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide hover:text-gray-200 transition duration-300">
          <NavLink to="/" className="flex items-center space-x-2">
            {/* <span>🚲</span> */}
            <span>BuddyBike Admin</span>
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
