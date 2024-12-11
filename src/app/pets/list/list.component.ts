import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent  {
  
  pets: Pet[] = [
    { 
        id: '1', 
        name: 'Bambi', 
        type: 'Rabbit', 
        breed: 'Shorthaired Rabbit', 
        age: 2, 
        gender: 'Male', 
        location: 'Los Angeles, CA', 
        description: 'A friendly rabbit who loves to hop around and explore.', 
        imageUrl: 'https://cottontails-rescue.org.uk/wp-content/uploads/2013/01/gen_photo_for_website_2_19_7_12.jpg', 
        availableForAdoption: true 
    },
    { 
        id: '2', 
        name: 'Cindy', 
        type: 'Dog', 
        breed: 'Mixed Breed', 
        age: 3, 
        gender: 'Female', 
        location: 'Los Angeles, CA', 
        description: 'A sweet and energetic mixed-breed dog looking for a loving home.', 
        imageUrl: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/69482170/0/?bust=1733467024&width=720', 
        availableForAdoption: true 
    },
    { 
        id: '3', 
        name: 'Bailey', 
        type: 'Dog', 
        breed: 'Staffordshire Bull Terrier', 
        age: 4, 
        gender: 'Female', 
        location: 'Los Angeles, CA', 
        description: 'A calm and loyal Staffordshire Bull Terrier who loves attention.', 
        imageUrl: 'https://i.pinimg.com/736x/45/c9/df/45c9dfefe0ac4c5f87f5e76cde1e965b.jpg', 
        availableForAdoption: true 
    },
    { 
        id: '4', 
        name: 'Aphrodite', 
        type: 'Dog', 
        breed: 'Mixed Breed', 
        age: 2, 
        gender: 'Female', 
        location: 'Los Angeles, CA', 
        description: 'A playful and loving dog who gets along well with other pets.', 
        imageUrl: 'https://dbw3zep4prcju.cloudfront.net/animal/d02ee6a8-f923-42f9-9f5f-07aedf209a61/image/66b5a62d-b67c-4bc4-858d-2696ecf0d5c7.jpeg?versionId=M4aHnbirEzMIXE9.xmrQA_iHpZ3eovnO&bust=1728841628&width=720', 
        availableForAdoption: true 
    }
];


 
  constructor(private petService: PetService, private router: Router) {}

  adoptPet(petId: string) {
    // Navigate to the adoption form page, passing the pet ID as a parameter
    this.router.navigate(['/adoption-form', petId]);
  }



}