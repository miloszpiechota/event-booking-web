import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateAddress } from "../api/validateAddress.ts";
import MapPicker from "./MapPicker.tsx";
// Importujemy komponenty z react-leaflet
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchEventCategory } from "../api/fetchEventCategory.ts";
import { validateEventFormData } from "../api/validateEventFormData.ts";
import { reverseGeocode } from "../api/reverseGeoCode.ts";
import { useFormData } from "../../context/FormDataContext.tsx";
const EventForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  // Stan przechowujący aktualną pozycję markera (domyślnie ustawiamy na przykładowe współrzędne)
  const [mapPosition, setMapPosition] = useState({ lat: 51.505, lng: -0.09 });
  const [categories, setCategories] = useState([]);

  const { eventData, setEventData } = useFormData();
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchEventCategory();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const { e_street, e_city, e_zip_code, e_country } = eventData;
    if (
      e_street.trim() &&
      e_city.trim() &&
      e_zip_code.trim() &&
      e_country.trim()
    ) {
      (async () => {
        const geo = await validateAddress(
          e_street,
          e_city,
          e_zip_code,
          e_country
        );
        if (geo) {
          setMapPosition(geo);
          setEventData((prev) => ({
            ...prev,
            e_latitude: geo.lat.toString(),
            e_longitude: geo.lng.toString(),
          }));
        }
      })();
    }
  }, [
    eventData.e_street,
    eventData.e_city,
    eventData.e_zip_code,
    eventData.e_country,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (cat) => String(cat.id) === selectedCategoryId // Zapewnia porównanie string do string
    );
  
    setEventData((prev) => ({
      ...prev,
      e_event_category_id: selectedCategoryId,
      e_event_category_name: selectedCategory ? selectedCategory.name : "",
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Używamy funkcji walidacyjnej, aby sprawdzić, czy wszystkie wymagane pola (w tym adres) są uzupełnione
    const errorsObj = validateEventFormData(eventData);
    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return;
    }
    setErrors({});

    setIsValidatingAddress(true);
    // Geokodujemy adres – pobieramy współrzędne
    const geo = await validateAddress(
      eventData.e_street,
      eventData.e_city,
      eventData.e_zip_code,
      eventData.e_country
    );
    setIsValidatingAddress(false);

    if (!geo) {
      setErrors((prev) => ({
        ...prev,
        e_street: "Invalid address. Please check your details.",
      }));
      return;
    }

    // Uaktualniamy pola latitude i longitude oraz pozycję markera
    setEventData((prev) => ({
      ...prev,
      e_latitude: geo.lat.toString(),
      e_longitude: geo.lng.toString(),
    }));
    setMapPosition(geo);

    console.log("Form Data:", eventData);
    navigate("/event-ticket-form");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">Complete your event data:</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mt-6">Event Data:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_event_name" className="block font-semibold">
              Event Name:
            </label>
            <input
              type="text"
              id="e_event_name"
              name="e_event_name"
              onChange={handleChange}
              value={eventData.e_event_name}
              className="w-full p-2 border rounded"
              placeholder="Enter event name"
            />
            {errors.e_event_name && (
              <p className="text-red-500 text-sm">{errors.e_event_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="e_event_category" className="block font-semibold">
              Event Category:
            </label>
            <select
              id="e_event_category"
              name="e_event_category_id"
              onChange={handleCategoryChange}
              value={eventData.e_event_category_id}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.e_event_category && (
              <p className="text-red-500 text-sm">{errors.e_event_category}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_start_date" className="block font-semibold">
              Start Date:
            </label>
            <input
              type="date"
              id="e_start_date"
              name="e_start_date"
              onChange={handleChange}
              value={eventData.e_start_date}
              className="w-full p-2 border rounded"
            />
            {errors.e_start_date && (
              <p className="text-red-500 text-sm">{errors.e_start_date}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_start_time" className="block font-semibold">
              Start Time:
            </label>
            <input
              type="time"
              id="e_start_time"
              name="e_start_time"
              onChange={handleChange}
              value={eventData.e_start_time}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_end_date" className="block font-semibold">
              End Date:
            </label>
            <input
              type="date"
              id="e_end_date"
              name="e_end_date"
              onChange={handleChange}
              value={eventData.e_end_date}
              className="w-full p-2 border rounded"
            />
            {errors.e_end_date && (
              <p className="text-red-500 text-sm">{errors.e_end_date}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_end_time" className="block font-semibold">
              End Time:
            </label>
            <input
              type="time"
              id="e_end_time"
              name="e_end_time"
              onChange={handleChange}
              value={eventData.e_end_time}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label htmlFor="e_short_descryp" className="block font-semibold">
            Short Description:
          </label>
          <input
            type="text"
            id="e_short_descryp"
            name="e_short_descryp"
            onChange={handleChange}
            value={eventData.e_short_descryp}
            className="w-full p-2 border rounded"
            placeholder="Enter short description max 100 characters"
          />
          {errors.e_short_descryp && (
            <p className="text-red-500 text-sm">{errors.e_short_descryp}</p>
          )}
        </div>

        <div>
          <label htmlFor="e_long_descryp" className="block font-semibold">
            Long Description:
          </label>
          <input
            type="text"
            id="e_long_descryp"
            name="e_long_descryp"
            onChange={handleChange}
            value={eventData.e_long_descryp}
            className="w-full p-2 border rounded"
            placeholder="Enter long description max 500 characters"
          />
          {errors.e_long_descryp && (
            <p className="text-red-500 text-sm">{errors.e_long_descryp}</p>
          )}
        </div>

        <div>
          <label htmlFor="e_image_url" className="block font-semibold">
            Image URL:
          </label>
          <input
            type="text"
            id="e_image_url"
            name="e_image_url"
            onChange={handleChange}
            value={eventData.e_image_url}
            className="w-full p-2 border rounded"
          />
          {errors.e_image_url && (
            <p className="text-red-500 text-sm">{errors.e_image_url}</p>
          )}
        </div>

        <h2 className="text-xl font-semibold mt-6">Event Address:</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_street" className="block font-semibold">
              Street:
            </label>
            <input
              type="text"
              id="e_street"
              name="e_street"
              value={eventData.e_street}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="123 Main St."
            />
            {errors.e_street && (
              <p className="text-red-500 text-sm">{errors.e_street}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_apartment_number" className="block font-semibold">
              Apartment Number:
            </label>
            <input
              type="text"
              id="e_apartment_number"
              name="e_apartment_number"
              value={eventData.e_apartment_number}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="23/4"
            />
            {errors.e_apartment_number && (
              <p className="text-red-500 text-sm">
                {errors.e_apartment_number}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="e_zip_code" className="block font-semibold">
              Zip Code:
            </label>
            <input
              type="text"
              id="e_zip_code"
              name="e_zip_code"
              value={eventData.e_zip_code}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.e_zip_code && "border-red-500"
              }`}
              placeholder="XX-XXX"
            />
            {errors.e_zip_code && (
              <p className="text-red-500 text-sm">{errors.e_zip_code}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_city" className="block font-semibold">
              City Name:
            </label>
            <input
              type="text"
              id="e_city"
              name="e_city"
              value={eventData.e_city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.e_city && (
              <p className="text-red-500 text-sm">{errors.e_city}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_country" className="block font-semibold">
              Country:
            </label>
            <input
              type="text"
              id="e_country"
              name="e_country"
              value={eventData.e_country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="PL"
            />
            {errors.e_country && (
              <p className="text-red-500 text-sm">{errors.e_country}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="e_latitude" className="block font-semibold">
              Latitude:
            </label>
            <input
              type="text"
              id="e_latitude"
              name="e_latitude"
              value={eventData.e_latitude}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.e_latitude && (
              <p className="text-red-500 text-sm">{errors.e_latitude}</p>
            )}
          </div>
          <div>
            <label htmlFor="e_longitude" className="block font-semibold">
              Longitude:
            </label>
            <input
              type="text"
              id="e_longitude"
              name="e_longitude"
              value={eventData.e_longitude}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.e_longitude && (
              <p className="text-red-500 text-sm">{errors.e_longitude}</p>
            )}
          </div>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">
        Select your location on the map:
      </h2>
      <MapContainer
        center={mapPosition}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapPicker
          position={mapPosition}
          onPositionChange={async (newPos) => {
            setMapPosition(newPos);
            // Uaktualniamy tylko pola współrzędnych
            setEventData((prev) => ({
              ...prev,
              e_latitude: newPos.lat.toString(),
              e_longitude: newPos.lng.toString(),
            }));
            // Wywołujemy reverse geocoding, aby uaktualnić pola adresowe
            const revAddress = await reverseGeocode(newPos.lat, newPos.lng);
            if (revAddress) {
              setEventData((prev) => ({
                ...prev,
                e_street: revAddress.e_street || prev.e_street,
                e_zip_code: revAddress.e_zip_code || prev.e_zip_code,
                e_city: revAddress.e_city || prev.e_city,
                e_country: revAddress.e_country || prev.e_country,
              }));
            }
          }}
        />
      </MapContainer>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        disabled={isValidatingAddress}
      >
        {isValidatingAddress ? "Validating Address..." : "Next"}
      </button>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
      >
        Back
      </button>
    </div>
  );
};

export default EventForm;
