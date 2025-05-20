import { useCallback, memo, useState, useEffect } from "react";

const LocationCard = memo(
  ({
    location,
    isHovered,
    isSelected,
    setHoveredLocationId,
    setSelectedLocationId,
    setIsOpen,
    isOpen,
  }) => {
    const [localHover, setLocalHover] = useState(false);

    // Reset local hover state when selection changes
    useEffect(() => {
      if (!isSelected) {
        setLocalHover(false);
      }
    }, [isSelected]);

    // Debounced hover handler with local state
    const handleMouseEnter = useCallback(() => {
      if (!isSelected) {
        setLocalHover(true);
        setHoveredLocationId(location._id);
      }
    }, [isSelected, location._id, setHoveredLocationId]);

    const handleMouseLeave = useCallback(() => {
      if (!isSelected) {
        setLocalHover(false);
        setHoveredLocationId(null);
      }
    }, [isSelected, setHoveredLocationId]);

    const handleClick = useCallback(
      (e) => {
        e.stopPropagation(); // Prevent click from bubbling
        if (isSelected) {
          setSelectedLocationId(null);
          setIsOpen(false);
        } else {
          setSelectedLocationId(location._id);
          setIsOpen(true);
        }
      },
      [isSelected, location._id, setSelectedLocationId, setIsOpen],
    );

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`location-card mb-4 cursor-pointer rounded-lg border-3 border-dashed bg-white p-4 transition-all duration-300 ease-in-out ${
          isSelected
            ? "scale-105 border-blue-500 shadow-lg"
            : localHover || isHovered
              ? "scale-105 border-blue-400 shadow-md"
              : "border-black/70 hover:border-blue-300"
        }`}
      >
        <h3 className="text-vermilion text-xl font-bold">
          <a
            href={location.link}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent link click from triggering card click
          >
            {location.name}
          </a>
        </h3>
        {location.description && <p className="text-gray-80 pt-2 pb-4"></p>}
        {location.description && <p>📍 {location.description}</p>}
      </div>
    );
  },
);

LocationCard.displayName = "LocationCard";

export default LocationCard;
