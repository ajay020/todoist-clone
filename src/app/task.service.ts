import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    tasks = [
        {
            id: "1",
            name: "Name",
            description: 'Description',
            dueDate: '31 Aug'
        },
        {
            id: "2",
            name: "Name",
            description: 'Description',
            dueDate: '31 Aug'
        },
    ]
  constructor() { }

  getAllTasks(){
    return of(this.tasks);
  }

  addTask(task: any){
    this.tasks.push(task);
  }

}
