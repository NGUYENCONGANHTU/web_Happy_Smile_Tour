import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-feature-place',
  imports: [FaIconComponent],
  templateUrl: './feature-place.component.html',
  styleUrl: './feature-place.component.scss'
})
export class FeaturePlaceComponent {
  faCircleCheck=faCircleCheck

}
