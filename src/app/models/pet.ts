export interface Pet {
    id: string; // Unique identifier for the pet
    name: string; // Pet's name
    type: string; // Type of pet (e.g., Dog, Cat, Rabbit)
    breed?: string; // Optional: Breed of the pet
    age: number; // Age of the pet
    gender: 'Male' | 'Female'; // Gender of the pet
    location: string; // Location of the pet
    description: string; // Description of the pet
    imageUrl: string; // URL of the pet's image
    ownerId?: string; // Optional: Owner's user ID if added by a user
    availableForAdoption: boolean; // Indicates if the pet is available for adoption
  }