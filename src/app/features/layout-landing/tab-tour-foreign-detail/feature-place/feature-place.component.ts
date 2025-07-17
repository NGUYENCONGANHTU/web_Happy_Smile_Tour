import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-feature-place',
  imports: [],
  templateUrl: './feature-place.component.html',
  styleUrl: './feature-place.component.scss',
})
export class FeaturePlaceComponent {
  @Input() highlight = '';
}
