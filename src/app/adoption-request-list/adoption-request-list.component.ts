import { Component, OnInit  } from '@angular/core';
import { AdoptionRequestService } from '../adoption-request.service';
import { HttpClient } from '@angular/common/http';
import { AdoptionService } from '../services/adoption.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-adoption-request-list',
  templateUrl: './adoption-request-list.component.html',
  styleUrls: ['./adoption-request-list.component.css']
})
export class AdoptionRequestListComponent  implements OnInit {
  adoptionRequests: any[] = [];
  ownerId: string | null; // Replace with dynamic owner ID (e.g., fetched from authentication)

  constructor(private adoptionService: AdoptionService, private authservice: UserAuthService) {
    this.ownerId = this.authservice.getCurrentUserId();
  }

  ngOnInit() {
    this.fetchAdoptionRequests();
  }

  fetchAdoptionRequests() {
    console.log('owner id ',this.ownerId)
    this.adoptionService.getAdoptionRequestsForOwner(this.ownerId).subscribe(
      (data) => {
        console.log('Adoption requests:', data);
        this.adoptionRequests = data;
      },
      (error) => {
        console.error('Error fetching adoption requests:', error);
      }
    );
  }

  acceptRequest(requestId: number) {
    this.updateRequestStatus(requestId, 'APPROVED');
  }

  rejectRequest(requestId: number) {
    this.updateRequestStatus(requestId, 'REJECTED');
  }

  updateRequestStatus(requestId: number, status: string) {
    console.log('owner id ',this.ownerId)
    this.adoptionService.updateAdoptionRequestStatus(requestId, status).subscribe(
      () => {
        this.fetchAdoptionRequests();
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }
}