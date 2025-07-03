import { Component } from '@angular/core';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzDividerModule} from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-test',
  imports: [NzDividerModule, NzStepsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  index = 0;
  disable = false;
  onIndexChange(index: number): void {
    this.index = index;
  }
}
