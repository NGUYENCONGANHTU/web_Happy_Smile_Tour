import { Component } from '@angular/core';
import { BlogFormComponent } from '../../components/blog-form/blog-form.component';
import { BaseFormMode } from '../../../../../shared/interfaces/form-base.interface';

@Component({
  selector: 'app-update-blog',
  templateUrl: 'update-blog.component.html',
  imports: [BlogFormComponent],
  standalone: true,
})
export class UpdateBlogComponent {
  protected readonly BaseFormMode = BaseFormMode;
}
