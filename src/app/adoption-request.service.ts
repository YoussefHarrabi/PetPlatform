import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {
  private apiUrl = 'https://your-api-url.com/adoption-requests'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Get all adoption requests
  getAdoptionRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

   // Get all adoption requests for a specific user
   getUserAdoptionRequests(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Create a new adoption request
  createAdoptionRequest(request: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }
}