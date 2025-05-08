import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    // Logic to clear token or session on logout
    localStorage.removeItem("token"); // Remove the token from localStorage
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold cursor-pointer">
            <NavLink to="/">Buddy Bike</NavLink>
          </h1>
        </div>

        {/* Right side - Navigation Links */}
        <ul className="flex space-x-6 text-sm font-medium">
          <li className="mt-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-yellow-300  " : "hover:underline "
              }
            >
              Home
            </NavLink>
          </li>
          <li className="mt-4">
            <NavLink
              to="/booking-status"
              className={({ isActive }) =>
                isActive ? "text-yellow-300  " : "hover:underline "
              }
            >
              Booking Status
            </NavLink>
          </li>
          <li className="mt-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 " : "hover:underline "
              }
            >
              About Us
            </NavLink>
          </li>
          <li className="mt-4">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 " : "hover:underline "
              }
            >
              Contact Us
            </NavLink>
          </li>

          {/* Conditionally Render Logout if Token Exists */}
          {localStorage.getItem("token") ? (
            <li className="mt-2">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="mt-2">
                <button
                  onClick={handleLogout}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
