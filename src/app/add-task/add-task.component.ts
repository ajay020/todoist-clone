import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from './../task.service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Input() task :any  = {};

  @Output('hideAddComponent') hideAddComponent = new EventEmitter();
  @Output('toggleTaskCardDisplay')toggleTaskCardDisplay = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  addTask(newtask: any){

    const isObjectEmpty = Object.keys(this.task).length === 0;

    if(isObjectEmpty){
        this.taskService.addTask(newtask);
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
