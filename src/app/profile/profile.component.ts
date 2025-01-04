import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service'; // Adjust the path as per your project structure
import { ToastrService } from 'ngx-toastr'; // Import ToastrService



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    nom: '',
    id: '',
    adoptionSituation: '',
    contact: ''
  };

  editableUser = { ...this.user };

  constructor(private userAuthService: UserAuthService,    private toastr: ToastrService, // Inject ToastrService
  ) {}

  ngOnInit(): void {
    // Fetch the current user's data using the UserAuthService
    const currentUserId = this.userAuthService.getCurrentUserId();
    if (currentUserId) {
      this.userAuthService.getUserById(currentUserId).subscribe({
        next: (userData) => {
          console.log('User data:', userData);
          this.user.nom = userData.nom;
          this.user.id = userData.id;
          this.user.adoptionSituation = userData.adoptionSituation;
          this.user.contact = userData.contact;
   
          this.editableUser = { ...this.user };
        },
        error: (err) => console.error('Failed to load user data', err),
      });
    }
  }

  editProfile(): void {
    // Enable editing by copying user data to editableUser
    this.editableUser = { ...this.user };
  }

  closeEditModal(): void {
    // Reset changes
    this.editableUser = { ...this.user };
  }

  saveProfile(): void {
    // Update user profile data
    console.log('Saving profile:', this.editableUser);
    
    this.userAuthService.updateUserProfile(this.editableUser).subscribe({
      next: (updatedUser) => {
        this.user = { ...updatedUser }; // Save changes
        this.editableUser = { ...this.user }; // Reset editable user
        document.getElementById("closeButtonForEditModal")?.click();
        this.toastr.success('Profil mis à jour avec succès!', 'Succès');
      },
      error: (err) => console.error('Failed to save profile', err)
      
    });
  }
}
