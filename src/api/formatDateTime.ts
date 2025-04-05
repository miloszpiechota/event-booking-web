import { format, isValid, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDateTime = (startDate?: string, endDate?: string) => {
  const parseDate = (dateStr?: string) => {
    if (!dateStr) return null; // Return null if date is undefined/null
    const parsedDate = parseISO(dateStr);
    return isValid(parsedDate) ? parsedDate : null; // Ensure the date is valid
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const formattedStartDate = start
    ? {
        formattedDay: format(start, "dd"), // 20
        formattedMonth: format(start, "MMM", { locale: enUS }), // JUN
        formattedYear: format(start, "yyyy"), // 2021
        formattedTime: format(start, "HH:mm"), // 15:30
        formattedDate: format(start, "dd.MM.yyyy"), // 20.06.2021
      }
    : { formattedDay: "?", formattedMonth: "?", formattedYear: "?" };

  const formattedEndDate = end
    ? {
        formattedDay: format(end, "dd"), // 21
        formattedMonth: format(end, "MMM", { locale: enUS }), // JUN
        formattedYear: format(end, "yyyy"), // 2021
        formattedTime: format(end, "HH:mm"), // 16:00
        formattedDate: format(end, "dd.MM.yyyy"), // 21.06.2021
      }
    : null;

  return { formattedStartDate, formattedEndDate };
};
