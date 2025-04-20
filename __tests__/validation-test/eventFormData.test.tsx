// __tests__/EventForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventForm from '../../src/components/EventForm.tsx';
import { FormDataProvider } from '../../context/FormDataContext.tsx';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { validateAddress } from '../../src/validation/validateAddress.ts';
import { fetchEventCategory } from '../../src/api/fetchEventCategory.ts';
import { validateEventFormData } from '../../src/validation/validateEventFormData.ts';
import { reverseGeocode } from '../../src/api/reverseGeoCode.ts';

jest.mock('../../src/validation/validateAddress.ts', () => ({
  validateAddress: jest.fn(),
}));

jest.mock('../../src/api/fetchEventCategory.ts', () => ({
  fetchEventCategory: jest.fn(),
}));

jest.mock('../../src/validation/validateEventFormData.ts', () => ({
  validateEventFormData: jest.fn(),
}));

jest.mock('../../src/api/reverseGeoCode.ts', () => ({
  reverseGeocode: jest.fn(),
}));
jest.mock('../../src/components/MapPicker.tsx', () => () => <div data-testid="mocked-map-picker" />);


// Mocker nawigację z react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const mockedValidateAddress = validateAddress as jest.Mock;
const mockedFetchEventCategory = fetchEventCategory as jest.Mock;
const mockedValidateEventFormData = validateEventFormData as jest.Mock;
const mockedReverseGeocode = reverseGeocode as jest.Mock;

describe('EventForm', () => {
  beforeEach(() => {
    mockedFetchEventCategory.mockResolvedValue([
      { id: 1, name: 'Music' },
      { id: 2, name: 'Sports' },
    ]);
    mockedValidateEventFormData.mockReturnValue({});
    mockedValidateAddress.mockResolvedValue({ lat: 52.2298, lng: 21.0122 });
    mockedReverseGeocode.mockResolvedValue({
      e_street: 'Test Street',
      e_zip_code: '00-001',
      e_city: 'Test City',
      e_country: 'Test Country',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <FormDataProvider>
          <EventForm />
        </FormDataProvider>
      </MemoryRouter>
    );

  it('submits form successfully when data is valid', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Event Name:/i), { target: { value: 'Test Event' } });
    fireEvent.change(screen.getByLabelText(/Event Category:/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Start Date:/i), { target: { value: '2025-04-01' } });
    fireEvent.change(screen.getByLabelText(/Start Time:/i), { target: { value: '10:00' } });
    fireEvent.change(screen.getByLabelText(/End Date:/i), { target: { value: '2025-04-02' } });
    fireEvent.change(screen.getByLabelText(/End Time:/i), { target: { value: '22:00' } });
    fireEvent.change(screen.getByLabelText(/Short Description:/i), { target: { value: 'Short description' } });
    fireEvent.change(screen.getByLabelText(/Long Description:/i), { target: { value: 'Long description text' } });
    fireEvent.change(screen.getByLabelText(/Image URL:/i), { target: { value: 'http://image.url' } });

    fireEvent.change(screen.getByLabelText(/^Street:/i), { target: { value: 'Main St' } });
    fireEvent.change(screen.getByLabelText(/House or Apartment Number:/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Zip Code:/i), { target: { value: '00-001' } });
    fireEvent.change(screen.getByLabelText(/City Name:/i), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText(/Country:/i), { target: { value: 'Test Country' } });
    fireEvent.change(screen.getByLabelText(/Latitude:/i), { target: { value: '52.2298' } });
    fireEvent.change(screen.getByLabelText(/Longitude:/i), { target: { value: '21.0122' } });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(mockedValidateEventFormData).toHaveBeenCalled();
      expect(mockedValidateAddress).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith('/event-ticket-form');
    });
  });

  it('shows errors when form validation fails', async () => {
    mockedValidateEventFormData.mockReturnValue({
      e_event_name: 'Event name is required',
    });

    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText('Event name is required')).toBeInTheDocument();
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it('displays error when address is invalid', async () => {
    mockedValidateEventFormData.mockReturnValue({});
    mockedValidateAddress.mockResolvedValue(false);

    renderComponent();

    fireEvent.change(screen.getByLabelText(/Event Name:/i), { target: { value: 'Test Event' } });
    fireEvent.change(screen.getByLabelText(/Event Category:/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Start Date:/i), { target: { value: '2025-04-01' } });
    fireEvent.change(screen.getByLabelText(/Start Time:/i), { target: { value: '10:00' } });
    fireEvent.change(screen.getByLabelText(/End Date:/i), { target: { value: '2025-04-02' } });
    fireEvent.change(screen.getByLabelText(/End Time:/i), { target: { value: '22:00' } });
    fireEvent.change(screen.getByLabelText(/Short Description:/i), { target: { value: 'Short description' } });
    fireEvent.change(screen.getByLabelText(/Long Description:/i), { target: { value: 'Long description text' } });
    fireEvent.change(screen.getByLabelText(/Image URL:/i), { target: { value: 'http://image.url' } });

    fireEvent.change(screen.getByLabelText(/^Street:/i), { target: { value: 'Invalid St' } });
    fireEvent.change(screen.getByLabelText(/House or Apartment Number:/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Zip Code:/i), { target: { value: '00-001' } });
    fireEvent.change(screen.getByLabelText(/City Name:/i), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText(/Country:/i), { target: { value: 'Test Country' } });
    fireEvent.change(screen.getByLabelText(/Latitude:/i), { target: { value: '52.2298' } });
    fireEvent.change(screen.getByLabelText(/Longitude:/i), { target: { value: '21.0122' } });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid address. Please check your details.')).toBeInTheDocument();
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
