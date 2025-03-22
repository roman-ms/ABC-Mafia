import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  // Chicago's latitude and longitude
  const chicagoCoordinates = { lat: 41.8781, lng: -87.6298 };

  const mapContainerStyle = {
    width: "100%",
    height: "100%", // Adjust the height as necessary
  };

  const mapOptions = {
    zoom: 12,
    center: chicagoCoordinates,
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={mapOptions.zoom}
        center={mapOptions.center}
        options={mapOptions}
      >
        <Marker position={chicagoCoordinates} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
