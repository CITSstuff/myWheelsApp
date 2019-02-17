import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Fleet } from "app/interfaces/Fleet";

@Injectable({
    providedIn: 'root',
})
export class FleetService {

    fleet: Fleet;
    constructor(private http: HttpClient) {}

    // Make the HTTP request:
    fetchFleet():Observable<[Fleet]> {
        // const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get<[Fleet]>('http://localhost:1406/assets/data/fleet.json').pipe(map(res => {
        return res;
        }))
    }
}
