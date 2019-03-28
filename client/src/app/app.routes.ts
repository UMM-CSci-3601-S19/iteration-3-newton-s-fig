// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RideListComponent} from "./rides/ride-list.component";
import {AddRideComponent} from "./rides/add-ride.component";
import {UserListComponent} from "./users/user-list.component";

// Route Configuration
export const routes: Routes = [
  {path: '', component: RideListComponent},
  {path: 'rides', component: RideListComponent},
  {path: 'addride', component: AddRideComponent},
  {path: 'user', component: UserListComponent}

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
