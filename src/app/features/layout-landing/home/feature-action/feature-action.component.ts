import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { AppService } from '../../../../../app.service';
import { FeatureResDTO } from '../../../../../interface';
import { RouterLink } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DecimalPipe, NgClass } from '@angular/common';
import { sanitizeUrl } from '../../../../shared/utils/helpers';
@Component({
  selector: 'app-feature-action',
  standalone: true,
  imports: [RouterLink, FaIconComponent, NgClass, DecimalPipe],
  templateUrl: './feature-action.component.html',
  styleUrl: './feature-action.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureActionComponent implements OnInit {
  appService = inject(AppService);
  ngOnInit() {
    this.getAllData();
  }

  formatImage = sanitizeUrl;
  faStar = faStar;
  dataFeatureTour: FeatureResDTO[] = [];
  getAllData() {
    this.appService.getAllDataTourFeature4().subscribe(res => {
      this.dataFeatureTour = res.data.content;
    });
  }
}
// ảnh thì tôi muốn lấy ảnh trong object đầu tiên trả về
