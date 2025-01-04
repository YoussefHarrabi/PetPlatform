import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddPetComponent {
  pet: any = {
    name: '',
    breed: '',
    age: null,
    gender: '',
    location: '',
    history: '',
  };
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private petService: PetService,    private toastr: ToastrService, // Inject ToastrService
  ) {}


  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('pet', new Blob([JSON.stringify(this.pet)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    console.log('Form data:', formData);

    this.petService.addPet(formData).subscribe(
      (response) => {
        console.log('Pet added successfully:', response);
        this.toastr.success('Animal ajouté avec succès!', 'Succès');
      },
      (error) => {
        console.error('Error adding pet:', error);
        this.toastr.error('Erreur lors de l’ajout de l’animal.', 'Erreur');
      }
    );
  }
}