import { useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  OverlayView,
} from "@react-google-maps/api";
import rulesByType from "../data/rulesByType";

const Map = ({
  hoveredLocationId,
  setHoveredLocationId,
  selectedLocationId,
  setSelectedLocationId,
  locations = [],
}) => {
  const defaultCenter = { lat: 41.8781, lng: -87.6298 }; // Chicago
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  const mapContainerStyle = { width: "100%", height: "100%", borderRadius: "16px" };

  // Function to center the map on a specific location
  const centerMapOnLocation = (location) => {
    if (mapRef.current && location) {
      mapRef.current.panTo({ lat: location.latitude, lng: location.longitude });
    }
  };

  // UseEffect to center the map on hover or select
  useEffect(() => {
    const locationToCenter =
      locations.find((loc) => loc._id === hoveredLocationId) ||
      locations.find((loc) => loc._id === selectedLocationId);

    if (locationToCenter) {
      centerMapOnLocation(locationToCenter);
    }
  }, [hoveredLocationId, selectedLocationId, locations]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={defaultCenter}
        onLoad={(map) => (mapRef.current = map)}
      >
        {locations.map((loc) => (
          <OverlayView
            key={loc._id}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className={`map-marker w-14 h-14 rounded-full border-4 overflow-hidden flex items-center justify-center cursor-pointer transition-transform ${
                selectedLocationId === loc._id
                  ? "border-blue-600 scale-110 z-10"
                  : hoveredLocationId === loc._id
                  ? "border-blue-400 scale-105"
                  : "border-gray-300 scale-90"
              }`}
              onClick={() => setSelectedLocationId(loc._id)}
            >
              <img
                src={`/${loc.type || "vite"}.PNG`}
                alt={loc.name}
                className="w-full h-full object-cover"
              />
            </div>
          </OverlayView>
        ))}
      </GoogleMap>

      {selectedLocationId && (
        <div
          ref={popupRef}
          className="fixed bottom-8 left-8 bg-white shadow-xl rounded-xl p-6 max-w-sm z-[1001]"
        >
          <h3 className="text-xl text-gray-600 font-bold mb-2">
            {locations.find((loc) => loc._id === selectedLocationId)?.name}
          </h3>
          <p className="text-gray-600 mb-2">
            {locations.find((loc) => loc._id === selectedLocationId)?.description}
          </p>
        </div>
      )}
    </LoadScript>
  );
};

export default Map;
