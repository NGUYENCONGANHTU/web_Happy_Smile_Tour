import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FeatureResDTO, LocationResDTO } from '../../../../../interface';
import { DecimalPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';
import { fakeData } from '../../../../constant';

@Component({
  selector: 'app-tour-feature-foreign',
  imports: [FaIconComponent, DecimalPipe, NgClass, RouterLink],
  standalone: true,
  templateUrl: './tour-feature-foreign.component.html',
  styleUrl: './tour-feature-foreign.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourFeatureForeignComponent {
  faStar = faStar;
  formatImage = sanitizeUrl;
  @Input() selectedTabForeignTour!: LocationResDTO;
  @Input() dataTour: FeatureResDTO[] = [];

  homeData = fakeData.home;
}
