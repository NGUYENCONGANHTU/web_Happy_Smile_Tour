import { Component } from '@angular/core';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-create-blog',
  templateUrl: 'create-blog.component.html',
  imports: [BlogFormComponent],
  standalone: true,
})
export class CreateBlogComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
