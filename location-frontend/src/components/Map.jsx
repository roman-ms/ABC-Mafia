import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
  InfoWindow,
} from "@react-google-maps/api";
import { fetchLocations } from "../services/api";

const Map = ({ hoveredLocationId, setHoveredLocationId }) => {
  const defaultCenter = { lat: 41.8781, lng: -87.6298 };

  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);

  const mapRef = useRef(null); // reference to the map instance

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

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
    }
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const handleMarkerClick = (location) => {
    setSelectedPlace(location);

    // If place_id is not in your DB, you could use `textSearch` to find it based on name/location
    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      placeId: location.place_id, // <- this must be available in your DB
      fields: [
        "name",
        "formatted_address",
        "rating",
        "opening_hours",
        "website",
        "photos",
      ],
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceDetails(place);
      } else {
        console.error("Failed to fetch place details:", status);
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]} // make sure this is added
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={userLocation || defaultCenter}
        onLoad={(map) => (mapRef.current = map)}
      >
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
              onClick={() => handleMarkerClick(loc)}
            >
              <img
                src={`/${loc.type || "vite.svg"}.PNG`}
                alt={loc.name}
                className="w-full h-full object-cover"
              />
            </div>
          </OverlayView>
        ))}

        {placeDetails && selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            onCloseClick={() => {
              setPlaceDetails(null);
              setSelectedPlace(null);
            }}
          >
            <div className="text-sm">
              <h3 className="font-bold">{placeDetails.name}</h3>
              <p>{placeDetails.formatted_address}</p>
              <p>Rating: {placeDetails.rating}</p>
              {placeDetails.website && (
                <a href={placeDetails.website} target="_blank" rel="noreferrer">
                  Website
                </a>
              )}
            </div>
          </InfoWindow>
        )}

        {userLocation && (
          <Marker
            position={userLocation}
            title="You are here"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
