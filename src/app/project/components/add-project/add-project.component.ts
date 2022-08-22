import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project.component.html',
})
export class AddProjectComponent {
    // @Input('project') project!: any; To edit the project

   @Output() passEntry: EventEmitter<any> = new EventEmitter();
    
  constructor(public activeModal: NgbActiveModal) {
  }

  addProject(formData : any){
    this.passEntry.emit(formData);
    this.activeModal.dismiss();
  }

}