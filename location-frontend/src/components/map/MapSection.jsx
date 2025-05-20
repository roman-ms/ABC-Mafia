import Map from "./Map.jsx";

const MapSection = ({
  hoveredLocationId,
  setHoveredLocationId,
  selectedLocationId,
  setSelectedLocationId,
  locations,
  isOpen,
  setIsOpen,
  className = "",
}) => {
  return (
    <div className={`w-full lg:w-3/4 ${className}`}>
      <div className="map-background relative block h-full w-full rounded-md">
        <div className="border-cerulean mx-auto aspect-square w-full max-w-[1600px] rounded-2xl border-2 lg:absolute lg:top-1/2 lg:left-1/2 lg:w-4/5 lg:-translate-x-1/2 lg:-translate-y-1/2">
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
  );
};

export default MapSection;
