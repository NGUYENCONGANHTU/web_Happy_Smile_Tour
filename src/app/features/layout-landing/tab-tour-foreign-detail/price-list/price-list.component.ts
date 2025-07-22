import { Component, Input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  TourDiscountResDTO,
  TourPriceResDTO,
  TourSurchargeResDTO,
} from './interface-tour-price';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-price-list',
  imports: [NzTableModule, DecimalPipe, TranslatePipe],
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss',
})
export class PriceListComponent {
  @Input() dataTourPrice: TourPriceResDTO[] = [];
  @Input() dataTourDiscount: TourDiscountResDTO[] = [];
  @Input() dataTourSurcharge: TourSurchargeResDTO[] = [];
}
