import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const dummyBikes = [
  {
    id: 1,
    name: "City Cruiser",
    description: "Perfect for daily commuting.",
    imageUrl:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800",
  },
  {
    id: 2,
    name: "Mountain King",
    description: "Best for off-road adventures.",
    imageUrl:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=800",
  },
];

const ManageBikesUI = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Bikes</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          + Add Bike
        </button>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyBikes.map((bike) => (
              <tr key={bike.id} className="border-b">
                <td className="px-4 py-3">
                  <img
                    src={bike.imageUrl}
                    alt={bike.name}
                    className="h-16 w-24 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{bike.name}</td>
                <td className="px-4 py-3 text-gray-600">{bike.description}</td>
                <td className="px-4 py-3 space-x-4 text-lg text-gray-600">
                  <button className="hover:text-blue-600">
                    <FiEdit />
                  </button>
                  <button className="hover:text-red-600">
                    <FiTrash2 />
                  </button>
                </td>
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
            <h3 className="text-lg font-semibold mb-4">Add New Bike</h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Bike Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBikesUI;
