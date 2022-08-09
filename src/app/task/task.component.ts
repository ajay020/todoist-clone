import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input('task')task!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
