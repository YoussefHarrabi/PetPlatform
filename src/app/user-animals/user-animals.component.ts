declare var bootstrap: any;
import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { UserAuthService } from '../services/user-auth.service';
import { Pet } from '../models/pet';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService




@Component({
  selector: 'app-user-animals',
  templateUrl: './user-animals.component.html',
  styleUrls: ['./user-animals.component.css']
})
export class UserAnimalsComponent implements OnInit {
  userPets: Pet[] = []; // List of pets owned by the connected user
  currentUserId: string | null = null; // Current user's ID
  selectedPet: Pet | null = null; // Pet selected for editing
  selectedImageFile: any;

  constructor(private petService: PetService, private userAuthService: UserAuthService,    private toastr: ToastrService, // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.userAuthService.getCurrentUserId(); // Fetch current user ID
    this.loadUserPets(); // Fetch pets owned by the current user
  }

  // Fetch pets for the connected user
  loadUserPets(): void {
    this.petService.getPets().subscribe(
      (response: Pet[]) => {
        // Filter pets by current user ID
        this.userPets = response.filter(pet => pet.ownerId === this.currentUserId);
      },
      (error) => {
        console.error('Error fetching user pets:', error);
      }
    );
  }
  
   // Open modal to edit pet details
   openEditModal(pet: Pet): void {
    this.selectedPet = { ...pet }; // Clone the pet to avoid modifying directly
    const modalElement = document.getElementById('editPetModal');
    if (modalElement) {
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedImageFile = input.files[0]; // Get the first selected file
    }
  }

  // Save changes made to the pet
  saveChanges(): void {
    if (this.selectedPet) {
      const pet = this.selectedPet;
      const image = this.selectedImageFile || null; // Only send image if selected
  
      // Call the updatePet method and pass the pet and the image
      this.petService.updatePet(pet, image).subscribe(
        (response) => {
          console.log('Updated pet response:', response); // Log response to inspect the updated data
          this.loadUserPets(); // Refresh user pets after saving changes
          this.selectedPet = null; // Close modal
          this.selectedImageFile = null; // Reset the image file (optional)
          this.toastr.success('Les informations du pet ont été mises à jour avec succès!', 'Succès');

        },
        (error) => {
          console.error('Error updating pet:', error); // Log detailed error for troubleshooting
          this.toastr.error('Échec de la mise à jour du pet. Veuillez réessayer.', 'Erreur');

        }
      );
    } else {
      console.error('No pet selected for updating');
      this.toastr.warning('Aucun pet sélectionné pour la mise à jour.', 'Attention');

    }
  } 
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && this.selectedPet) {
      this.selectedPet.imageUrl = URL.createObjectURL(file); // Temporarily show the image before saving
    }
  }

  // Delete a pet
  deletePet(petId: string): void {
    this.petService.deletePet(petId).subscribe(
      () => {
        this.userPets = this.userPets.filter(pet => pet.id !== petId); // Remove pet from UI
        this.toastr.success('Pet supprimé avec succès.', 'Succès');

      },
      (error) => {
        console.error('Error deleting pet:', error);
        this.toastr.error('Échec de la suppression du pet. Veuillez réessayer.', 'Erreur');

      }
    );
  }

  getImageUrl(imagePath: string): string {
    const backendBaseUrl = 'http://localhost:8084'; // Replace with your backend's base URL for images
    return `${backendBaseUrl}${imagePath}`; // Construct the full image URL
  }
}
