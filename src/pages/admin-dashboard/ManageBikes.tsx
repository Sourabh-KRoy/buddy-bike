import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getBike,
  addBike,
  updateBike,
  deleteBike,
} from "../../services/all-services";

const initialForm = {
  name: "",
  engine: "",
  version: "",
  brakes: "",
  comfort: "",
  costPerDay: "",
  image: "",
};

const ManageBikesUI = () => {
  const [showModal, setShowModal] = useState(false);
  const [bikes, setBikes] = useState<any[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editBikeId, setEditBikeId] = useState<string | null>(null);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const data = await getBike();
      setBikes(data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const openEditModal = (bike: any) => {
    setFormData({
      name: bike.name,
      engine: bike.engine,
      version: bike.version,
      brakes: bike.brakes,
      comfort: bike.comfort,
      costPerDay: bike.costPerDay,
      image: bike.image,
    });
    setImageFile(null);
    setEditBikeId(bike.id);
    setShowModal(true);
  };

  const handleDelete = async (bikeId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this bike?");
    if (!confirmDelete) return;

    try {
      const result = await deleteBike(bikeId);
      if (result) {
        alert("Bike deleted successfully");
        fetchBikes();
      }
    } catch (error) {
      console.error("Error deleting bike:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("engine", formData.engine);
    payload.append("version", formData.version);
    payload.append("brakes", formData.brakes);
    payload.append("comfort", formData.comfort);
    payload.append("costPerDay", formData.costPerDay);

    // Only append image if it's selected (for new image upload)
    if (imageFile) {
      payload.append("image", imageFile); // Image file will be sent as binary
    }

    try {
      if (editBikeId) {
        await updateBike(payload, editBikeId); // Updating the bike
      } else {
        await addBike(payload); // Adding a new bike
      }

      // Reset form data and close the modal
      setFormData(initialForm);
      setImageFile(null);
      setEditBikeId(null);
      setShowModal(false);
      fetchBikes(); // Fetch updated list of bikes
    } catch (error) {
      console.error("Error saving bike:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Bikes</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setFormData(initialForm);
            setImageFile(null);
            setEditBikeId(null);
            setShowModal(true);
          }}
        >
          + Add Bike
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600 uppercase">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Engine</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Brakes</th>
              <th className="px-4 py-3">Comfort</th>
              <th className="px-4 py-3">Cost/Day</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike.id} className="border-b">
                <td className="px-4 py-3">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="h-16 w-24 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{bike.name}</td>
                <td className="px-4 py-3">{bike.engine}</td>
                <td className="px-4 py-3">{bike.version}</td>
                <td className="px-4 py-3">{bike.brakes}</td>
                <td className="px-4 py-3">{bike.comfort}</td>
                <td className="px-4 py-3">{bike.costPerDay}</td>
                <td className="px-4 py-3 space-x-4 text-lg text-gray-600">
                  <button
                    className="hover:text-blue-600"
                    onClick={() => openEditModal(bike)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="hover:text-red-600"
                    onClick={() => handleDelete(bike.id)}
                  >
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
            <h3 className="text-lg font-semibold mb-4">
              {editBikeId ? "Edit Bike" : "Add New Bike"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Bike Name"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="engine"
                value={formData.engine}
                onChange={handleInputChange}
                placeholder="Engine"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                placeholder="Version"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="brakes"
                value={formData.brakes}
                onChange={handleInputChange}
                placeholder="Brakes"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="comfort"
                value={formData.comfort}
                onChange={handleInputChange}
                placeholder="Comfort"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="costPerDay"
                value={formData.costPerDay}
                onChange={handleInputChange}
                placeholder="Cost Per Day"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded"
              />
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                formData.image && (
                  <img
                    src={formData.image} // Use the current image URL from the backend
                    alt="Current Image"
                    className="w-full h-32 object-cover rounded"
                  />
                )
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editBikeId ? "Update" : "Save"}
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
