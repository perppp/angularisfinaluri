import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = ''; // Variable to store error message

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get isFieldInvalid() {
    return (field: string) =>
      this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched;
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    try {
      const registerData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: 'customer',
      };

      const registerResponse = await this.authService.register(registerData).toPromise();

      // Log the API response for debugging
      console.log('Register response:', registerResponse);

      if (registerResponse && registerResponse.id) {
        // If the registration response has an ID, consider it successful
        const loginResponse = await this.authService
          .login({
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
          })
          .toPromise();

        if (loginResponse && loginResponse.access_token) {
          this.authService.saveToken(loginResponse.access_token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Login failed after registration: No token received';
          console.error(this.errorMessage);
          alert(this.errorMessage);
        }
      } else {
        this.errorMessage = 'Registration failed: Invalid response from server';
        console.error(this.errorMessage);
        alert(this.errorMessage);
      }
    } catch (err: any) {
      // Now we can safely access 'err' as 'any'
      console.error('Registration failed:', err);
      this.errorMessage = err?.message || 'An error occurred during registration.';
      alert(this.errorMessage);
    } finally {
      this.isSubmitting = false;
    }
  }
}
