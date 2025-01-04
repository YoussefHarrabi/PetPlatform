import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: UserAuthService, private router: Router,    private toastr: ToastrService, // Inject ToastrService
  ) {}

  onLogin(): void {
    
    const credentials = { username: this.username, password: this.password };

    this.authService.login(credentials).subscribe(
      (response: any) => {
        // Save the JWT token and navigate to the desired route
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
          // Show a success toast
          this.toastr.success('Connexion réussie!', 'Succès'); // Update the route as per your app
      },
      (error) => {
        // Handle login error
     // Show an error toast
     this.toastr.error('Nom d’utilisateur ou mot de passe incorrect.', 'Erreur');
      }
    );
  }
}
