import { Component, inject, Input } from '@angular/core';
import { TravelGuideResDTO } from '../../../../../interface';
import { Router } from '@angular/router';
import { DateTimeFormatPipe } from '../../../../shared/pipes/date-time-format.pipe';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';

@Component({
  selector: 'app-travel-handbook',
  imports: [DateTimeFormatPipe],
  templateUrl: './travel-handbook.component.html',
  standalone: true,
  styleUrl: './travel-handbook.component.scss',
})
export class TravelHandbookComponent {
  @Input() featureNews!: TravelGuideResDTO;
  @Input() featureLeftNews: TravelGuideResDTO[] = [];
  @Input() featureRightNews: TravelGuideResDTO[] = [];
  formatImage = sanitizeUrl;

  // routes detail
  private router = inject(Router);
  goToDetail(event: MouseEvent, data: TravelGuideResDTO) {
    event.preventDefault();
    event.stopPropagation();
    if (data.content?.trim()) {
      this.router.navigate(['/travel-guide-detail', data.travelGuideId]);
    }
  }
}
