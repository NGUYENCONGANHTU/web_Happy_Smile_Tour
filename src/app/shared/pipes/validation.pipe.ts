import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'appValidationMessage',
  pure: false,
  standalone: true,
})
export class ValidationMessagePipe implements PipeTransform {
  transform(
    control: FormControl | AbstractControl | null,
    customMessages: Record<string, string> = {}
  ): string {
    if (!control || !control.invalid || !control.touched) return '';

    const errors: ValidationErrors = control.errors || {};
    const messages: string[] = [];

    for (const errorKey of Object.keys(errors)) {
      if (customMessages[errorKey]) {
        messages.push(customMessages[errorKey]); // Use custom error messages if provided
      } else {
        switch (errorKey) {
          case 'required':
            messages.push('Trường này là bắt buộc');
            break;
          case 'minlength':
            messages.push(
              `Cần ít nhất ${errors['minlength'].requiredLength} ký tự`
            );
            break;
          case 'maxlength':
            messages.push(`Tối đa ${errors['maxlength'].requiredLength} ký tự`);
            break;
          case 'email':
            messages.push('Email không hợp lệ');
            break;
          case 'pattern':
            messages.push('Không đúng định dạng');
            break;
          case 'usernameExists':
            messages.push('Tài khoản đã tồn tại');
            break;
          case 'passwordMismatch':
            messages.push('Mật khẩu không khớp');
            break;
          default:
            messages.push('Giá trị không hợp lệ');
        }
      }
    }

    return messages.join('\n'); // Join messages with line breaks for multiple errors
  }
}
