import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { AddProjectComponent } from './components/add-project/add-project.component';
import { DeleteProjectComponent } from './components/delete-project/delete-project.component';



@NgModule({
  declarations: [
    AddProjectComponent,
    DeleteProjectComponent
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    AddProjectComponent,
    DeleteProjectComponent
  ]
})
export class ProjectModule { }
