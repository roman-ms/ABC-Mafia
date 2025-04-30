import { useEffect, useState } from "react";
import Header from "../components/base/Header.jsx";
import Map from "../components/Map.jsx";
import LocationCard from "../components/locationCard.jsx";

export default function Home({ onApplyClick }) {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setLocations(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <h1>LOADING.....</h1>
      ) : (
        <>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <div className="flex h-full grow flex-col justify-center gap-4 lg:flex-row ">
            {/* Left - Map */}
            <div className="flex h-[400px] lg:h-[600px] w-full lg:w-2/3 border border-black/70 rounded-2xl">
              <Map
                hoveredLocationId={hoveredLocationId}
                setHoveredLocationId={setHoveredLocationId}
                selectedLocationId={selectedLocationId}
                setSelectedLocationId={setSelectedLocationId}
              />
            </div>

            {/* Right - Cards */}
            <div className="bg-sunshine/75 border border-black/70 p-4 h-full w-full rounded-2xl text-gray-800 lg:w-1/3">
              <h2 className="text-vermilion font-display mb-4 text-3xl font-bold">
                Locations
              </h2>

              {locations.length > 0 && !isLoading ? (
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
        </>
      )}
    </div>
  );
}
