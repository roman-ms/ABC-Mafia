import { useEffect, useState } from "react";
import Map from "../components/Map.jsx";
import LocationCard from "../components/locationCard.jsx"; // ✅ Ensure correct case-sensitive import

export default function Home() {
  const [locations, setLocations] = useState([]); // Store locations from DB

  useEffect(() => {
    // Fetch locations from the backend
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/locations");
        if (!response.ok) throw new Error("Failed to fetch locations");

        const data = await response.json();
        setLocations(data); // Update state with locations
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white">
      {/* Header Section */}
      <header className="w-full bg-[#037CB5] text-white py-4 text-center text-3xl font-bold shadow-md">
        ABC Mafia Carecubby
      </header>

      {/* Main Content Section */}
      <div className="flex flex-grow w-screen h-screen">
        {/* Left Column - Map (70% width) */}
        <div className="flex-1 w-[70%] h-full bg-gray-200 flex items-center justify-center">
          <Map />
        </div>

        {/* Right Column - Location List (30% width) */}
        <div className="w-[30%] h-full p-6 bg-white text-gray-800 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4">Locations</h2>

          {/* Loop through locations and create a card for each */}
          {locations.length > 0 ? (
            locations.map((location) => (
              <LocationCard key={location._id} location={location} />
            ))
          ) : (
            <p className="text-gray-500">No locations available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
