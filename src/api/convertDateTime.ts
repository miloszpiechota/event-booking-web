import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const convertDateTime = (startDate: string, endDate: string) => {
  return {
    formattedStartDate: format(new Date(startDate), "EEEE, MMM d, yyyy 'at' HH:mm a", { locale: enUS }),
    formattedEndDate: format(new Date(endDate), "EEEE, MMM d, yyyy 'at' HH:mm a", { locale: enUS })
  };
};
