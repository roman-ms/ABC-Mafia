const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/locations`);
    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};
