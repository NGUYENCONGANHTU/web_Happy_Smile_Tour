import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoTrim]',
  standalone: true,
})
export class AutoTrimDirective {
  constructor(private el: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {}

  @HostListener('blur')
  onBlur() {
    this.trimValue();
  }

  @HostListener('keydown.enter')
  onEnter() {
    this.trimValue();
  }

  private trimValue() {
    const el = this.el.nativeElement;
    const value = el.value;
    const trimmed = value.trim();
    if (value !== trimmed) {
      el.value = trimmed;

      const event = new Event('input', { bubbles: true });
      el.dispatchEvent(event);
    }
  }
}
