import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-header-input-search',
  templateUrl: 'header-input-search.component.html',
  imports: [NzInputModule, FormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HeaderInputSearchComponent),
      multi: true,
    },
  ],
})
export class HeaderInputSearchComponent implements ControlValueAccessor {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  /* eslint-disable */
  onChange = (_value: any) => {};
  /* eslint-disable */
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(_isDisabled: boolean): void {
    // Optional: handle disabled state if needed
  }

  onInputChange(value: string): void {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value); // If you want two-way binding as well
  }
}
