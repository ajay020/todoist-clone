import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent {
@Input('project') project!: any; 

@Output() passEntry: EventEmitter<any> = new EventEmitter();
    
constructor(public activeModal: NgbActiveModal) {
}

deleteProject(canDeleteProject: boolean){
  this.passEntry.emit(canDeleteProject);
  this.activeModal.dismiss();
}


}
