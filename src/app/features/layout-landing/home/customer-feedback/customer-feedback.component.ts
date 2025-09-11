import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommentFeedbackResDTO } from '../../../../../interface';
import { sanitizeUrl } from '../../../../shared/utils/helpers/common.helper';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-customer-feedback',
  standalone: true,
  imports: [NzAvatarModule],
  templateUrl: './customer-feedback.component.html',
  styleUrl: './customer-feedback.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerFeedbackComponent {
  @Input() dataCustomerFeedback: CommentFeedbackResDTO[] = [];
  formatImage = sanitizeUrl;
}
