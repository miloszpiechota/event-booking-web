// src/api/validateAddress.ts

export const validateAddress = async (
    street: string,
    city: string,
    zip: string,
    country: string
  ): Promise<{ lat: number; lng: number } | false> => {
    const fullAddress = `${street}, ${city}, ${zip}, ${country}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      fullAddress
    )}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "event_booking_app/1.0 pie-mil@wp.pl",
        },
      });
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data && data.length > 0) {
        console.log("Address found:", data[0].display_name);
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      } else {
        console.log("Address not found.");
        return false;
      }
    } catch (error) {
      console.error("Error during address validation:", error);
      return false;
    }
  };
  