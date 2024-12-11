import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {
  petId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the pet ID from the route parameters
    console.log("hedha how ",this.route.snapshot.paramMap.get('id'))
    this.petId = this.route.snapshot.paramMap.get('id') || '';
  }

  submitAdoptionRequest(form: any) {
    console.log(`Adoption request submitted for pet ID: ${this.petId}`, form);
    alert('Your adoption request has been submitted successfully!');
  }
}