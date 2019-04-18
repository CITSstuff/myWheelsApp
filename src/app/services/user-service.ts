import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { User } from "app/interfaces/User";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    user: User;
    constructor(private http: HttpClient) {}

    // Make the HTTP request:
    fetchClients():Observable<[User]> {
        // const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get<[User]>('http://localhost:1406/assets/data/clients.json').pipe(map(res => {
        return res;
        }))
    }
}
