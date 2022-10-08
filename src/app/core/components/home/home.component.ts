import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ProjectService } from 'shared/services/project.service';
import { NavdataService } from '../../services/navdata.service';
import { TaskService } from '../../../shared/services/task.service';

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
   selectedProjectName!: string;

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
        this.items = result.filter(task => task.completed === false);
        this.filterItems(); // gets called every time task list modified.
    })

    this.taskSubscription = this.activeRoute.queryParams.pipe()
    .subscribe( (params: Params) =>{
        this.projectId = params['id'];
        // filter by project id
        if(this.projectId){
            this.filterItems()
        }
        if(params['name']){
            console.log(params['name']);
            this.filterItemsBy(params['name']);
        }
    })
  }

  filterItemsBy(title:string){
    if(title === 'today'){
        this.setProjectName(title);

        this.filteredItems = this.items.filter(item => { 
          return new Date().getFullYear() === new Date(item.dueDate).getFullYear()
          && new Date().getDate() === new Date(item.dueDate).getDate()
          && new Date().getMonth() === new Date(item.dueDate).getMonth();
        })
    }
    else if(title === 'incoming'){
        this.setProjectName(title);
        this.filteredItems = this.items.filter(item => { 
            return new Date().getTime() < new Date(item.dueDate).getTime();
          })
          console.log(this.filteredItems);

    } else if(title === 'inbox'){
        this.setProjectName(title);
        this.filteredItems = this.items;
    }else{
        this.filteredItems = this.items;
    }
  }

  filterItems(){

    let title = this.activeRoute.snapshot.queryParams['name'];
    if(title){
        this.filterItemsBy(title);
    }else{
        this.filteredItems = this.projectId 
        ?this.items.filter(item => item.project_id === this.projectId)
        : this.items;
    }

   
  }

  setProjectName(projectName:string){
    this.selectedProjectName = projectName;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.taskSubscription.unsubscribe();
  }

}
