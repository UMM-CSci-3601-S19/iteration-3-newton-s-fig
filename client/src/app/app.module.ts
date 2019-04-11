import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './users/user.component';

import {RideListComponent} from "./rides/ride-list.component";
import {UserListComponent} from './users/user-list.component';

import {UserListService} from './users/user-list.service';
import {RideListService} from './rides/ride-list.service';

import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';

import {AddRideComponent} from './rides/add-ride.component';

import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

import {AuthService} from "./auth/auth.service";
import {AuthGuardService} from "./auth/auth-guard.service";
import {MatChipsModule} from '@angular/material/chips';
import { MapsComponent } from './maps/maps.component';
import {RideComponent} from "./rides/ride.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    MatCardModule,
    MatDatepickerModule,
    MatChipsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,

    UserListComponent, RideListComponent,

    UserComponent,

    AddRideComponent,
    RideComponent,
    LoginComponent,
    SignupComponent,
    MapsComponent

  ],
  providers: [
    UserListService,RideListService,AuthGuardService,AuthService,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  entryComponents: [
    AddRideComponent,
    LoginComponent,
    SignupComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
