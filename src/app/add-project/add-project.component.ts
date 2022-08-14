import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  
    displayStyle = 'none';

  constructor() { }

  ngOnInit(): void {
  }

  
  openPopup() {
    this.displayStyle = 'block';
    console.log(this.displayStyle)
  }

  closePopup() {
    this.displayStyle = 'none';
  }
}
