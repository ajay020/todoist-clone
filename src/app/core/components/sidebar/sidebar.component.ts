import { Component, Input, OnInit, OnDestroy, EventEmitter, Output, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NavdataService } from '../../services/navdata.service';
import { Subscription, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'shared/services/project.service';
import { AddProjectComponent } from 'app/project/components/add-project/add-project.component';
import { DeleteProjectComponent } from 'app/project/components/delete-project/delete-project.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit,  OnDestroy {
    @Output('onSelectProject') onSelectProject = new EventEmitter();
  isListExpended = false;
  leftPosition!:string;
  sidebarStatus! : boolean;
  subscription!: Subscription;
  projectSubscription! : Subscription;
  projects!: any[];  

  constructor(
    private projectService: ProjectService,
    private dataService: NavdataService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.subscription = this.dataService.sidebarStatus$.subscribe(status =>{
        this.sidebarStatus = status;
        this.leftPosition  = status ? '0' : '-320px';
    })

    this.projectSubscription =  this.projectService.getAllProjects()
        .subscribe(data => {
            this.projects = data 
        });
  }

 setQueryParams(name:string){
    this.router.navigate(
            [],
            {
                relativeTo: this.activeRoute,
                queryParams: {name},
                // queryParamsHandling: 'merge'
            });
 }

  selectProject(project:any){
    this.onSelectProject.emit(project.name);
  }

  editProject(project: any){
    console.log(project);
  }

  openDeleteModal(project: any){
    const modalRef = this.modalService.open(DeleteProjectComponent, {
        size: 's',
        centered: false,
        windowClass: 'dark-modal'
    });

    modalRef.componentInstance.project = project;

     // get project data from add-project modal
     modalRef.componentInstance.passEntry.subscribe( (canDeleteProject:boolean )=>{
        if(canDeleteProject){
            this.projectService.delete(project.key);
            this.router.navigate(['project'])
        }
    })

  }


  openModel(){
    const modalRef = this.modalService.open(AddProjectComponent, {
        size: 's',
        centered: false,
        windowClass: 'dark-modal'
    });

    // get project data from add-project modal
    modalRef.componentInstance.passEntry.subscribe( (data:any )=>{
        this.projectService.create(data.name);
    })
  }

  toggleList(){
    this.isListExpended = !this.isListExpended;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.projectSubscription.unsubscribe();
  }
}
