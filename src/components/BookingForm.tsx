const BookingForm = () => {
  return (
    <form className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full">
          <label className="block font-medium mb-1">Start Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div className="w-full">
          <label className="block font-medium mb-1">End Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Upload Document</label>
        <input type="file" className="w-full border p-2 rounded" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
