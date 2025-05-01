import { useEffect, useState } from "react";
import locationData from "../data/locations.json";
import Header from "../components/base/Header.jsx";
import Map from "../components/Map.jsx";
import LocationCard from "../components/locationCard.jsx";

export default function Home({ onApplyClick }) {
  const [hoveredLocationId, setHoveredLocationId] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [locations, setLocations] = useState(locationData);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container flex flex-col lg:flex-row gap-8 justify-center">
        {/* Left - Map */}
        <div className="w-full lg:w-2/3">
          <div className="map-background rounded-md block relative w-full h-full">
            <div className="max-w-[480px] w-full lg:w-3/4 lg:absolute top-[70px] left-[50px] aspect-square mx-auto border-2 border-cerulean rounded-2xl">
              <Map
                hoveredLocationId={hoveredLocationId}
                setHoveredLocationId={setHoveredLocationId}
                selectedLocationId={selectedLocationId}
                setSelectedLocationId={setSelectedLocationId}
                locations={locations}
              />
            </div>
          </div>
        </div>

        {/* Right - Cards */}
        <div className="w-full lg:w-1/3 overflow-y-auto bg-sunshine rounded-lg p-6 text-gray-800">
          <h2 className="mb-4 text-3xl font-display text-blue-600 font-bold text-center">Locations</h2>

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
