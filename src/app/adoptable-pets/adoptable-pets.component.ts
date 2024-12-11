import { Component } from '@angular/core';

@Component({
  selector: 'app-adoptable-pets',
  templateUrl: './adoptable-pets.component.html',
  styleUrls: ['./adoptable-pets.component.css']
})
export class AdoptablePetsComponent {
  pets = [
    { name: 'Bambi', gender: 'Male', breed: 'Shorthaired Rabbit', location: 'Los Angeles, CA', imageUrl: 'https://cottontails-rescue.org.uk/wp-content/uploads/2013/01/gen_photo_for_website_2_19_7_12.jpg' },
    { name: 'Cindy', gender: 'Female', breed: 'Mixed Breed', location: 'Los Angeles, CA', imageUrl: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/69482170/0/?bust=1733467024&width=720' },
    { name: 'Bailey', gender: 'Female', breed: 'Staffordshire Bull Terrier', location: 'Los Angeles, CA', imageUrl: 'https://i.pinimg.com/736x/45/c9/df/45c9dfefe0ac4c5f87f5e76cde1e965b.jpg' },
    { name: 'Aphrodite', gender: 'Female', breed: 'Mixed Breed', location: 'Los Angeles, CA', imageUrl: 'https://dbw3zep4prcju.cloudfront.net/animal/d02ee6a8-f923-42f9-9f5f-07aedf209a61/image/66b5a62d-b67c-4bc4-858d-2696ecf0d5c7.jpeg?versionId=M4aHnbirEzMIXE9.xmrQA_iHpZ3eovnO&bust=1728841628&width=720' },
  ];
}
