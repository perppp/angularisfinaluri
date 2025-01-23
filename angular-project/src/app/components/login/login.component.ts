import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],  // Ensure HttpClientModule is here
  providers: [AuthService],  // Provide AuthService in the component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response && response.access_token) {
            this.authService.saveToken(response.access_token);
            console.log('Login successful, token saved:', response.access_token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('No token received in response:', response);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
