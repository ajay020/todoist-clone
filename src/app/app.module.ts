import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBarChart, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


import { DatePipe } from '@angular/common';
import { ProjectModule } from './project/project.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    ProjectModule,
    
    // firebase
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
      
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [
        DatePipe
    ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faEdit, faTrashCan, faBarChart);
  }
}
