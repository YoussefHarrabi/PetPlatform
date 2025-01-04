export interface Pet {
  id: string; // Unique identifier for the pet
  name: string; // Pet's name
  breed?: string; // Optional: Breed of the pet
  type: string; // Type of the pet
  age: number | null; // Age of the pet, can be null
  gender: 'Male' | 'Female' | null; // Gender of the pet (null for default)
  location: string; // Location of the pet
  history: string; // History of the pet
  imageUrl: string; // Path to the image on the backend
  description: string; // Description of the pet
  ownerId?: string; // Optional: Owner's user ID if added by a user
  availableForAdoption: boolean; // Indicates if the pet is available for adoption
}
