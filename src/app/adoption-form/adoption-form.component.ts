import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdoptionService } from '../services/adoption.service';
import { PetService } from '../services/pet.service';
import { UserAuthService } from '../services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {
  adoptionForm!: FormGroup;
  petId!: string| null;
  pet: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adoptionService: AdoptionService,
    private router: Router,
    private petservice: PetService,
    private userAuthService: UserAuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    console.log('petId:', this.petId);
      // Retrieve petId from the route
      //  parameters
      this.route.paramMap.subscribe((params) => {
        this.petId = params.get('petId');
        this.petservice.getPetById(Number(this.petId)).subscribe((pet) => {
          this.pet = pet;
        //extract pet name

      });
    this.adoptionForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      reason: ['', Validators.required],
    });
  });
  }

  onSubmit(): void {
    if (this.adoptionForm.valid && this.petId) {
      const userId = this.userAuthService.getCurrentUserId();  // Get the user ID
      const formData = { 
        ...this.adoptionForm.value, 
        petId: this.petId,
        userId: userId  // Add the userId to the form data
      };
  
      this.adoptionService.submitAdoptionRequest(formData).subscribe({
        next: (response) => {
          this.toastr.success('Adoption request submitted successfully!', 'Success'); // Success toast
        
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error submitting adoption request:', error);
          this.toastr.error('Failed to submit adoption request.', 'Error');
        
        },
      });
    } else {
      alert('Please complete the form and ensure a valid pet is selected.');
    }
  }
}