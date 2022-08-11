import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule , FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { AddTaskComponent } from './add-task/add-task.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskService } from './task.service';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TaskComponent,
    TasksComponent,
    AddTaskComponent
  ],
  imports: [
BrowserModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(private library :  FaIconLibrary){
        library.addIcons(faEdit, faTrashCan);
    }
}
