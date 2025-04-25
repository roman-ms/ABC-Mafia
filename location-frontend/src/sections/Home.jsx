import { useEffect, useState } from "react";
import Header from "../components/base/Header.jsx";
import Map from "../components/Map.jsx";
import LocationCard from "../components/locationCard.jsx";

export default function Home({ onApplyClick }) {
  const [locations, setLocations] = useState([]); // ✅ <--- Keep this!
  const [hoveredLocationId, setHoveredLocationId] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL + "/api/locations",
        );
        if (!response.ok) throw new Error("Failed to fetch locations");

        const data = await response.json();
        setLocations(data); // ✅ <--- Make sure you set this!
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex h-screen flex-col items-center justify-center gap-4 md:flex-row p-4 lg:p-6 lg:h-[700px]">
        {/* Left - Map */}
        <div className="flex h-full w-full items-center justify-center lg:w-2/3">
          <Map
            hoveredLocationId={hoveredLocationId}
            setHoveredLocationId={setHoveredLocationId}
            selectedLocationId={selectedLocationId}
            setSelectedLocationId={setSelectedLocationId}
          />
        </div>

        {/* Right - Cards */}
        <div className="h-full w-full overflow-y-auto rounded-2xl bg-cardstock p-6 text-gray-800 md:w-1/3">
          <h2 className="mb-4 text-3xl text-vermilion font-bold font-display">Locations</h2>

          {locations.length > 0 ? (
            locations.map((location) => (
              <LocationCard
                key={location._id}
                location={location}
                isHovered={hoveredLocationId === location._id}
                isSelected={selectedLocationId === location._id}
                setHoveredLocationId={setHoveredLocationId}
                setSelectedLocationId={setSelectedLocationId}
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
