import { useState } from "react";
import ManageBikesUI from "./ManageBikes";
import ManageBookingsUI from "./ManageBookings";
import AdminNavbar from "../../components/AdminNavbar";

const AdminDashboard = () => {
  const [selected, setSelected] = useState<"bikes" | "bookings">("bikes");

  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border-r border-gray-200 p-4 flex flex-col">
          <nav className="flex flex-col space-y-4">
            <button
              className={`text-left px-4 py-2 rounded ${
                selected === "bikes"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelected("bikes")}
            >
              🚲 Manage Bikes
            </button>
            <button
              className={`text-left px-4 py-2 rounded ${
                selected === "bookings"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelected("bookings")}
            >
              📋 Manage Bookings
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {selected === "bikes" ? <ManageBikesUI /> : <ManageBookingsUI />}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
