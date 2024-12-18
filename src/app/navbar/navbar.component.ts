import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName: string | null = null;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((name) => {
      this.userName = name;
    });
  }
  logout() {
    this.authService.clearUser();
  }


}
