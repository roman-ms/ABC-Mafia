import { useEffect, useState, useCallback } from "react";
import locationData from "../data/locations.json";
import Header from "../components/base/Header.jsx";
import MapSection from "../components/map/MapSection.jsx";
import LocationsSection from "../components/locations/LocationsSection.jsx";
import InfoSection from "../components/layout/InfoSection.jsx";
import FooterSection from "../components/layout/FooterSection.jsx";

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
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Map and Cards Section */}
        <div className="container mx-auto flex flex-col justify-center gap-8 px-4 py-8 lg:flex-row">
          <MapSection
            hoveredLocationId={hoveredLocationId}
            setHoveredLocationId={setHoveredLocationId}
            selectedLocationId={selectedLocationId}
            setSelectedLocationId={setSelectedLocationId}
            locations={locations}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          <LocationsSection
            locations={locations}
            hoveredLocationId={hoveredLocationId}
            selectedLocationId={selectedLocationId}
            setHoveredLocationId={setHoveredLocationId}
            setSelectedLocationId={setSelectedLocationId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>

        {/* Info Section */}
        <InfoSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
