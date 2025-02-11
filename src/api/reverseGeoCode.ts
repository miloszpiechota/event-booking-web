// src/api/reverseGeocode.ts

export const reverseGeocode = async (
    lat: number,
    lng: number
  ): Promise<{
    e_street?: string;
    e_zip_code?: string;
    e_city?: string;
    e_country?: string;
  } | false> => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "event_booking_app/1.0 pie-mil@wp.pl",
        },
      });
      const data = await response.json();
      console.log("Reverse Geocode API Response:", data);
      if (data && data.address) {
        // Używamy dostępnych pól z odpowiedzi – warto zwrócić uwagę, że miasto może być w polu city, town lub village
        const { road, house_number, postcode, city, town, village, country } =
          data.address;
        const e_street = road ? (house_number ? `${house_number} ${road}` : road) : "";
        const e_zip_code = postcode || "";
        const e_city = city || town || village || "";
        const e_country = country || "";
        return { e_street, e_zip_code, e_city, e_country };
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during reverse geocoding:", error);
      return false;
    }
  };
  