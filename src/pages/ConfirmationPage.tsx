import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBookingBikeOwner } from "../services/all-services";

interface Bike {
  id: string;
  name: string;
  image: string;
}

interface Booking {
  id: string;
  bikeId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  name: string;
  bike: Bike;
}

const ConfirmationPage = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await getBookingBikeOwner(userId);
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load booking details.");
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-gray-600 text-lg">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-red-600 text-lg">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow p-4 sm:p-6 overflow-x-auto">
        {/* <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Your Bookings
        </h2> */}
        {bookings.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No bookings found
          </div>
        ) : (
          <div className="w-full">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Bike Name</th>
                  <th className="px-4 py-3 text-left">Booking Name</th>

                  <th className="px-4 py-3 text-left">Start Date</th>
                  <th className="px-4 py-3 text-left">End Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <img
                        src={booking.bike.image}
                        alt={booking.bike.name}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {booking.bike.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{booking.name}</td>

                    <td className="px-4 py-3 text-gray-700">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
