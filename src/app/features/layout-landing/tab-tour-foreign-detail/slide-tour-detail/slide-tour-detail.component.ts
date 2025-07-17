import { Component, Input } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { FeatureResDTO } from '../../../../../interface';
@Component({
  selector: 'app-slide-tour-detail',
  imports: [NzCarouselModule],
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
    `,
  ],
})
export class SlideTourDetailComponent {
  @Input() listImageBanner: FeatureResDTO[] = [];
}
