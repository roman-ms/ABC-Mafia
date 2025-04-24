export default function LocationCard({
  location,
  isHovered,
  isSelected,
  setHoveredLocationId,
  setSelectedLocationId,
}) {
  return (
    <div
      onMouseEnter={() => setHoveredLocationId(location._id)}
      onMouseLeave={() => setHoveredLocationId(null)}
      onClick={() => setSelectedLocationId(location._id)}
      className={`bg-white cursor-pointer shadow-md rounded-lg p-4 mb-4 border transition duration-300 ${
        isSelected
          ? "border-blue-600 shadow-lg scale-105"
          : isHovered
          ? "border-blue-400 scale-105"
          : "border-gray-200"
      }`}
    >
      <h3 className="text-xl font-bold text-[#037CB5]">{location.name}</h3>
      <p className="text-gray-600">
        {location.description || "No description available"}
      </p>
      <p className="text-sm text-gray-500">
        📍 Lat: {location.latitude}, Lng: {location.longitude}
      </p>
    </div>
  );
}
