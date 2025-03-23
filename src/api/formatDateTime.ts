// import { format } from "date-fns";

// export const convertDateTime = (startDate: string, endDate: string) => {
//   return {
//     formattedStartDate: format(new Date(startDate), "dd.MM.yyyy"),
//     formattedEndDate: format(new Date(endDate), "dd.MM.yyyy")
//   };
// };

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDateTime = (date: string) => {
  return {
    formattedDay: format(new Date(date), "dd"), // 20
    formattedMonth: format(new Date(date), "MMM", { locale: enUS }), // JUN
    formattedYear: format(new Date(date), "yyyy"), // 2021
    formattedDate: format(new Date(date), "dd.MM.yyyy"), // 20.06.2021
  };
};
