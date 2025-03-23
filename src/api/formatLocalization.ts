export const formatLocalization = (city: string, street: string, country: string,apartment_number:string) => {
    return `
${street}
 ${apartment_number}
  ${city}
  ${country}`;
  };
  