import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useState, useEffect } from 'react';
import fetchWithToken from '../login/Interceptor';

export default function Calendar({ tourId }) {
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    // Cargar fechas reservadas desde la API al montar el componente
    fetchReservedDates();
  }, [tourId]);

  const fetchReservedDates = async () => {
    try {
      // Realizar la llamada a la API para obtener las fechas reservadas
      const response = await fetchWithToken(`http://localhost:8080/tours/${tourId}/fechas-ocupadas`);
      if (response.ok) {
        const data = await response.json();
        setReservedDates(data.reservedDates); // Ajusta la estructura de acuerdo a la respuesta de tu API
      }
    } catch (error) {
      console.error('Error al cargar fechas reservadas:', error);
    }
  };

  const shouldDisableDate = (date) => {
    // Verificar si la fecha está en la lista de fechas reservadas
    return reservedDates.some(
      (reservedDate) =>
        date.isSame(reservedDate.fechaInicio) || date.isBetween(reservedDate.fechaInicio, reservedDate.fechaFinalizacion)
    );
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
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
