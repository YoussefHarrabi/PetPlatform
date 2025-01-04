declare var $: any;
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdoptionService } from '../services/adoption.service';
import { UserAuthService } from '../services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-adoption-requests',
  templateUrl: './user-adoption-requests.component.html',
  styleUrls: ['./user-adoption-requests.component.css']
})
export class UserAdoptionRequestsComponent implements OnInit {
  userRequests: any[] = [];
  selectedRequest: any = null; // Store the details of the selected request
  selectedRequestForEdit: any = {}; // Store the request being edited
  userId: string | null = null;

  constructor(
    private adoptionService: AdoptionService,
    private authService: UserAuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.fetchUserAdoptionRequests();
    } else {
      console.error('User is not logged in or user ID is not available.');
    }
  }

  fetchUserAdoptionRequests() {
    if (!this.userId) {
      console.error('User ID is not defined.');
      return;
    }

    this.adoptionService.getAdoptionRequestsByUser(parseInt(this.userId)).subscribe(
      (requests) => {
        console.log('Adoption requests:', requests);
        this.userRequests = requests.map((req) => ({
          ...req,
          petName: req.pet.name,
        }));
      },
      (error) => {
        console.error('Error fetching adoption requests:', error);
      }
    );
  }

  editAdoptionRequest(request: any) {
    // Make a copy of the request data to edit
    console.log('request', request);
    this.selectedRequestForEdit = { ...request };
    // this.cdr.markForCheck();
    // $('#editRequestModal').modal('show'); // Trigger the modal to show (using jQuery)
  }
  // Close the modal
  closeEditModal() {
    this.selectedRequestForEdit = {};
    document.getElementById("closeButtonForEditModal")?.click();
  }

   // Update the adoption request with only allowed fields
   updateAdoptionRequest() {
    if (this.selectedRequestForEdit) {
      const requestId = this.selectedRequestForEdit.id;
      const status = this.selectedRequestForEdit.status; // Keep this as the original status
      const reasonForAdoption = this.selectedRequestForEdit.reasonForAdoption;
      const userEmail = this.selectedRequestForEdit.userEmail;
      this.adoptionService.updateAdoptionRequest(requestId, status, reasonForAdoption, userEmail).subscribe(
        (response) => {
          // Find the updated request in the list and update it
          const index = this.userRequests.findIndex((req) => req.id === requestId);
          if (index !== -1) {
            this.userRequests[index] = {
              ...this.userRequests[index],
              userEmail: this.selectedRequestForEdit.userEmail,
              reasonForAdoption: this.selectedRequestForEdit.reasonForAdoption,
            };
          }
          this.toastr.success('Adoption request updated successfully');
          this.closeEditModal(); // Close the modal after a successful update
        },
        (error) => {
          console.error('Error updating adoption request:', error);
        }
      );
    }
  }
  viewRequestDetails(requestId: number) {
    this.adoptionService.getRequestDetailsById(requestId).subscribe(
      (details) => {
        console.log('Request details:', details);
        this.selectedRequest = {
          petName: details.pet.name,
          reason: details.reasonForAdoption,
          requestDate: details.requestDate,
          status: details.status,
        };
      },
      (error) => {
        console.error('Error fetching request details:', error);
      }
    );
  }
  // Method to handle the deletion of an adoption request
  deleteAdoptionRequest(requestId: number) {
    this.adoptionService.deleteAdoptionRequest(requestId).subscribe(
      (response) => {
        console.log('Request deleted successfully');
        // After deletion, remove the request from the list
        this.toastr.error('Adoption request deleted successfully');
        this.userRequests = this.userRequests.filter(req => req.id !== requestId);
      },
      (error) => {
        console.error('Error deleting adoption request:', error);
      }
    );
  }

 

  closeDetails() {
    this.selectedRequest = null; // Reset the selected request
  }
}
