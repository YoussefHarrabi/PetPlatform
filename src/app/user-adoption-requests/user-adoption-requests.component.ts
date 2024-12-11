import { Component, OnInit } from '@angular/core';
import { AdoptionRequestService } from '../adoption-request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-adoption-requests',
  templateUrl: './user-adoption-requests.component.html',
  styleUrls: ['./user-adoption-requests.component.css']
})
export class UserAdoptionRequestsComponent implements OnInit {
  userRequests: any[] = [];
  userName: string | undefined;

  constructor(
    private adoptionRequestService: AdoptionRequestService,
    private authService: AuthService  // Assuming we have an AuthService to get the logged-in user
  ) { }

  ngOnInit(): void {
    // Get logged-in user information
    const user = this.authService.getLoggedInUser(); // Fetch logged-in user's info
    this.userName = user?.userName;

    if (user) {
      this.loadUserRequests(user.id);
    }
  }

  loadUserRequests(userId: number) {
    this.adoptionRequestService.getUserAdoptionRequests(userId).subscribe((requests) => {
      this.userRequests = requests;
    });
  }

  viewRequestDetails(requestId: number) {
    // Handle viewing request details (e.g., navigate to a detailed page or open a modal)
  }
}
