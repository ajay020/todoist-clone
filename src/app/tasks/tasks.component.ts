import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from './../task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
   tasks$!: Observable<any>;
   displayAddBtn:boolean = true;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ =  this.taskService.getAllTasks()
  }

  toggle(){
    this.displayAddBtn = !this.displayAddBtn;
  }

}
