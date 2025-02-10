export const validateAddress = async (street, city, zip, country) => {
    const fullAddress = `${street}, ${city}, ${zip}, ${country}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(fullAddress)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'event_booking_app/1.0 pie-mil@wp.pl'
            }
        });
        const data = await response.json();
        
        console.log("API Response:", data); // Logowanie odpowiedzi API

        if (data && data.length > 0) {
            console.log("Address found:", data[0].display_name);
            return true;
        } else {
            console.log("Address not found.");
            return false;
        }
    } catch (error) {
        console.error("Error during address validation:", error);
        return false;
    }
};
