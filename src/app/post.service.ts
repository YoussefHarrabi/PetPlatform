import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CommunityPost {
  userId: any;
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8084/api/posts';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all posts
  getPosts(): Observable<CommunityPost[]> {
    return this.http.get<CommunityPost[]>(this.apiUrl);
  }

  // Create a new post
  // Create a new post with userId
  createPost(userID : string | null, formData: FormData): Observable<CommunityPost> {
    const url = `${this.apiUrl}/create/${userID}`;
    return this.http.post<CommunityPost>(url, formData);
  }
}