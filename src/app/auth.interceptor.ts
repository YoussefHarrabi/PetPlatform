import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserAuthService } from './services/user-auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: UserAuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Exclude the registration URL from sending the token
    if (request.url.includes('/auth/register')) {
      return next.handle(request); // No token added
    }

    if (token) {

      if (!this.authService.isLoggedIn()) {
        // if not logged in redirect to login page
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => new Error('User is not logged in.'));
      }
      // Clone the request and add the Authorization header with the token
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned); // Pass the cloned request with token
    }

    return next.handle(request); // Pass the request without token
  }
}
