import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-feature-place',
  imports: [],
  templateUrl: './feature-place.component.html',
  styleUrl: './feature-place.component.scss',
})
export class FeaturePlaceComponent {
  @Input() highlight = '';
  private sanitizer = inject(DomSanitizer);
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
