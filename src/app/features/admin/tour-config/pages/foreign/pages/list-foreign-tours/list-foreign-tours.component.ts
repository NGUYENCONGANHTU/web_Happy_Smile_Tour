import { Component } from '@angular/core';
import { ToursTableComponent } from '../../../../components/tours-table/tours-table.component';
import { TourType } from '../../../../interface';

@Component({
  selector: 'app-list-international-tours',
  templateUrl: 'list-foreign-tours.component.html',
  standalone: true,
  imports: [ToursTableComponent],
})
export class ListForeignToursComponent {
  protected readonly TourType = TourType;
}
