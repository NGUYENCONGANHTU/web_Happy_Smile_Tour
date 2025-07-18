import { Component, Input } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { FeatureResDTO } from '../../../../../interface';
@Component({
  selector: 'app-slide-tour-domestic-detail',
  imports: [NzCarouselModule],
  templateUrl: './slide-tour-domestic-detail.component.html',
  styleUrl: './slide-tour-domestic-detail.component.scss',
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
    `,
  ],
})
export class SlideTourDomesticDetailComponent {
  @Input() listImageBanner: FeatureResDTO | null = null;
}
