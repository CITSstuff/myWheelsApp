import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import {DataService} from './../../services/data.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from './../../dialogs/add/add.dialog.component';
import {EditDialogComponent} from './../../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './../../dialogs/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable, Subscription} from 'rxjs';
import { Issue } from 'app/interfaces/Fleet';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})

export class FleetComponent implements OnInit {
  displayedColumns = ['id', 'make', 'date_added', 'year', 'kms', 'tank','registration', 'color', 'status', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  selectedOption: string;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {identifier: "fleet", issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(id: number, make: string, date_added: string, year: string, kms: string, tank: string, registration: string, colour: string, status: string) {
    this.id = id;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {identifier: "fleet", id: id, make: make, date_added: date_added, year: year, kms: kms, tank: tank, registration: registration, colour: colour, status: status}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }
  
  deleteItem(id: number, make: string, date_added: string, year: string, kms: string, tank: string, registration: string, colour: string, status: string) {
    
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {identifier: "fleet", id: id, make: make, date_added: date_added, year: year, kms: kms, tank: tank, registration: registration, colour: colour, status: status}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
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
    this.exampleDatabase = new DataService(this.httpClient);
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

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');
  

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort, public _sOption: FleetComponent) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
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
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
          const searchStr = this.genSearchStr(issue);
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

  genSearchStr = (issue: Issue) => {
    
    switch(this._sOption.getSelectedOption()) {
      case 'year':
          return (issue.year).toLowerCase();
      case 'status':
          return (issue.status).toLowerCase();
      case 'index':
          return issue.index.toString();
      case 'registration':
          return (issue.registration).toLowerCase();
      case 'date_added':
          return (issue.date_added).toLowerCase();
      case 'colour':
          return issue.color;
      case 'tank':
          return issue.tank;
      case 'kms':
          return issue.kms;
      case 'make':
          return (issue.make).toLowerCase();
      default: {
        return (issue.make + issue.date_added + issue.color + issue.registration + issue.year + issue.status
           + issue.tank + issue.index + issue.kms).toLowerCase();
      }
    }
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'make': [propertyA, propertyB] = [a.make, b.make]; break;
        case 'date_added': [propertyA, propertyB] = [a.date_added, b.date_added]; break;
        case 'year': [propertyA, propertyB] = [a.year, b.year]; break;
        case 'colour': [propertyA, propertyB] = [a.color, b.color]; break;
        case 'kms': [propertyA, propertyB] = [a.kms, b.kms]; break;
        case 'tank': [propertyA, propertyB] = [a.tank, b.tank]; break;
        case 'registration': [propertyA, propertyB] = [a.registration, b.registration]; break;
        case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}