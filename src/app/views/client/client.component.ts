import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/services/client-service';
import { Client } from 'app/interfaces/Cient';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {


  public clients: Client[];

  constructor(private clientService: ClientService) {
    clientService.fetchClients().subscribe(res => {
      this.clients = res
    });

  }

  ngOnInit() { }
}
