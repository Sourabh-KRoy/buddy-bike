import { useEffect, useState } from "react";
import { getAllBooking, statusUpdate } from "../../services/all-services";

const ManageBookingsUI = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await getAllBooking();
        setBookings(response);
      } catch (err) {
        console.log("Failed to load booking details.");
      }
    };

    fetchBookingData();
  }, []);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const payload = { status: newStatus }; // Create the payload with the status
      const response = await statusUpdate(payload, bookingId); // Pass payload to the service
      const updated = await getAllBooking(); // Fetch updated bookings after status change
      setBookings(updated); // Update the state with new booking data
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="container mx-auto px-6">
      {/* <h2 className="text-3xl font-bold mb-6 text-center">Manage Bookings</h2> */}

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center gap-6"
          >
            <div className="flex-1">
              <p className="text-lg font-medium">
                <strong>User:</strong> {booking?.name}
              </p>
              <p className="text-lg">
                <strong>Bike:</strong> {booking?.bike?.name}
              </p>
              <p className="text-lg">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "ACCEPTED"
                      ? "text-green-600"
                      : booking.status === "REJECTED"
                      ? "text-red-600"
                      : "text-gray-800"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <p className="text-lg">
                <strong>From:</strong>{" "}
                {new Date(booking.startDate).toLocaleDateString()}
              </p>
              <p className="text-lg">
                <strong>To:</strong>{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="w-32 h-32 overflow-hidden rounded-lg">
              <img
                src={booking.image}
                alt="Bike"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center space-y-2">
              {booking.status === "PENDING" && (
                <>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    onClick={() => handleStatusUpdate(booking.id, "ACCEPTED")}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    onClick={() => handleStatusUpdate(booking.id, "REJECTED")}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookingsUI;
