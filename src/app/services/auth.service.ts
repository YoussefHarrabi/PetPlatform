import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSource = new BehaviorSubject<string | null>(null); // Holds the user's name
  user$ = this.userSource.asObservable();

  setUser(name: string) {
    this.userSource.next(name);
  }

  clearUser() {
    this.userSource.next(null);
  }
    // This is just an example, adjust according to how you handle authentication in your app
    getLoggedInUser() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user;
    }
}
