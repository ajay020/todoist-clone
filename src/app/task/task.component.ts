import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from './../task.service';
import { ToastService } from './../toast.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input('task')task: any = {};
  showEditForm = false;

  priorityStyle: any = {
    '1': 'red',
    '2': 'orange',
    '3': 'blue',
    '4': 'gray',
  }

  constructor(private taskService: TaskService, private toastService: ToastService) { 
  }


  ngOnInit(): void {
    // console.log(this.task);
  }

  completeTask(tpl: any){
    this.task.completed = true;
    this.taskService.update(this.task);

    this.toastService.show(tpl , { classname: 'bg-success text-light', delay: 3000 });
  }

  undoTask(tpl:any){
    this.taskService.update({...this.task,completed: false});
  }

  getColor(priority:any){
    return this.priorityStyle[priority];
  }

  editTask(task:any){
    this.showEditForm = !this.showEditForm;
  }

  deleteTask(task: any){
    this.taskService.delete(task);
  }

  toggle(){
    this.showEditForm = !this.showEditForm;
  }
  ngOnDestroy(): void {
  }

}
