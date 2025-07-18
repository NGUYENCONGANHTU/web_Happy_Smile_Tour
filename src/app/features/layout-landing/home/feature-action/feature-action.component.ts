import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { AppService } from '../../../../../app.service';
import { FeatureResDTO } from '../../../../../interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-feature-action',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './feature-action.component.html',
  styleUrl: './feature-action.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureActionComponent implements OnInit {
  appService = inject(AppService);
  dataFeatureTour: FeatureResDTO[] = [];
  ngOnInit() {
    this.getAllData();
  }
  getAllData() {
    this.appService.getAllDataTourFeature4().subscribe(res => {
      this.dataFeatureTour = res.data.content;
    });
  }
}
