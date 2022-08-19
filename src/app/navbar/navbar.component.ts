import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NavdataService } from './../navdata.service';
import { AuthService } from './../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from './../add-task/add-task.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSidebarOpen = false;
  user! : any;
  modalRef!: any;

  constructor(
    private modalService: NgbModal,
    private navDataService: NavdataService,
    public auth: AuthService) { }

  ngOnInit(): void {
    let storedUser = localStorage.getItem('user');
    if(storedUser){
        this.user = JSON.parse(storedUser);
        // console.log(storedUser)
    }
  }

  openTaskModel(addtemplate:any){
     this.modalRef =  this.modalService.open(addtemplate, {
        size: 's',
        centered: false,
        // scrollable: true,
        // windowClass: 'bg-transparent',
        modalDialogClass:' pt-5 mt-5',
        container:'div'
    });
    
  }


  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    this.navDataService.setSidebarStatus(this.isSidebarOpen);
  }

  logout(){
    this.auth.logout();
  }

}
