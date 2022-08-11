import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   sidebarStatus : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleSidebar(isSidebarOpen:boolean){
    this.sidebarStatus = isSidebarOpen;
  }

}
