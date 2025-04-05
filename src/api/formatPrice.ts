// formatPrice.ts

// Mapa locale -> currency
const localeCurrencyMap: Record<string, string> = {
    'pl': 'PLN',
    'en-GB': 'GBP',
    'en': 'USD',
    'de': 'EUR',
    'fr': 'EUR',
    'es': 'EUR',
    'it': 'EUR',
    'ja': 'JPY',
    'zh': 'CNY',
    // Możesz dodać więcej w razie potrzeby
  };
  
  export function formatPrice(amount: number): string {
    if (typeof window === 'undefined') {
      return `${amount}`; // fallback dla środowisk bez `window` (np. SSR)
    }
  
    const locale = navigator.language || 'en-US';
    
    // Wyciągnij tylko język i kraj z locale
    const baseLocale = locale.toLowerCase();
    const shortLocale = baseLocale.split('-')[0];
  
    const currency = localeCurrencyMap[baseLocale] || localeCurrencyMap[shortLocale] || 'USD';
  
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
      }).format(amount);
    } catch (error) {
      console.error("Błąd formatowania ceny:", error);
      return `${amount} ${currency}`;
    }
  }
  