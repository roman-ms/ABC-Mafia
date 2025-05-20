import { useRef, useEffect, useState, useMemo, useCallback } from "react";
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
  const [debouncedHoverId, setDebouncedHoverId] = useState(null);
  const [isPanning, setIsPanning] = useState(false);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "16px",
  };

  // Handle map click to deselect location
  const handleMapClick = useCallback(() => {
    if (selectedLocationId) {
      setSelectedLocationId(null);
      setIsOpen(false);
    }
  }, [selectedLocationId, setSelectedLocationId, setIsOpen]);

  // Debounced hover effect with longer delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHoverId(hoveredLocationId);
    }, 150); // Increased to 150ms for smoother transitions

    return () => clearTimeout(timer);
  }, [hoveredLocationId]);

  // Function to center the map on a specific location with smooth panning
  const centerMapOnLocation = useCallback(
    (location) => {
      if (mapRef.current && location && !isPanning) {
        setIsPanning(true);
        mapRef.current.panTo({
          lat: location.latitude,
          lng: location.longitude,
        });

        // Reset panning state after animation completes
        setTimeout(() => {
          setIsPanning(false);
        }, 300); // Match this with the CSS transition duration
      }
    },
    [isPanning],
  );

  // UseEffect to center the map on hover or select
  useEffect(() => {
    const locationToCenter =
      locations.find((loc) => loc._id === debouncedHoverId) ||
      locations.find((loc) => loc._id === selectedLocationId);

    if (locationToCenter) {
      centerMapOnLocation(locationToCenter);
    }
  }, [debouncedHoverId, selectedLocationId, locations, centerMapOnLocation]);

  // Memoize the map markers to prevent unnecessary re-renders
  const markers = useMemo(() => {
    return locations.map((loc) => (
      <OverlayView
        key={loc._id}
        position={{ lat: loc.latitude, lng: loc.longitude }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          className={`map-marker flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 transition-all duration-300 ease-in-out ${
            selectedLocationId === loc._id
              ? "z-10 scale-110 border-blue-600"
              : debouncedHoverId === loc._id
                ? "scale-105 border-blue-400"
                : "scale-90 border-gray-300"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from bubbling to map
            setSelectedLocationId(loc._id);
            setIsOpen(true);
          }}
        >
          <img
            src={`/${loc.type || "vite"}.PNG`}
            alt={loc.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </OverlayView>
    ));
  }, [
    locations,
    selectedLocationId,
    debouncedHoverId,
    setSelectedLocationId,
    setIsOpen,
  ]);

  return (
    <>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11.5}
          center={defaultCenter}
          onLoad={(map) => (mapRef.current = map)}
          onClick={handleMapClick}
          options={{
            gestureHandling: "cooperative",
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            maxZoom: 15,
            minZoom: 10,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {markers}
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
