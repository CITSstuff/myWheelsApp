import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Observable, fromEvent, BehaviorSubject, merge } from 'rxjs';
import { User } from '../../interfaces/User';
import {HttpClient} from '@angular/common/http';
import { AddDialogComponent } from 'app/dialogs/add/add.dialog.component';
import { EditDialogComponent } from 'app/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from 'app/dialogs/delete/delete.dialog.component';
import { DataSource } from '@angular/cdk/table';
import { UserService } from 'app/services/user-service';
import { map } from 'rxjs/operators';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  users$: Observable<User[]>;
  displayedColumns: string[] = ['id', 'id_number', 'full_name', 'email', 'date_created', 'telephone', 'is_active', 'role',  'actions'];
  exampleDatabase: UserService | null;
  dataSource: ExampleDataSource | null;
  selectedOption: string;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: UserService) {}

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(user: User) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {identifier: "client", user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside UserService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(id: number, id_number: string, first_name: string, last_name: string, email: string, date_created: string, telephone: string, is_active: string, role: string) {
    this.id = id;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {identifier: "client", id: id, id_number: id_number, first_name: first_name, last_name: last_name, email: email, date_created: date_created, telephone: telephone, is_active: is_active, role: role}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside UserService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }
  
  deleteItem(id: number, id_number: string, first_name: string, last_name: string, email: string, date_created: string, telephone: string, is_active: string, role: string) {
    
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {identifier: "client", id: id, id_number: id_number, first_name: first_name, last_name: last_name, email: email, date_created: date_created, telephone: telephone, is_active: is_active, role: role}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from UserService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public getSelectedOption = () => {

    return this.selectedOption;
  }

  public loadData() {
    this.exampleDatabase = new UserService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, this);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');
  

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _exampleDatabase: UserService,
              public _paginator: MatPaginator,
              public _sort: MatSort, public _sOption: ClientComponent) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((user: User) => {
          const searchStr = this.genSearchStr(user);
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  genSearchStr = (user: User) => {
    
    switch(this._sOption.getSelectedOption()) {
      case 'full_name':
          return (user.first_name + user.last_name).toLowerCase();
      case 'date_created':
          return (user.date_created).toLowerCase();
      case 'email':
          return (user.email).toLowerCase();
      case 'id_number':
          return user.id_number.toString();
      case 'role':
          return user.role.toLowerCase();
      default: {
        return (user.id_number + user.id + user.email + user.role + user.date_created + user.first_name
           + user.last_name + user.is_active + user.telephone).toLowerCase();
      }
    }
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'id_number': [propertyA, propertyB] = [a.id_number, b.id_number]; break;
        case 'date_created': [propertyA, propertyB] = [a.date_created, b.date_created]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'telephone': [propertyA, propertyB] = [a.telephone, b.telephone]; break;
        case 'full_name': [propertyA, propertyB] = [a.first_name, b.first_name]; break;
        case 'role': [propertyA, propertyB] = [a.role, b.role]; break;
        case 'is_active': [propertyA, propertyB] = [a.is_active, b.is_active]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}