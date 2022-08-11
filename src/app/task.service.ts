import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    tasks = [
        {
            id: "1",
            name: "Deep work",
            description: 'Description 1',
            dueDate: '31 Aug'
        },
        {
            id: "2",
            name: "Now",
            description: 'Description 2',
            dueDate: 'This moment'
        },
    ]
  constructor() { }

  getAllTasks(){
    return of(this.tasks);
  }

  addTask(task: any){
    let newtask = {id: new Date().getTime() +"",  ...task, dueDate: "Now" };
    this.tasks.push(newtask);
    console.log(this.tasks);
  }

  update(task: any){
    console.log(task);
    let index = this.tasks.findIndex(t => t.id === task.id);
    if(index > -1){
        this.tasks[index] = {...task};
    }

    console.log(this.tasks);
  }

  delete(taskId:any){
    let index = this.tasks.findIndex(task => task.id === taskId);
    if(index > -1){
        this.tasks.splice(index, 1);
    }
  }
}
