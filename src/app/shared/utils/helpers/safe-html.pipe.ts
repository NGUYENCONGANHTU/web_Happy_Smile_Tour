import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeHtml {
    if (!value) return '';
    // 1. Làm sạch HTML với DOMPurify
    const purified = DOMPurify.sanitize(value);
    // 2. Wrap lại bằng DomSanitizer để Angular cho phép render
    return this.sanitizer.bypassSecurityTrustHtml(purified);
  }
}
