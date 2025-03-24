import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDateTime = (startDate: string, endDate?: string) => {
  const formattedStartDate = {
    formattedDay: format(new Date(startDate), "dd"), // 20
    formattedMonth: format(new Date(startDate), "MMM", { locale: enUS }), // JUN
    formattedYear: format(new Date(startDate), "yyyy"), // 2021
    formattedTime: format(new Date(startDate), "HH:mm"), // 15:30
    formattedDate: format(new Date(startDate), "dd.MM.yyyy"), // 20.06.2021
  };

  const formattedEndDate = endDate
    ? {
        formattedDay: format(new Date(endDate), "dd"), // 21
        formattedMonth: format(new Date(endDate), "MMM", { locale: enUS }), // JUN
        formattedYear: format(new Date(endDate), "yyyy"), // 2021
        formattedTime: format(new Date(endDate), "HH:mm"), // 16:00
        formattedDate: format(new Date(endDate), "dd.MM.yyyy"), // 21.06.2021
      }
    : null;

  return { formattedStartDate, formattedEndDate };
};
