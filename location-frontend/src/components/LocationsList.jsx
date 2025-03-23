import { useEffect, useState } from "react";
import { fetchLocations } from "../services/api";

export default function LocationsList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Locations</h1>
      <ul className="mt-4">
        {locations.length > 0 ? (
          locations.map((loc, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{loc.name}</strong> - ({loc.latitude}, {loc.longitude})
            </li>
          ))
        ) : (
          <p>No locations found.</p>
        )}
      </ul>
    </div>
  );
}
