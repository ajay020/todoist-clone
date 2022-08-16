import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBarChart,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';

import { environment } from './../environments/environment';
import { AddTaskComponent } from './add-task/add-task.component';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';
import { TaskService } from './task.service';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TaskComponent,
    TasksComponent,
    AddTaskComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AddProjectComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage

    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {path:"", redirectTo: "project", pathMatch:'full'},
      { path: 'project',
        component: HomeComponent,
        // children: [
        //     {
        //         path: ':id',
        //         component: TasksComponent,
        //     },
        // ],
        canActivate: [AuthGuard], 
      },
    //   { path: 'project/:id', component: HomeComponent },
      
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [TaskService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faEdit, faTrashCan, faBarChart);
  }
}
