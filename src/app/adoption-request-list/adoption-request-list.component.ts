import { Component, OnInit  } from '@angular/core';
import { AdoptionRequestService } from '../adoption-request.service';

@Component({
  selector: 'app-adoption-request-list',
  templateUrl: './adoption-request-list.component.html',
  styleUrls: ['./adoption-request-list.component.css']
})
export class AdoptionRequestListComponent implements OnInit {
  adoptionRequests: any[] = [];

  constructor(private adoptionRequestService: AdoptionRequestService) { }

  ngOnInit(): void {
    this.loadAdoptionRequests();
  }

  loadAdoptionRequests() {
    this.adoptionRequestService.getAdoptionRequests().subscribe((requests) => {
      this.adoptionRequests = requests;
    });
  }

  viewRequestDetails(id: number) {
    // Navigate to request details page or show details in a modal
  }
}
