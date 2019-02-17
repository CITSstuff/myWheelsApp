import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-allocated',
  templateUrl: './allocated.component.html',
  styleUrls: ['./allocated.component.scss']
})
export class AllocatedComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  
  constructor() { }

  ngOnInit() {
  }

}
