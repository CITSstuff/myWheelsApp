import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'; 
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Client {
  dp: string;
  name: string;
  tokens: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent  {
  clientCtrl = new FormControl();
  filteredClients: Observable<Client[]>;

  clients: Client[] = [
    {
      name: 'Arkansas',
      tokens: '2.978M',
      dp: '../../../assets/img/noIMG.PNG'
    },
    {
      name: 'California',
      tokens: '39.14M',
      dp: '../../../assets/img/noIMG.PNG'
    },
    {
      name: 'Florida',
      tokens: '20.27M',
      dp: '../../../assets/img/noIMG.PNG'
    },
    {
      name: 'Texas',
      tokens: '27.47M',
      dp: '../../../assets/img/noIMG.PNG'
    }
  ];

  constructor() {
    this.filteredClients = this.clientCtrl.valueChanges
      .pipe(
        startWith(''),
        map(client => client ? this._filterClients(client) : this.clients.slice())
      );
  }

  private _filterClients(value: string): Client[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(client => client.name.toLowerCase().indexOf(filterValue) === 0);
  
}}
