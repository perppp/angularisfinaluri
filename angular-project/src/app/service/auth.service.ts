import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  private tokenKey = 'auth-token';
  private userRoleKey = 'user-role'; // Added role storage key

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/auth/login', credentials).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        throw new Error(error.message || 'Login failed');
      })
    );
  }

  // Register method
  register(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/users', data).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        throw new Error(error.message || 'Registration failed');
      })
    );
  }

  // Save JWT Token and User Role
  saveToken(token: string, role: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userRoleKey, role); // Save user role
    this.authStatus.next(true); // Update auth status when token is saved
  }

  // Check if the user is logged in (based on token presence)
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Return true if token exists
  }

  // Get the user role from localStorage
  getUserRole(): string {
    return localStorage.getItem(this.userRoleKey) || ''; // Return the user role or empty string if not found
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove token
    localStorage.removeItem(this.userRoleKey); // Remove role
    this.authStatus.next(false); // Update auth status when logged out
  }

  // Decode JWT token (optional)
  getDecodedToken(): any {
    const token = localStorage.getItem(this.tokenKey);
    return token ? jwtDecode(token) : null; // Decode token or return null if no token
  }

  // Get current authentication status as an observable
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
