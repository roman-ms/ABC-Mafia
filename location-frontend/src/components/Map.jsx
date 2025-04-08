import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { fetchLocations } from "../services/api";

const Map = ({ hoveredLocationId, setHoveredLocationId }) => {
  const defaultCenter = { lat: 41.8781, lng: -87.6298 };

  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  // Fetch stored locations from your API
  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  // Ask for user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={userLocation || defaultCenter} // Center on user if available
      >
        {/* Fetched location markers */}
        {locations.map((loc, index) => (
          <OverlayView
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className={`w-14 h-14 rounded-full border-4 bg-white overflow-hidden flex items-center justify-center transition-transform duration-300 transform ${
                hoveredLocationId === loc._id
                  ? "scale-100 z-[1000] border-blue-500"
                  : "scale-75 z-[1] border-gray-300"
              }`}
              onMouseEnter={() => setHoveredLocationId(loc._id)}
              onMouseLeave={() => setHoveredLocationId(null)}
            >
              <img
                src="/vite.svg" // You can change this to loc.image if each location has one
                alt={loc.name}
                className="w-full h-full object-cover"
              />
            </div>
          </OverlayView>
        ))}

        {/* User's location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            title="You are here"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Optional custom icon
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
