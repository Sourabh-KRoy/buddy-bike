import { useState, useEffect } from "react";
import ManageBikesUI from "./ManageBikes";
import ManageBookingsUI from "./ManageBookings";
import AdminNavbar from "../../components/AdminNavbar";
import {
  FaBicycle,
  FaClipboardList,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import ManageUsersUI from "./ManageUsers";
import { getBike } from "../../services/all-services";

type Panel = "bikes" | "bookings" | "users";

const AdminDashboard = () => {
  const [selected, setSelected] = useState<Panel>("bikes");

  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border-r border-gray-200 p-4 flex flex-col justify-between">
          <div>
            {/* User Info */}
            {/* {user && (
              <div className="flex items-center space-x-3 mb-6 p-2 bg-gray-100 rounded">
                <FaUserCircle size={36} className="text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            )} */}

            {/* Navigation */}
            <nav className="flex flex-col space-y-2">
              <SidebarButton
                selected={selected}
                value="bikes"
                icon={<FaBicycle />}
                label="Manage Bikes"
                setSelected={setSelected}
              />
              <SidebarButton
                selected={selected}
                value="bookings"
                icon={<FaClipboardList />}
                label="Manage Bookings"
                setSelected={setSelected}
              />
              <SidebarButton
                selected={selected}
                value="users"
                icon={<FaUsers />}
                label="Manage Users"
                setSelected={setSelected}
              />
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {selected === "bikes" && <ManageBikesUI />}
          {selected === "bookings" && <ManageBookingsUI />}
          {selected === "users" && <ManageUsersUI />}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;

const SidebarButton = ({
  selected,
  value,
  icon,
  label,
  setSelected,
}: {
  selected: string;
  value: string;
  icon: React.ReactNode;
  label: string;
  setSelected: (val: any) => void;
}) => (
  <button
    className={`flex items-center space-x-3 px-4 py-2 rounded transition ${
      selected === value
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100 text-gray-700"
    }`}
    onClick={() => setSelected(value)}
  >
    {icon}
    <span>{label}</span>
  </button>
);
