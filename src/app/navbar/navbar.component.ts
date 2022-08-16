import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NavdataService } from './../navdata.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSidebarOpen = false;
  user! : any;  
  constructor(private navDataService: NavdataService, public auth: AuthService) { }

  ngOnInit(): void {
    let storedUser = localStorage.getItem('user');
    if(storedUser){
        this.user = JSON.parse(storedUser);
        // console.log(storedUser)
    }
  }

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    this.navDataService.setSidebarStatus(this.isSidebarOpen);
  }

  logout(){
    this.auth.logout();
  }

}
