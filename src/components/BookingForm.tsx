import React, { useState } from "react";

interface BookingFormProps {
  onSubmit: (startDate: string, endDate: string, name: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !name) {
      setError("Please fill in all fields.");
      return;
    }

    // Pass the form data to the onSubmit prop
    onSubmit(startDate, endDate, name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 text-sm rounded-full hover:bg-blue-700 transition duration-200"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
