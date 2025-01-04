import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

declare var bootstrap: any;

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.css']
})
export class GestionUtilisateurComponent implements OnInit {
  users: any[] = [];
  addUserForm: FormGroup; // Form group for add user
  editUser: any = {};

  constructor(
    private userService: UserAuthService,
    private fb: FormBuilder, // Inject FormBuilder
    private toastr: ToastrService // Inject ToastrService
  ) {
    // Initialize the form group with validators
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      nom: ['', Validators.required],
      contact: ['', [Validators.pattern(/^[0-9+\-() ]*$/)]],
      adoptionSituation: [''],
      roles: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
    console.log('editUser', this.editUser);
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error(error);
        this.toastr.error('Failed to load users.', 'Error');
      }
    );
  }

  addUser() {
    if (this.addUserForm.invalid) {
      this.toastr.error('Please complete all required fields correctly.', 'Error');
      return;
    }

    const formData = this.addUserForm.value;

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      this.toastr.error('Passwords do not match!', 'Error');
      return;
    }

    const user = {
      username: formData.username,
      password: formData.password,
      nom: formData.nom,
      contact: formData.contact,
      adoptionSituation: formData.adoptionSituation,
      roles: formData.roles
    };

    this.userService.registerUser(user).subscribe(
      (response) => {
        this.toastr.success('User added successfully!', 'Success');
        this.addUserForm.reset(); // Reset the form after submission
        this.loadUsers(); // Refresh the user list
      },
      (error) => {
        console.error(error);
        this.toastr.error('Failed to add user. Please try again.', 'Error');
      }
    );
  }

  openEditModal(user: any) {
    this.editUser = { ...user }; // Clone the user object
    const modal = new bootstrap.Modal(document.getElementById('editUserModal')!);
    modal.show();
  }

  saveEdit() {
    if (!this.editUser) return;

    delete this.editUser.password;
    console.log(this.editUser.roles);
    this.userService.updateUserProfile(this.editUser).subscribe(
      (response) => {
        this.toastr.success('User updated successfully!', 'Success');
        this.editUser = {}; // Clear the edit state
        this.loadUsers(); // Refresh the user list
      },
      (error) => {
        console.error(error);
        this.toastr.error('Failed to update user. Please try again.', 'Error');
      }
    );
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(parseInt(userId)).subscribe(
      () => {
        this.toastr.success('User deleted successfully!', 'Success');
        this.loadUsers(); // Refresh the user list
      },
      (error) => {
        console.error(error);
        this.toastr.error('Failed to delete user. Please try again.', 'Error');
      }
    );
  }
}
