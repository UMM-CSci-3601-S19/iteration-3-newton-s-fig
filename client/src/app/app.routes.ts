// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RideListComponent} from "./rides/ride-list.component";
import {AddRideComponent} from "./addrides/add-ride.component";
import {UserListComponent} from "./users/user-list.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';
import {FilterComponent} from "./filter/filter.component";

// Route Configuration
export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'rides', component: RideListComponent, canActivate: [AuthGuard]},
  {path: 'addrides', component: AddRideComponent, canActivate: [AuthGuard]},
  {path: 'filter', component: FilterComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
