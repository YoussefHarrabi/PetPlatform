import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    alert('Vous devez être connecté pour accéder à cette page.');
    this.router.navigate(['/login']);
    return false;
  }
}