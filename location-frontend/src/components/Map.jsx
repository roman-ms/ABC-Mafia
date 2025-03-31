import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchLocations } from "../services/api";

const Map = () => {
  const defaultCenter = { lat: 41.8781, lng: -87.6298 };

  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

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
        zoom={10}
        center={userLocation || defaultCenter} // Center on user if available
      >
        {/* Fetched location markers */}
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.name}
          />
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
