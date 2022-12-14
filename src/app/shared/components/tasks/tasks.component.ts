import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'shared/services/project.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
   @Input('items') items :any [] = [];
   @Input('selectedProjectName') selectedProjectName!:string;
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
