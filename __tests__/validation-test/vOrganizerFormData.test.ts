import { validateOrganizerFormData } from '../../src/validation/validateOrganizerFormData.ts';
import { OrganizerData } from '../../context/FormDataContext.tsx';

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

});
