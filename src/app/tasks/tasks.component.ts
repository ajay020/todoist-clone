import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from './../task.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
   @Input('items') items :any [] = [];
   displayAddBtn:boolean = true;
   projectCount!: number;

  constructor(private projectService: ProjectService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.projectService.getProjectCount().subscribe(count => {  
        this.projectCount = count;
    })
  }

  toggle(){
    this.displayAddBtn = !this.displayAddBtn;
  }

}
