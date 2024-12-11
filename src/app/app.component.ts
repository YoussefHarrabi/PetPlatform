import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}

   // Function to check if the current route is the homepage
   isHomePage(): boolean {
    // You can customize the homepage route as needed, e.g., '/' or '/pets/list'
    return this.router.url === '/' || this.router.url === '/pets';
  }
}
