import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { Client } from "app/interfaces/Cient";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class ClientService {

    fleet: Client;
    constructor(private http: HttpClient) {}

    // Make the HTTP request:
    fetchClients():Observable<[Client]> {
        // const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get<[Client]>('http://localhost:1406/assets/data/clients.json').pipe(map(res => {
        return res;
        }))
    }
}
