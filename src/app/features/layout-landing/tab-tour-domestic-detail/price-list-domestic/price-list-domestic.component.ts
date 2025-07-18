import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  TourDiscountResDTO,
  TourPriceResDTO,
  TourSurchargeResDTO,
} from '../../tab-tour-foreign-detail/price-list/interface-tour-price';

@Component({
  selector: 'app-price-list-domestic',
  imports: [NzTableModule, DecimalPipe],
  templateUrl: './price-list-domestic.component.html',
  styleUrl: './price-list-domestic.component.scss',
})
export class PriceListDomesticComponent {
  @Input() dataTourPrice: TourPriceResDTO[] = [];
  @Input() dataTourDiscount: TourDiscountResDTO[] = [];
  @Input() dataTourSurcharge: TourSurchargeResDTO[] = [];
}
