// __tests__/validateAddress.test.ts
import { validateAddress } from '../../src/validation/validateAddress.ts';

describe('validateAddress', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return lat and lng when a valid address is provided', async () => {
    // Przygotowanie fałszywej odpowiedzi z API
    const fakeResponse = [
      {
        display_name: 'Test Address, City, Zip, Country',
        lat: '52.2298',
        lon: '21.0122',
      },
    ];
    // Podmiana globalnego fetch na wersję zwracającą fałszywą odpowiedź
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeResponse),
    } as any);

    const result = await validateAddress('Test Address', 'City', 'Zip', 'Country');
    expect(result).toEqual({ lat: 52.2298, lng: 21.0122 });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return false when no address is found', async () => {
    // API zwraca pustą tablicę
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    } as any);

    const result = await validateAddress('Nieistniejąca', 'Miasto', '00000', 'Kraj');
    expect(result).toBe(false);
  });

  it('should return false when fetch throws an error', async () => {
    // Symulacja błędu podczas wywołania fetch
    global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

    const result = await validateAddress('Test', 'City', 'Zip', 'Country');
    expect(result).toBe(false);
  });
});
