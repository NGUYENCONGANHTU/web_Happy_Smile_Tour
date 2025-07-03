import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {CommentFeedbackResDTO} from '../../../../../interface';

@Component({
  selector: 'app-customer-feedback',
  standalone: true,
  imports: [],
  templateUrl: './customer-feedback.component.html',
  styleUrl: './customer-feedback.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerFeedbackComponent {
@Input() dataCustomerFeedback:CommentFeedbackResDTO[]=[]
}

