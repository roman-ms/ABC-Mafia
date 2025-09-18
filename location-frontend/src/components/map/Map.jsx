import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { DialogComponent } from "../dialog/DialogComponent.jsx";

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
  const defaultCenter = { lat: 41.93, lng: -87.66 }; // Moved down and left
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [debouncedHoverId, setDebouncedHoverId] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isHoveringDistantLocation, setIsHoveringDistantLocation] =
    useState(false);

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

  // Function to calculate distance between two coordinates (in miles)
  const calculateDistance = useCallback((lat1, lng1, lat2, lng2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  // Function to center the map on a specific location with smart panning
  const centerMapOnLocation = useCallback(
    (location) => {
      if (mapRef.current && location && !isPanning) {
        // Check if location is within reasonable distance from Chicago center
        const distance = calculateDistance(
          defaultCenter.lat,
          defaultCenter.lng,
          location.latitude,
          location.longitude,
        );

        // Only pan to locations that are far from Chicago (like Elgin)
        if (distance > 15) {
          if (!isHoveringDistantLocation) {
            setIsHoveringDistantLocation(true);
            setIsPanning(true);
            mapRef.current.panTo({
              lat: location.latitude,
              lng: location.longitude,
            });

            setTimeout(() => {
              setIsPanning(false);
            }, 300);
          }
        } else {
          // If hovering over a nearby location and we were on a distant one, return to Chicago
          if (isHoveringDistantLocation) {
            setIsHoveringDistantLocation(false);
            setIsPanning(true);
            mapRef.current.panTo(defaultCenter);
            setTimeout(() => {
              setIsPanning(false);
            }, 300);
          }
        }
      }
    },
    [isPanning, calculateDistance, defaultCenter, isHoveringDistantLocation],
  );

  // UseEffect to center the map on hover or select
  useEffect(() => {
    const locationToCenter =
      locations.find((loc) => loc._id === debouncedHoverId) ||
      locations.find((loc) => loc._id === selectedLocationId);

    if (locationToCenter) {
      centerMapOnLocation(locationToCenter);
    } else if (
      !debouncedHoverId &&
      !selectedLocationId &&
      isHoveringDistantLocation
    ) {
      // If we're no longer hovering and we were on a distant location, pan back to Chicago
      setIsHoveringDistantLocation(false);
      if (mapRef.current && !isPanning) {
        setIsPanning(true);
        mapRef.current.panTo(defaultCenter);
        setTimeout(() => {
          setIsPanning(false);
        }, 300);
      }
    }
  }, [
    debouncedHoverId,
    selectedLocationId,
    locations,
    centerMapOnLocation,
    isHoveringDistantLocation,
    defaultCenter,
    isPanning,
  ]);

  // Memoize the map markers to prevent unnecessary re-renders
  const markers = useMemo(() => {
    return locations.map((loc) => (
      <OverlayView
        key={loc._id}
        position={{ lat: loc.latitude, lng: loc.longitude }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          className={`map-marker flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-3 transition-all duration-300 ease-in-out ${
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
            minZoom: 8,
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
