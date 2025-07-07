import { Component, Input } from '@angular/core';
import { TravelGuideResDTO } from '../../../../../interface';

@Component({
  selector: 'app-travel-handbook',
  imports: [],
  templateUrl: './travel-handbook.component.html',
  standalone: true,
  styleUrl: './travel-handbook.component.scss',
})
export class TravelHandbookComponent {
  @Input() featureNews!: TravelGuideResDTO;
  @Input() featureLeftNews: TravelGuideResDTO[] = [];
  @Input() featureRightNews: TravelGuideResDTO[] = [];
}
