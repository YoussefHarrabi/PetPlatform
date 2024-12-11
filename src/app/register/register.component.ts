import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Handle registration logic (e.g., API call to register the user)
    console.log('Registration details:', { username: this.username, email: this.email, password: this.password });

    // Redirect to login page after successful registration
    this.router.navigate(['/login']);
  }
}