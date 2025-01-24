import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get isFieldInvalid() {
    return (field: string) =>
      this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    try {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      const response = await this.authService.login(loginData).toPromise();

      // Assuming response contains the token and role
      const { access_token, role } = response;

      // Save token and role
      this.authService.saveToken(access_token, role);

      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.errorMessage = 'Login failed: ' + err?.message || 'An error occurred.';
      console.error(this.errorMessage);
    } finally {
      this.isSubmitting = false;
    }
  }
}
