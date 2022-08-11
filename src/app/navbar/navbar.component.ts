import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output('sidebarStatus') sidebarStatus = new EventEmitter<boolean>();

  isSidebarOpen = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarStatus.emit(this.isSidebarOpen);
  }

}
