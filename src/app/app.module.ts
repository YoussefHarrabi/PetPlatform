import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AdoptablePetsComponent } from './adoptable-pets/adoptable-pets.component';
import { FooterComponent } from './footer/footer.component';
import { AddPetComponent } from './pets/add/add.component';
import { ListComponent } from './pets/list/list.component';
import { DetailsComponent } from './pets/details/details.component';

import { LoginComponent } from './login/login.component'; // Import the FormsModule module
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroSectionComponent,
    SearchFormComponent,
    AdoptablePetsComponent,
    FooterComponent,
    AddPetComponent,
    ListComponent,
    DetailsComponent,
    LoginComponent,
    AdoptionFormComponent ,
    RegisterComponent
  
 
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    BrowserModule, 
    FormsModule,
    HttpClientModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
