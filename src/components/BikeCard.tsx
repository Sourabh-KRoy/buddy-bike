interface BikeCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onSelect: () => void;
}

const BikeCard: React.FC<BikeCardProps> = ({
  name,
  description,
  imageUrl,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-4"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-4 text-xl font-semibold">{name}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default BikeCard;
