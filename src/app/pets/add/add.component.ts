import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddPetComponent implements OnInit {
  ngOnInit(): void {
   console.log("hello bro")
  }
  

  pet: Pet = {
    id: '',
    name: '',
    type: '',
    age: 0,
    gender: 'Male',
    location: '',
    description: '',
    imageUrl: '',
    availableForAdoption: true,
  };

  constructor(private petService: PetService) {}

  onSubmit(): void {
    this.petService.addPet(this.pet).subscribe((response) => {
      alert('Pet added successfully!');
    });
  }
}
