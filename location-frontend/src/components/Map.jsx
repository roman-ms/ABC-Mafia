import { useRef, useEffect, useState } from "react";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { DialogComponent } from "./DialogComponent.jsx";

// Define the libraries array as a constant outside the component
const libraries = ["places"];

const Map = ({
  hoveredLocationId,
  selectedLocationId,
  setSelectedLocationId,
  locations = [],
  isOpen,
  setIsOpen,
}) => {
  const defaultCenter = { lat: 41.95, lng: -87.6298 }; // Chicago
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "16px",
  };

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
    <>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries} // Use the static libraries array
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11.5}
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
                className={`map-marker flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 transition-transform ${
                  selectedLocationId === loc._id
                    ? "z-10 scale-110 border-blue-600"
                    : hoveredLocationId === loc._id
                      ? "scale-105 border-blue-400"
                      : "scale-90 border-gray-300"
                }`}
                onClick={() => {
                  setSelectedLocationId(loc._id);
                  setIsOpen(true);
                }}
              >
                <img
                  src={`/${loc.type || "vite"}.PNG`}
                  alt={loc.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </OverlayView>
          ))}
        </GoogleMap>
      </LoadScript>
      <DialogComponent
        ref={popupRef}
        locations={locations}
        selectedLocationId={selectedLocationId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default Map;
