import {Component, inject, OnInit} from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {RouterLink} from '@angular/router';
import {AppService} from '../../../../app.service';
import {ContactPrivateTourReqDTO, PrivateTourResDTO} from '../../../../interface';
@Component({
  selector: 'app-private-group-tour',
  imports: [
    NzBreadCrumbModule,
    RouterLink,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './private-group-tour.component.html',
  styleUrl: './private-group-tour.component.scss'
})
export class PrivateGroupTourComponent implements OnInit {
  appService = inject(AppService)

  ngOnInit() {
    this.getAllDataPrivateTour();
  }

  //
  dataPrivateTour:PrivateTourResDTO[]=[];
  getAllDataPrivateTour(){
    this.appService.getAllDataPrivateTour().subscribe(data => {
      this.dataPrivateTour = data;
    })
  }






  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    name: ['', [Validators.required]],
    email: [''],
    phone: ['', [Validators.required]],
    company: [''],
    number_of_people: [''],
    expected_date: [null],
    budget: [''],
    location: [''],
    message: ['']
  });
  submitForm() {
    if (this.validateForm.valid) {
      const rawForm = this.validateForm.value;

      // Tạo object đúng kiểu ContactPrivateTourReqDTO
      const payload: ContactPrivateTourReqDTO = {
        name: rawForm.name ?? '',
        email: rawForm.email ?? '',
        phone: rawForm.phone ?? '',
        company: rawForm.company ?? '',
        number_of_people: rawForm.number_of_people ?? '',
        expected_date: rawForm.expected_date ?? '',
        budget: rawForm.budget ?? '',
        location: rawForm.location ?? '',
        message: rawForm.message ?? ''
      };

      this.appService.createDataContactPrivateTour(payload).subscribe({
        next: (response) => {
          console.log('Gửi thành công:', response);
          alert('Gửi thành công!');
          this.validateForm.reset();
        },
        error: (err) => {
          console.error('Lỗi khi gửi form:', err);
          alert('Gửi thất bại. Vui lòng thử lại!');
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

}
