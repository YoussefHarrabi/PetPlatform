import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component'; // Import the FormsModule module
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { RegisterComponent } from './register/register.component';
import { AdoptionRequestListComponent } from './adoption-request-list/adoption-request-list.component';
import { UserAdoptionRequestsComponent } from './user-adoption-requests/user-adoption-requests.component';
import { CommunauteComponent } from './communaute/communaute.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { UserAnimalsComponent } from './user-animals/user-animals.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';

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
    RegisterComponent,
    AdoptionRequestListComponent,
    UserAdoptionRequestsComponent,
    CommunauteComponent,
    GestionUtilisateurComponent,
    UserAnimalsComponent,
    ProfileComponent,
  
 
  ],
  
  imports: [
    CommonModule, 
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
