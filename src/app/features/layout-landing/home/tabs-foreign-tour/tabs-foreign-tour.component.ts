import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-tabs-foreign-tour',
  imports: [],
  standalone: true,
  templateUrl: './tabs-foreign-tour.component.html',
  styleUrl: './tabs-foreign-tour.component.scss'
})
export class TabsForeignTourComponent {
    @Input() tab = '';
    @Input () active =  false;
    @Output() onChangeTab =  new EventEmitter<string>();

    handClick(){
      this.onChangeTab.emit(this.tab);
    }
}
