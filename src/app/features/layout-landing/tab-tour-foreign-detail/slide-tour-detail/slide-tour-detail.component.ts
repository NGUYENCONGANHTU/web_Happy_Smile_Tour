import { Component} from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
@Component({
  selector: 'app-slide-tour-detail',
  imports: [
    NzCarouselModule
  ],
  templateUrl: './slide-tour-detail.component.html',
  styleUrl: './slide-tour-detail.component.scss',
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        height: 476px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h3 {
        color: #fff;
        margin-bottom: 0;
        user-select: none;
      }
    `
  ]

})
export class SlideTourDetailComponent {
  array = [
    'https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg',
    'https://hanoitourist.vn/sites/default/files/2024/02/1_2.png',
    'https://hanoitourist.vn/sites/default/files/2024/02/4_2.png',
    'https://hanoitourist.vn/sites/default/files/2024/02/1_2.png'
  ];

}
