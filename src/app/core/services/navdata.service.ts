import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavdataService {

    // Observable boolean sources
     private sidebarStatusSource = new Subject<boolean>();

    // Observable boolean streams
     sidebarStatus$ = this.sidebarStatusSource.asObservable();

     setSidebarStatus(status: boolean){
        this.sidebarStatusSource.next(status);
     }

}
