import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NavdataService } from './../navdata.service';
import { Subscription, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './../add-project/add-project.component';
import { ProjectService } from './../project.service';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isListExpended = false;
  sidebarStatus! : boolean;
  subscription!: Subscription;
  projectSubscription! : Subscription;
  projects!: any[];  
  @Output('onSelectProject') onSelectProject = new EventEmitter();

  constructor(
    private projectService: ProjectService,
    private dataService: NavdataService,
    private router: Router,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.subscription = this.dataService.sidebarStatus$.subscribe(status =>{
        this.sidebarStatus = status;
    })

    this.projectSubscription =  this.projectService.getAllProjects()
        .subscribe(data => {
            this.projects = data 
            // console.log(this.projects)
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
