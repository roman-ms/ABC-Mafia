import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchLocations } from "../services/api"; // Import API call function

const Map = () => {
  // Default center (Chicago)
  const defaultCenter = { lat: 41.8781, lng: -87.6298 };

  // State to store fetched locations
  const [locations, setLocations] = useState([]);

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "100%", // Adjust as needed
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={defaultCenter}
      >
        {/* Render a Marker for each location */}
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
