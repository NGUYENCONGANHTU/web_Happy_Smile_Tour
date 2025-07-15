import { Component, inject, Input } from '@angular/core';
import { CkeditorService } from '../../../../../../../shared/services/ckeditor.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChangeEvent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ValidationMessagePipe } from '../../../../../../../shared/pipes/validation.pipe';

@Component({
  selector: 'app-tour-form-service-tab',
  templateUrl: 'service-tab.component.html',
  styleUrl: 'service-tab.component.scss',
  standalone: true,
  imports: [
    CKEditorModule,
    NzInputDirective,
    ReactiveFormsModule,
    NzFormModule,
    ValidationMessagePipe,
    FormsModule,
  ],
  providers: [CkeditorService],
})
export class TourFormServiceTabComponent {
  @Input({ required: true }) tourForm!: FormGroup;

  serviceEditor = inject(CkeditorService);
  nonServiceEditor = inject(CkeditorService);

  onChangeServiceEditor({ editor }: ChangeEvent) {
    this.service?.patchValue(editor.getData());
  }

  onChangeNonServiceEditor({ editor }: ChangeEvent) {
    this.nonService?.patchValue(editor.getData());
  }

  get service(): FormControl {
    return this.tourForm.get('service') as FormControl;
  }
  get nonService(): FormControl {
    return this.tourForm.get('nonService') as FormControl;
  }

  get editorServiceEnabled() {
    return this.serviceEditor.editorEnabled;
  }

  get configServiceEnabled() {
    return this.serviceEditor.configEnabled;
  }

  get editorServiceDisabled() {
    return this.serviceEditor.editorDisabled;
  }

  get configServiceDisabled() {
    return this.serviceEditor.configDisabled;
  }

  get editorNonServiceEnabled() {
    return this.nonServiceEditor.editorEnabled;
  }

  get configNonServiceEnabled() {
    return this.nonServiceEditor.configEnabled;
  }

  get editorNonServiceDisabled() {
    return this.nonServiceEditor.editorDisabled;
  }

  get configNonServiceDisabled() {
    return this.nonServiceEditor.configDisabled;
  }
}
