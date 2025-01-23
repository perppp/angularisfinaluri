import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/auth/login', credentials);
  }

  // Register method
  register(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/users', data);
  }

  // Save JWT Token
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authStatus.next(true);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatus.next(false);
  }

  // Decode JWT token (optional)
  getDecodedToken(): any {
    const token = localStorage.getItem(this.tokenKey);
    return token ? jwtDecode(token) : null;
  }
}
