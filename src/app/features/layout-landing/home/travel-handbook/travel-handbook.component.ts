import { Component, inject, Input } from '@angular/core';
import { TravelGuideResDTO } from '../../../../../interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-travel-handbook',
  imports: [DatePipe],
  templateUrl: './travel-handbook.component.html',
  standalone: true,
  styleUrl: './travel-handbook.component.scss',
})
export class TravelHandbookComponent {
  @Input() featureNews!: TravelGuideResDTO;
  @Input() featureLeftNews: TravelGuideResDTO[] = [];
  @Input() featureRightNews: TravelGuideResDTO[] = [];
  private sanitizer = inject(DomSanitizer);

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  //
  private router = inject(Router);
  goToDetail(event: MouseEvent, data: TravelGuideResDTO) {
    event.preventDefault();
    event.stopPropagation();
    if (data.content?.trim()) {
      this.router.navigate(['/travel-guide-detail', data.id]);
    }
  }
}
