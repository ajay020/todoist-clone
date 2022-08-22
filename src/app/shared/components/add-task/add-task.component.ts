import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from 'shared/services/task.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() task :any  = {};
  @Input('modalRef') modalRef!: any;

  @Output('hideAddComponent') hideAddComponent = new EventEmitter();
  @Output('toggleTaskCardDisplay')toggleTaskCardDisplay = new EventEmitter();

  dueDate!: string;
  priority: number = 4;

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addTask(newtask: any){
    // console.log(newtask);

    const isObjectEmpty = Object.keys(this.task).length === 0;

    if(isObjectEmpty){
        const projectId = this.activatedRoute.snapshot.queryParamMap.get('id');
        newtask.project_id = projectId;
        newtask.priority = this.priority;
        newtask.completed = false;
        newtask.description = newtask.description || '';
        this.taskService.addTask(newtask, projectId);
        this.hideAddComponent.emit(null);
        this.modalRef.dismiss();
    }else{
        let updatedTask = {
            ...this.task,
            ...newtask ,
            priority : this.priority? this.priority : this.task.priority,
            dueDate : newtask.dueDate? newtask.dueDate : this.task.dueDate,
        }

        // console.log(updatedTask);
        this.taskService.update(updatedTask)
        this.toggleTaskCardDisplay.emit(null);
    }
  }

  selectPriority(priority:number){
    this.priority = priority;
  }

  cancelTask(){
    const isObjectEmpty = Object.keys(this.task).length === 0;
    if(isObjectEmpty){
        this.hideAddComponent.emit(null);
    }else{
        this.toggleTaskCardDisplay.emit(null);
    }
    this.modalRef.dismiss();
  }

}
