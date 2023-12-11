// import * as React from 'react';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
// import { useState, useEffect } from 'react';
// import fetchWithToken from '../login/Interceptor';
// import config from '../../../config';

// export default function Calendar({ tourId, onDateChange }) {
//   const [selectedDates, setSelectedDates] = useState([null, null]);
//   const [reservedDates, setReservedDates] = useState([]);

//   useEffect(() => {
//     // Cargar fechas reservadas desde la API al montar el componente
//     fetchReservedDates();
//   }, [tourId]);

//   const fetchReservedDates = async () => {
//     try {
//       // Realizar la llamada a la API para obtener las fechas reservadas
//       const response = await fetchWithToken(`${config.host}/reserva/${tourId}/fechasOcupadas`);

//       if (response.ok) {
//         const data = await response.json();
//         setReservedDates(data.reservedDates); // Ajusta la estructura de acuerdo a la respuesta de tu API
//       }
//     } catch (error) {
//       console.error('Error al cargar fechas reservadas:', error);
//     }
//   };

//   const shouldDisableDate = (date) => {
//     // Verificar si la fecha está en la lista de fechas reservadas
//     return reservedDates.some(
//       (reservedDate) =>
//         date.isSame(reservedDate.fechaInicio) || date.isBetween(reservedDate.fechaInicio, reservedDate.fechaFinalizacion)
//     );
//   };

//   const handleDateChange = (dates) => {
//     setSelectedDates(dates);
//     onDateChange(dates);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
//         <DemoItem label="1 calendar">
//           <DateRangeCalendar
//             calendars={1}
//             onChange={handleDateChange}
//             value={selectedDates}
//             shouldDisableDate={shouldDisableDate}
//           />
//         </DemoItem>
//       </DemoContainer>
//       <div>
//         Primer día: {selectedDates[0] ? selectedDates[0].toString() : 'Ninguna fecha seleccionada'}
//         <br />
//         Segundo día: {selectedDates[1] ? selectedDates[1].toString() : 'Ninguna fecha seleccionada'}
//       </div>
//     </LocalizationProvider>
//   );
// }
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
  const handleDateChange = (date) => {
    // Llamar a la función de devolución de llamada del componente padre
    if (props.onDateChange) {
      props.onDateChange(date);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >

        <DatePicker 
        disablePast={true}
        label="Selecciona una fecha"
        onChange={handleDateChange}
        shouldDisableDate={(dateParam) => {
          const currentDate = dateParam.toISOString().split("T")[0];
          if(props.ocupadas.includes(currentDate)){
            return true
          }
          return false;
        }}
        />

    </LocalizationProvider>
  );
}