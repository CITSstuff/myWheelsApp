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
    stateCtrl = new FormControl();
    
  /*clientCtrl = new FormControl();
  filteredClients: Observable<Client[]>;

  clients: Client[] = [
    {
      name: 'Arkansas',
      tokens: 2,
      dp: '../../../assets/img/noIMG.PNG'
    },
    {
      name: 'California',
      tokens: 3,
      dp: '../../../assets/img/noIMG.PNG'
    },
    {
      name: 'Florida',
      tokens: 20,
      dp: '../../../assets/img/noIMG.PNG'
    },
    {
      name: 'Texas',
      tokens: 27,
      dp: '../../../assets/img/noIMG.PNG'
    }
  ];*/

  constructor() {
  }
  minDate = new Date();
  // maxDate = new Date(this.minDate.setDate(this.minDate.getDate() + 1))
  public isChecked = false;
  myControl = new FormControl();
  clientOptions: string[] = ['Olwethu', 'Ali', 'Nemza', 'Big client'];
  filteredOptions: Observable<string[]>;


  ngOnInit() {
    this.isChecked = false;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    console.log("is ", this.stateCtrl.status);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.clientOptions.filter(client => client.toLowerCase().includes(filterValue));
  }
}
