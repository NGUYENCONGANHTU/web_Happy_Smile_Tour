import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-place-domestic',
  imports: [],
  templateUrl: './feature-place-domestic.component.html',
  styleUrl: './feature-place-domestic.component.scss',
})
export class FeaturePlaceDomesticComponent {
  @Input() highlight = '';
}
