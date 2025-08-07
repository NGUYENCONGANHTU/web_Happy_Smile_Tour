import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CkeditorService } from '../../../../../../../shared/services/ckeditor.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ValidationMessagePipe } from '../../../../../../../shared/pipes/validation.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-tour-form-service-tab-trans',
  templateUrl: 'service-tab-trans.component.html',
  styleUrl: 'service-tab-trans.component.scss',
  standalone: true,
  imports: [
    CKEditorModule,
    ReactiveFormsModule,
    NzFormModule,
    ValidationMessagePipe,
    FormsModule,
    NzButtonModule,
  ],
  providers: [CkeditorService],
})
export class ServiceTabTransComponent {
  @Input({ required: true }) tourForm!: FormGroup;
  @Input({ required: true }) tourFormTrans!: FormGroup;

  @Output() saved = new EventEmitter();

  serviceEditor = inject(CkeditorService);
  nonServiceEditor = inject(CkeditorService);
  serviceTransEditor = inject(CkeditorService);
  nonServiceTransEditor = inject(CkeditorService);

  get service(): FormControl {
    return this.tourForm.get('service') as FormControl;
  }
  get nonService(): FormControl {
    return this.tourForm.get('nonService') as FormControl;
  }

  get serviceTrans(): FormControl {
    return this.tourFormTrans.get('service') as FormControl;
  }
  get nonServiceTrans(): FormControl {
    return this.tourFormTrans.get('nonService') as FormControl;
  }

  get editorServiceDisabled() {
    return this.serviceEditor.editorDisabled;
  }

  get configServiceDisabled() {
    return this.serviceEditor.configDisabled;
  }

  get editorNonServiceDisabled() {
    return this.nonServiceEditor.editorDisabled;
  }

  get configNonServiceDisabled() {
    return this.nonServiceEditor.configDisabled;
  }

  get editorServiceTransEnabled() {
    return this.serviceTransEditor.editorEnabled;
  }

  get configServiceTransEnabled() {
    return this.serviceTransEditor.configEnabled;
  }

  get editorNonServiceTransEnabled() {
    return this.nonServiceTransEditor.editorEnabled;
  }

  get configNonServiceTransEnabled() {
    return this.nonServiceTransEditor.configEnabled;
  }
}
