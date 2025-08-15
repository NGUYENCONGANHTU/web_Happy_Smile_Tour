import { Component, inject, Input, OnInit } from '@angular/core';
import {
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
import {
  getBase64,
  parseToNzUploadFile,
} from '../../../../../shared/utils/helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CkeditorService } from '../../../../../shared/services/ckeditor.service';
import { BlogService } from '../../blog.service';
import { LanguageSelectionComponent } from '../../../../../shared/components/language-selection/language-selection.component';
import { ORIGINAL_LANGUAGE } from '../../../../../shared/constants/global.constant';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedDataService } from '../../../../../shared/services/shared-data.service';

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
    NzButtonModule,
    CKEditorModule,
    LanguageSelectionComponent,
  ],
})
export class BlogFormComponent implements OnInit {
  @Input({ required: true }) mode!: BaseFormMode;

  fb = inject(FormBuilder);
  blogService = inject(BlogService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  contentEditor = inject(CkeditorService);
  sharedService = inject(SharedDataService);

  blogId!: string;
  blogTransId!: string | number;
  imgPreview = '';
  selectedLanguage = ORIGINAL_LANGUAGE;
  blogForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    image: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });

  ngOnInit() {
    this.blogId = this.route.snapshot.params['id'];
    switch (this.mode) {
      case BaseFormMode.VIEW:
        this.getBlogTransById();
        this.blogForm.disable();
        break;
      case BaseFormMode.UPDATE:
        this.getBlogTransById();
        break;
      default:
    }
  }

  getBlogTransById() {
    this.blogService
      .getBlogTransById(this.blogId, this.selectedLanguage)
      .subscribe({
        next: res => {
          this.blogTransId =
            this.sharedService
              .getLanguageOptions()
              .find(lang => lang.code === this.selectedLanguage)?.id ?? 1;
          this.blogForm.patchValue({
            ...res.data,
            image: res.data?.image
              ? parseToNzUploadFile(
                  res.data.image?.storagePath,
                  res.data.image?.id
                )
              : null,
          });
        },
      });
  }

  handleCreate() {
    if (this.blogForm.valid) {
      this.blogService
        .createBlog({
          ...this.blogForm.value,
        })
        .subscribe({
          next: () => {
            this.goTo(BaseFormMode.VIEW);
          },
        });
    } else {
      this.blogForm.markAllAsTouched();
    }
  }

  handleUpdate() {
    if (this.blogForm.valid) {
      if (this.isOriginalTrans) {
        this.blogService
          .updateBlogById(this.blogId, this.blogForm.value)
          .subscribe({
            next: () => {
              this.goTo(BaseFormMode.VIEW);
            },
          });
      } else {
        this.blogService
          .updateBlogTransById(this.blogTransId, {
            ...this.blogForm.value,
            travelGuideId: this.blogId,
            language: this.selectedLanguage,
          })
          .subscribe({
            next: () => {
              this.goTo(BaseFormMode.VIEW);
            },
          });
      }
    }
  }

  handleSelectedLanguageChange() {
    this.getBlogTransById();
    if (this.isOriginalTrans && this.mode !== BaseFormMode.VIEW) {
      this.blogForm.get('image')?.enable();
    } else {
      this.blogForm.get('image')?.disable();
    }
  }

  goTo(target: string) {
    switch (target) {
      case BaseFormMode.CREATE:
        this.router.navigate(['admin', 'blog-config', 'create']);
        break;
      case BaseFormMode.UPDATE:
        this.router.navigate(['admin', 'blog-config', this.blogId, 'update']);
        break;
      case BaseFormMode.VIEW:
        this.router.navigate(['admin', 'blog-config', this.blogId, 'view']);
        break;
      default:
    }
  }

  beforeUpload = (file: NzUploadFile) => {
    this.blogForm.patchValue({ image: file });
    getBase64(file as unknown as File, (img: string) => {
      this.imgPreview = img;
    });
    return false;
  };

  get isOriginalTrans() {
    return this.selectedLanguage === ORIGINAL_LANGUAGE;
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
