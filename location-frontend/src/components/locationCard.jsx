export default function LocationCard({
  location,
  isHovered,
  isSelected,
  setHoveredLocationId,
  setSelectedLocationId,
}) {
  console.log(location);
  return (
    <div
      onMouseEnter={() => setHoveredLocationId(location._id)}
      onMouseLeave={() => setHoveredLocationId(null)}
      onClick={() => setSelectedLocationId(location._id)}
      className={`mb-4 cursor-pointer rounded-lg border-3 border-dashed bg-white p-4 transition duration-200 ${
        isSelected
          ? "scale-105 border-blue-500"
          : isHovered
            ? "hover:scale-105 hover:border-blue-400"
            : "border-black/70"
      }`}
    >
      <h3 className="text-xl font-bold text-vermilion">{location.name}</h3>
      {location.description && <p className="text-gray-80 pt-2 pb-4">
        {location.description}
      </p>}
      <p className="text-sm text-gray-800">
        📍 Lat: {location.latitude}, Lng: {location.longitude}
      </p>
    </div>
  );
}
