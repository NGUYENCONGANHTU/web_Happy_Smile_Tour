import { Component } from '@angular/core';
import { ToursTableComponent } from '../../../../components/tours-table/tours-table.component';
import { TourType } from '../../../../interface';

@Component({
  selector: 'app-list-domestic-tours',
  templateUrl: 'list-domestic-tours.component.html',
  standalone: true,
  imports: [ToursTableComponent],
})
export class ListDomesticToursComponent {
  protected readonly TourType = TourType;
}
