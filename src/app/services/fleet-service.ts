import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

interface Fleet {
	id: string
	avatar: string;
	registration: string;
	about: string
}


@Injectable()
export class FleetService {
    constructor(private http: HttpClient) {
        this.fetchFleet(),tap(data => {
            console.log('service data', data)
        });
    }

        // Make the HTTP request:
    fetchFleet() {
        // const headers = new Headers({'Content-Type': 'application/json'});
            this.http.get('http://localhost:1406/assets/data/fleet.json')
            .pipe(
             map(response => {})).subscribe(response => {
                console.log('respose date: ', response);
                return response;
            });
    }
}
