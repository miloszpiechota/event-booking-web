import { validateOrganizerFormData } from '../../src/validation/validateOrganizerFormData.ts';
import { OrganizerData } from '../../context/FormDataContext.tsx';
import { describe } from 'node:test';

describe('validateOrganizerFormData', () => {
  const validOrganizerData: OrganizerData = {
    u_first_name: 'John',
    u_last_name: 'Doe',
    u_contact_phone: '+48 123 456 789',
    u_contact_email: 'john.doe@gmail.com',
    u_contact_info: 'Valid contact info',
    u_apartment_number: '23/4',
    u_street: 'Main St.',
    u_city: 'City',
    u_country: 'Country',
    u_zip_code: '12-345',
    u_birth_date: '1990-01-01',
  };

  test('zwraca błąd, gdy u_first_name jest pusty', () => {
    const testData = { ...validOrganizerData, u_first_name: '    ' };
    const errors = validateOrganizerFormData(testData);
    expect(errors.u_first_name).toBe('First name is required');
  });

  test('zwraca błąd, gdy u_first_name przekracza 50 znaków', () => {
    const testData = { ...validOrganizerData, u_first_name: 'A'.repeat(51) };
    const errors = validateOrganizerFormData(testData);
    expect(errors.u_first_name).toBe('First name must not exceed 50 characters');
  });

  test('nie zwraca błędu, gdy u_first_name ma poprawną długość', () => {
    const testData = { ...validOrganizerData, u_first_name: 'A'.repeat(50) };
    const errors = validateOrganizerFormData(testData);
    expect(errors.u_first_name).toBeUndefined();
  });

  test('zwraca błąd, gdy u_last_name jest pusty', () => {
    const testData = { ...validOrganizerData, u_last_name: '    ' };
    const errors = validateOrganizerFormData(testData);
    expect(errors.u_last_name).toBe('Last name is required');
  });

  test('zwraca błąd, gdy u_last_name przekracza 50 znaków', () => {
    const testData = { ...validOrganizerData, u_last_name: 'B'.repeat(51) };
    const errors = validateOrganizerFormData(testData);
    expect(errors.u_last_name).toBe('Last name must not exceed 50 characters');
  });

  test('nie zwraca błędu, gdy u_last_name ma poprawną długość', () => {
    const testData = { ...validOrganizerData, u_last_name: 'B'.repeat(50) };
    const errors = validateOrganizerFormData(testData);
    expect(errors.u_last_name).toBeUndefined();
  });

  describe('u_contact_phone', () => {
    it('zwraca błąd, gdy numer telefonu jest pusty', () => {
      const data = { ...validOrganizerData, u_contact_phone: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_phone).toBe('Contact phone is required');
    });

    it('zwraca błąd, gdy numer telefonu ma nieprawidłowy format', () => {
      const invalidPhone = '123456';
      const data = { ...validOrganizerData, u_contact_phone: invalidPhone };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_phone).toBe('Invalid phone number. Format example: +48 890 789 678');
    });

    it('nie zwraca błędu dla prawidłowego numeru telefonu', () => {
      const data = { ...validOrganizerData, u_contact_phone: '+48 123 456 789' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_phone).toBeUndefined();
    });
  });

  describe('u_contact_email', () => {
    it('zwraca błąd, gdy email jest pusty', () => {
      const data = { ...validOrganizerData, u_contact_email: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_email).toBe('Email is required');
    });

    it('zwraca błąd, gdy email ma nieprawidłowy format', () => {
      const invalidEmail = 'invalid-email';
      const data = { ...validOrganizerData, u_contact_email: invalidEmail };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_email).toBe('Invalid email format');
    });

    it('zwraca błąd, gdy domena emaila jest nieznana', () => {
      const unknownDomainEmail = 'user@unknown.com';
      const data = { ...validOrganizerData, u_contact_email: unknownDomainEmail };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_email).toBe('Unrecognized email domain');
    });

    it('nie zwraca błędu dla prawidłowego emaila', () => {
      const data = { ...validOrganizerData, u_contact_email: 'jan.kowalski@gmail.com' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_email).toBeUndefined();
    });
  });

  describe('u_contact_info', () => {
    it('zwraca błąd, gdy u_contact_info jest pusty', () => {
      const data = { ...validOrganizerData, u_contact_info: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_info).toBe('Contact info is required');
    });

    it('zwraca błąd, gdy u_contact_info przekracza 200 znaków', () => {
      const data = { ...validOrganizerData, u_contact_info: 'A'.repeat(301) };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_info).toBe('Contact info must not exceed 300 characters');
    });

    it('nie zwraca błędu, gdy u_contact_info ma poprawną długość', () => {
      const data = { ...validOrganizerData, u_contact_info: 'A'.repeat(200) };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_contact_info).toBeUndefined();
    });
  });

  describe('u_apartment_number', () => {
    it('zwraca błąd, gdy u_apartment_number jest pusty', () => {
      const data = { ...validOrganizerData, u_apartment_number: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_apartment_number).toBe('Apartment number is required');
    });


    it('zwraca błąd, gdy u_apartment_number ma nieprawidłowy format', () => {
      const invalidApartmentNumber = 'invalid';
      const data = { ...validOrganizerData, u_apartment_number: invalidApartmentNumber };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_apartment_number).toBe('Invalid apartment number format');
    });

    it('nie zwraca błędu dla prawidłowego numeru mieszkania', () => {
      const data = { ...validOrganizerData, u_apartment_number: '23/4' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_apartment_number).toBeUndefined();
    });

    it('nie zwraca błędu dla prawidłowego numeru domu', () => {
      const data = { ...validOrganizerData, u_apartment_number: '23' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_apartment_number).toBeUndefined();
    });
  });

  describe('u_street', () => {
    it('zwraca błąd, gdy u_street jest pusty', () => {
      const data = { ...validOrganizerData, u_street: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_street).toBe('Street is required');
    });

    it('zwraca błąd, gdy u_street przekracza 100 znaków', () => {
      const data = { ...validOrganizerData, u_street: 'A'.repeat(101) };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_street).toBe('Street must not exceed 100 characters');
    });

    it('nie zwraca błędu, gdy u_street ma poprawną długość', () => {
      const data = { ...validOrganizerData, u_street: 'A'.repeat(100) };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_street).toBeUndefined();
    });
  });

  describe('u_city', () => {
    it('zwraca błąd, gdy u_city jest pusty', () => {
      const data = { ...validOrganizerData, u_city: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_city).toBe('City is required');
    });

    it('zwraca błąd, gdy u_city zawiera niedozwolone znaki', () => {
      const invalidCity = 'City123';
      const data = { ...validOrganizerData, u_city: invalidCity };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_city).toBe('City can only contain letters, spaces, and hyphens');
    });

    it('zwraca błąd, gdy u_city przekracza 50 znaków', () => {
      const data = { ...validOrganizerData, u_city: 'A'.repeat(51) };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_city).toBe('City must not exceed 50 characters');
    });

    it('nie zwraca błędu dla poprawnej nazwy miasta', () => {
      const data = { ...validOrganizerData, u_city: 'City' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_city).toBeUndefined();
    });
  });

  describe('u_country', () => {
    it('zwraca błąd, gdy u_country jest pusty', () => {
      const data = { ...validOrganizerData, u_country: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_country).toBe('Country is required');
    });

    it('zwraca błąd, gdy u_country zawiera niedozwolone znaki', () => {
      const invalidCountry = 'Country123';
      const data = { ...validOrganizerData, u_country: invalidCountry };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_country).toBe('Country can only contain letters, spaces, and hyphens');
    });


    it('zwraca błąd, gdy u_country przekracza 50 znaków', () => {
      const data = { ...validOrganizerData, u_country: 'A'.repeat(51) };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_country).toBe('Country must not exceed 50 characters');
    });

    it('nie zwraca błędu dla poprawnego kodu kraju', () => {
      const data = { ...validOrganizerData, u_country: 'PL' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_country).toBeUndefined();
    });

    it('nie zwraca błędu dla poprawnej nazwy kraju po polsku', () => {
      const data = { ...validOrganizerData, u_country: 'Polska' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_country).toBeUndefined();
    });

    it('nie zwraca błędu dla poprawnej nazwy kraju po angielsku', () => {
      const data = { ...validOrganizerData, u_country: 'Poland' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_country).toBeUndefined();
    });
  });

  describe('u_zip_code', () => {
    it('zwraca błąd, gdy u_zip_code jest pusty', () => {
      const data = { ...validOrganizerData, u_zip_code: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_zip_code).toBe('Zip code is required');
    });

    it('zwraca błąd, gdy u_zip_code ma nieprawidłowy format', () => {
      const invalidZipCode = 'invalid';
      const data = { ...validOrganizerData, u_zip_code: invalidZipCode };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_zip_code).toBe('Invalid zip code format. Please use the appropriate format: 23-123 (Poland), 12345 (USA), 12345-6789 (USA), or 12345 (Germany)');
    });

    it('nie zwraca błędu dla poprawnego kodu pocztowego w Polsce', () => {
      const data = { ...validOrganizerData, u_zip_code: '12-345' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_zip_code).toBeUndefined();
    });
    it('nie zwraca błędu dla poprawnego kodu pocztowego w Polsce bez ukośnika', () => {
      const data = { ...validOrganizerData, u_zip_code: '20612' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_zip_code).toBeUndefined();
    });

    it('nie zwraca błędu dla poprawnego kodu pocztowego w USA', () => {
      const data = { ...validOrganizerData, u_zip_code: '12345' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_zip_code).toBeUndefined();
    });

    it('nie zwraca błędu dla poprawnego kodu pocztowego w USA z rozszerzeniem', () => {
      const data = { ...validOrganizerData, u_zip_code: '12345-6789' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_zip_code).toBeUndefined();
    });

    it('nie zwraca błędu dla poprawnego kodu pocztowego w Niemczech', () => {
      const data = { ...validOrganizerData, u_zip_code: '12345' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_zip_code).toBeUndefined();
    });
  });

  describe('u_birth_date', () => {
    it('zwraca błąd, gdy u_birth_date jest pusty', () => {
      const data = { ...validOrganizerData, u_birth_date: '' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_birth_date).toBe('Date of birth is required');
    });

    it('zwraca błąd, gdy użytkownik ma mniej niż 18 lat', () => {
      const data = { ...validOrganizerData, u_birth_date: '2010-01-01' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_birth_date).toBe('You must be at least 18 years old');
    });

    it('nie zwraca błędu dla użytkownika, który ma 18 lat', () => {
      const data = { ...validOrganizerData, u_birth_date: '2003-01-01' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_birth_date).toBeUndefined();
    });

    it('nie zwraca błędu dla użytkownika, który ma więcej niż 18 lat', () => {
      const data = { ...validOrganizerData, u_birth_date: '1990-01-01' };
      const errors = validateOrganizerFormData(data);
      expect(errors.u_birth_date).toBeUndefined();
    });
  });




});
