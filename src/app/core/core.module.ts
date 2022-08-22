import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavdataService } from './services/navdata.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SidebarComponent,
    NotFoundComponent
  ],
  imports: [
  CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SidebarComponent,
    NotFoundComponent
  ],
  providers:[
    NavdataService
  ]
})
export class CoreModule { }
