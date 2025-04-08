export default function LocationCard({
  location,
  isHovered,
  setHoveredLocationId,
}) {
  return (
    <div
      onMouseEnter={() => setHoveredLocationId(location._id)}
      onMouseLeave={() => setHoveredLocationId(null)}
      className={`bg-white shadow-md rounded-lg p-4 mb-4 border transform transition duration-300 ${
        isHovered ? "scale-105 shadow-lg border-blue-400" : "border-gray-200"
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
