import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from './../task.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input('task')task: any = {};
  showEditForm = false;

  constructor(private taskService: TaskService) { 
  }

  ngOnInit(): void {
    // console.log("task oninit.", this.task);
  }

  editTask(task:any){
    this.showEditForm = !this.showEditForm;
  }

  deleteTask(task: any){
    // this.showEditForm = !this.showEditForm;
    this.taskService.delete(task);
  }

  toggle(){
    this.showEditForm = !this.showEditForm;
  }
  ngOnDestroy(): void {
    //   console.log("destoryed task", this.task.id )
  }

}
