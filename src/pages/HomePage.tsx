import React, { useState } from "react";
import BikeCard from "../components/BikeCard";
import BookingForm from "../components/BookingForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Bike = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

const bikes: Bike[] = [
  {
    id: 1,
    name: "Mountain Bike",
    description: "Perfect for off-road and adventure trails.",
    imageUrl:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&q=60&w=3000",
  },
  {
    id: 2,
    name: "City Bike",
    description: "Great for daily urban commuting.",
    imageUrl:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&q=60&w=3000",
  },
  // ...more bikes
];

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBike(null);
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
              description={bike.description}
              imageUrl={bike.imageUrl}
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
              src={selectedBike.imageUrl}
              alt={selectedBike.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <BookingForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
