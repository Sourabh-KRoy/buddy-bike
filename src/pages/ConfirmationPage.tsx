import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface BookingDetails {
  name: string;
  imageUrl: string;
  status: "pending" | "confirmed";
  date: string;
}

const ConfirmationPage = () => {
  const location = useLocation();
  const booking: BookingDetails = location.state || {
    name: "Bike Name",
    imageUrl:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3RtJTIwYmlrZXxlbnwwfHwwfHx8MA%3D%3D",
    status: "pending",
    date: "12th June",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Main content */}
      <main className="flex-grow px-6 max-w-7xl mx-auto py-10 ">
        <div className="flex flex-col items-center justify-center bg-gray-50 px-4 mb-15">
          <div className="max-w-xl w-full bg-white p-6 shadow-md rounded">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Booking {booking.status === "confirmed" ? "Confirmed" : "Pending"}
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={booking.imageUrl}
                alt={booking.name}
                className="w-40 h-40 object-cover rounded shadow"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-1">
                  {booking.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  Booking Date: <strong>{booking.date}</strong>
                </p>
                <span
                  className={`inline-block px-4 py-1 text-sm rounded-full font-medium ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
              </div>
            </div>

            <p className="mt-6 text-center text-gray-600">
              Thank you for choosing <strong>Buddy Bike</strong>! You will
              receive further instructions via email.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
