import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useState, useEffect } from 'react';
import fetchWithToken from '../login/Interceptor';

export default function Calendar({ tourId, onDateChange }) {
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    // Cargar fechas reservadas desde la API al montar el componente
    fetchReservedDates();
  }, [tourId]);

  const fetchReservedDates = async () => {
    try {
      
      const response = await fetchWithToken(`http://localhost:8080/reserva/${tourId}/fechasOcupadas`);

      if (response.ok) {
        const data = await response.json();
        setReservedDates(data.reservedDates);
      }
    } catch (error) {
      console.error('Error al cargar fechas reservadas:', error);
    }
  };

  const shouldDisableDate = (date) => {
    
    return reservedDates.some(
      (reservedDate) =>
        date.isSame(reservedDate.fechaInicio) || date.isBetween(reservedDate.fechaInicio, reservedDate.fechaFinalizacion)
    );
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    onDateChange(dates);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
        <DemoItem label="1 calendar">
          <DateRangeCalendar
            calendars={1}
            onChange={handleDateChange}
            value={selectedDates}
            shouldDisableDate={shouldDisableDate}
          />
        </DemoItem>
      </DemoContainer>
      <div>
        Primer día: {selectedDates[0] ? selectedDates[0].toString() : 'Ninguna fecha seleccionada'}
        <br />
        Segundo día: {selectedDates[1] ? selectedDates[1].toString() : 'Ninguna fecha seleccionada'}
      </div>
    </LocalizationProvider>
  );
}
