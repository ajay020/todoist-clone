import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from './../task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Input() task :any  = {};

  @Output('hideAddComponent') hideAddComponent = new EventEmitter();
  @Output('toggleTaskCardDisplay')toggleTaskCardDisplay = new EventEmitter();

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addTask(newtask: any){
    const projectId = this.activatedRoute.snapshot.queryParamMap.get('id');
    newtask.project_id = projectId;
    
    const isObjectEmpty = Object.keys(this.task).length === 0;

    if(isObjectEmpty){
        this.taskService.addTask(newtask, projectId);
        this.hideAddComponent.emit(null);
        console.log("new task added")
    }else{
        this.taskService.update( {...this.task,  ...newtask});
        this.toggleTaskCardDisplay.emit(null);
        console.log("task updated");
    }
  }

  cancelTask(){
    const isObjectEmpty = Object.keys(this.task).length === 0;
    if(isObjectEmpty){
        this.hideAddComponent.emit(null);
    }else{
        this.toggleTaskCardDisplay.emit(null);
    }
  }

}
