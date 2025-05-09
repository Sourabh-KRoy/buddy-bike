import React, { useState, useEffect } from "react";
import BikeCard from "../components/BikeCard";
import BookingForm from "../components/BookingForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createBooking, getBike } from "../services/all-services";

type Bike = {
  id: string;
  name: string;
  engine: string;
  version: string;
  brakes: string;
  comfort: string;
  costPerDay: number;
  image: string;
};

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [bikes, setBikes] = useState<Bike[]>([]);

  // Fetch bikes from the backend
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const data = await getBike();
        setBikes(data);
        console.log("Fetched bikes:", data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    fetchBikes();
  }, []);

  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBike(null);
  };

  const handleBooking = async (
    startDate: string,
    endDate: string,
    name: string
  ) => {
    if (!selectedBike) return;

    const payload = {
      userId: localStorage.getItem("userId"), // Replace with actual user ID
      bikeId: selectedBike.id,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      name: name,
    };

    try {
      const bookingResponse = await createBooking(payload);
      console.log("Booking Successful:", bookingResponse);
      // Handle success (e.g., show a confirmation message)
      closeModal();
    } catch (error) {
      console.error("Error creating booking:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow py-10 px-6 max-w-7xl mx-auto">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard
              key={bike.id}
              name={bike.name}
              engine={bike.engine}
              version={bike.version}
              brakes={bike.brakes}
              comfort={bike.comfort}
              costPerDay={bike.costPerDay}
              image={bike.image}
              onSelect={() => handleSelectBike(bike)}
            />
          ))}
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {showModal && selectedBike && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Booking: {selectedBike.name}
            </h2>
            <img
              src={selectedBike.image}
              alt={selectedBike.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <BookingForm
              onSubmit={handleBooking} // Pass the handleBooking function as a prop
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
