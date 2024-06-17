import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidTime implements ValidatorConstraintInterface {
  validate(time: any) {
    if (typeof time !== 'string') return false;
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  }

  defaultMessage() {
    return 'Time must be in the format "HH:mm"';
  }
}
