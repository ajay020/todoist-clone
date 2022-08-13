import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavdataService } from './../navdata.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
   sidebarStatus!:boolean; 
   subscription!: Subscription;

  constructor(private navDataService: NavdataService) { }

  ngOnInit(): void {
    this.subscription = this.navDataService.sidebarStatus$.subscribe(status =>{
        this.sidebarStatus = status;
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
