import { validateEventFormData } from "../../src/validation/validateEventFormData.ts";
import { EventData } from "../../context/FormDataContext.tsx";

describe("validateEventFormData", () => {
  let validData: EventData;
  
  beforeEach(() => {
    validData = {
      e_event_name: "Music Festival",
      e_start_date: "2025-04-15",
      e_end_date: "2025-04-16",
      e_start_time: "12:00",
      e_end_time: "18:00",
      e_short_descryp: "Short description",
      e_long_descryp: "Long description of the event.",
      e_image_url: "https://example.com/image.jpg",
      e_street: "Main Street",
      e_apartment_number: "12A",
      e_zip_code: "12-345",
      e_city: "New York",
      e_country: "USA",
      e_latitude: "40.7128",
      e_longitude: "-74.0060",
      e_event_category_id: "1",
      e_event_category_name: "Concert",
    };
  });

  test("should return no errors for valid data", () => {
    const errors = validateEventFormData(validData);
    expect(errors).toEqual({});
  });

  test("should require event name", () => {
    validData.e_event_name = "";
    const errors = validateEventFormData(validData);
    expect(errors.e_event_name).toBe("Event name is required");
  });

  test("should validate event name length", () => {
    validData.e_event_name = "a".repeat(101);
    const errors = validateEventFormData(validData);
    expect(errors.e_event_name).toBe("Event name must not exceed 100 characters");
  });

  test("should require short description", () => {
    validData.e_short_descryp = "";
    const errors = validateEventFormData(validData);
    expect(errors.e_short_descryp).toBe("Short description is required");
  });

  test("should validate zip code format", () => {
    validData.e_zip_code = "1234";
    const errors = validateEventFormData(validData);
    expect(errors.e_zip_code).toBe("Invalid zip code format. Please use the appropriate format: 23-123 (Poland), 12345 (USA), 12345-6789 (USA), or 12345 (Germany)");
  });

  test("should validate start date not in the past", () => {
    validData.e_start_date = "2023-01-01";
    const errors = validateEventFormData(validData);
    expect(errors.e_start_date).toBe("Start date/time cannot be in the past.");
  });

  test("should validate end date after start date", () => {
    validData.e_end_date = "2025-04-14";
    const errors = validateEventFormData(validData);
    expect(errors.e_end_date).toBe("End date/time must be after start date/time.");
  });

  test("should validate minimum event duration of 1 hour", () => {
    validData.e_end_time = "12:30";
    const errors = validateEventFormData(validData);
    expect(errors.e_end_date).toBe("Event duration must be at least 1 hour.");
  });

  test("should validate event duration does not exceed 2 weeks", () => {
    validData.e_end_date = "2026-05-01";
    const errors = validateEventFormData(validData);
    expect(errors.e_end_date).toBe("Event duration cannot exceed 2 weeks.");
  });
});

function beforeEach(arg0: () => void) {
  throw new Error("Function not implemented.");
}
