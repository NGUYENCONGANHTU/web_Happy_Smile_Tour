import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs-domestic-tour',
  imports: [],
  standalone: true,
  templateUrl: './tabs-domestic-tour.component.html',
  styleUrl: './tabs-domestic-tour.component.scss',
})
export class TabsDomesticTourComponent {
  @Input() tab = '';
  @Input() active = false;
  @Output() tabChanged = new EventEmitter<string>();

  handClick() {
    this.tabChanged.emit(this.tab);
  }
}
