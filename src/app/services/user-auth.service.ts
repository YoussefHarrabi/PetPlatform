import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Install this package with `npm install jwt-decode`
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private baseUrl = 'http://localhost:8084/auth'; // Replace with your backend base URL

  private roleSource = new BehaviorSubject<string | null>(null);

  private userSource = new BehaviorSubject<{ userId: string; userName: string } | null>(null);

  user$ = this.userSource.asObservable();
  role$ = this.roleSource.asObservable();

  constructor(private http: HttpClient,private router: Router) {
    // Load user and role from token if available
    this.loadUserFromToken();
  }

  // Login and obtain a JWT token
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.decodeAndSetUser(token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Decode JWT and set user and role
  private decodeAndSetUser(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token); // Decode the JWT
      const userId = decodedToken.id;  // Extract user ID
      const username = decodedToken.sub; // Extract username
      const role = decodedToken.role;  // Extract user role
      this.setUser(userId, username, role); // Pass user ID, username, and role to setUser
    } catch (error) {
      console.error('Invalid token', error);
      this.clearUser(); // Clear user info on invalid token
    }
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  // Load user from the token in localStorage
  loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      this.decodeAndSetUser(token);
    }
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      return Date.now() > expirationTime;
    } catch (error) {
      console.error('Error decoding token', error);
      return true; // Treat as expired if there's an error
    }
  }

  // Logout by removing the token
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.clearUser();
  }

  getCurrentUserId(): string | null {
    const user = this.userSource.value;
    return user ? user.userId : null; // Extract userId from the object
  }
  registerUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  // Update the setUser method to accept an object with the required properties
  setUser(userId: string, userName: string, role: string): void {
    this.userSource.next({ userId, userName }); // Set user ID and name
    this.roleSource.next(role);    // Set user role
  }

  clearUser(): void {
    this.userSource.next(null);
    this.roleSource.next(null);
  }

  getRole(): string | null {
    return this.roleSource.value;
  }

  // Fetch user by ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`); // Replace with your actual endpoint
  }

  // Update user profile
  updateUserProfile(user: any): Observable<any> {
    console.log('Updating user profile:', user);
    return this.http.put(`${this.baseUrl}/${user.id}`, user); // Replace with your actual endpoint
  }
}
