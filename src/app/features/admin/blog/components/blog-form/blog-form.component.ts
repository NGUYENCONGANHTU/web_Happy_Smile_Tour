import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';
import { ValidationMessagePipe } from '../../../../../shared/pipes/validation.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { parseToNzUploadFile } from '../../../../../shared/utils/helpers';
import { ActivatedRoute } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CkeditorService } from '../../../../../shared/services/ckeditor.service';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    ValidationMessagePipe,
    NzInputModule,
    NzUploadModule,
    NzSelectModule,
    NzIconModule,
    CKEditorModule,
  ],
})
export class BlogFormComponent implements OnInit {
  @Input({ required: true }) mode!: BaseFormMode;

  fb = inject(FormBuilder);
  blogService = inject(BlogService);
  route = inject(ActivatedRoute);
  contentEditor = inject(CkeditorService);

  id?: string;
  selectedLanguage = 'vi';
  blogForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    image: this.fb.array([]),
    content: [null, [Validators.required]],
  });

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    switch (this.mode) {
      case BaseFormMode.VIEW:
        this.getBlogById();
        this.blogForm.disable();
        break;
      case BaseFormMode.UPDATE:
        this.getBlogById();
        break;
      default:
    }
  }

  getBlogById() {
    this.blogService.getBlogById(this.route.snapshot.params?.['id']).subscribe({
      next: res => {
        this.blogForm.patchValue({
          ...res.data,
        });
        this.fileList.clear();
        this.fileList.push(
          this.fb.control(parseToNzUploadFile(res.data?.image?.storagePath))
        );
      },
    });
  }

  beforeUpload = (_file: NzUploadFile, fileList: NzUploadFile[]) => {
    const oldFileList = fileList;
    this.fileList.clear();
    oldFileList.forEach(file => {
      this.fileList.push(this.fb.control(file));
    });
    return false;
  };

  get fileList() {
    return this.blogForm.controls['image'] as FormArray;
  }

  get content(): FormControl {
    return this.blogForm.get('content') as FormControl;
  }

  get editorContentEnabled() {
    return this.contentEditor.editorEnabled;
  }

  get configContentEnabled() {
    return this.contentEditor.configEnabled;
  }

  get editorContentDisabled() {
    return this.contentEditor.editorDisabled;
  }

  get configContentDisabled() {
    return this.contentEditor.configDisabled;
  }

  protected readonly BaseFormMode = BaseFormMode;
}
