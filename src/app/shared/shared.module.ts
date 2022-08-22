import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskService } from './services/task.service';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';
import { ToastsContainer } from './components/toast-container/toast-container.component';
import { ProjectService } from './services/project.service';
import { BrowserModule } from '@angular/platform-browser';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';


@NgModule({
  declarations: [
    ToastsContainer,
    AddTaskComponent,
    TaskComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
  ],
  exports:[
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    ToastsContainer,
    AddTaskComponent,
    TaskComponent,
    TasksComponent,
    
  ],
  providers:[
    TaskService,
    AuthService,
    DatePipe,
    ToastService,
    ProjectService,
    TaskService 
  ]
})
export class SharedModule { }
