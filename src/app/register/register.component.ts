import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  nom = '';
  contact = '';
  adoptionSituation = '';
  roles: string[] = []; // Initialize as an empty array to accept roles
  constructor(private userService: UserAuthService, private router: Router,    private toastr: ToastrService, // Inject ToastrService
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas!', 'Erreur');
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      nom: this.nom,
      contact: this.contact,
      adoptionSituation: this.adoptionSituation,
      roles: this.roles, // Send roles to the backend
    };

    this.userService.registerUser(user).subscribe(
      (response) => {
        this.toastr.success('Inscription réussie!', 'Succès');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        this.toastr.error('Échec de l\'inscription. Veuillez réessayer.', 'Erreur');
      }
    );
  }
}