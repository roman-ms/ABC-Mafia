import { useEffect, useState, useCallback } from "react";
import locationData from "../data/locations.json";
import Header from "../components/base/Header.jsx";
import Map from "../components/Map.jsx";
import LocationCard from "../components/locationCard.jsx";

export default function Home({ onApplyClick }) {
  const [hoveredLocationId, setHoveredLocationId] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [locations, setLocations] = useState(locationData);
  const [isOpen, setIsOpen] = useState(false);

  // Global click handler to deselect location
  const handleGlobalClick = useCallback(
    (e) => {
      // Check if the click is on a location card or map marker
      const isLocationClick =
        e.target.closest(".map-marker") ||
        e.target.closest(".location-card") ||
        e.target.closest("a[href]"); // Don't deselect when clicking links

      if (!isLocationClick && selectedLocationId) {
        setSelectedLocationId(null);
        setIsOpen(false);
      }
    },
    [selectedLocationId],
  );

  // Add and remove global click listener
  useEffect(() => {
    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [handleGlobalClick]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container flex flex-col justify-center gap-8 lg:flex-row">
        {/* Left - Map */}
        <div className="w-full lg:w-2/3">
          <div className="map-background relative block h-full w-full rounded-md">
            <div className="border-cerulean top-[70px] left-[50px] mx-auto aspect-square w-full max-w-[1280px] rounded-2xl border-2 lg:absolute lg:w-3/4">
              <Map
                hoveredLocationId={hoveredLocationId}
                setHoveredLocationId={setHoveredLocationId}
                selectedLocationId={selectedLocationId}
                setSelectedLocationId={setSelectedLocationId}
                locations={locations}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        </div>

        {/* Right - Cards */}
        <div className="bg-sunshine w-full overflow-y-auto rounded-lg p-6 text-gray-800 lg:w-1/3">
          <h2 className="font-display mb-4 text-center text-3xl font-bold text-blue-600">
            Locations
          </h2>

          {locations.length > 0 ? (
            locations.map((location) => (
              <LocationCard
                key={location._id}
                location={location}
                isHovered={hoveredLocationId === location._id}
                isSelected={selectedLocationId === location._id}
                setHoveredLocationId={setHoveredLocationId}
                setSelectedLocationId={setSelectedLocationId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            ))
          ) : (
            <p className="text-gray-500">No locations available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
