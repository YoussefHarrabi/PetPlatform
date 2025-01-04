import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pet } from '../models/pet';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8084/pets'; // Replace with your backend URL

  constructor(private http: HttpClient, private authService: UserAuthService) {}

  addPet(formData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve token from storage
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    return this.http.post(`${this.apiUrl}/add`, formData, { headers });
  }

  getPetById(id: number): Observable<Pet> {
  return this.http.get<Pet>(`${this.apiUrl}/get/${id}`);
}

   // Add the getPets method
   getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/all`).pipe(
      map(pets => {
        pets.forEach(pet => {
          console.log('Pet Owner ID:', pet.age); // Check if the ownerId exists here
        });
        return pets;
      })
    );
  }

  updatePet(pet: Pet, image: File | null): Observable<Pet> {
    const formData: FormData = new FormData();
  
    // Append the pet object to FormData (we need to serialize it into JSON)
    formData.append('pet', new Blob([JSON.stringify(pet)], { type: 'application/json' }));
    
    // If an image file is provided, append it to FormData
    if (image) {
      formData.append('image', image);
    }
    
    // Send the PUT request with the FormData (this is necessary for handling multipart/form-data)
    return this.http.put<Pet>(`${this.apiUrl}/update/${pet.id}`, formData);
  }

  // Delete pet by ID
  deletePet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}