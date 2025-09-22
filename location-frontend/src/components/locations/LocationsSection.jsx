import LocationCard from "./LocationCard.jsx";

const LocationsSection = ({
  locations,
  hoveredLocationId,
  selectedLocationId,
  setHoveredLocationId,
  setSelectedLocationId,
  isOpen,
  setIsOpen,
  className = "",
}) => {
  return (
    <div
      className={`bg-sunshine flex h-[85vh] w-full flex-col rounded-lg p-6 text-gray-800 lg:w-1/3 ${className}`}
    >
      {/* Header */}
      <h2 className="font-display mb-4 text-center text-3xl font-bold text-[#007fbd]">
        Locations
      </h2>

      {/* Scrollable list (only this area scrolls) */}
      <div className="min-h-0 flex-1 overflow-y-auto">
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

      {/* Apply Button (stays visible; list above it scrolls) */}
      <div className="mt-6 flex justify-center">
        <a
          href="https://docs.google.com/forms/d/1TTewQs-5fgsVm9PlEe8-7IRluOuX5l7oBcMRPMMe2xU/edit"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:!text-sunshine transform rounded-full bg-green-700 px-6 py-2 font-bold !text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl"
        >
          Apply to be a Location
        </a>
      </div>
    </div>
  );
};

export default LocationsSection;
