import { Component } from '@angular/core';
import { ToursTableComponent } from '../../../../components/tours-table/tours-table.component';
import { TourType } from '../../../../interface';

@Component({
  selector: 'app-list-private-tours',
  templateUrl: 'list-private-tours.component.html',
  standalone: true,
  imports: [ToursTableComponent],
})
export class ListPrivateToursComponent {
  protected readonly TourType = TourType;
}
