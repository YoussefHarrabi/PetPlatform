import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://your-backend-api.com/pets'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all pets available for adoption
  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  // Add a new pet for adoption
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  // Delete a pet by ID
  deletePet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a pet's details
  updatePet(id: string, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }
}