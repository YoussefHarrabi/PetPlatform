import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName: string | null = null;
  userRole: string | null = null;
  isAdmin: boolean = true;
  isAdoptant: boolean = false;
  isRefuge: boolean = false;
  isLoggedIn: boolean = false;


  constructor(private authService: UserAuthService) {
    // Subscribe to userSource to extract userName
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userName = user.userName; // Extract userName from the object
      } else {
        this.userName = null; // Handle case where user is null
      }
    });


  
    // Subscribe to roleSource
    this.authService.role$.subscribe((role) => {
      this.userRole = role;
     
      this.updateRoleFlags(role);
    });
  }
  
  ngOnInit(): void {
    this.authService.loadUserFromToken();
    this.isLoggedIn = this.authService.isLoggedIn(); // Check if the user is logged in
    this.isAdmin = this.authService.getRole() === 'ADMIN'; // Check if the user is an admin
    this.isRefuge = this.authService.getRole() === 'REFUGE';
    console.log('isRefuge', this.isRefuge);
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    })
  }

  updateRoleFlags(role: string | null) {
    this.isAdmin = role === 'ADMIN';
    this.isAdoptant = role === 'ADOPTANT';
    this.isRefuge = role === 'REFUGE';
  }

  logout() {
    this.authService.logout();
  }
}