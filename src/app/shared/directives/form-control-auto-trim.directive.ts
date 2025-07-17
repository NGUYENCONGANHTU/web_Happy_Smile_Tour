import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appFormControlAutoTrim]',
})
export class FormControlAutoTrimDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('blur')
  onBlur() {
    const control = this.ngControl.control;
    const value = control?.value;
    if (typeof value === 'string') {
      control?.setValue(value.trim());
    }
  }
}
