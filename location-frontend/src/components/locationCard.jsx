import { useCallback } from "react";

export default function LocationCard({
  location,
  isHovered,
  isSelected,
  setHoveredLocationId,
  setSelectedLocationId,
}) {
  // Debounced hover handler
  const handleMouseEnter = useCallback(() => {
    if (!isSelected) {
      setHoveredLocationId(location._id);
    }
  }, [isSelected, location._id, setHoveredLocationId]);

  const handleMouseLeave = useCallback(() => {
    if (!isSelected) {
      setHoveredLocationId(null);
    }
  }, [isSelected, setHoveredLocationId]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setSelectedLocationId(location._id)}
      className={`mb-4 cursor-pointer rounded-lg border-3 border-dashed bg-white p-4 transition duration-200 ${
        isSelected
          ? "scale-105 border-blue-500"
          : isHovered
          ? "hover:scale-105 hover:border-blue-400"
          : "border-black/70"
      }`}
    >
      <h3 className="text-vermilion text-xl font-bold">{location.name}</h3>
      {location.description && <p className="text-gray-80 pt-2 pb-4"></p>}

      {location.description && <p>📍 {location.description}</p>}
    </div>
  );
}
