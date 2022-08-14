import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NavdataService } from './../navdata.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './../add-project/add-project.component';
import { ProjectService } from './../project.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isListExpended = false;
  sidebarStatus! : boolean;
  subscription!: Subscription;

  constructor(
    private projectService: ProjectService,
    private dataService: NavdataService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.subscription = this.dataService.sidebarStatus$.subscribe(status =>{
        this.sidebarStatus = status;
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
        this.projectService.create(data);
    })
  }

  toggleList(){
    this.isListExpended = !this.isListExpended;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
