import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms'; 
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Client {
  dp: string;
  name: string;
  tokens: number;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {
 
  constructor() {}
  stateCtrl = new FormControl();
  myControl = new FormControl();
  clientOptions: string[] = ['Olwethu', 'Ali', 'Nemza', 'Big client'];
  filteredOptions: Observable<string[]>;


  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clientOptions.filter(client => client.toLowerCase().includes(filterValue));
  }

}
