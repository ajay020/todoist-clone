import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NavdataService } from './../navdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isListExpended = false;
  sidebarStatus! : boolean;
  subscription!: Subscription;

  constructor(private dataService: NavdataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.sidebarStatus$.subscribe(status =>{
        this.sidebarStatus = status;
    })
  }

  toggleList(){
    this.isListExpended = !this.isListExpended;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
