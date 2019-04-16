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

import {AddRideComponent} from './addrides/add-ride.component';

import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';
import { ChatService } from './chat/chat-service';

import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

import {AuthService} from "./auth/auth.service";
import {AuthGuardService} from "./auth/auth-guard.service";
import {MatChipsModule} from '@angular/material/chips';
import { MapsComponent } from './maps/maps.component';
import {RideComponent} from "./rides/ride.component";
import {FilterComponent} from "./filter/filter.component";
import {AgmCoreModule, MapsAPILoader} from "@agm/core";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    MatCardModule,
    MatDatepickerModule,
    MatChipsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCSlf2Tw0r3e_oud87Phtzc_afZfFphM6Q"
    })
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
    FilterComponent
    MapsComponent,

    ChatComponent,
    MessageComponent,

  ],
  providers: [
    UserListService,
    RideListService,
    ChatService,
    AuthGuardService,
    AuthService,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  entryComponents: [
    AddRideComponent,
    LoginComponent,
    SignupComponent,
    FilterComponent
    SignupComponent,
    ChatComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
