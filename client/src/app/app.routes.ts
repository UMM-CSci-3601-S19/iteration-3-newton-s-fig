// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RideListComponent} from "./rides/ride-list.component";
import {AddRideComponent} from "./rides/add-ride.component";
import {UserListComponent} from "./users/user-list.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

// Route Configuration
export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'rides', component: RideListComponent},
  {path: 'addride', component: AddRideComponent},
  {path: 'user', component: UserListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
