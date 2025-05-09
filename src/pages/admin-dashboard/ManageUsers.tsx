import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  createUser,
  deleteUser,
  getAllUser,
  signup,
  updateUser,
} from "../../services/all-services";

const initialForm = {
  id: "",
  email: "",
  password: "",
};

const ManageUsersUI = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUser();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user: any) => {
    setFormData({ ...user, password: "" });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(formData.id, {
          email: formData.email,
          password: formData.password,
        });
        alert("User updated successfully");
      } else {
        await signup(formData.email, formData.password);
        alert("User created successfully");
      }
      setShowModal(false);
      setFormData(initialForm);
      setIsEditing(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Users</h2>
        {/* <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setFormData(initialForm);
            setIsEditing(false);
            setShowModal(true);
          }}
        >
          + Add User
        </button> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              {/* <th className="px-4 py-3">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.email}</td>
                {/* <td className="px-4 py-3 space-x-4 text-lg text-gray-600">
                  <button
                    className="hover:text-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="hover:text-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit User" : "Add New User"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required={!isEditing}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersUI;
