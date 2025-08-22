import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login-page-component',
  templateUrl: 'login-page.component.html',
  styleUrl: 'login-page.component.scss',
  standalone: true,
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzRowDirective,
    NzColDirective,
    NzCheckboxComponent,
    NzButtonComponent,
    NzIconModule,
  ],
})
export class LoginPageComponent implements OnInit {
  fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  logging = false;
  passwordVisible = false;
  loginForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true),
  });

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      if (!this.logging) {
        this.logging = true;
        this.authService
          .login({
            username: this.loginForm.value.username ?? '',
            password: this.loginForm.value.password ?? '',
          })
          .subscribe({
            next: () => {
              this.logging = false;
              this.router.navigate(['/admin']);
            },
            error: () => {
              this.logging = false;
            },
          });
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
