import { FaCog, FaCar, FaBirthdayCake } from "react-icons/fa"; // Import icons

interface BikeCardProps {
  name: string;
  engine: string;
  version: string;
  brakes: string;
  comfort: string;
  costPerDay: number;
  image: string;
  onSelect: () => void;
}

const BikeCard: React.FC<BikeCardProps> = ({
  name,
  engine,
  version,
  brakes,
  comfort,
  costPerDay,
  image,
  onSelect,
}) => {
  return (
    <div className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:w-80">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          {name}
        </h3>
        <p className="text-blue-600 font-semibold text-xl text-center">
          ₹{costPerDay} / day
        </p>

        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center">
            <FaCog className="text-gray-500 mr-2" />
            <span className="font-medium">Engine:</span> {engine}
          </li>
          <li className="flex items-center">
            <FaCar className="text-gray-500 mr-2" />
            <span className="font-medium">Version:</span> {version}
          </li>
          <li className="flex items-center">
            <FaBirthdayCake className="text-gray-500 mr-2" />
            <span className="font-medium">Brakes:</span> {brakes}
          </li>
          <li className="flex items-center">
            <span className="font-medium">Comfort:</span> {comfort}
          </li>
        </ul>

        <div className="flex justify-center mt-4">
          <button
            onClick={onSelect}
            className="bg-blue-600 text-white px-6 py-2 text-sm rounded-full hover:bg-blue-700 transition duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
