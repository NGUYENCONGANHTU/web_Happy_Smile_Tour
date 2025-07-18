import { AbstractControl, ValidationErrors } from '@angular/forms';

export function requiredFormArrayValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control &&
      !(control instanceof Array) &&
      !(control as any).length &&
      !(control as any).controls
    ) {
      return null;
    }
    const value = (control as any).controls as AbstractControl[];
    if (!value) return null;
    return value.length > 0 ? null : { requiredArray: true };
  };
}
