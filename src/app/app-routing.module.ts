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

const routes: Routes = [
  { path: 'pets', children: [
    { path: 'add', component: AddPetComponent },
    { path: 'list', component: ListComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: '', component: AdoptablePetsComponent },
  ]},
  { path: 'adoption-form/:id', component: AdoptionFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'adoption-requests', component: AdoptionRequestListComponent },
  { path: 'user-adoption-requests', component: UserAdoptionRequestsComponent },
  
  { path: '', redirectTo: '/pets', pathMatch: 'full' }, // Redirect the empty path to /pets
  { path: '**', redirectTo: '/pets' }, // Redirect all other invalid paths to /pets
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
