import { Component, Input, inject, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CkeditorService } from '../../services/ckeditor.service';

/**
 * A wrapper component for CKEditor that implements ControlValueAccessor to
 * work seamlessly with Angular's reactive forms.
 *
 * It uses the NG_VALUE_ACCESSOR token to register itself as a custom form control.
 */
@Component({
  selector: 'app-ckeditor-wrapper',
  templateUrl: './ckeditor-wrapper.component.html',
  standalone: true,
  imports: [CKEditorModule, ReactiveFormsModule],
})
export class CkeditorWrapperComponent implements ControlValueAccessor {
  // Inputs from the parent component, matching the user's request
  @Input() disabled = false;

  ckeditorService = inject(CkeditorService);

  // The internal value of the editor
  public value = '';

  // The change and touched functions from the ControlValueAccessor
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: any) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    // If NgControl exists, we set this component as the value accessor.
    // This is the correct way to handle the registration and avoid the circular dependency.
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Writes a new value to the element. This is called by the Forms API.
   * @param obj The value to write.
   */
  writeValue(obj: any): void {
    this.value = obj;
  }

  /**
   * Registers a callback function that is called when the control's value changes.
   * @param fn The callback function.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that is called when the control receives a touch event.
   * @param fn The callback function.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Updates the disabled state of the control.
   * @param isDisabled The new disabled state.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Handles the `change` event from the CKEditor component.
   * @param event The event object.
   */
  public onEditorChange(event: any): void {
    this.onChange(event.editor.getData());
  }

  /**
   * Handles the `blur` event from the CKEditor component.
   */
  public onEditorBlur(): void {
    this.onTouched();
  }

  get editorEnabled() {
    return this.ckeditorService.editorEnabled;
  }

  get configEnabled() {
    return this.ckeditorService.configEnabled;
  }

  get editorDisabled() {
    return this.ckeditorService.editorDisabled;
  }

  get configDisabled() {
    return this.ckeditorService.configDisabled;
  }
}
