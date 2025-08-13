import { Component, Input } from '@angular/core';
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
import { CkeditorWrapperComponent } from '../../../../../../../shared/components/ckeditor-wrapper/ckeditor-wrapper.component';

@Component({
  selector: 'app-tour-form-service-tab',
  templateUrl: 'service-tab.component.html',
  styleUrl: 'service-tab.component.scss',
  standalone: true,
  imports: [
    CKEditorModule,
    ReactiveFormsModule,
    NzFormModule,
    ValidationMessagePipe,
    FormsModule,
    CkeditorWrapperComponent,
  ],
  providers: [CkeditorService],
})
export class TourFormServiceTabComponent {
  @Input({ required: true }) tourForm!: FormGroup;

  get service(): FormControl {
    return this.tourForm.get('service') as FormControl;
  }
  get nonService(): FormControl {
    return this.tourForm.get('nonService') as FormControl;
  }
}
