import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from './../task.service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output('hideAddComponent') hideAddComponent = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  addTask(task: any){
    this.hideAddComponent.emit(null);
    // console.log(task);
    this.taskService.addTask(task);

  }

  cancelTask(){
    this.hideAddComponent.emit(null);
  }

}
