import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    // Simulating login process
    const userName = 'John Doe'; // Replace this with actual login response
    this.authService.setUser(userName);
    this.router.navigate(['/pets']);
  }

}
