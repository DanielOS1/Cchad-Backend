import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidSlotDuration', async: false })
export class IsValidTimeInterval implements ValidatorConstraintInterface {
  validate(slotDuration: string) {
    // Verifica si 'slotDuration' tiene el formato adecuado "HH:mm"
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; // Formato "HH:mm"
    const minutesRegex = /^\d+\s+minutes$/; // Formato "X minutes"

    if (timeRegex.test(slotDuration)) {
      return true; // Si es "HH:mm", lo consideramos válido
    } else if (minutesRegex.test(slotDuration)) {
      return true; // Si es "X minutes", lo consideramos válido
    } else {
      return false; // Si no coincide con ninguno de los formatos, es inválido
    }
  }

  defaultMessage() {
    return 'El campo slotDuration debe ser un string en el formato "HH:mm" (por ejemplo, "01:00") o "X minutes" (por ejemplo, "60 minutes").';
  }
}
