import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { NavdataService } from './../navdata.service';
import { TaskService } from './../task.service';
import { ProjectService } from './../project.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
   sidebarStatus!:boolean; 
   subscription!: Subscription;
   items : any[] = [];
   projectId!:string;
   taskSubscription!: Subscription;
   filteredItems: any[] = [];

  constructor(
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private activeRoute: ActivatedRoute,
    private navDataService: NavdataService) { 
    }

  ngOnInit(): void {
      
    this.subscription = this.navDataService.sidebarStatus$.subscribe(status =>{
          this.sidebarStatus = status;
        })

    this.taskService.getAllTasks().subscribe(result =>{
        this.items = result;
    })

    this.taskSubscription = this.activeRoute.queryParams.pipe()
    .subscribe( (params: Params) =>{
        this.projectId = params['id'];
        this.filterItems()
    })
  }

  filterItems(){
    this.filteredItems = this.projectId 
    ?this.items.filter(item => item.project_id === this.projectId)
    : this.items;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.taskSubscription.unsubscribe();
  }

}
