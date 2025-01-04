import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPetComponent } from './pets/add/add.component';
import { ListComponent } from './pets/list/list.component';
import { DetailsComponent } from './pets/details/details.component';
import { AdoptablePetsComponent } from './adoptable-pets/adoptable-pets.component';
import { LoginComponent } from './login/login.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';
import { AdoptionRequestListComponent } from './adoption-request-list/adoption-request-list.component';
import { UserAdoptionRequestsComponent } from './user-adoption-requests/user-adoption-requests.component';
import { RegisterComponent } from './register/register.component';
import { CommunauteComponent } from './communaute/communaute.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { UserAnimalsComponent } from './user-animals/user-animals.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'pets', children: [
    { path: 'add', component: AddPetComponent ,canActivate: [AuthGuard],},
    { path: 'list', component: ListComponent },
    { path: 'details/:id', component: DetailsComponent ,canActivate: [AuthGuard],},
    { path: '', component: AdoptablePetsComponent },
  ]},
  { path: 'adoption-form/:petId', component: AdoptionFormComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'adoption-requests', component: AdoptionRequestListComponent ,canActivate: [AuthGuard]},
  { path: 'user-adoption-requests', component: UserAdoptionRequestsComponent,canActivate: [AuthGuard] },
  { path: 'forum' , component: CommunauteComponent,canActivate: [AuthGuard]},
  { path: 'users', component: GestionUtilisateurComponent,canActivate: [AuthGuard]},
  { path: 'user-animals', component: UserAnimalsComponent,canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  
  { path: '', redirectTo: '/pets', pathMatch: 'full' ,}, // Redirect the empty path to /pets
  { path: '**', redirectTo: '/pets' }, // Redirect all other invalid paths to /pets
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
