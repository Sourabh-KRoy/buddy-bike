const dummyBookings = [
  {
    id: 1,
    user: "user1",
    bike: "City Cruiser",
    status: "pending",
  },
  {
    id: 2,
    user: "user2",
    bike: "Mountain King",
    status: "pending",
  },
];

const ManageBookingsUI = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Bookings</h2>

      <div className="space-y-4">
        {dummyBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p>
                <strong>User:</strong> {booking.user}
              </p>
              <p>
                <strong>Bike:</strong> {booking.bike}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </div>
            <div className="space-x-2">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Confirm
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookingsUI;
