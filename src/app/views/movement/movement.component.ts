import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {


  private clients: [
    {'NJ 125'},
    {'NX 898'},
    {'ND 101'}
  ];
  
  constructor() {

  }

  groupOptionsSelect: Array<any>;
  ngOnInit() {

    // Material Select Initialization
    // $(document).ready(function () {
    //   $('.mdb-select').material_select();
    // });
    this.groupOptionsSelect = [
      { value: '', label: 'team 1', group: true },
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '', label: 'team 2', group: true },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
    ];
  }

}
