import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Input('sidebarStatus') sidebarStatus!: boolean;
    
  constructor() { }

  ngOnInit(): void {
  }

}
