import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { fetchLocations } from "../services/api";
import rulesByType from "../data/rulesByType";

const Map = ({
  hoveredLocationId,
  setHoveredLocationId,
  selectedLocationId,
  setSelectedLocationId,
}) => {
  const defaultCenter = { lat: 41.8781, lng: -87.6298 };
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) =>
        setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  // ❌ Clear selection when clicking outside popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !e.target.closest(".map-marker")
      ) {
        setSelectedLocationId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSelectedLocationId]);

  const selectedLocation = locations.find(
    (loc) => loc._id === selectedLocationId
  );
  const mapContainerStyle = { width: "100%", height: "100%", borderRadius: "16px" };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={userLocation || defaultCenter}
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
              onMouseEnter={() =>
                !selectedLocationId && setHoveredLocationId(loc._id)
              }
              onMouseLeave={() =>
                !selectedLocationId && setHoveredLocationId(null)
              }
            >
              <img
                src={`/${loc.type || "vite"}.PNG`}
                alt={loc.name}
                className="w-full h-full object-cover"
              />
            </div>
          </OverlayView>
        ))}

        {userLocation && (
          <Marker
            position={userLocation}
            title="Your Location"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
      </GoogleMap>

      {selectedLocation && (
        <div
          ref={popupRef}
          className="fixed bottom-8 left-8 bg-white shadow-xl rounded-xl p-6 max-w-sm z-[1001]"
        >
          <h3 className="text-xl text-gray-600 font-bold mb-2">
            {selectedLocation.name}
          </h3>
          <p className="text-gray-600 mb-2">{selectedLocation.description}</p>

          {rulesByType[selectedLocation.type] ? (
            <>
              <h4 className="font-semibold text-green-600">✅ Do's</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                {rulesByType[selectedLocation.type].dos.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <h4 className="font-semibold text-red-600">🚫 Don'ts</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {rulesByType[selectedLocation.type].donts.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No rules available for this location type.
            </p>
          )}
        </div>
      )}
    </LoadScript>
  );
};

export default Map;
