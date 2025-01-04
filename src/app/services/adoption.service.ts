import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private baseUrl = 'http://localhost:8084/adoptions'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  submitAdoptionRequest(formData: { petId: number; nom: string; email: string; reason: string }): Observable<any> {
    console.log(formData);
    const url = `${this.baseUrl}/request`;
    return this.http.post<any>(url, formData);
  }

  getAdoptionRequestsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
  getRequestDetailsById(requestId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${requestId}`);
  }
  updateAdoptionRequestStatus(requestId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${requestId}`, {}, { params: { status } });
  }

  updateAdoptionRequest(requestId: number, status: string, reasonForAdoption: string | null, userEmail: string | null): Observable<any> {
    const url = `${this.baseUrl}/update/${requestId}`;
    const params = new HttpParams().set('status', status);

    return this.http.put(url, { reasonForAdoption, userEmail }, { params });
  }
   // DELETE method to remove an adoption request
   deleteAdoptionRequest(requestId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/request/${requestId}`);
  }

  getAdoptionRequestsForOwner(ownerId: string | null): Observable<any[]> {
    const url = `${this.baseUrl}/owner/${ownerId}`;
    return this.http.get<any[]>(url);
  }
}
