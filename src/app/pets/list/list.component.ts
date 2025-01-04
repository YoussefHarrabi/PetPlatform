import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  filteredPets: Pet[] = []; // List of pets to be displayed based on filter
  pets: Pet[] = []; // Complete list of pets fetched from the backend
  currentUserId: string | null = null; // Logged-in user's ID
  showAll: boolean = true; // Toggle between all pets or only user's pets
  filters: { age: any, breed: string } = { age: null, breed: '' };

  constructor(
    private petService: PetService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.userAuthService.getCurrentUserId(); 
    console.log('Current user ID:', this.currentUserId); // Get current user ID
    this.loadPets(); // Fetch pets from the backend
  }

  // Fetch pets from the backend
  loadPets(): void {
    this.petService.getPets().subscribe(
      (response: Pet[]) => {
        this.pets = response; // Update pets array with the backend response
        this.resetFilters(); // Initialize filteredPets
      },
      (error) => {
        console.error('Error fetching pets:', error);
      }
    );
  }

  // Reset filters and show all pets
  resetFilters(): void {
    this.filteredPets = [...this.pets]; // Reset to show all pets
    this.filters = { age: null, breed: '' }; // Clear filter criteria
  }

  // Apply filters for age, breed, and owner
  applyFilters(): void {
    this.filteredPets = this.pets.filter(pet => {
      console.log("hedha ",pet.ownerId)
      return (
        // Apply age filter
        (this.filters.age ? pet.age === +this.filters.age : true) &&
        // Apply breed filter
        (this.filters.breed ? (pet.breed ? pet.breed.toLowerCase().includes(this.filters.breed.toLowerCase()) : false) : true) &&
        // Apply filter based on the showAll state
        (this.showAll || pet.ownerId === this.currentUserId)
       
      );
    });
  }

  // Toggle between showing all pets or only user's pets
  toggleFilter(option: string): void {
    this.showAll = option === 'tous'; // Set to show all pets if 'tous' is selected
    this.applyFilters(); // Apply the updated filters
  }

  // Navigate to the adoption form for the selected pet
  adoptPet(petId: string): void {
    if (!this.userAuthService.isLoggedIn()) {
      alert('Veuillez vous connecter pour adopter un animal.');
      this.router.navigate(['/login']);
    } else {
      // Navigate to the adoption form, passing petId as a route parameter
      this.router.navigate(['/adoption-form', petId]);
    }
  }

  // Construct the full image URL for the pet image
  getImageUrl(imagePath: string): string {
    const backendBaseUrl = 'http://localhost:8084'; // Replace with your backend's base URL for images
    return `${backendBaseUrl}${imagePath}`; // Construct the full image URL
  }
}
