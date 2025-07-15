import { Component } from '@angular/core';
import { ToursTableComponent } from '../../components/tours-table/tours-table.component';

@Component({
  selector: 'app-list-tours',
  templateUrl: 'list-tours.component.html',
  standalone: true,
  imports: [ToursTableComponent],
})
export class ListToursComponent {}
