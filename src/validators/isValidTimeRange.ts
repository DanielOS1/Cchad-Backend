import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidTimeRange', async: false })
export class IsValidTimeRange implements ValidatorConstraintInterface {
  validate(time: string) {
    // Verifica si 'time' tiene el formato adecuado
    const timeRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z;\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // Formato 'yyyy-MM-ddTHH:mm:ss.SSSZ;yyyy-MM-ddTHH:mm:ss.SSSZ'
    if (!timeRegex.test(time)) {
      return false;
    }

    // Divide el rango en dos fechas y horas
    const [startTime, endTime] = time.split(';');

    // Verifica si ambas partes del rango son fechas y horas válidas
    if (!isValidDateTime(startTime) || !isValidDateTime(endTime)) {
      return false;
    }

    // Verifica si el primer tiempo es menor que el segundo tiempo
    if (new Date(startTime) >= new Date(endTime)) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'El rango de tiempo debe estar en el formato "yyyy-MM-ddTHH:mm:ss.SSSZ;yyyy-MM-ddTHH:mm:ss.SSSZ" y el primer tiempo debe ser menor que el segundo.';
  }
}

// Función para verificar si una fecha y hora es válida
function isValidDateTime(dateTime: string): boolean {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/; // Formato 'yyyy-MM-ddTHH:mm:ss.SSSZ'
  return dateTimeRegex.test(dateTime);
}
