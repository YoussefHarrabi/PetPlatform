import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from './models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8084/pets'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  addPet(pet: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, pet);
  }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/all`);
  }

  getUserPets(userId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/user/${userId}`);
  }

  getPetsByUser(userId: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/user/${userId}`);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
